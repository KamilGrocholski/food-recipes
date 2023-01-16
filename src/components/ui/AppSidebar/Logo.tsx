import logo from '../../../assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
    return (
        <div className='mx-auto w-fit'>
            <Link href='/'>
                <Image
                    src={logo}
                    alt='logo'
                    layout='fixed'
                    width={70}
                    height={70}
                />
            </Link>
        </div>
    )
}

export default Logo