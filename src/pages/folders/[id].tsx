import Head from "next/head";
import { useRouter } from "next/router";
import MainLayout from "../../components/ui/MainLayout";
import { api } from "../../utils/api";
import FolderScreen from "../../components/Folder/FolderScreen";
import StateWrapper from "../../components/common/StateWrapper";
import { type NextPage } from "next/types";
import FolderScreenLoader from "../../components/Folder/FolderScreenLoader";
import Button from "../../components/common/Button";

const Folder: NextPage = () => {
    const router = useRouter()
    const id = router.query.id as unknown as string
    const folderQuery = api.folder.getOneWithRecipes.useQuery({ id: parseInt(id) }, {
        refetchOnMount: true
    })

    return (
        <MainLayout useContainer={true}>
            <StateWrapper
                isLoading={folderQuery.isLoading}
                isError={folderQuery.isError}
                data={folderQuery.data}
                Loading={<FolderScreenLoader />}
                Error={
                    <>
                        <Head>
                            <title>Sorry, we could not get the collection.</title>
                        </Head>
                        <div className='prose mx-auto'>
                            <h3>Sorry, someting went wrong and we did not get Your collection.</h3>
                            <Button
                                content='Try again'
                                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                onClick={() => folderQuery.refetch()}
                                variant='primary'
                                size='lg'
                            />
                        </div>
                    </>
                }
                NonEmpty={folder =>
                    <>
                        <Head>
                            <title>{folder.name}</title>
                        </Head>
                        <FolderScreen {...folder} />
                    </>
                }
            />
        </MainLayout>
    );
};

export default Folder