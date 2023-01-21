import { type NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import MessageWithSignInButton from "../../components/common/MessageWithSignInButton"
import SessionStateWrapper from "../../components/common/SessionStateWrapper"
import StateWrapper from "../../components/common/StateWrapper"
import RecipeListingLoader from "../../components/Recipe/RecipeListingLoader"
import RecipesListing from "../../components/Recipe/RecipesListing"
import MainLayout from "../../components/ui/MainLayout"
import { api } from "../../utils/api"

const MyRecipesPage: NextPage = () => {
    const myRecipesQuery = api.recipe.getCurrentUserRecipes.useQuery()

    return (
        <>
            <Head>
                <title>My Recipes</title>
            </Head>
            <MainLayout useContainer={true}>
                <div className='prose flex flex-row mx-3 mb-3'>
                    <h1>Your recipes</h1>
                    <div></div>
                </div>
                <SessionStateWrapper
                    NotLoggedIn={(signIn) => <MessageWithSignInButton signIn={signIn} message='to add recipes' />}
                    LoggedIn={() =>
                        <>
                            <StateWrapper
                                isLoading={myRecipesQuery.isLoading}
                                isError={myRecipesQuery.isError}
                                data={myRecipesQuery.data}
                                Loading={<RecipeListingLoader />}
                                NonEmpty={(recipes) => <RecipesListing recipes={recipes} options={{ withRemoveModal: true }} />}
                                Empty={
                                    <div>
                                        <span>
                                            You haven&apos;t create any recipe,
                                            <Link href='/recipes/new'>
                                                <span className='link-primary'> create </span>
                                            </Link>
                                            some.
                                        </span>
                                    </div>
                                }
                            />
                        </>
                    }
                />
            </MainLayout>
        </>
    )
}

export default MyRecipesPage