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

interface RecipeCardProps<T = RecipePublicQueryOutput> {
    recipe: T,
}

const RecipeCard = ({
    recipe,
}: RecipeCardProps): JSX.Element => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className='group z-0'>
            <AddToRecipeToFolderModal
                isOpen={isModalOpen}
                close={() => setIsModalOpen(false)}
                recipeId={recipe.id}
                image={recipe.image}
                title={recipe.title}
            />
            <Link href={`/recipes/${recipe.id}`}>
                <figure className='relative overflow-hidden w-[220xp] h-[220px] rounded-md'>
                    <Button
                        content={Icons.plus}
                        shape='circle'
                        variant='secondary'
                        size='sm'
                        onClick={(e) => {
                            e.nativeEvent.preventDefault()
                            e.stopPropagation()
                            setIsModalOpen(true)
                        }}
                        className='absolute top-1 right-1 z-50'
                    />
                    <Image
                        src={recipe.image}
                        // src={placeholder}
                        alt='recipe image'
                        fill
                    />
                    <div className='font-semibold p-3 justify-end flex flex-col absolute bottom-0 space-y-2 bg-gradient-to-t from-black w-full text-white transition-all duration-300 ease-in-out origin-bottom group-hover:translate-y-0 translate-y-full '>
                        <span>Cook time {recipe.cookTimeInMin}</span>
                        <span>Prep time {recipe.prepTimeInMin}</span>
                    </div>
                </figure>
                <div className='py-3 flex flex-row justify-between bg-base-100'>
                    <div className='flex flex-col space-y-2'>
                        <div className='flex flex-col'>
                            <span className='card-title transition-all duration-300 ease-in-out group-hover:text-primary'>{recipe.title}</span>
                            <span className='text-sm text-gray-500 overflow-hidden truncate max-w-[120px]'>{recipe.description}</span>
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
