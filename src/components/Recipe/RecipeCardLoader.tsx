const RecipeCardLoader = () => {
    return (
        <div className='flex flex-col space-y-2'>
            <div className='rounded-md min-h-[320px] loading-template'></div>
            <div className='flex flex-row space-x-3 h-12 w-full'>
                <div className='loading-template h-full w-[80%]'></div>
                <div className='loading-template h-full w-[20%]'></div>
            </div>
        </div>
    )
}

export default RecipeCardLoader