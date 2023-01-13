import React from 'react'
import useUi from '../../store/ui.store'
import Logo from './Logo'
import Menu from './Menu'

const AppSidebar = () => {
    const isSideNavOpen = useUi(state => state.isSideNavOpen)
    const setIsSideNavOpen = useUi(state => state.setIsSideNavOpen)

    return (
        <aside className={`transition-all overflow-x-hidden duration-500 ease flex flex-col h-screen shadow-gray-300 shadow-xl z-50 ${isSideNavOpen ? 'w-[278px]' : 'w-[72px]'}`}>
            <button className='z-50 h-12 bg-red-500' onClick={() => setIsSideNavOpen(!isSideNavOpen)}>SDSAD</button>
            <Logo />
            <Menu />
        </aside>
    )
}

export default AppSidebar