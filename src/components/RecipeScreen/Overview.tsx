import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import type { Recipe_GetOneById_Output } from "../../types/trpcTypeInfer"
import Button from '../common/Button'
import Divider from '../common/Divider'
import AddToRecipeToFolderModal from '../Folder/AddToRecipeToFolderModal'
import NumbersInfo from './NumbersInfo'
import RatingReadOnly, { getAvgRecipeRating } from './Rating'
import placeholder from '../../assets/placeholder.jpg'

const Overview: React.FC<Recipe_GetOneById_Output> = (recipe) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { data: session } = useSession()

    return (
        <div className='mx-auto max-w-[768px] w-full'>
            <AddToRecipeToFolderModal
                isOpen={isModalOpen}
                close={() => setIsModalOpen(false)}
                title={recipe.title}
                image={placeholder}
                recipeId={recipe.id}
            />
            <section className='flex flex-col lg:flex-row w-full justify-between'>
                <article className='flex flex-col space-y-4 prose'>
                    <h1>{recipe.title}</h1>
                    <RatingReadOnly rating={getAvgRecipeRating(recipe._count, recipe.reviews)} showValue={true} />
                    <NumbersInfo {...recipe} />
                    <Button
                        content={'Add'}
                        variant='accent'
                        onClick={() => setIsModalOpen(true)}
                    />
                </article>

                <div>
                    <Image
                        src={placeholder}
                        alt='/dd'
                        layout='fixed'
                        height={300}
                        width={300}
                    />
                </div>
            </section>
            <Divider />
        </div>
    )
}

export default Overview