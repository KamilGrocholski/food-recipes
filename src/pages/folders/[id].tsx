import Head from "next/head";
import { useRouter } from "next/router";
import MainLayout from "../../components/ui/MainLayout";
import { api } from "../../utils/api";
import FolderScreen from "../../components/Folder/FolderScreen";
import StateWrapper from "../../components/common/StateWrapper";
import { type NextPage } from "next/types";
import FolderScreenLoader from "../../components/Folder/FolderScreenLoader";

const Folder: NextPage = () => {
    const router = useRouter()
    const id = router.query.id as unknown as string
    const folderQuery = api.folder.getOneWithRecipes.useQuery({ id: parseInt(id) }, {
        refetchOnMount: true
    })

    return (
        <>
            <Head>

            </Head>

            <MainLayout useContainer={true}>
                <StateWrapper
                    isLoading={folderQuery.isLoading}
                    isError={folderQuery.isError}
                    data={folderQuery.data}
                    Loading={<FolderScreenLoader />}
                    NonEmpty={folder => <FolderScreen {...folder} />}
                />
            </MainLayout>
        </>
    );
};

export default Folder