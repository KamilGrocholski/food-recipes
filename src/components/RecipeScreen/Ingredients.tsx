import { type RecipePublicQueryOutput } from "../../server/api/routers/recipe"

const Ingredients: React.FC<{
    ingredients: RecipePublicQueryOutput['ingredients']
}> = ({
    ingredients
}) => {
        return (
            <section className='prose'>
                <h2>Ingredients</h2>
                <ul className='list-disc'>
                    {ingredients.map((ingredient, i) => (
                        <li key={i}>
                            {ingredient.description}
                        </li>
                    ))}
                </ul>
            </section>
        )
    }

export default Ingredients