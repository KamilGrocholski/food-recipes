import { type RecipePublicQueryOutput } from "../../server/api/routers/recipe"

const Instructions: React.FC<{
    instructions: RecipePublicQueryOutput['instructions']
}> = ({ instructions }) => {
    return (
        <section className='prose'>
            <h2>Instructions</h2>
            <ol className='list-decimal'>
                {instructions.map((instruction, i) => (
                    <li key={i}>
                        {instruction.description}
                    </li>
                ))}
            </ol>
        </section>
    )
}

export default Instructions