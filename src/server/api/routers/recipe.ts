import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { type RouterOutputs } from "../../../utils/api";
import { uploadImage } from "../../cloudinary";
import { infoBase, recipeSchema, reviewSchema } from "../../schema/recipe.schema";
import { assureRecipeIsNotOwner } from "../middlewares/assureRecipeIsNotOwner";
import { assureReviewIsNotAdded } from "../middlewares/assureReviewIsNotAdded";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export type RecipePublicQueryOutput = NonNullable<RouterOutputs['recipe']['getOneById']>

export const recipeRouter = createTRPCRouter({
  infiniteRecipes: publicProcedure
    .input(z.object({limit: z.number().min(1).max(25).optional(), cursor: z.number().optional()}))
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 25
      const { cursor } = input

      const recipes = await ctx.prisma.recipe.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
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
            id: input.id
          },
          select: selects.publicRecipe,
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
              console.log(err)
              throw new TRPCError({code: 'INTERNAL_SERVER_ERROR'})
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
              // tags: tags ? {
              //   create: [
              //     ...tags.map(tag => ({
              //       tag: {
              //         create: {
              //           name: tag.name
              //         }
              //       }
              //     }))
              //   ]
              // } : undefined
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
});

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
                tag: {
                  select: {
                    name: true
                  }
                }
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