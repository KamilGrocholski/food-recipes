import Image from 'next/image'
import placeholder from '../../assets/placeholder.jpg'
import type { Recipe_GetOneById_Output } from "../../types/trpcTypeInfer"
import Divider from '../common/Divider'
import NumbersInfo from './NumbersInfo'
import Rating from './Rating'

const Overview: React.FC<Recipe_GetOneById_Output> = (recipe) => {
    return (
        <div className='mx-auto max-w-[768px] w-full'>
            <section className='flex flex-row w-full justify-between'>
                <article className='flex flex-col prose'>
                    <h1>{recipe.title}</h1>
                    <Rating {...recipe} />
                    <NumbersInfo {...recipe} />
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