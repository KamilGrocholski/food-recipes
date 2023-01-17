import { useState } from 'react'
import type { Recipe_GetOneById_Output } from '../../types/trpcTypeInfer'
import Details from './Details'
import Overview from './Overview'

const RecipeScreen: React.FC<Recipe_GetOneById_Output> = (recipe) => {

    return (
        <div className='mx-3'>
            <Overview {...recipe} />
            <Details {...recipe} />
        </div>
    )
}

export default RecipeScreen