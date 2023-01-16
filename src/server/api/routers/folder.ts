import { addRecipeToFolderSchema, createFolderSchema, getOneFolderSchema, removeFolderSchema, updateFolderSchema } from "../../schema/folder.schema";
import { assureIsFolderOwner } from "../middlewares/assureIsFolderOwner";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { selects as recipeSelects } from "./recipe";

export const folderRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createFolderSchema)
    .mutation(({ctx, input}) => {
      const { name } = input

      return ctx.prisma.folder.create({
        data: {
            name,
            ownerId: ctx.session.user.id
        }
      })
    }),

    updateName: protectedProcedure
        .input(updateFolderSchema)
        .mutation(async ({ctx, input}) => {
            const { name, id } = input
            await assureIsFolderOwner(ctx, id)

            return await ctx.prisma.folder.update({
                where: {
                    id
                },
                data: {
                    name
                }
            })
        }),

    remove: protectedProcedure
        .input(removeFolderSchema)
        .mutation(async ({ctx, input}) => {
            await assureIsFolderOwner(ctx, input.id)

            return await ctx.prisma.folder.delete({
                where: {
                    id: input.id
                }
            })
        }),

    addRecipeToFolder: protectedProcedure
        .input(addRecipeToFolderSchema)
        .mutation(async ({ctx, input}) => {
            const { recipeId, folderId } = input

            await assureIsFolderOwner(ctx, folderId)

            return await ctx.prisma.folder.update({
                where: {
                    id: folderId
                },
                data: {
                    recipes: {
                        connect: {
                            id: recipeId
                        }
                    }
                }
            })
        }),
    
    getAllByCurrentUserId: protectedProcedure
        .query(({ctx}) => {
            return ctx.prisma.folder.findMany({
                where: {
                    ownerId: ctx.session.user.id
                },
                select: {
                    id: true,
                    name: true
                }
            })
        }),

    getOneWithRecipes: protectedProcedure
        .input(getOneFolderSchema)
        .query(async ({ctx, input}) => {
            await assureIsFolderOwner(ctx, input.id)

            return await ctx.prisma.folder.findUnique({
                where: {
                    id: input.id
                },
                select: {
                    id: true,
                    name: true,
                    recipes: {
                        select: recipeSelects.publicRecipe
                    }
                }
            })
        })
})