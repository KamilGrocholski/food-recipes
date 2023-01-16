import { zodResolver } from '@hookform/resolvers/zod'
import { type SubmitHandler, type SubmitErrorHandler, useFieldArray, useForm } from 'react-hook-form'
import { type RecipeSchema, recipeSchema } from '../../server/schema/recipe.schema'
import Button from '../common/Button'
import Input from '../common/Input'
import TextArea from '../common/TextArea'
import Divider from '../common/Divider'
import { api } from '../../utils/api'
import { useRouter } from 'next/router'

export interface RecipeFormProps {
    onValid: SubmitHandler<RecipeSchema>
    onError?: SubmitErrorHandler<RecipeSchema> | undefined
}

const RecipeForm: React.FC<RecipeFormProps> = ({
    onValid,
    onError
}) => {

    // Main useForm hook
    const {
        control,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RecipeSchema>({
        resolver: zodResolver(recipeSchema),
        mode: 'onSubmit',
        shouldFocusError: false,
        defaultValues: {
            cookTimeInMin: 0,
            prepTimeInMin: 0
        }
    })

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
        onError: (error) => console.log(error),
        onSuccess: (data) => {
            void router.push(`/recipe/${data.id}`)
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
        <div>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form className='flex flex-col w-full max-w-3xl mx-auto' onSubmit={handleSubmit(handleOnValid, handleOnError)}>
                <section className='prose'>
                    <h2>Add a recipe</h2>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia quam accusantium harum. Quos, ea omnis aspernatur numquam doloremque blanditiis! Itaque minus iure maxime totam est optio dolor quis rerum id.</p>
                </section>

                <Divider />

                <section className='flex flex-row justify-between'>
                    <div>
                        <Input
                            type='text'
                            label='Title'
                            placeholder='Title'
                            {...register('title')}
                            errorMessage={errors.title?.message}
                        />
                        <Input
                            type='text'
                            label='Title'
                            placeholder='Title'
                            {...register('image')}
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
                        <Input
                            type='file'
                            className='file-input'
                        />
                    </div>
                </section>

                <Divider />

                <section className='prose'>
                    <h3>Ingredients</h3>
                    <div className='flex flex-col space-y-3'>
                        {ingredients.map((field, index) => (
                            <div key={field.id}>
                                <section key={index} className='flex flex-row space-x-1 items-end'>
                                    <Input
                                        placeholder='Description'
                                        inputSize='md'
                                        border={true}
                                        labelPosition='top'
                                        {...register(`ingredients.${index}.description` as const)}
                                        errorMessage={errors?.ingredients?.[index]?.description?.message}
                                    />
                                    <Button
                                        content={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>}
                                        onClick={() => removeIngredient(index)}
                                        variant='error'
                                    />
                                </section>
                            </div>
                        ))}
                    </div>
                    <Button
                        content='Add Ingredient'
                        className='mt-3'
                        onClick={() => appendIngredient({
                            description: ''
                        })}
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
                                        content={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>}
                                        onClick={() => removeInstruction(index)}
                                        variant='error'
                                    />
                                </section>
                            </div>
                        ))}
                    </div>
                    <Button
                        content='Add Instruction'
                        className='mt-3'
                        onClick={() => appendInstruction({
                            description: '',
                            number: instructions.length === 0 ? 1 : instructions.length + 2
                        })}
                    />

                </section>

                <Divider />

                <section className='prose'>
                    <h3>Tags</h3>
                    <div className='flex flex-col space-y-3'>
                        {tags.map((field, index) => (
                            <div key={field.id}>
                                <section key={index} className='flex flex-row space-x-1 items-end'>
                                    <Input
                                        placeholder='Tag'
                                        inputSize='sm'
                                        border={true}
                                        labelPosition='top'
                                        {...register(`tags.${index}.name` as const)}
                                        errorMessage={errors?.tags?.[index]?.name?.message}
                                    />
                                    <Button
                                        content='Delete'
                                        onClick={() => removeTag(index)}
                                        variant='error'
                                    />
                                </section>
                            </div>
                        ))}
                    </div>

                    <Button
                        content='Add Tag'
                        className='mt-3'
                        onClick={() => appendTag({
                            name: ''
                        })}
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
                            {...register('cookTimeInMin', {
                                valueAsNumber: true,
                            })}
                            errorMessage={errors.cookTimeInMin?.message}
                        />
                        <Input
                            type='number'
                            label='Preparation time'
                            placeholder='Preparation time'
                            {...register('prepTimeInMin', {
                                valueAsNumber: true,
                            })}
                            errorMessage={errors.prepTimeInMin?.message}
                        />
                    </div>
                </section>

                <Divider />

                <section className='flex flex-col space-y-3'>
                    <div>
                        <Input
                            label='Make it public'
                            type='checkbox'
                            className='checkbox'
                            defaultChecked={false}
                            {...register('isPublished')}
                        />
                    </div>
                    <Button
                        type='submit'
                        content='Add Recipe'
                        variant='primary'
                        isLoading={createRecipe.isLoading}
                        loadingText='Adding Recipe...'
                        disabled={createRecipe.isLoading}
                    />
                </section>


            </form>
        </div>
    )
}

export default RecipeForm

