import { useState } from "react"
import { type RecipePublicQueryOutput } from "../../server/api/routers/recipe"

const Rating: React.FC<Pick<RecipePublicQueryOutput, '_count' | 'reviews'>> = ({
    _count,
    reviews
}) => {
    const [avg] = useState(getAvgRecipeRating(_count, reviews))

    return (
        <div className='flex flex-row items-center'>
            <div className="rating rating-half rating-lg">
                <div className="rating">
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                </div>
            </div>
            <span>({avg})</span>
        </div>
    )
}

export default Rating

const getAvgRecipeRating = (_count: RecipePublicQueryOutput['_count'], reviews: RecipePublicQueryOutput['reviews']) => {
    if (reviews.length === 0) return 0
    const avg = reviews.reduce((acc, curr) => curr.rating + acc, 0) / _count.reviews
    return Math.round(avg * 2) / 2
} 