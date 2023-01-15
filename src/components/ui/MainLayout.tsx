import AppContent from "./AppContent/AppContent"
import AppSidebar from "./AppSidebar/AppSidebar"

const MainLayout: React.FC<{
    children: JSX.Element | JSX.Element[]
    useContainer: boolean
}> = ({
    children,
    useContainer
}) => {

        return (
            // <div className='absolute w-full'>
            <div className='flex flex-row w-full'>
                <AppSidebar />
                <AppContent useContainer={useContainer}>
                    {children}
                </AppContent>
            </div>
            // </div>
        )
    }

export default MainLayout