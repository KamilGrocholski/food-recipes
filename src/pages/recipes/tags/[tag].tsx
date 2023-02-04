import { type NextPage } from "next";
import Head from "next/head";

import { useRouter } from "next/router";
import StateWrapper from "../../../components/common/StateWrapper";
import RecipeCard from "../../../components/Recipe/RecipeCard";
import RecipesInfiniteScroll from "../../../components/Recipe/RecipesInfiniteScroll";
import MainLayout from "../../../components/ui/MainLayout";
import { api } from "../../../utils/api";


const RecipesWithTag: NextPage = () => {
    const router = useRouter()

    const tag = router.query.tag as string

    const infiniteRecipesQuery = api.recipe.infiniteRecipes.useInfiniteQuery({ limit: 16, filter: { tag } }, {
        getNextPageParam: (lastPage) => lastPage.nextCursor
    })


    return (
        <>
            <Head>
                <title>Recipes</title>
                <meta name='Contains tag' content={tag} />
            </Head>
            <MainLayout useContainer={true}>

                <StateWrapper
                    data={infiniteRecipesQuery.data}
                    isLoading={infiniteRecipesQuery.isLoading}
                    isError={infiniteRecipesQuery.isError}
                    NonEmpty={(data) =>
                        <>
                            <div className='prose flex flex-row mx-3 mb-3'>
                                <h1>Results for: <span className='italic'>{tag}</span></h1>
                                <div></div>
                            </div>
                            <RecipesInfiniteScroll
                                isFetching={infiniteRecipesQuery.isFetchingNextPage}
                                isError={false}
                                hasMore={!!infiniteRecipesQuery.hasNextPage}
                                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                fetchMore={infiniteRecipesQuery.fetchNextPage}
                            >
                                <div className='recipes-listing'>
                                    {data.pages.map((page) => (
                                        page.recipes.map((recipe) => (
                                            <RecipeCard recipe={recipe} key={recipe.id} />
                                        ))
                                    ))}
                                </div>
                            </RecipesInfiniteScroll>
                        </>
                    }
                />
            </MainLayout>
        </>
    );
};

export default RecipesWithTag
