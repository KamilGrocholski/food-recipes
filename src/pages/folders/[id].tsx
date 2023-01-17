import Head from "next/head";
import { useRouter } from "next/router";
import MainLayout from "../../components/ui/MainLayout";
import { api } from "../../utils/api";
import FolderView from "../../components/Folder/FolderView";
import StateWrapper from "../../components/common/StateWrapper";
import { type NextPage } from "next/types";

const Folder: NextPage = () => {
    const router = useRouter()
    const id = router.query.id as unknown as string
    const folderQuery = api.folder.getOneWithRecipes.useQuery({ id: parseInt(id) })

    return (
        <>
            <Head>

            </Head>

            <MainLayout useContainer={true}>
                <StateWrapper
                    isLoading={folderQuery.isLoading}
                    isError={folderQuery.isError}
                    data={folderQuery.data}
                    NonEmpty={folder => <FolderView {...folder} />}
                />
            </MainLayout>
        </>
    );
};

export default Folder