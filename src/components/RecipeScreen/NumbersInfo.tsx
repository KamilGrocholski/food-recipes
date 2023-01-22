import { type RecipePublicQueryOutput } from "../../server/api/routers/recipe"

const NumbersInfo: React.FC<Pick<RecipePublicQueryOutput, '_count' | 'cookTimeInMin' | 'prepTimeInMin'>> = ({
    _count,
    cookTimeInMin,
    prepTimeInMin
}) => {
    return (
        <div className="stats stats-horizontal shadow w-full">

            <div className="stat">
                <div className="stat-value text-center">{_count.ingredients}</div>
                <div className='stat-desc'>Ingredients</div>
            </div>

            <div className="stat">
                <div className="stat-value text-center">{prepTimeInMin}</div>
                <div className='stat-desc'>Prep time</div>
            </div>

            <div className="stat">
                <div className="stat-value text-center">{cookTimeInMin}</div>
                <div className='stat-desc'>Cook time</div>
            </div>

        </div>
    )
}

export default NumbersInfo