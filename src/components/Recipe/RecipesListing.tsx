import { type RecipePublicQueryOutput } from "../../server/api/routers/recipe"
import RecipeCard from "./RecipeCard"

const RecipesListing: React.FC<{
    recipes: RecipePublicQueryOutput[],
    options?: {
        withRemoveModal: boolean
        withRemoveFromFolderModal: boolean
    }
}> = ({ recipes, options }) => {
    return (
        <section className='recipes-listing'>

            {/* <div className='flex flex-wrap mx-auto w-fit gap-3'> */}
            {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} options={options} />
            ))}
        </section>
    )
}

export default RecipesListing