import { type Recipe } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type Context } from "../trpc";

export const assureReviewIsNotAdded = async (
    ctx: Context,
    recipeId: Recipe['id']
) => {
    if (!ctx.session?.user) throw new TRPCError({code: 'UNAUTHORIZED'})

    const review = await ctx.prisma.review.findFirst({
        where: {
            AND: {
                recipeId,
                authorId: ctx.session.user.id
            }
        },
        select: {
            authorId: true
        }
    })


    if (review) throw new TRPCError({code: 'FORBIDDEN'})
} 