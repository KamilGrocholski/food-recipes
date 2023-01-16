import { type RecipePublicQueryOutput } from "../../server/api/routers/recipe"

const Ingredients: React.FC<{
    ingredients: RecipePublicQueryOutput['ingredients']
}> = ({
    ingredients
}) => {
        return (
            <section className='prose'>
                <h2>Ingredients</h2>
                <ul className='flex flex-col'>
                    {ingredients.map((ingredient, i) => (
                        <p key={i} className='flex flex-row items-center space-x-1'>
                            <span>{ingredient.description}</span>
                        </p>
                    ))}
                </ul>
            </section>
        )
    }

export default Ingredients