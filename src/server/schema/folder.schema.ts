import { z } from "zod";
import { infoBase } from "./recipe.schema";

export type CreateFolderSchema = z.infer<typeof createFolderSchema>
export type UpdateFolderSchema = z.infer<typeof updateFolderSchema>
export type RemoveFolderSchema = z.infer<typeof removeFolderSchema>
export type AddRecipeToFolderSchema = z.infer<typeof addRecipeToFoldersSchema>

export const folderBase = {
    id: z.number(),
    name: z.string().min(1, {message: 'Min. 1 character'}).max(35, {message: 'Max. 35 characters'})
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

export const addRecipeToFoldersSchema = z.object({
    foldersIds: folderBase.id.array(),
    recipeId: infoBase.id
})

export const getOneFolderSchema = z.object({
    id: folderBase.id
})

export const removeRecipeFromFolderSchema = z.object({
    folderId: folderBase.id,
    recipeId: infoBase.id
})