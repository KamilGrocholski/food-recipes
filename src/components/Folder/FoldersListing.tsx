import type { Folder } from "@prisma/client"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { Icons } from "../../assets/icons"
import { api } from "../../utils/api"
import Input from "../common/Input"
import StateWrapper from "../common/StateWrapper"

const FoldersListing: React.FC<{
    folders: {
        id: Folder['id']
        name: Folder['name']
    }[]
}> = ({
    folders
}) => {
        const router = useRouter()

        const handleOpenFolder = (folderId: Folder['id']) => {
            void router.push(`/folders/${folderId}`)
        }

        return (
            <div className='flex flex-col space-y-2'>
                {folders.map((folder, index) => (
                    <div
                        key={index}
                        onClick={() => handleOpenFolder(folder.id)}
                        className='group hover:cursor-pointer'
                    >
                        <div className='space-x-2 flex flex-row items-center text-xs text-gray-400'>
                            <div className='group-hover:text-primary transition-all duration-200 ease'>{Icons.folder}</div>
                            <div className='break-normal ...'>{folder.name}</div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

export default FoldersListing