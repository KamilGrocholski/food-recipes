import { z } from "zod";
import { type RouterOutputs } from "../../../utils/api";
import { infoBase, recipeSchema, reviewBase, reviewSchema } from "../../schema/recipe.schema";
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
        return ctx.prisma.recipe.findUnique({
          where: {
            id: input.id,
          },
          select: selects.publicRecipe
        })
      }),

      create: protectedProcedure
        .input(recipeSchema)
        .mutation(({ ctx, input }) => {
          const {
            title,
            description,
            image,
            cookTimeInMin,
            prepTimeInMin,
            ingredients,
            instructions,
            tags
          } = input 

          return ctx.prisma.recipe.create({
            data: {
              title,
              description,
              image,
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
                create: tags
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

            void assureRecipeIsNotOwner(ctx, recipeId)
            void assureReviewIsNotAdded(ctx, recipeId)

            return ctx.prisma.review.create({
              data: {
                recipeId,
                comment,
                rating,
                authorId: ctx.session.user.id
              }
            })
          })
});

const selects = {
  publicRecipe: {
            id: true,
            title: true,
            description: true,
            cookTimeInMin: true,
            prepTimeInMin: true,
            image: true,
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
                id: true,
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