import { type NextPage } from "next";
import Head from "next/head";
import MessageWithSignInButton from "../../components/common/MessageWithSignInButton";
import SessionStateWrapper from "../../components/common/SessionStateWrapper";
import RecipeForm from "../../components/Recipe/RecipeForm";
import MainLayout from "../../components/ui/MainLayout";

const NewRecipePage: NextPage = () => {

    return (
        <>
            <Head>
                <title>Create a recipe</title>
            </Head>

            <MainLayout useContainer={true}>
                <SessionStateWrapper
                    NotLoggedIn={(signIn) => <MessageWithSignInButton signIn={signIn} message='to add a recipe' />}
                    LoggedIn={() => <RecipeForm />}
                />
            </MainLayout>
        </>
    )
}

export default NewRecipePage