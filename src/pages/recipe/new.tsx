import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import RecipeForm from "../../components/Recipe/RecipeForm";
import MainLayout from "../../components/ui/MainLayout";

const NewRecipePage: NextPage = () => {
    return (
        <>
            <Head>

            </Head>

            <MainLayout useContainer={true}>
                <RecipeForm onValid={console.log} />
            </MainLayout>
        </>
    )
}

export default NewRecipePage

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {}
    }
}