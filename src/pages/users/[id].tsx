import { type NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import Avatar from "../../components/common/Avatar"
import Divider from "../../components/common/Divider"
import StateWrapper from "../../components/common/StateWrapper"
import RecipeListingLoader from "../../components/Recipe/RecipeListingLoader"
import RecipesListing from "../../components/Recipe/RecipesListing"
import MainLayout from "../../components/ui/MainLayout"
import { api } from "../../utils/api"

const UserProfile: NextPage = () => {
    const router = useRouter()

    const userId = router.query.id as string

    const userInfoQuery = api.user.getInfoById.useQuery({ id: userId })

    const recipesQuery = api.recipe.getAllByUserId.useQuery({ userId })

    return (
        <>
            <MainLayout useContainer={true}>
                <StateWrapper
                    isLoading={userInfoQuery.isLoading}
                    isError={userInfoQuery.isError}
                    data={userInfoQuery.data}
                    NonEmpty={(userInfo) => <>
                        <Head>
                            <title>Profile</title>
                            <meta name='user id' content={userInfo.id} />
                            <meta name='username' content={userInfo.name ?? '--NO_NAME--'} />
                            <meta name='reviews' content={userInfo._count.review.toString()} />
                            <meta name='recipes' content={userInfo._count.recipes.toString()} />
                        </Head>

                        <section className='flex flex-row p-3 space-x-3 shadow-gray-300 items-center shadow-xl mx-3 mb-12 border-gray-300/30 border rounded-md'>
                            <div className='flex flex-row space-x-3'>
                                <Avatar src={userInfo.image} />
                                <div className='font-semibold text-lg text-secondary'>{userInfo.name}</div>
                            </div>

                            <Divider className='divider-horizontal' />

                            <div className="stats">

                                <div className="stat">
                                    <div className="stat-title">Added recipes</div>
                                    <div className="stat-value text-center">{userInfo._count.recipes}</div>
                                </div>

                                <div className="stat">
                                    <div className="stat-title">Written reviews</div>
                                    <div className="stat-value text-center">{userInfo._count.review}</div>
                                </div>

                            </div>

                        </section>
                    </>}
                />
                <StateWrapper
                    isLoading={recipesQuery.isLoading}
                    isError={recipesQuery.isError}
                    data={recipesQuery.data}
                    Loading={<RecipeListingLoader />}
                    NonEmpty={(recipes) => <RecipesListing recipes={recipes} />}
                />
            </MainLayout>
        </>
    )
}

export default UserProfile