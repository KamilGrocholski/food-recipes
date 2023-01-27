import { type Folder, type Recipe } from "@prisma/client"
import { useSession } from "next-auth/react"
import Image, { type StaticImageData } from "next/image"
import { useState } from "react"
import { useToastControls } from "../../hooks/useToastControls"
import { api } from "../../utils/api"
import Button from "../common/Button"
import MessageWithSignInButton from "../common/MessageWithSignInButton"
import Modal from "../common/Modal"
import SessionStateWrapper from "../common/SessionStateWrapper"
import StateWrapper from "../common/StateWrapper"

const AddToRecipeToFolderModal: React.FC<{
    isOpen: boolean
    close: () => void,
    image: string | StaticImageData
    title: string,
    recipeId: Recipe['id']
}> = ({
    isOpen,
    close,
    image,
    title,
    recipeId
}) => {

        const { show } = useToastControls()

        const utils = api.useContext()

        const { data: session } = useSession()

        const foldersQuery = api.folder.getAllByCurrentUserId.useQuery(undefined, {
            enabled: !!session?.user
        })

        const addToFoldersMutation = api.folder.addRecipeToFolders.useMutation({
            onSuccess: () => {
                close()
                void utils.folder.getAllByCurrentUserId.invalidate()
                show('recipe-to-folder-success')
            },
            onError: () => {
                show('recipe-to-folder-error')
            }
        })

        const [checkedIds, setCheckedIds] = useState<Folder['id'][]>([])

        const handleAddToFolders = () => {
            if (checkedIds.length <= 0) {
                close()
                return
            }
            addToFoldersMutation.mutate({
                recipeId,
                foldersIds: checkedIds
            })
        }

        const handleCheckChange = (id: Folder['id']) => {
            setCheckedIds(prev => {
                const foundId = prev.findIndex(currId => currId === id)
                if (foundId <= -1) return [...prev, id]
                return prev.splice(foundId, 1)
            })
        }

        return (
            <Modal
                close={close}
                isOpen={isOpen}
                title='Add the recipe to your collections'
                description='Select collections by clicking on them and press the confirm button'
            >
                <SessionStateWrapper
                    NotLoggedIn={(signIn) => <MessageWithSignInButton signIn={signIn} message={'to add a recipe to your collection'} />}
                    LoggedIn={() =>
                        <>
                            <div>
                                <div className='prose'>
                                    <h4 className='break-all'>
                                        {title}
                                    </h4>
                                    {/* <div>
                            <Image
                                src={}
                                // src={image}
                                alt={title}
                                layout='fixed'
                                width={50}
                                height={50}
                            />
                        </div> */}
                                </div>

                                <StateWrapper
                                    data={foldersQuery.data}
                                    isLoading={foldersQuery.isLoading}
                                    isError={foldersQuery.isError}
                                    Empty={<div className='my-3 p-3'>You have no collections.</div>}
                                    NonEmpty={(folders) => {
                                        const filteredFolders = folders.filter(folder => folder.recipes.map(recipe => recipe.id).includes(recipeId) === false)
                                        if (filteredFolders.length === 0) return <div className='max-h-[30vh] flex flex-col space-y-2 p-3 my-3'>Looks like the recipe is in every collection.</div>

                                        return (
                                            <div className='overflow-y-scroll max-h-[30vh] flex flex-col space-y-2 p-3 my-3'>
                                                {filteredFolders.map((folder, index) => (
                                                    <FolderCheckbox
                                                        key={index}
                                                        id={folder.id}
                                                        name={folder.name}
                                                        onChange={handleCheckChange}
                                                    />
                                                ))}
                                            </div>
                                        )
                                    }}
                                />
                            </div>

                            <div className='flex flex-row space-x-3 justify-end w-full'>
                                <Button
                                    content={'Confirm'}
                                    onClick={handleAddToFolders}
                                    size='sm'
                                    isLoading={addToFoldersMutation.isLoading}
                                    disabled={addToFoldersMutation.isLoading}
                                />
                                <Button
                                    content={'Cancel'}
                                    onClick={close}
                                    size='sm'
                                    variant='ghost'
                                />
                            </div>
                        </>
                    }
                />
            </Modal>
        )
    }

export default AddToRecipeToFolderModal

const FolderCheckbox: React.FC<{
    id: Folder['id']
    name: Folder['name']
    onChange: (id: Folder['id']) => void
}> = ({
    id,
    name,
    onChange
}) => {
        const [checked, setChecked] = useState(false)

        const handleChange = () => {
            setChecked(prev => !prev)
            onChange(id)
        }

        return (
            <div className='flex flex-row space-x-3'>
                <input
                    type='checkbox'
                    className='checkbox checkbox-primary'
                    checked={checked}
                    onChange={handleChange}
                />
                <div>
                    {name}
                </div>
            </div>
        )
    }