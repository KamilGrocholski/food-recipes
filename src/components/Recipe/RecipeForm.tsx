import { zodResolver } from '@hookform/resolvers/zod'
import { type SubmitHandler, type SubmitErrorHandler, useFieldArray, useForm } from 'react-hook-form'
import { type RecipeSchema, recipeSchema } from '../../server/schema/recipe.schema'
import Button from '../common/Button'
import Input from '../common/Input'
import TextArea from '../common/TextArea'
import Divider from '../common/Divider'

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
        mode: 'onBlur'
    })

    // Ingredients hook
    const {
        fields: ingredients,
        append: appendIngredient,
        remove: removeIngredient
    } = useFieldArray({
        control,
        name: 'ingredients'
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

    return (
        <div>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form className='flex flex-col w-full max-w-3xl mx-auto' onSubmit={handleSubmit(onValid, onError)}>
                <section className='prose'>
                    <h2>Add a recipe</h2>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia quam accusantium harum. Quos, ea omnis aspernatur numquam doloremque blanditiis! Itaque minus iure maxime totam est optio dolor quis rerum id.</p>
                </section>

                <Divider />

                <section>
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
                </section>

                <Divider />

                <section className='prose'>
                    <h3>Ingredients</h3>
                    <div>
                        {ingredients.map((field, index) => (
                            <div key={field.id}>
                                <section key={index} className='flex flex-row space-x-1 items-end'>
                                    <Input
                                        placeholder='Description'
                                        inputSize='sm'
                                        border={true}
                                        labelPosition='top'
                                        {...register(`ingredients.${index}.description` as const)}
                                        errorMessage={errors?.ingredients?.[index]?.description?.message}
                                    />
                                    <Button
                                        content='Delete'
                                        onClick={() => removeIngredient(index)}
                                        variant='error'
                                    />
                                </section>
                            </div>
                        ))}
                    </div>
                    <Button
                        content='Append'
                        onClick={() => appendIngredient({
                            description: ''
                        })}
                    />

                </section>

                <Divider />

                <section className='prose'>
                    <h3>Tags</h3>

                    <div>
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
                        content='Tag'
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
                                valueAsNumber: true
                            })}
                            errorMessage={errors.cookTimeInMin?.message}
                        />
                        <Input
                            type='number'
                            label='Preparation time'
                            placeholder='Preparation time'
                            {...register('prepTimeInMin', {
                                valueAsNumber: true
                            })}
                            errorMessage={errors.prepTimeInMin?.message}
                        />
                    </div>
                </section>

                <Divider />

                <section>
                    <div>
                        <Input
                            label='Make it public'
                            type='checkbox'
                            defaultChecked={false}
                            {...register('isPublished')}
                        />
                    </div>
                    <Button
                        type='submit'
                        content='Submit'
                        variant='primary'
                    />
                </section>


            </form>
        </div>
    )
}

export default RecipeForm

