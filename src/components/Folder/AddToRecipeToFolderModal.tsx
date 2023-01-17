import { Dialog } from "@headlessui/react"
import { type Folder, type Recipe } from "@prisma/client"
import Image, { type StaticImageData } from "next/image"
import { useState } from "react"
import { api } from "../../utils/api"
import Button from "../common/Button"
import Divider from "../common/Divider"
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
        const foldersQuery = api.folder.getAllByCurrentUserId.useQuery()
        const addToFoldersMutation = api.folder.addRecipeToFolders.useMutation()

        const [checkedIds, setCheckedIds] = useState<Folder['id'][]>([])

        const handleAddToFolders = () => {
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
            <Dialog open={isOpen} onClose={close} className='relative z-50'>

                <div className="fixed inset-0 flex items-center justify-center bg-black/70 p-4">
                    <Dialog.Panel className="w-full max-w-sm rounded bg-white p-3">
                        <Dialog.Title className='prose'>
                            <h3>Add the recipe to your collections</h3>
                        </Dialog.Title>
                        <Dialog.Description>
                            Select collections by clicking on them and press the confirm button
                        </Dialog.Description>
                        <Divider />
                        <div>
                            {/* <div className='prose'>
                                <h1>
                                    {title}
                                </h1>
                                <div>
                                    <Image
                                        src={image}
                                        alt={title}
                                        layout='fixed'
                                        width={50}
                                        height={50}
                                    />
                                </div>
                            </div> */}

                            <StateWrapper
                                data={foldersQuery.data}
                                isLoading={foldersQuery.isLoading}
                                isError={foldersQuery.isError}
                                NonEmpty={(folders) =>
                                    <div className='overflow-y-scroll max-h-[30vh] flex flex-col space-y-2 p-3 my-3'>
                                        {folders.map((folder, index) => (
                                            <FolderCheckbox
                                                key={index}
                                                id={folder.id}
                                                name={folder.name}
                                                onChange={handleCheckChange}
                                            />
                                        ))}
                                    </div>
                                }
                            />
                        </div>

                        <div className='flex flex-row space-x-3 justify-end w-full'>
                            <Button
                                content={'Confirm'}
                                onClick={handleAddToFolders}
                                size='sm'
                            />
                            <Button
                                content={'Cancel'}
                                onClick={close}
                                size='sm'
                                variant='error'
                            />
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
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
                    className='checkbox checkbox-accent'
                    checked={checked}
                    onChange={handleChange}
                />
                <div>
                    {name}
                </div>
            </div>
        )
    }