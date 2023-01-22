import type { Recipe_GetOneById_Output } from '../../types/trpcTypeInfer'
import Description from './Description'
import Ingredients from './Ingredients'
import Instructions from './Instructions'
import Reviews from './Reviews'
import Tags from './Tags'

const Details: React.FC<Recipe_GetOneById_Output> = (recipe) => {
    return (
        <div className='mx-auto max-w-[760px] w-full mt-20'>
            <div className='flex flex-col w-full justify-start space-y-12'>
                <Description description={recipe.description} />
                <Ingredients {...recipe} />
                <Instructions {...recipe} />
                <Tags {...recipe} />
                <Reviews {...recipe} />
            </div>
        </div>
    )
}

export default Details