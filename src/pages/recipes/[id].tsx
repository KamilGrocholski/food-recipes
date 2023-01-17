import type { GetStaticPaths, GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import MainLayout from "../../components/ui/MainLayout";
import RecipeScreen from "../../components/RecipeScreen/RecipeScreen";
import { api } from "../../utils/api";

const Recipe: NextPage = () => {
    const router = useRouter()
    const id = router.query.id as unknown as string
    const recipeQuery = api.recipe.getOneById.useQuery({ id: parseInt(id) })

    if (!recipeQuery.data) return null

    return (
        <>
            <Head>

            </Head>

            <MainLayout useContainer={true}>
                <RecipeScreen {...recipeQuery.data} />
            </MainLayout>
        </>
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