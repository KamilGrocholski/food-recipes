import { type RecipePublicQueryOutput } from "../../server/api/routers/recipe"

const Instructions: React.FC<{
    instructions: RecipePublicQueryOutput['instructions']
}> = ({ instructions }) => {
    return (
        <section className='prose'>
            <h2>Instructions</h2>
            <ul className='flex flex-col'>
                {instructions.map((instruction, i) => (
                    <div key={i} className='flex flex-row items-center space-x-1'>
                        <div><span>{i + 1}.</span></div>
                        <div><span>{instruction.description}</span></div>
                    </div>
                ))}
            </ul>
        </section>
    )
}

export default Instructions