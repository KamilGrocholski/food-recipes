import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import StateWrapper from "../components/common/StateWrapper";
import MainLayout from "../components/ui/MainLayout";
import heroImage1 from '../assets/hero-images/1.jpg'
import { useRouter } from "next/router";

import { api } from "../utils/api";
import Button from "../components/common/Button";
import RecipeCard from "../components/Recipe/RecipeCard";
import RecipesInfiniteScroll from "../components/Recipe/RecipesInfiniteScroll";

const Home: NextPage = () => {
  const infiniteRecipesQuery = api.recipe.infiniteRecipes.useInfiniteQuery({ limit: 16 }, {
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })

  const router = useRouter()

  return (
    <>
      <Head>
        <title>Recipes</title>
      </Head>

      <MainLayout useContainer={true}>
        <div className="hero min-h-[50vh] bg-base-200 mb-16">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <Image
              src={heroImage1}
              alt='herpo,mage'
              width={400}
              height={300}
            />
            <div>
              <h1 className="text-5xl font-bold">Finally, some good meal!</h1>
              <p className="py-6">Create, gather, and share ideas.</p>
              <Button
                content='Get started'
                onClick={() => void router.push('/recipes/new')}
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
              page.recipes.map((recipe, index) => (
                <RecipeCard recipe={recipe} key={index} />
              ))
            ))}
          </div>
        </RecipesInfiniteScroll>
      </MainLayout>
    </>
  );
};

export default Home
