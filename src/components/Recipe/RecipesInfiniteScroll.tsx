import { useEffect, useRef } from "react"
import useIntersectionObserver from "../../hooks/useIntersectionObserver"
import RecipeListingLoader from "./RecipeListingLoader"

interface Props {
    hasMore: boolean
    isFetching: boolean
    isError: boolean
    children?: JSX.Element | JSX.Element[]
    Loader?: React.ReactNode
    End?: React.ReactNode
    fetchMore: () => void,
}

const RecipesInfiniteScroll = ({
    hasMore,
    children,
    isFetching,
    fetchMore,
    End,
    Loader,
}: Props) => {
    const endContainerRef = useRef<HTMLDivElement | null>(null)
    const entry = useIntersectionObserver(endContainerRef, {
        threshold: 1
    })

    useEffect(() => {
        if (!!!entry?.isIntersecting) return
        fetchMore()
    }, [entry, entry?.isIntersecting, fetchMore])

    return (
        <div>
            {/* Data */}
            <div>
                {children}
            </div>

            {/* Loader  */}
            {isFetching ?
                <div>
                    {Loader ?? <RecipeListingLoader />}
                </div> : null}

            <div ref={endContainerRef} className='items-center flex justify-center w-full mx-auto bg-primary/30 min-h-12 mt-4'>
                {hasMore
                    ? null
                    : isFetching
                        ? null
                        : End ?? <span className='font-semibold '>No more recipes</span>}
            </div>

        </div>
    )
}

export default RecipesInfiniteScroll