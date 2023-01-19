import { type RecipePublicQueryOutput } from "../../server/api/routers/recipe"
import RecipeCard from "./RecipeCard"

const RecipesListing: React.FC<{
    recipes: RecipePublicQueryOutput[]
}> = ({ recipes }) => {
    return (
        <section className='w-fit mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mx-3'>
                {/* <div className='flex flex-wrap mx-auto w-fit gap-3'> */}
                {recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                ))}
            </div>
        </section>
    )
}

export default RecipesListing