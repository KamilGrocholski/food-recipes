import { zodResolver } from '@hookform/resolvers/zod'
import { type SubmitHandler, type SubmitErrorHandler, useFieldArray, useForm } from 'react-hook-form'
import { type RecipeSchema, recipeSchema } from '../../server/schema/recipe.schema'
import Button from '../common/Button'
import Input from '../common/Input'
import TextArea from '../common/TextArea'
import Divider from '../common/Divider'
import { api } from '../../utils/api'
import { useRouter } from 'next/router'
import { Icons } from '../../assets/icons'
import React, { useEffect, useState } from 'react'
import ImageUploader from '../common/ImageUploader'
import { useToastControls } from '../../hooks/useToastControls'

const RecipeForm: React.FC = () => {
    const { show } = useToastControls()

    const [recipeImage, setRecipeImage] = useState<string | undefined>(undefined)

    // Main useForm hook
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<RecipeSchema>({
        resolver: zodResolver(recipeSchema),
        mode: 'onChange',
        shouldFocusError: true,
        defaultValues: {
            cookTimeInMin: 0,
            prepTimeInMin: 0,
            ingredients: [
                { description: '' }
            ],
            instructions: [
                { description: '' }
            ]
        }
    })

    // On change `recipeImage` set `setValue` for image to main useForm
    useEffect(() => {
        if (recipeImage && recipeImage.trim() !== '') {
            setValue('image', recipeImage)
        }
    }, [recipeImage, setValue])

    // Ingredients hook
    const {
        fields: ingredients,
        append: appendIngredient,
        remove: removeIngredient
    } = useFieldArray({
        control,
        name: 'ingredients',
    })

    // Instructions hook
    const {
        fields: instructions,
        append: appendInstruction,
        remove: removeInstruction
    } = useFieldArray({
        control,
        name: 'instructions'
    })

    // Tags hook
    const {
        fields: tags,
        append: appendTag,
        remove: removeTag
    } = useFieldArray({
        control,
        name: 'tags'
    })

    const router = useRouter()

    const createRecipe = api.recipe.create.useMutation({
        onError: () => {
            show('recipe-creation-error')
        },
        onSuccess: (data) => {
            show('recipe-creation-success')
            void router.push(`/recipes/${data.id}`)
        }
    })

    const handleOnValid: SubmitHandler<RecipeSchema> = (data, e) => {
        e?.preventDefault()
        createRecipe.mutate(data)
    }

    const handleOnError: SubmitErrorHandler<RecipeSchema> | undefined = (data, e) => {
        e?.preventDefault()
        console.log(data)
    }

    return (
        <div className='mx-3'>
            <form
                className='flex flex-col w-full max-w-3xl mx-auto'
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={handleSubmit(handleOnValid, handleOnError)}
            >
                <section className='prose'>
                    <h2>Add a recipe</h2>
                    <p>Uploading recipes is easy! Select ingredients, write instructions and add.</p>
                </section>

                <Divider />

                <section className='flex lg:flex-row flex-col justify-between'>
                    <div>
                        <Input
                            type='text'
                            label='Title'
                            placeholder='Title'
                            {...register('title')}
                            errorMessage={errors.title?.message}
                        />
                        <TextArea
                            label='Description'
                            placeholder='Description'
                            {...register('description')}
                            errorMessage={errors.description?.message}
                        />
                    </div>
                    <div>
                        {/* <p className='label label-error'>{errors.image?.message}</p> */}
                        <Input {...register('image')} errorMessage={errors.image?.message} className='hidden' />
                        <ImageUploader storeImageFn={url => setRecipeImage(url)} image={recipeImage} />
                    </div>
                </section>

                <Divider />

                <section className='prose'>
                    <h3>Ingredients</h3>
                    <div className='flex flex-col space-y-3'>
                        {ingredients.map((field, index) => (
                            <div key={field.id}>
                                <section key={index} className='flex flex-row space-x-3 items-end'>
                                    <Input
                                        placeholder='Description'
                                        inputSize='md'
                                        border={true}
                                        labelPosition='top'
                                        {...register(`ingredients.${index}.description` as const)}
                                        errorMessage={errors?.ingredients?.[index]?.description?.message}
                                    />
                                    <Button
                                        content={Icons.trash}
                                        onClick={() => removeIngredient(index)}
                                        variant='error'
                                    />
                                </section>
                            </div>
                        ))}
                    </div>
                    <Button
                        content={Icons.plus}
                        className='mt-3'
                        onClick={e => {
                            e.preventDefault()
                            appendIngredient({
                                description: ''
                            }, {
                                shouldFocus: true
                            })
                        }}
                    />

                </section>

                <Divider />

                <section className='prose'>
                    <h3>Instructions</h3>
                    <div className='flex flex-col space-y-3'>
                        {instructions.map((field, index) => (
                            <div key={field.id}>
                                <section key={index} className='flex flex-row space-x-3 items-end'>
                                    <TextArea
                                        placeholder='Instruction'
                                        inputSize='md'
                                        border={true}
                                        labelPosition='top'
                                        {...register(`instructions.${index}.description` as const)}
                                        errorMessage={errors?.instructions?.[index]?.description?.message}
                                    />
                                    <Button
                                        content={Icons.trash}
                                        onClick={() => removeInstruction(index)}
                                        variant='error'
                                    />
                                </section>
                            </div>
                        ))}
                    </div>
                    <Button
                        content={Icons.plus}
                        className='mt-3'
                        onClick={e => {
                            e.preventDefault()
                            appendInstruction({
                                description: '',
                                number: instructions.length + 1
                            }, {
                                shouldFocus: true
                            })
                        }}
                    />

                </section>

                <Divider />

                <section className='prose'>
                    <h3>Tags</h3>
                    <div className='flex flex-col space-y-3'>
                        {tags.map((field, index) => (
                            <div key={field.id}>
                                <section key={index} className='flex flex-row space-x-3 items-end'>
                                    <Input
                                        placeholder='Tag'
                                        inputSize='md'
                                        border={true}
                                        labelPosition='top'
                                        {...register(`tags.${index}.name` as const)}
                                        errorMessage={errors?.tags?.[index]?.name?.message}
                                    />
                                    <Button
                                        content={Icons.trash}
                                        onClick={() => removeTag(index)}
                                        variant='error'
                                    />
                                </section>
                            </div>
                        ))}
                    </div>

                    <Button
                        content={Icons.plus}
                        className='mt-3'
                        onClick={e => {
                            e.preventDefault()
                            appendTag({
                                name: ''
                            }, {
                                shouldFocus: true
                            })
                        }}
                    />
                </section>

                <Divider />

                <section className='prose'>
                    <h3>Time</h3>
                    <div>
                        <Input
                            type='number'
                            label='Cooking time'
                            placeholder='Cooking time'
                            min={0}
                            {...register('cookTimeInMin', {
                                valueAsNumber: true,
                            })}
                            errorMessage={errors.cookTimeInMin?.message}
                        />
                        <Input
                            type='number'
                            label='Preparation time'
                            placeholder='Preparation time'
                            min={0}
                            {...register('prepTimeInMin', {
                                valueAsNumber: true,
                            })}
                            errorMessage={errors.prepTimeInMin?.message}
                        />
                    </div>
                </section>

                <Divider />

                <section className='flex flex-col space-y-3'>
                    <Button
                        type='submit'
                        content='Add Recipe'
                        isLoading={createRecipe.isLoading}
                        loadingText='Adding Recipe...'
                        disabled={createRecipe.isLoading || createRecipe.isSuccess}
                    />
                </section>


            </form>
        </div>
    )
}

export default RecipeForm

