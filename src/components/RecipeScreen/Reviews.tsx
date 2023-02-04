import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { type SubmitHandler, type SubmitErrorHandler, useForm, Controller } from "react-hook-form"
import { type ReviewSchema, reviewSchema } from "../../server/schema/recipe.schema"
import type { Recipe_GetOneById_Output } from "../../types/trpcTypeInfer"
import { api } from "../../utils/api"
import { parseDate } from "../../utils/parseDate"
import Avatar from "../common/Avatar"
import Button from "../common/Button"
import Divider from "../common/Divider"
import TextArea from "../common/TextArea"
import RatingReadOnly from "./Rating"
import { StarRating } from "./Rating"

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
                {reviews.map((review) => (
                    <div key={review.id}>
                        <div className='flex flex-row space-x-2'>
                            <Avatar src={review.author.image} />
                            <div className='flex flex-col space-y-3'>
                                <div>
                                    <div className='flex flex-row space-x-3'>
                                        <span>{review.author.name}</span>
                                        <span>{parseDate(review.createdAt)}</span>
                                    </div>
                                    <RatingReadOnly rating={review.rating} showValue={false} />
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
    const addReviewMutation = api.recipe.addReview.useMutation()

    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm<ReviewSchema>({
        resolver: zodResolver(reviewSchema),
        mode: 'onSubmit',
        shouldFocusError: false,
    })


    const { data: session } = useSession()

    const handleOnValid: SubmitHandler<ReviewSchema> = (data, e) => {
        e?.preventDefault()
        addReviewMutation.mutate({
            comment: data.comment,
            rating: data.rating,
            recipeId: id
        })
    }

    const handleOnError: SubmitErrorHandler<ReviewSchema> = (data, e) => {
        e?.preventDefault()
        console.error({ data })
    }

    return (
        <div>
            <Divider />
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form onSubmit={handleSubmit(handleOnValid, handleOnError)} className='flex flex-col space-y-3'>
                <div className='flex flex-row space-x-3'>
                    <Avatar src={session?.user?.image} />
                    <div className='w-full'>
                        <Controller
                            control={control}
                            name='rating'
                            render={({ field }) => <StarRating value={field.value} stars={5} onChange={field.onChange} />}
                        />
                        <TextArea
                            placeholder={'Comment'}
                            border={false}
                            inputSize='lg'
                            {...register('comment')}
                            errorMessage={errors.comment?.message}
                        />
                    </div>
                </div>
                <Button
                    type='submit'
                    content={'Add Review'}
                    className='w-fit self-end'
                />
            </form>
            <Divider />
        </div>
    )
}