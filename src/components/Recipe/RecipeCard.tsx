import Image from "next/image"
import Link from "next/link"
import { type RecipePublicQueryOutput } from "../../server/api/routers/recipe"
import placeholder from '../../assets/placeholder.jpg'
import { getAvgRecipeRating } from "../RecipeScreen/Rating"
import RatingReadOnly from "../RecipeScreen/Rating"

const RecipeCard: React.FC<{
    recipe: RecipePublicQueryOutput
}> = ({ recipe }) => {
    return (
        <div className='group'>
            <Link href={`recipes/${recipe.id}`}>
                <div className='relative overflow-hidden'>
                    <Image
                        // src={recipe.image}
                        src={placeholder}
                        alt='recipe image'
                        layout="responsive"
                        width={200}
                        height={200}
                    />
                    <div className='font-semibold p-3 justify-end flex flex-col space-y-2 bg-gradient-to-t from-black w-full text-white h-24 transition-all duration-300 ease-in-out absolute group-hover:-translate-y-full translate-y-0'>
                        <span>Cook time {recipe.cookTimeInMin}</span>
                        <span>Prep time {recipe.prepTimeInMin}</span>
                    </div>
                </div>
                <div className='my-3 flex flex-row justify-between'>
                    <div className='flex flex-col space-y-2'>
                        <div className='flex flex-col'>
                            <span className='transition-all duration-300 ease-in-out text-lg group-hover:text-primary'>{recipe.title}</span>
                            {/* <span className='text-sm text-gray-500 overflow-hidden truncate max-w-[200px]'>{recipe.description}</span> */}
                        </div>
                        <RatingReadOnly rating={getAvgRecipeRating(recipe._count, recipe.reviews)} showValue={false} />
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <div className='rounded-full overflow-hidden'>
                            <Image
                                src={placeholder}
                                alt='s'
                                layout='fixed'
                                width={40}
                                height={40}
                            />
                        </div>
                        <div>3132</div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default RecipeCard