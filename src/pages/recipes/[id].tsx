import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import MainLayout from "../../components/ui/MainLayout";
import RecipeScreen from "../../components/RecipeScreen/RecipeScreen";
import { api } from "../../utils/api";
import StateWrapper from "../../components/common/StateWrapper";
import Button from '../../components/common/Button'

const Recipe: NextPage = () => {
    const router = useRouter()
    const id = router.query.id as unknown as string
    const recipeQuery = api.recipe.getOneById.useQuery({ id: parseInt(id) })

    return (
        <MainLayout useContainer={true}>
            <StateWrapper
                data={recipeQuery.data}
                isLoading={recipeQuery.isLoading}
                isError={recipeQuery.isError}
                Error={
                    <>
                        <Head>
                            <title>Sorry, we could not get the recipe.</title>
                        </Head>
                        <div className='prose mx-auto'>
                            <h3>Sorry, someting went wrong and we did not get Your recipe.</h3>
                            <Button
                                content='Try again'
                                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                onClick={() => recipeQuery.refetch()}
                                variant='primary'
                                size='lg'
                            />
                        </div>
                    </>
                }
                NonEmpty={(recipe) =>
                    <>
                        <Head>
                            <title>{recipe.title}</title>
                            <meta name='author id' content={recipe.author.id} />
                            <meta name='author name' content={recipe.author.name ?? '-NO_NAME-'} />
                            <meta name='recipe id' content={recipe.id.toString()} />
                            <meta name='recipe title' content={recipe.title} />
                        </Head>

                        <RecipeScreen {...recipe} />
                    </>
                }
            />
        </MainLayout >
    );
};

export default Recipe

// export const getStaticPaths: GetStaticPaths = async () => {
//     const recipesIds = await prisma.recipe.findMany({
//         select: {
//             id: true
//         }
//     })

//     const paths = recipesIds.map(id => ({
//         params: {
//             id
//         }
//     }))

//     return {
//         paths: [
//             {
//                 params: {
//                     id: '1'
//                 }
//             }
//         ],
//         fallback: false
//     }
// }

// export const getStaticProps = async (context: GetStaticPropsContext<{ id: string }>) => {
//     const ssg = createProxySSGHelpers({
//         router: appRouter,
//         ctx: createInnerTRPCContext(),
//         transformer: superjson
//     })

//     const id = context.params?.id as string

//     await ssg.recipe.getOneById.prefetch({ id: parseInt(id) })

//     return {
//         props: {
//             id
//         }
//     }
// }