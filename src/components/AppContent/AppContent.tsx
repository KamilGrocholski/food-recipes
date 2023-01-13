import AppContentFooter from "./AppContentFooter"
import AppContentHeader from "./AppContentHeader"

const AppContent: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
    return (
        <div className='flex flex-col max-h-screen mx-auto h-full w-full z-0'>
            <div className='min-h-screen overflow-y-scroll overflow-x-hidden'>
                <AppContentHeader />
                {children}
                <AppContentFooter />
            </div>
        </div>
    )
}

export default AppContent