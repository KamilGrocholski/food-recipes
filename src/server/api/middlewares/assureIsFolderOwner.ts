import { type Folder } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type Context } from "../trpc";

export const assureIsFolderOwner = async (
    ctx: Context,
    folderId: Folder['id']
) => {
    const folder = await ctx.prisma.folder.findUnique({
        where: {
            id: folderId
        },
        select: {
            ownerId: true
        }
    })

    if (!ctx.session) throw new TRPCError({code: 'UNAUTHORIZED'})

    if (!folder) throw new TRPCError({code: 'NOT_FOUND'})

    if (folder.ownerId !== ctx.session?.user?.id) throw new TRPCError({code: 'FORBIDDEN'})
} 