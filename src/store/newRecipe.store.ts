import { create, type StateCreator } from 'zustand'

interface BaseSlice {
    name: string
    setName: (name: string) => void
    isAlreadyTaken: boolean

    description: string
    setDescription: (description: string) => void

    // image: string
    // setImage: (image: string) => void

    cookTimeInMin: number
    setCookTimeInMin: (cookTime: number) => void
    
    prepTimeInMin: number
    setPrepTimeInMin: (prepTime: number) => void
}

const createBaseSlice: StateCreator<BaseSlice, [], []> = (set => ({
    name: 'Name',
    setName: (name) => set(() => ({ name })),
    isAlreadyTaken: false,
    
    description: 'Description',
    setDescription: (description) => set(() => ({ description })),
    
    cookTimeInMin: 20,
    setCookTimeInMin: (cookTimeInMin) => set(() => ({ cookTimeInMin })),
    
    prepTimeInMin: 20,
    setPrepTimeInMin: (prepTimeInMin) => set(() => ({ prepTimeInMin })),
}))

type Ingredient = {
    amount: number
    unit: string
    name: string
}

interface IngredientsSlice {
    ingredients: Ingredient[]

    addIngredient: (ingredient: Ingredient) => void
    updateIngredient: (index: number, ingredient: Ingredient) => void
    removeIngredient: (index: number) => void
}

const createIngredientsSlice: StateCreator<IngredientsSlice, [], []> = (set => ({
    ingredients: [],

    addIngredient: (ingredient) => set(state => ({ ingredients: [...state.ingredients, ingredient] })),
    updateIngredient: (index, ingredient) => set(state => ({ ingredients: state.ingredients.map((oldIngredient, currInd) => currInd === index ? ingredient : oldIngredient) })),
    removeIngredient: (index) => set(state => ({ ingredients: state.ingredients.filter((_, currInd) => index !== currInd) })) 
}))

const useNewRecipeStore = create<BaseSlice & IngredientsSlice>((...args) => ({
    ...createBaseSlice(...args),
    ...createIngredientsSlice(...args)
}))

export default useNewRecipeStore