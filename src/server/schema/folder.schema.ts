import { z } from "zod";
import { infoBase } from "./recipe.schema";

export type CreateFolderSchema = z.infer<typeof createFolderSchema>
export type UpdateFolderSchema = z.infer<typeof updateFolderSchema>
export type RemoveFolderSchema = z.infer<typeof removeFolderSchema>
export type AddRecipeToFolderSchema = z.infer<typeof addRecipeToFolderSchema>

export const folderBase = {
    id: z.number(),
    name: z.string().min(1).max(25)
}

export const createFolderSchema = z.object({
    name: folderBase.name
})

export const updateFolderSchema = z.object({
    id: folderBase.id,
    name: folderBase.name
})

export const removeFolderSchema = z.object({
    id: folderBase.id
})

export const addRecipeToFolderSchema = z.object({
    folderId: folderBase.id,
    recipeId: infoBase.id
})

export const getOneFolderSchema = z.object({
    id: folderBase.id
})