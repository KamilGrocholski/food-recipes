import useWindowSize from "../../../hooks/useWindowSize"
import useUi from "../../../store/ui.store"
import DecoratingSearchInput from "../../common/DecoratingSearchInput"
import SearchModal from "../../Recipe/SearchModal"
import AppContentFooter from "./AppContentFooter"
import AppContentHeader from "./AppContentHeader"

const AppContent: React.FC<{ children: JSX.Element | JSX.Element[], useContainer: boolean }> = ({ children, useContainer }) => {
    const { width } = useWindowSize()

    const isSearchModalOpen = useUi(state => state.isSearchModalOpen)
    const setIsSearchModalOpen = useUi(state => state.setIsSearchModalOpen)

    return (
        <div className='flex flex-col max-h-screen mx-auto h-full w-full z-0'>
            <SearchModal isOpen={isSearchModalOpen} close={() => setIsSearchModalOpen(false)} />
            <div className='scrollbar scrollbar-thumb-primary min-h-screen overflow-y-scroll overflow-x-hidden'>
                {width >= 1024 ? <DecoratingSearchInput /> : <AppContentHeader />}
                <div className={`min-h-screen ${useContainer ? 'container mx-auto' : ''}`}>
                    {children}
                </div>
                <AppContentFooter />
            </div>
        </div>
    )
}

export default AppContent