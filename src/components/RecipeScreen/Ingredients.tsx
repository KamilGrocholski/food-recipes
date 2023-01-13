import type { Recipe_GetOneById_Output } from "../../types/trpcTypeInfer"

const Ingredients: React.FC<Pick<Recipe_GetOneById_Output, 'ingredients'>> = ({
    ingredients
}) => {
    return (
        <section className='prose'>
            <h2>Ingredients</h2>
            <ul className='flex flex-col'>
                {ingredients.map((ingredient, i) => (
                    <p key={i} className='flex flex-row items-center space-x-1'>
                        <span>{ingredient.amount}</span>
                        <span>{ingredient.unit}</span>
                        <span><b>{ingredient.name}</b></span>
                    </p>
                ))}
            </ul>
        </section>
    )
}

export default Ingredients