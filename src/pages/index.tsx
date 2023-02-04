import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import MainLayout from "../components/ui/MainLayout";
import heroImage1 from '../assets/hero-images/1.jpg'
import { useRouter } from "next/router";

import { api } from "../utils/api";
import Button from "../components/common/Button";
import RecipeCard from "../components/Recipe/RecipeCard";
import RecipesInfiniteScroll from "../components/Recipe/RecipesInfiniteScroll";
import { signIn, useSession } from "next-auth/react";
import bgImage from '../assets/hero-images/1.jpg'

const Home: NextPage = () => {
  const infiniteRecipesQuery = api.recipe.infiniteRecipes.useInfiniteQuery({ limit: 16 }, {
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })

  const { data: session } = useSession()


  const router = useRouter()

  return (
    <>
      <Head>
        <title>Recipes</title>
      </Head>

      <MainLayout useContainer={true}>
        <div className="hero min-h-[50vh] mb-16" style={{ backgroundImage: `url(${bgImage.src})` }}>
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Finally, some good meal!</h1>
              <p className="py-6">Create, gather, and share ideas.</p>
              <Button
                content='Get started'
                onClick={() => {
                  if (session?.user) {
                    void router.push('/recipes/new')
                  } else {
                    void signIn('google')
                  }
                }}
              />
            </div>
          </div>
        </div>
        <RecipesInfiniteScroll
          isFetching={infiniteRecipesQuery.isFetchingNextPage}
          isError={false}
          hasMore={!!infiniteRecipesQuery.hasNextPage}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          fetchMore={infiniteRecipesQuery.fetchNextPage}
        >
          <div className='recipes-listing'>
            {infiniteRecipesQuery.data?.pages.map((page) => (
              page.recipes.map((recipe) => (
                <RecipeCard recipe={recipe} key={recipe.id} />
              ))
            ))}
          </div>
        </RecipesInfiniteScroll>
      </MainLayout>
    </>
  );
};

export default Home
