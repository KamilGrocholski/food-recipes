import { useRouter } from "next/router"
import { useState } from "react"
import useUi from "../../store/ui.store"
import { api } from "../../utils/api"
import LiveSearch from "../common/LiveSearch"
import Modal from "../common/Modal"

interface SearchModalProps {
    isOpen: boolean
    close: () => void
}

const SearchModal: React.FC<SearchModalProps> = ({
    isOpen,
    close
}) => {
    const [query, setQuery] = useState('')
    const router = useRouter()

    const setIsSearchModalOpen = useUi(state => state.setIsSearchModalOpen)

    const getTagsQuery = api.recipe.getTags.useQuery({ query })


    return (
        <Modal
            isOpen={isOpen}
            close={close}
            title='What do you want to find?'
            description="Type anything and see the results"
        >
            <LiveSearch<{ name: string }>
                containerClassNames='flex flex-col space-y-2 bg-base-200 my-3 p-2 justify-start items-start overflow-y-scroll max-h-72'
                renderSuggestion={(item) =>
                    <div
                        className={`break-words text-sm hover:bg-primary/40 cursor-pointer px-1 ${item.isSelected ? 'bg-primary/40' : ''}`}
                    >
                        {item.suggestion.name}
                    </div>
                }
                extractQuery={(value) => value.name}
                onSearchExact={(searchValue) => {
                    void router.push(`/recipes/tags/${searchValue.name}`)
                    void setIsSearchModalOpen(false)
                }}
                onSearchLike={(searchLikeValue) => {
                    void router.push(`/recipes/tags/${searchLikeValue}`)
                    void setIsSearchModalOpen(false)
                }}
                fetchSuggestions={async (query) => {
                    setQuery(query)
                    return (await getTagsQuery.refetch()).data ?? []
                }}
            />
        </Modal>
    )
}

export default SearchModal