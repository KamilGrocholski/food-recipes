import { type RecipePublicQueryOutput } from "../../server/api/routers/recipe"

const NumbersInfo: React.FC<Pick<RecipePublicQueryOutput, '_count' | 'cookTimeInMin' | 'prepTimeInMin'>> = ({
    _count,
    cookTimeInMin,
    prepTimeInMin
}) => {
    return (
        <div className="stats stats-vertical lg:stats-horizontal shadow">

            <div className="stat">
                <div className="stat-value text-center">{_count.ingredients}</div>
                <div className='stat-desc'>Ingredients</div>
            </div>

            <div className="stat">
                <div className="stat-value text-center">{prepTimeInMin + cookTimeInMin}</div>
                <div className='stat-desc'>Minutes</div>
            </div>

        </div>
    )
}

export default NumbersInfo