import { type FolderRouter } from "../../server/api/routers/folder"
import RecipesListing from "../Recipe/RecipesListing"
import folderHeaderImage from '../../assets/folder-header.jpg'
import Image from "next/image"

const FolderView: React.FC<NonNullable<FolderRouter['getOneWithRecipes']>> = (folder) => {
    return (
        <div>
            <div className='prose mb-24'>
                {/* <Image
                    src={folderHeaderImage}
                    alt='image'
                    layout="responsive"
                    width={500}
                    height={300}
                    className='blur-sm'
                /> */}
                <h1>{folder.name}</h1>
            </div>
            <RecipesListing recipes={folder.recipes} />
        </div>
    )
}

export default FolderView