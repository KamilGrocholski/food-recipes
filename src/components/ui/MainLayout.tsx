import useWindowSize from "../../hooks/useWindowSize"
import AppContent from "./AppContent/AppContent"
import AppSidebar from "./AppSidebar/AppSidebar"
import MobileAppSideBar from "./AppSidebar/MobileAppSideBar"

const MainLayout: React.FC<{
    children: JSX.Element | JSX.Element[]
    useContainer: boolean
}> = ({
    children,
    useContainer
}) => {
        const { width } = useWindowSize()

        return (
            // <div className='absolute w-full'>
            <div className='flex flex-row w-full'>
                {width >= 1024 ? <AppSidebar /> : <MobileAppSideBar />}
                <AppContent useContainer={useContainer}>
                    {children}
                </AppContent>
            </div>
            // </div>
        )
    }

export default MainLayout