import Link from "next/link"
import FoldersList from "../../Folder/FoldersList"
import config from "./config"

const Menu = () => {

    return (
        <section className='w-max flex-col space-y-3 overflow-x-hidden overflow-y-scroll'>
            <div className='menu menu-compact bg-base-100 w-full p-2'>
                {config.links.map((link, i) => (
                    <li key={i}>
                        <Link href={link.href}>
                            <span className='text-md'>{link.label}</span>
                        </Link>
                    </li>
                ))}
            </div>
            <FoldersList />
        </section>
    )
}

export default Menu