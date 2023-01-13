import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const recipeRouter = createTRPCRouter({
  infiniteRecipes: publicProcedure
    .input(z.object({limit: z.number().min(1).max(25).optional(), cursor: z.number().optional()}))
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 25
      const { cursor } = input

      const recipes = await ctx.prisma.recipe.findMany({
        take: limit + 1,
        where: {
          isPublished: true
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: 'desc'
        }
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
      .query(({ ctx, input }) => {
        return ctx.prisma.recipe.findUnique({
          where: {
            id: input.id,
          },
          select: {
            id: true,
            name: true,
            description: true,
            cookTimeInMin: true,
            prepTimeInMin: true,
            image: true,
            author: {
              select: {
                id: true,
                name: true,
                image: true
              }
            },
            ingredients: {
              select: {
                name: true,
                amount: true,
                unit: true
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
              }
            },
            recipeTags: {
              select: {
                id: true,
                name: true
              }
            },
            _count: {
              select: {
                reviews: true,
                ingredients: true,
                instructions: true
              }
            }
          }
        })
      }),

      create: protectedProcedure
        .input(z.object({
          name: z.string().min(5).max(25),
          description: z.string(),
          image: z.string(),
          cookTimeInMin: z.number(),
          prepTimeInMin: z.number(),
          cousineId: z.number(),
          ingredients: z.array(z.object({
            name: z.string(),
            amount: z.number(),
            unit: z.string()
          })),
          instructions: z.array(z.object({
            number: z.number(),
            description: z.string()
          })),
          recipeTags: z.array(z.object({
            name: z.string()
          }))
        }))
        .mutation(({ ctx, input }) => {
          const {
            name,
            description,
            image,
            cookTimeInMin,
            prepTimeInMin,
            cousineId,
            ingredients,
            instructions,
            recipeTags
          } = input 

          return ctx.prisma.recipe.create({
            data: {
              name,
              description,
              image,
              cookTimeInMin,
              prepTimeInMin,
              cousineId,
              authorId: ctx.session.user.id,
              ingredients: {
                create: ingredients
              },
              instructions: {
                create: instructions
              },
              recipeTags: {
                create: recipeTags
              }
            }
          })
        }),

        addReview: protectedProcedure
          .input(z.object({
            recipeId: z.number(),
            comment: z.string().min(5).max(55),
            rating: z.number().min(0).max(5)
          }))
          .mutation(({ ctx, input }) => {
            const { recipeId, comment, rating } = input

            return ctx.prisma.review.create({
              data: {
                recipeId,
                comment,
                rating
              }
            })
          })
});
