import useUi from "../../store/ui.store"

const DecoratingSearchInput = () => {
    const setIsSearchModalOpen = useUi(state => state.setIsSearchModalOpen)

    return (
        <div className="my-12">
            <div className="container flex justify-center items-center px-4 sm:px-6 lg:px-8">
                <div className="relative">
                    <button
                        onClick={() => setIsSearchModalOpen(true)}
                        className="bg-base-200 h-14 w-96 pr-8 pl-5 text-gray-400 text-start rounded z-0 focus:shadow focus:outline-none"
                    >
                        Search anything..</button>
                    <div className="absolute top-4 right-3">
                        <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DecoratingSearchInput