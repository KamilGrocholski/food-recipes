import Link from "next/link"
import Divider from "../../common/Divider"
import SessionStateWrapper from "../../common/SessionStateWrapper"
import FoldersMenu from "../../Folder/FoldersMenu"
import config from "./config"

const Menu = () => {

    return (
        <section className='w-full flex-col space-y-3 overflow-y-scroll no-scrollbar'>
            <div className='menu menu-compact bg-base-100 w-full mt-5'>
                {config.links.map((link) => (
                    <li key={link.label} className='group transition-all ease-in-out duration-700'>
                        <Link href={link.href}>
                            <span className='text-lg lg:text-sm transition-all ease-in-out duration-700 text-gray-400 group-hover:text-primary'>{link.label}</span>
                        </Link>
                    </li>
                ))}
            </div>
            <Divider />
            <SessionStateWrapper
                LoggedIn={() => <FoldersMenu />}
                NotLoggedIn={() => <span className='text-lg lg:text-sm items-center text-primary pl-3'>Sign in to add a collection</span>}
            />
        </section>
    )
}

export default Menu