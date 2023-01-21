import { useRouter } from "next/router"
import { useState } from "react"
import useWindowSize from "../../../hooks/useWindowSize"
import { api } from "../../../utils/api"
import LiveSearch from "../../common/LiveSearch"
import AppContentFooter from "./AppContentFooter"
import AppContentHeader from "./AppContentHeader"

const AppContent: React.FC<{ children: JSX.Element | JSX.Element[], useContainer: boolean }> = ({ children, useContainer }) => {
    const { width } = useWindowSize()

    const [query, setQuery] = useState('')

    const getTitlesQuery = api.recipe.getTitles.useQuery({ query })

    const router = useRouter()

    return (
        <div className='flex flex-col max-h-screen mx-auto h-full w-full z-0'>
            <div className='scrollbar scrollbar-thumb-primary min-h-screen overflow-y-scroll overflow-x-hidden'>
                {width >= 1024 ? <div className='mb-12' /> : <AppContentHeader />}
                <div className='mx-auto w-fit mb-12'>
                    <LiveSearch<{ title: string, id: number }>
                        containerClassNames='flex flex-col space-y-3 bg-base-200 absolute top-full min-w-[720px]'
                        renderSuggestion={(item) =>
                            <div
                                className={`break-words hover:bg-primary cursor-pointer  ${item.isSelected ? 'bg-primary' : ''}`}
                            >
                                {item.suggestion.title}
                            </div>
                        }
                        extractQuery={(value) => value.title}
                        onSearch={(searchValue) => void router.push(`/recipes/${searchValue.id}`)}
                        fetchSuggestions={async (query) => {
                            setQuery(query)
                            return (await getTitlesQuery.refetch()).data ?? []
                        }}
                    />
                </div>
                <div className={`min-h-screen ${useContainer ? 'container mx-auto' : ''}`}>
                    {children}
                </div>
                <AppContentFooter />
            </div>
        </div>
    )
}

export default AppContent