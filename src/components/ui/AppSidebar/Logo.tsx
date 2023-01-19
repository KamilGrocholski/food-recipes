import logo from '../../../assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
    return (
        <div className='mx-auto w-fit'>
            <Link href='/'>
                <div className='w-42 h-42 overflow-hidden items-center flex flex-col'>
                    <Image
                        src={logo}
                        alt='logo'
                        layout='fixed'
                        width={170}
                        height={170}
                    />
                    <span className='text-secondary font-semibold text-2xl'>Recipes</span>
                </div>
            </Link>
        </div>
    )
}

export default Logo