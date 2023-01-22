import { type FolderRouter } from "../../server/api/routers/folder"
import RecipesListing from "../Recipe/RecipesListing"
import { api } from "../../utils/api"
import Button from "../common/Button"
import { Icons } from "../../assets/icons"
import { useRouter } from "next/router"
import { useState } from "react"
import Modal from "../common/Modal"
import { useToastControls } from "../../hooks/useToastControls"
import Link from "next/link"
import { type SubmitErrorHandler, type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { folderBase } from "../../server/schema/folder.schema"
import Input from "../common/Input"
import { z } from 'zod'
import { type Folder } from "@prisma/client"

const FolderScreen: React.FC<NonNullable<FolderRouter['getOneWithRecipes']>> = (folder) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isEditingName, setIsEditingName] = useState(false)

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
            <div className='prose flex flex-row mx-3 mb-3'>
                {/* <Image
                    src={folderHeaderImage}
                    alt='image'
                    layout="responsive"
                    width={500}
                    height={300}
                    className='blur-sm'
                /> */}
                {isEditingName ?
                    <FolderNameEdit
                        folderId={folder.id}
                        onCancel={() => setIsEditingName(false)}
                        onSave={() => setIsEditingName(false)}
                    />
                    : <h1 className='mr-3'>{folder.name}</h1>}
                {!isEditingName ?
                    <Button
                        content={Icons.pencil}
                        variant='ghost'
                        size='sm'
                        shape='circle'
                        onClick={() => setIsEditingName(true)}
                    /> : null}
                <Button
                    content={Icons.trash}
                    variant='error'
                    size='sm'
                    className='btn-active'
                    shape='circle'
                    onClick={() => setIsModalOpen(true)}
                />
            </div>
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
            {folder.recipes.length === 0
                ? <div className='mx-3'>
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

interface FolderNameEditProps {
    onCancel: () => void
    onSave: () => void
    folderId: Folder['id']
}

const FolderNameEdit: React.FC<FolderNameEditProps> = ({
    onCancel,
    onSave,
    folderId
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<{ name: string }>({
        resolver: zodResolver(z.object({
            name: folderBase.name
        }))
    })

    const utils = api.useContext()

    const { show } = useToastControls()

    const updateNameMutation = api.folder.updateName.useMutation({
        onSuccess: () => {
            onSave()
            show('folder-update-success')
            void utils.folder.getAllByCurrentUserId.invalidate()
            void utils.folder.getOneWithRecipes.invalidate({ id: folderId })
        },
        onError: () => {
            show('folder-update-error')
        }
    })

    const handleOnValid: SubmitHandler<{ name: string }> = (data, e) => {
        e?.preventDefault()
        updateNameMutation.mutate({
            id: folderId,
            name: data.name
        })
    }

    const handleOnError: SubmitErrorHandler<{ name: string }> | undefined = (data, e) => {
        e?.preventDefault()
        console.log(data)
    }

    return (
        <form
            className='flex flex-col space-y-1'
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(handleOnValid, handleOnError)}
        >
            <Input
                {...register('name')}
                errorMessage={errors.name?.message}
            />
            <div className='flex flex-row space-x-1'>
                <Button
                    type='submit'
                    content={Icons.check}
                    size='sm'
                    variant='primary'
                />
                <Button
                    content={Icons.xMark}
                    onClick={onCancel}
                    size='sm'
                    variant='ghost'
                />
            </div>
        </form>
    )
}