/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { v2 as cloudinary } from 'cloudinary'
import { env } from '../env/server.mjs'

cloudinary.config({ 
    cloud_name: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key: env.NEXT_PUBLIC_CLOUDINARY_PUBLIC_KEY, 
    api_secret: env.CLOUDINARY_SECRET_KEY,
    secure: true
})

export const uploadImage = async (url: string) => {
    return (await cloudinary.uploader.upload(url, {
        folder: env.CLOUDINARY_FOLDER_NAME
    }))
}

export const deleteImage = async (url: string) => {
    return await cloudinary.uploader.destroy(url, (result) => {
        return JSON.stringify(result)
    })
}