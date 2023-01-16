import { useSession } from "next-auth/react"
import { useState } from "react"
import type { Recipe_GetOneById_Output } from "../../types/trpcTypeInfer"
import { api } from "../../utils/api"
import { parseDate } from "../../utils/parseDate"
import Avatar from "../common/Avatar"
import Button from "../common/Button"
import Divider from "../common/Divider"
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
            <div className='flex flex-col space-y-16'>
                {reviews.map((review, i) => (
                    <div key={i}>
                        <div className='flex flex-row space-x-2'>
                            <Avatar src={review.author.image} />
                            <div className='flex flex-col space-y-3'>
                                <div>
                                    <div className='flex flex-row space-x-3'>
                                        <span>{review.author.name}</span>
                                        <span>{parseDate(review.createdAt)}</span>
                                    </div>
                                    <Rating _count={_count} reviews={reviews} />
                                </div>
                                <div>
                                    {review.comment}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
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

    const { data: session } = useSession()

    return (
        <div>
            <Divider />
            <form onSubmit={handleAddReview} className='flex flex-col space-y-3'>
                <div className='flex flex-row space-x-3'>
                    <Avatar src={session?.user?.image} />
                    <div className='w-full'>
                        <textarea
                            className="textarea w-full"
                            placeholder="Comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                </div>
                <Button
                    type='submit'
                    content={'Add Review'}
                    variant='primary'
                    className='w-fit self-end'
                />
            </form>
            <Divider />
        </div>
    )
}