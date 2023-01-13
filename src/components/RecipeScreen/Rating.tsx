import type { Recipe_GetOneById_Output } from "../../types/trpcTypeInfer"

const Rating: React.FC<Pick<Recipe_GetOneById_Output, 'reviews' | '_count'>> = ({
    _count,
    reviews
}) => {
    return (
        <div className="rating">
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
        </div>
    )
}

export default Rating