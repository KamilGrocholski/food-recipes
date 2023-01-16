import { signIn, useSession } from 'next-auth/react'
import React, { useRef } from 'react'
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import useUi from '../../../store/ui.store'
import Avatar from '../../common/Avatar'
import Logo from './Logo'
import Menu from './Menu'

const MobileAppSideBar = () => {
    const isSideNavOpen = useUi(state => state.isSideNavOpen)
    const setIsSideNavOpen = useUi(state => state.setIsSideNavOpen)

    const ref = useRef<HTMLElement>(null)
    useOnClickOutside(ref, () => setIsSideNavOpen(false))

    const handleSignIn = () => {
        void signIn('discord')
    }

    const { data: session } = useSession()

    return (
        <aside ref={ref} className={`fixed top-0 bottom-0 bg-white z-50 transition-all overflow-x-hidden duration-500 pt-16 ease flex flex-col h-screen shadow-gray-300 shadow-xl ${isSideNavOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <button className='z-50 h-12 bg-red-500' onClick={() => setIsSideNavOpen(!isSideNavOpen)}>SDSAD</button>
            <button onClick={handleSignIn} className='mx-auto w-fit'>
                <Avatar src={session?.user?.image} />
            </button>
            <Logo />
            <Menu />
        </aside>
    )
}

export default MobileAppSideBar