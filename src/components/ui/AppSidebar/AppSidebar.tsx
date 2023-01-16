import { signIn, useSession } from 'next-auth/react'
import Avatar from '../../common/Avatar'
import Logo from './Logo'
import Menu from './Menu'

const AppSidebar = () => {
    const handleSignIn = () => {
        void signIn('discord')
    }

    const { data: session } = useSession()

    return (
        <aside className={`transition-all overflow-x-hidden duration-500 ease flex flex-col pt-16 h-screen shadow-gray-300 shadow-xl z-50`}>
            <Logo />
            <button onClick={handleSignIn} className='mx-auto w-fit'>
                <Avatar src={session?.user?.image} />
            </button>
            <Menu />
        </aside>
    )
}

export default AppSidebar