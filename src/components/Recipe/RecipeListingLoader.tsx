import RecipeCardLoader from "./RecipeCardLoader"

const RecipeListingLoader = () => {
    return (
        <section className='w-full mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 mx-3'>
                {[...Array.from({ length: 15 })].map((_, index) => (
                    <RecipeCardLoader key={index} />
                ))}
            </div>
        </section>
    )
}

export default RecipeListingLoader