import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <div>
            <Link href='/'>
                <span>Logo</span>
            </Link>
        </div>
    )
}

export default Logo