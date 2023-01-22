import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { type RouterOutputs } from "../../../utils/api";
import { deleteImage, uploadImage } from "../../cloudinary";
import { infoBase, recipeSchema, reviewSchema } from "../../schema/recipe.schema";
import { assureRecipeIsNotOwner } from "../middlewares/assureRecipeIsNotOwner";
import { assureReviewIsNotAdded } from "../middlewares/assureReviewIsNotAdded";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export type RecipePublicQueryOutput = NonNullable<RouterOutputs['recipe']['getOneById']>

export const recipeRouter = createTRPCRouter({
  getTags: publicProcedure
  .input(z.object({
    query: z.string()
  }))
  .query(({ctx, input}) => {
    return ctx.prisma.tag.findMany({
      take: 15,
      where: {
        name: {
          startsWith: input.query
        }
      },
      select: {
        name: true
      }
    })
  }),

  getByUserId: publicProcedure
    .input(z.object({
      userId: z.string(),
      take: z.number().optional()
    }))
    .query(({ctx, input}) => {
      return ctx.prisma.recipe.findMany({
        take: input.take,
        where: {
          authorId: input.userId
        },
        select: selects.publicRecipe
      })
    }),

  getAllByUserId: publicProcedure
    .input(z.object({
      userId: z.string()
    }))
    .query(({ctx, input}) => {
      return ctx.prisma.recipe.findMany({
        where: {
          authorId: input.userId
        },
        select: selects.publicRecipe
      })
    }),

  infiniteRecipes: publicProcedure
    .input(z.object({
      limit: z.number().min(1).max(25).optional(), 
      cursor: z.number().optional(),
      filter: z.object({
        tag: z.string()
      }).partial().optional()
    }))
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 25
      const { cursor, filter } = input

      const recipes = await ctx.prisma.recipe.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: filter && {
          tags: {
            some: {
              name: {
                contains: filter.tag,
              }
            }
          }
        },
        orderBy: {
          id: 'desc'
        },
        select: selects.publicRecipe
      })


      let nextCursor: typeof cursor | undefined = undefined
      if (recipes.length > 1) {
        const nextRecipe = recipes.pop()
        nextCursor = nextRecipe?.id
      }

      return {
        recipes,
        nextCursor
      }
    }),

    getCurrentUserRecipes: protectedProcedure
      .query(({ctx}) => {
        return ctx.prisma.recipe.findMany({
          where: {
            authorId: ctx.session.user.id
          },
          select: selects.publicRecipe
        })
      }),

    getOneById: publicProcedure
      .input(z.object({
        id: z.number()
      }))
      .query(async ({ ctx, input }) => {
        await ctx.prisma.recipe.update({
          where: {
            id: input.id
          },
          data: {
            views: {
              increment: 1
            }
          }
        })

        return await ctx.prisma.recipe.findUnique({
          where: {
            id: input.id,
          },
          select: selects.publicRecipe,
        })
      }),

      delete: protectedProcedure
        .input(infoBase.id)
        .mutation(async ({ctx, input: recipeId}) => {
          return ctx.prisma.$transaction(async () => {
            const recipe = await ctx.prisma.recipe.findUnique({
              where: {
                id: recipeId
              },
              select: {
                image: true,
                authorId: true
              }
            })

            if (!recipe) throw new TRPCError({code: 'NOT_FOUND'})
            if (recipe.authorId !== ctx.session.user.id) throw new TRPCError({code: 'UNAUTHORIZED'})

            const deletion = await ctx.prisma.recipe.delete({
              where: {
                id: recipeId
              }
            })

            await deleteImage(recipe.image)

            return deletion
          })
        }),

      create: protectedProcedure
        .input(recipeSchema)
        .mutation(async ({ ctx, input }) => {
          const {
            title,
            description,
            image,
            cookTimeInMin,
            prepTimeInMin,
            ingredients,
            instructions,
            tags,
          } = input 

          let uploadResult
            try {  
               // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
               uploadResult = await uploadImage(image) 
            } catch (err) {
              throw new TRPCError({code: 'INTERNAL_SERVER_ERROR', message: 'cloudinary image upload error'})
            }

          return await ctx.prisma.recipe.create({
            data: {
              title,
              description,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
              image: uploadResult.url,
              cookTimeInMin,
              prepTimeInMin,
              authorId: ctx.session.user.id,
              ingredients: {
                create: ingredients
              },
              instructions: {
                create: instructions
              },
              tags: {
                connectOrCreate: tags.map(tag => ({
                  where: {name: tag.name},
                  create: {name: tag.name}
                }))
              }
            }
          })
        }),

        addReview: protectedProcedure
          .input(reviewSchema.extend({
            recipeId: infoBase.id
          }))
          .mutation(async ({ ctx, input }) => {
            const { recipeId, comment, rating } = input

            await assureRecipeIsNotOwner(ctx, recipeId)
            await assureReviewIsNotAdded(ctx, recipeId)

            return await ctx.prisma.review.create({
              data: {
                recipeId,
                comment,
                rating,
                authorId: ctx.session.user.id
              }
            })
          })
})

export const selects = {
  publicRecipe: {
            id: true,
            title: true,
            description: true,
            cookTimeInMin: true,
            prepTimeInMin: true,
            image: true,
            views: true,
            author: {
                  select: {
                    image: true,
                    name: true,
                    id: true
                  }
                },
            ingredients: {
              select: {
                description: true
              }
            },
            instructions: {
              select: {
                id: true,
                number: true,
                description: true
              }
            },
            reviews: {
              select: {
                id: true,
                rating: true,
                comment: true,
                createdAt: true,
                author: {
                  select: {
                    id: true,
                    name: true,
                    image: true
                  }
                }
              }
            },
            tags: {
              select: {
                name: true
              }
            },
            _count: {
              select: {
                reviews: true,
                ingredients: true,
                instructions: true,
                tags: true
              }
            }
  }
}