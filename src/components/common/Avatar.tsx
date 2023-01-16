import Image from "next/image"

const Avatar: React.FC<{ src: string | undefined | null }> = ({
    src
}) => {
    return (
        <div className="h-16 w-16">
            <Image
                src={src ?? ''}
                alt='w'
                layout="responsive"
                width={110}
                height={110}
                className='rounded-full'
            />
        </div>
    )
}

export default Avatar