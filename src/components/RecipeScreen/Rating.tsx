import React, { useState } from "react"
import { type RecipePublicQueryOutput } from "../../server/api/routers/recipe"

const RatingReadOnly: React.FC<{ rating: number, showValue: boolean }> = ({
    rating,
    showValue
}) => {

    return (
        <div className='flex flex-row items-center'>
            <StarRating value={rating} stars={5} readOnly />
            {showValue ? <span className='text-lg'>({rating})</span> : null}
        </div>
    )
}

export default RatingReadOnly


export const getAvgRecipeRating = (_count: RecipePublicQueryOutput['_count'], reviews: RecipePublicQueryOutput['reviews']) => {
    if (reviews.length === 0) return 0
    const avg = reviews.reduce((acc, curr) => curr.rating + acc, 0) / _count.reviews
    return Math.round(avg * 2) / 2
}

interface StartRatingProps {
    value: number
    onChange?: (value: number) => void
    readOnly?: boolean
    stars: number
}

export const StarRating: React.FC<StartRatingProps> = ({
    value,
    onChange,
    readOnly,
    stars,
}) => {
    const [hover, setHover] = useState(0)

    return (
        <div>
            {[...Array.from({ length: stars })].map((_, index) => (
                <button
                    key={index}
                    type='button'
                    onClick={() => !readOnly && onChange && onChange(index + 1)}
                    onMouseEnter={() => !readOnly && setHover(index + 1)}
                    onMouseLeave={() => !readOnly && setHover(value)}
                >
                    <div className={`text-3xl ${index + 1 <= (hover || value) ? 'text-yellow-500' : 'text-gray-500'}`}>
                        &#9733;
                    </div>
                </button>
            ))}
        </div>
    )
}