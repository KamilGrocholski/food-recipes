import { useState } from "react"
import { Icons } from "../../assets/icons"
import { api } from "../../utils/api"
import Input from "../common/Input"
import StateWrapper from "../common/StateWrapper"
import FoldersListing from "./FoldersListing"

const FoldersMenu = () => {
    const utils = api.useContext()

    const foldersQuery = api.folder.getAllByCurrentUserId.useQuery()
    const folderCreateMutation = api.folder.create.useMutation({
        onSuccess: () => {
            setNewName('')
            void utils.folder.getAllByCurrentUserId.invalidate()
        }
    })

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
        <div className='flex flex-col space-y-2 px-3'>
            <div>
                {isCreating ?
                    <Input
                        autoFocus
                        placeholder="Collection name"
                        value={newName ?? ''}
                        onChange={e => setNewName(e.target.value)}
                        inputSize='xs'
                        variant='primary'
                        className='w-fit'
                        onKeyDown={handleOnKeyDown}
                        onBlur={() => setIsCreating(false)}
                    /> :
                    <button onClick={() => setIsCreating(true)} className='flex flex-row space-x-3 text-sm items-center text-primary'>
                        <div>{Icons.plus}</div>
                        <div>New collection</div>
                    </button>}
            </div>
            <StateWrapper
                data={foldersQuery.data}
                isLoading={foldersQuery.isLoading}
                isError={foldersQuery.isError}
                Empty={<div className='text-gray-400 text-sm'>You have no collections.</div>}
                NonEmpty={(folders) => <FoldersListing folders={folders} />}
            />
        </div>
    )
}

export default FoldersMenu