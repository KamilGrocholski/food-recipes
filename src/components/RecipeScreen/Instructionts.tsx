import type { Recipe_GetOneById_Output } from "../../types/trpcTypeInfer"

const Instructions: React.FC<Pick<Recipe_GetOneById_Output, 'instructions'>> = ({
    instructions
}) => {
    return (
        <section className='prose'>
            <h2>Instructions</h2>
            <ul className='flex flex-col'>
                {instructions.sort((a, b) => a.number - b.number).map((instruction, i) => (
                    <p key={i} className='flex flex-row items-center space-x-1'>
                        <div><span>{i + 1}.</span></div>
                        <div><span>{instruction.description}</span></div>
                    </p>
                ))}
            </ul>
        </section>
    )
}

export default Instructions