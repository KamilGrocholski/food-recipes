import { z } from "zod";

export type ReviewSchema = z.infer<typeof reviewSchema>
export type TagSchema = z.infer<typeof tagSchema>
export type InstructionSchema = z.infer<typeof instructionSchema>
export type IngredientSchema = z.infer<typeof ingredientSchema>
export type InfoSchema = z.infer<typeof infoSchema>
export type RecipeSchema = z.infer<typeof recipeSchema>

// Review

export const reviewBase = {
    id: z.number(),
    comment: z.string().max(255, {message: 'Max. 255 characters'}),
    rating: z.number().min(0).max(5)
} 

export const reviewSchema = z.object({
    comment: reviewBase.comment,
    rating: reviewBase.rating
})

// Tag 

export const tagBase = {
    id: z.number(),
    name: z.string().trim()
        .min(2, {message: 'Min. 2 characters'})
        .max(15, {message: 'Max. 15 characters'})
}

export const tagSchema = z.object({
    name: tagBase.name
})


// Instruction

export const instructionBase = {
    id: z.number(),
    number: z.number().min(1).max(100),
    description: z.string().trim()
        .min(1, {message: 'Min. 1 character'})
        .max(255, {message: 'Max. 255 characters'})
}

export const instructionSchema = z.object({
    number: instructionBase.number,
    description: instructionBase.description
})


//Ingredient

export const ingredientBase = {
    id: z.number(),
    description: z.string().trim()
        // .min(1)
        .max(55, {message: 'Max. 55 characters'})
}     

export const ingredientSchema = z.object({
    description: ingredientBase.description
})


// Info

export const infoBase = {
    id: z.number(),
    title: z.string().trim()
        .min(5, {message: 'Min. 5 character'})
        .max(55, {message: 'Max. 55 characters'}),
    description: z.string().trim()
        .max(255, {message: 'Max. 255 character'}),
    image: z.string(),
    cookTimeInMin: z.number()
        .min(0, {message: 'Min. 1 minute'})
        .max(9999, {message: '9999 is the maximum'}),
    prepTimeInMin: z.number()
        .min(0, {message: 'Min. 1 minute'})
        .max(9999, {message: '9999 is the maximum'}),
    isPublished: z.boolean()
}

export const infoSchema = z.object({
    title: infoBase.title,
    description: infoBase.description,
    image: infoBase.image,
    cookTimeInMin: infoBase.cookTimeInMin,
    prepTimeInMin: infoBase.prepTimeInMin,
    isPublished: infoBase.isPublished
})


// MAIN - Recipe Schema

export const recipeSchema = infoSchema
    .extend({
        ingredients: z.array(ingredientSchema).optional()
    })
    .extend({
        tags: z.array(tagSchema).optional()
    })
    .extend({
        instructions: z.array(instructionSchema).optional()
    })