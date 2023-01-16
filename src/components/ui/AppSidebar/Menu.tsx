import Link from "next/link"
import config from "./config"

const Menu = () => {

    return (
        <section className='menu menu-compact bg-base-100 w-64 p-2'>
            {config.links.map((link, i) => (
                <li key={i}>
                    <Link href={link.href}>
                        <span className='text-md'>{link.label}</span>
                    </Link>
                </li>
            ))}
        </section>
    )
}

export default Menu