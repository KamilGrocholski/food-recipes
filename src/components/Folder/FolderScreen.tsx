import { type FolderRouter } from "../../server/api/routers/folder"
import RecipesListing from "../Recipe/RecipesListing"
import folderHeaderImage from '../../assets/folder-header.jpg'
import Image from "next/image"
import { api } from "../../utils/api"
import Button from "../common/Button"
import { Icons } from "../../assets/icons"
import { useRouter } from "next/router"
import { useState } from "react"
import Modal from "../common/Modal"
import { useToastControls } from "../../hooks/useToastControls"
import Link from "next/link"

const FolderScreen: React.FC<NonNullable<FolderRouter['getOneWithRecipes']>> = (folder) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const utils = api.useContext()
    const router = useRouter()

    const { show } = useToastControls()

    const removeFolderMutation = api.folder.remove.useMutation({
        onSuccess: () => {
            void router.push('/')
            void utils.folder.getAllByCurrentUserId.invalidate()
            show('folder-deletion-success')
        },
        onError: () => {
            show('folder-deletion-error')
        }
    })

    const handleRemoveFolder = () => {
        removeFolderMutation.mutate({
            id: folder.id
        })
    }

    return (
        <div>
            <div className='prose mb-24 flex flex-row space-x-3'>
                <Modal
                    title='Do you want to delete the collection?'
                    isOpen={isModalOpen}
                    close={() => setIsModalOpen(false)}
                >
                    <div className='flex justify-end space-x-3'>
                        <Button
                            content='Confirm'
                            onClick={handleRemoveFolder}
                            variant='error'
                            disabled={removeFolderMutation.isLoading || removeFolderMutation.isSuccess}
                        />
                        <Button
                            content='Cancel'
                            onClick={() => setIsModalOpen(false)}
                            variant='ghost'
                            disabled={removeFolderMutation.isLoading}
                        />
                    </div>
                </Modal>
                {/* <Image
                    src={folderHeaderImage}
                    alt='image'
                    layout="responsive"
                    width={500}
                    height={300}
                    className='blur-sm'
                /> */}
                <h1>{folder.name}</h1>
                <Button
                    content={Icons.trash}
                    variant='error'
                    onClick={() => setIsModalOpen(true)}
                />
            </div>
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
            {folder.recipes.length === 0
                ? <div>
                    <span>
                        This collection has no recipes,
                        <Link href='/'>
                            <span className='link-primary'> add </span>
                        </Link>
                        some.
                    </span>
                </div>
                :
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                <RecipesListing recipes={folder.recipes} />
            }
        </div>
    )
}

export default FolderScreen