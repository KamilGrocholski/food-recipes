import RecipeCardLoader from "./RecipeCardLoader"

const RecipeListingLoader: React.FC<{ items?: number }> = ({
    items = 16
}) => {
    return (
        <section className='recipes-listing'>
            {[...Array.from({ length: items })].map((_, index) => (
                <RecipeCardLoader key={index} />
            ))}
        </section>
    )
}

export default RecipeListingLoader