import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { convertFileToBase64 } from '../../utils/fileConverting'

interface ImageUploaderProps {
    storeImageFn: (url: string) => void
    image: string | undefined
    maxSize?: number
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
    storeImageFn,
    image,
    maxSize
}) => {
    const inputFileRef = useRef<HTMLInputElement | null>(null)

    const [isMaxSize, setIsMaxSize] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const handleSetFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsMaxSize(false)
        e.preventDefault()
        e.stopPropagation()
        const filesList = e.currentTarget.files
        const file = filesList && filesList.length >= 1 ? filesList[0] : undefined
        if (!file) return
        if (maxSize && file.size > maxSize) {
            setIsMaxSize(true)
            return
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
        storeImageFn(await convertFileToBase64(file))
    }

    // const handleChooseFile = (e: React.MouseEvent<HTMLInputElement>) => {
    //     e.preventDefault()
    //     if (!inputFileRef.current) {
    //         console.error("Couldn't invoke `handleChooseFile`")
    //         throw new Error()
    //     }
    //     inputFileRef.current.click()
    // }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col space-y-1 w-min'>
            {image ?
                (<Image
                    src={image}
                    alt='image'
                    layout='fixed'
                    width={300}
                    height={200}
                />) : null}
            {isMaxSize === true ?
                <p className='text-error'>The image is too big.</p> : null}
            <input
                className="file-input w-max"
                ref={inputFileRef}
                type='file'
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onChange={handleSetFile}
                accept="image/*"
            />
            {/* <button
                onClick={handleChooseFile}
                className='px-2 py-1 w-max border border-1 border-black'
            >
                Choose a file
            </button> */}
        </form>
    )
}

export default ImageUploader