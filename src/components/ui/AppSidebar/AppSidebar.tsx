import { signOut } from 'next-auth/react'
import Avatar from '../../common/Avatar'
import Button from '../../common/Button'
import Divider from '../../common/Divider'
import SessionStateWrapper from '../../common/SessionStateWrapper'
import InfoBottom from './InfoBottom'
import Logo from './Logo'
import Menu from './Menu'

const AppSidebar = () => {

    const handleSignOut = () => {
        void signOut()
    }

    return (
        <aside className={`relative transition-all w-64 overflow-x-hidden duration-500 ease flex flex-col pt-16 h-screen shadow-gray-300 shadow-xl z-50`}>
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
    )
}

export default AppSidebar