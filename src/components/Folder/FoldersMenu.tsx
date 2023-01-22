import { useState } from "react"
import { Icons } from "../../assets/icons"
import { useToastControls } from "../../hooks/useToastControls"
import { api } from "../../utils/api"
// import Button from "../common/Button"
import Input from "../common/Input"
import StateWrapper from "../common/StateWrapper"
import FoldersListing from "./FoldersListing"

const FoldersMenu = () => {
    const { show } = useToastControls()

    const utils = api.useContext()

    const foldersQuery = api.folder.getAllByCurrentUserId.useQuery()
    const folderCreateMutation = api.folder.create.useMutation({
        onSuccess: () => {
            setNewName('')
            show('folder-creation-success')
            void utils.folder.getAllByCurrentUserId.invalidate()
        },
        onError: () => {
            show('folder-creation-error')
        }
    })

    // const handleCreateFolder = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.nativeEvent.preventDefault()
    //     e.preventDefault()
    //     folderCreateMutation.mutate({
    //         name: newName
    //     })
    // }

    const [newName, setNewName] = useState<string>('')
    const [isCreating, setIsCreating] = useState<boolean>(false)

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            folderCreateMutation.mutate({
                name: newName
            })
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
                        onKeyDown={handleOnKeyDown}
                        onBlur={() => setIsCreating(false)}
                        disabled={folderCreateMutation.isLoading}
                    /> :
                    <button onClick={() => setIsCreating(true)} className='flex flex-row space-x-3 text-lg lg:text-sm items-center text-primary'>
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