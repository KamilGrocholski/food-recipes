import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import { type BaseSyntheticEvent } from "react";
import MessageWithSignInButton from "../../components/common/MessageWithSignInButton";
import SessionStateWrapper from "../../components/common/SessionStateWrapper";
import RecipeForm from "../../components/Recipe/RecipeForm";
import MainLayout from "../../components/ui/MainLayout";
import { api, type RouterInputs } from "../../utils/api";

const NewRecipePage: NextPage = () => {
    const createRecipe = api.recipe.create.useMutation({
        onError: (error) => console.log(error),
        onSuccess: (data) => console.log(data)
    })

    const handleCreateRecipe = (data: RouterInputs['recipe']['create'], e?: BaseSyntheticEvent<object, unknown, unknown> | undefined) => {
        e?.preventDefault()
        createRecipe.mutate(data)
    }

    return (
        <>
            <Head>

            </Head>

            <MainLayout useContainer={true}>
                <SessionStateWrapper
                    NotLoggedIn={(signIn) => <MessageWithSignInButton signIn={signIn} message='to add a recipe' />}
                    LoggedIn={() => <RecipeForm onValid={handleCreateRecipe} />}
                />
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