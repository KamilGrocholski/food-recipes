import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import type { Recipe_GetOneById_Output } from "../../types/trpcTypeInfer"
import Button from '../common/Button'
import Divider from '../common/Divider'
import AddToRecipeToFolderModal from '../Folder/AddToRecipeToFolderModal'
import NumbersInfo from './NumbersInfo'
import RatingReadOnly, { getAvgRecipeRating } from './Rating'
import { Icons } from '../../assets/icons'
import Logo from '../ui/AppSidebar/Logo'

const Overview: React.FC<Recipe_GetOneById_Output> = (recipe) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className='mx-auto max-w-[768px] w-full'>
            <AddToRecipeToFolderModal
                isOpen={isModalOpen}
                close={() => setIsModalOpen(false)}
                title={recipe.title}
                image={recipe.image}
                recipeId={recipe.id}
            />
            <section className='flex flex-col lg:flex-row w-full justify-between'>
                <article className='flex flex-col space-y-3 prose'>
                    <h1>{recipe.title}</h1>
                    <div className='flex flex-row items-center divide-x'>
                        <RatingReadOnly rating={getAvgRecipeRating(recipe._count, recipe.reviews)} showValue={true} />
                        <div className='flex flex-row items-center space-x-2 font-semibold text-lg pl-3 ml-3'>
                            <span className='text-secondary'>{Icons.eye}</span>
                            <span>{recipe.views}</span>
                        </div>
                    </div>
                    <NumbersInfo {...recipe} />
                    <Button
                        content={<div className='flex flex-row space-x-1 items-center'><span>{Icons.plus}</span> <span>Add to Collection</span></div>}
                        onClick={() => setIsModalOpen(true)}
                    />
                </article>

                <div>
                    <Image
                        src={recipe.image}
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