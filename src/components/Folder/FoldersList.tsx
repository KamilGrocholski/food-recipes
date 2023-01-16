import type { Folder } from "@prisma/client"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { Icons } from "../../assets/icons"
import { api } from "../../utils/api"
import Input from "../common/Input"
import StateWrapper from "../common/StateWrapper"

const FoldersList = () => {
    const utils = api.useContext()

    const foldersQuery = api.folder.getAllByCurrentUserId.useQuery()
    const folderCreateMutation = api.folder.create.useMutation({
        onSuccess: () => {
            setNewName('')
            void utils.folder.getAllByCurrentUserId.invalidate()
        }
    })
    const router = useRouter()

    const handleOpenFolder = (folderId: Folder['id']) => {
        void router.push(`/folders/${folderId}`)
    }

    const handleCreateFolder = () => {
        folderCreateMutation.mutate({
            name: newName
        })
    }


    const [newName, setNewName] = useState<string>('')
    const [isCreating, setIsCreating] = useState<boolean>(false)

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCreateFolder()
        }
        if (e.key === 'Escape') {
            setIsCreating(false)
        }
    }

    return (
        <div className='flex flex-col space-y-2'>
            <div>
                {isCreating ?
                    <Input
                        autoFocus
                        placeholder="Collection name"
                        value={newName ?? ''}
                        onChange={e => setNewName(e.target.value)}
                        inputSize='sm'
                        variant='accent'
                        onKeyDown={handleOnKeyDown}
                        onBlur={() => setIsCreating(false)}
                    /> :
                    <button onClick={() => setIsCreating(true)} className='flex flex-row space-x-3 text-primary'>
                        <div>{Icons.plus}</div>
                        <div>New collection</div>
                    </button>}
            </div>
            <StateWrapper
                data={foldersQuery.data}
                isLoading={foldersQuery.isLoading}
                isError={foldersQuery.isError}
                NonEmpty={(folders) =>
                    <div>
                        <div className='menu menu-compact bg-base-100'>
                            {folders.map((folder, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleOpenFolder(folder.id)}
                                    className='flex flex-row space-x-3 group'
                                >
                                    <div>
                                        <div className='group-hover:text-primary transition-all duration-200 ease'>{Icons.folder}</div>
                                        <div>{folder.name}</div>
                                    </div>
                                </li>
                            ))}
                        </div>
                    </div>
                }
            />
        </div>
    )
}

export default FoldersList