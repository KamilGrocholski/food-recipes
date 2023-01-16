import { signIn, signOut, useSession } from 'next-auth/react'
import Avatar from '../../common/Avatar'
import InfoBottom from './InfoBottom'
import Logo from './Logo'
import Menu from './Menu'

const AppSidebar = () => {
    const handleSignIn = () => {
        void signIn('discord')
    }

    const handleSignOut = () => {
        void signOut()
    }

    const { data: session } = useSession()

    return (
        <aside className={`px-3 transition-all overflow-x-hidden duration-500 ease flex flex-col pt-16 h-screen shadow-gray-300 shadow-xl z-50`}>
            <Logo />
            {session?.user?.id ?
                <button onClick={handleSignOut} className='mx-auto w-fit'>
                    <Avatar src={session?.user?.image} />
                </button>
                : <button onClick={handleSignIn} className='mx-auto w-fit'>
                    Sign in
                </button>}
            <Menu />
            <InfoBottom />
        </aside>
    )
}

export default AppSidebar