import Link from "next/link"
import Divider from "../../common/Divider"
import FoldersMenu from "../../Folder/FoldersMenu"
import config from "./config"

const Menu = () => {

    return (
        <section className='w-max flex-col space-y-3 overflow-x-hidden overflow-y-scroll'>
            <div className='menu menu-compact bg-base-100 w-full mt-5'>
                {config.links.map((link, i) => (
                    <li key={i}>
                        <Link href={link.href}>
                            <span className='text-sm text-gray-500'>{link.label}</span>
                        </Link>
                    </li>
                ))}
            </div>
            <Divider />
            <FoldersMenu />
        </section>
    )
}

export default Menu