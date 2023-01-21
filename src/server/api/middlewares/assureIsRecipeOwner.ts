import { type Recipe } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type Context } from "../trpc";

export const assureIsRecipeOwner = async (
    ctx: Context,
    recipeId: Recipe['id']
) => {
    const recipe = await ctx.prisma.recipe.findUnique({
        where: {
            id: recipeId
        },
        select: {
            authorId: true
        }
    })

    if (!ctx.session) throw new TRPCError({code: 'UNAUTHORIZED'})

    if (!recipe) throw new TRPCError({code: 'NOT_FOUND'})

    if (recipe.authorId !== ctx.session?.user?.id) throw new TRPCError({code: 'UNAUTHORIZED'})
} 