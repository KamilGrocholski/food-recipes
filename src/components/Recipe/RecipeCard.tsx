import Image from "next/image"
import Link from "next/link"
import { type RecipePublicQueryOutput } from "../../server/api/routers/recipe"
import { getAvgRecipeRating } from "../RecipeScreen/Rating"
import RatingReadOnly from "../RecipeScreen/Rating"
import Button from "../common/Button"
import AddToRecipeToFolderModal from "../Folder/AddToRecipeToFolderModal"
import { useState } from "react"
import { Icons } from "../../assets/icons"
import logo from '../../assets/logo.png'
import RemoveRecipeModal from "./RemoveRecipeModal"

interface RecipeCardProps<T = RecipePublicQueryOutput> {
    recipe: T
    options?: {
        withRemoveModal: boolean
    }
}

const RecipeCard = ({
    recipe,
    options
}: RecipeCardProps): JSX.Element => {
    const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState(false)
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)

    return (
        <div className='group z-0'>
            <AddToRecipeToFolderModal
                isOpen={isAddRecipeModalOpen}
                close={() => setIsAddRecipeModalOpen(false)}
                recipeId={recipe.id}
                image={recipe.image}
                title={recipe.title}
            />
            <RemoveRecipeModal
                isOpen={isRemoveModalOpen}
                close={() => setIsRemoveModalOpen(false)}
                recipeId={recipe.id}
                image={recipe.image}
                title={recipe.title}
            />
            <Link href={`/recipes/${recipe.id}`}>
                <figure className='rounded-md relative overflow-hidden min-h-[320px]'>
                    {options?.withRemoveModal ?
                        <Button
                            content={Icons.trash}
                            shape='circle'
                            variant='ghost'
                            size='sm'
                            onClick={(e) => {
                                e.nativeEvent.preventDefault()
                                e.stopPropagation()
                                setIsRemoveModalOpen(true)
                            }}
                            className='absolute top-1 left-1 z-50 text-error btn-active'
                        /> : null}
                    <Button
                        content={Icons.plus}
                        shape='circle'
                        variant='secondary'
                        size='sm'
                        onClick={(e) => {
                            e.nativeEvent.preventDefault()
                            e.stopPropagation()
                            setIsAddRecipeModalOpen(true)
                        }}
                        className='absolute top-1 right-1 z-50'
                    />
                    <Image
                        src={recipe.image}
                        // src={placeholder}
                        alt='recipe image'
                        fill
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center'
                        }}
                    />
                    <div className='font-semibold p-3 justify-end flex flex-col absolute bottom-0 space-y-2 bg-gradient-to-t from-black w-full text-white transition-all duration-300 ease-in-out origin-bottom group-hover:translate-y-0 translate-y-full '>
                        <span className='break-words'>Cooking time {recipe.cookTimeInMin} minutes</span>
                        <span className='break-words'>Preparation time {recipe.prepTimeInMin} minutes</span>
                    </div>
                </figure>
                <div className='py-3 flex flex-row justify-between bg-base-100'>
                    <div className='flex flex-col space-y-2'>
                        <div className='flex flex-col'>
                            <span className='card-title transition-all duration-300 ease-in-out group-hover:text-primary truncate lg:max-w-[200px] max-w-[120px] capitalize'>{recipe.title}</span>
                            <span className='text-sm text-gray-500 truncate lg:max-w-[200px] max-w-[120px]'>by <span className='font-semibold'>{recipe.author.name}</span></span>
                        </div>
                        <RatingReadOnly rating={getAvgRecipeRating(recipe._count, recipe.reviews)} showValue={false} />
                    </div>
                    <div className='flex flex-col space-y-2 items-center'>
                        <div className='rounded-full h-16 w-16'>
                            <Image
                                src={logo}
                                alt='x'
                                layout="responsive"
                                height={60}
                                width={60}
                            />
                        </div>
                        <div className='badge badge-outline text-center font-semibold text-gray-400'>
                            {recipe.views}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default RecipeCard
