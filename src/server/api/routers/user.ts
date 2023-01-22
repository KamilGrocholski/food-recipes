import { z } from "zod";
import { createTRPCRouter } from "../trpc";
import { publicProcedure } from "../trpc";

const userBase = {
    id: z.string().cuid()
}

// const userSchema = z.object({
//     id: userBase.id
// })

export const userRouter = createTRPCRouter({
    getInfoById: publicProcedure
        .input(z.object({
            id: userBase.id
        }))
        .query(({ctx, input}) => {
            return ctx.prisma.user.findUnique({
                where: {
                    id: input.id
                },
                select: {
                    id: true,
                    name: true,
                    image: true,
                    _count: {
                        select: {
                            recipes: true,
                            review: true
                        }
                    }
                }
            })
        })
})