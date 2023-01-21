import type { Recipe_GetOneById_Output } from '../../types/trpcTypeInfer'
import { api } from '../../utils/api'
import StateWrapper from '../common/StateWrapper'
import RecipesListing from '../Recipe/RecipesListing'
import Details from './Details'
import Overview from './Overview'

const RecipeScreen: React.FC<Recipe_GetOneById_Output> = (recipe) => {

    const getRecipesByUserIdQuery = api.recipe.getByUserId.useQuery({
        userId: recipe.author.id,
        take: 4
    })

    return (
        <div className='mx-3'>
            <Overview {...recipe} />
            <Details {...recipe} />
            <div className='prose mx-3 my-12'>
                <h2>More recipes from this user </h2>
            </div>
            <StateWrapper
                isLoading={getRecipesByUserIdQuery.isLoading}
                isError={getRecipesByUserIdQuery.isError}
                data={getRecipesByUserIdQuery.data}
                NonEmpty={(recipes) => <RecipesListing recipes={recipes} />}
            />
        </div>
    )
}

export default RecipeScreen