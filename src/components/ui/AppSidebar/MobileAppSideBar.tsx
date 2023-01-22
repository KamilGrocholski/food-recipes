import { signOut } from 'next-auth/react'
import React, { useRef } from 'react'
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import useUi from '../../../store/ui.store'
import Avatar from '../../common/Avatar'
import Button from '../../common/Button'
import Divider from '../../common/Divider'
import SessionStateWrapper from '../../common/SessionStateWrapper'
import InfoBottom from './InfoBottom'
import Logo from './Logo'
import Menu from './Menu'
import BackgroundFillerModal from '../../common/BackgroundFillerModal'

const MobileAppSideBar = () => {
    const isSideNavOpen = useUi(state => state.isSideNavOpen)
    const setIsSideNavOpen = useUi(state => state.setIsSideNavOpen)

    const ref = useRef<HTMLElement>(null)
    useOnClickOutside(ref, () => setIsSideNavOpen(false))

    const handleSignOut = () => {
        void signOut()
    }


    return (
        <>
            <BackgroundFillerModal isOpen={isSideNavOpen} close={() => ({})} />
            <aside ref={ref} className={`fixed w-64 top-0 bottom-0 bg-white z-50 transition-all no-scrollbar overflow-x-hidden duration-500 pt-16 ease flex flex-col h-screen shadow-gray-300 shadow-xl ${isSideNavOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <Logo />
                <Divider />
                <SessionStateWrapper
                    LoggedIn={(session) => <>
                        <button onClick={handleSignOut} className='mx-auto w-fit'>
                            <Avatar src={session.data?.user?.image} />
                        </button>
                    </>}
                    NotLoggedIn={(signIn) => <>
                        <Button
                            content='Sign in'
                            onClick={signIn}
                            className='mx-auto'
                        />
                    </>}
                />
                <Menu />
                <InfoBottom />
            </aside>
        </>
    )
}

export default MobileAppSideBar