import { type FolderRouter } from "../../server/api/routers/folder"
import RecipesListing from "../Recipe/RecipesListing"
import folderHeaderImage from '../../assets/folder-header.jpg'
import Image from "next/image"
import { api } from "../../utils/api"
import Button from "../common/Button"
import { Icons } from "../../assets/icons"
import { useRouter } from "next/router"

const FolderView: React.FC<NonNullable<FolderRouter['getOneWithRecipes']>> = (folder) => {
    const utils = api.useContext()
    const router = useRouter()

    const removeFolderMutation = api.folder.remove.useMutation({
        onSuccess: () => {
            void router.push('/')
            void utils.folder.getAllByCurrentUserId.invalidate({})
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
                    onClick={handleRemoveFolder}
                />
            </div>
            <RecipesListing recipes={folder.recipes} />
        </div>
    )
}

export default FolderView