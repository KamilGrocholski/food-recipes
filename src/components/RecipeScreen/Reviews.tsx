import { useState } from "react"
import type { Recipe_GetOneById_Output } from "../../types/trpcTypeInfer"
import { api } from "../../utils/api"
import Divider from "./Divider"
import Rating from "./Rating"

const Reviews: React.FC<Pick<Recipe_GetOneById_Output, 'reviews' | 'id' | '_count'>> = ({
    reviews,
    id,
    _count
}) => {
    return (
        <section className='prose'>
            <h2>Reviews({_count.reviews})</h2>
            <ReviewCreation id={id} />
            <ul>
                {reviews.map((review, i) => (
                    <li key={i}>
                        <div>
                            <div>
                                <div className="avatar">
                                    <div className="w-24 rounded-full">
                                        <img src="https://placeimg.com/192/192/people" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='flex flex-row space-x-3'>
                                    <span>{'imie'}</span>
                                    <span>{review.createdAt.toString()}</span>
                                </div>
                                <div>
                                    <Rating reviews={reviews} _count={_count} />
                                </div>
                                <div>
                                    {review.comment}
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Reviews

const ReviewCreation: React.FC<Pick<Recipe_GetOneById_Output, 'id'>> = ({
    id
}) => {
    const [comment, setComment] = useState<string>('')
    const [rating, setRating] = useState<number>(5)
    const addReviewMutation = api.recipe.addReview.useMutation()

    const handleAddReview = (e: React.FormEvent) => {
        e.preventDefault()

        addReviewMutation.mutate({
            comment,
            recipeId: id,
            rating
        })
    }

    return (
        <div>
            <Divider />
            <form onSubmit={handleAddReview}>
                <textarea
                    className="textarea textarea-bordered"
                    placeholder="Bio"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button type='submit'>Add review</button>
            </form>
            <Divider />
        </div>
    )
}