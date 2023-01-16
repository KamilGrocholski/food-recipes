import Image from "next/image"

const Avatar: React.FC<{ src: string | undefined | null }> = ({
    src
}) => {
    return (
        <div>
            <Image
                src={src ?? ''}
                alt='w'
                layout="fixed"
                width={60}
                height={60}
                className='rounded-full'
            />
        </div>
    )
}

export default Avatar