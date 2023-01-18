import RecipeListingLoader from "../Recipe/RecipeListingLoader"

const FolderScreenLoader = () => {
    return (
        <div>
            <div className='h-16 mb-24 loading-template'></div>
            <RecipeListingLoader />
        </div>
    )
}

export default FolderScreenLoader