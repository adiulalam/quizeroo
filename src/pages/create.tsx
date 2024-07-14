import { NavbarContainer } from "@/components/nav";
import { QuizCreate } from "@/components/quizMutation";
import {
  Filterable,
  Orderable,
  QuizCard,
  Sortable,
} from "@/components/quizView";
import { ViewQuizProvider } from "@/provider";
import { authOptions } from "@/server/auth";
import { Filter, Order, Sort } from "@/types/Quiz.types";
import { api } from "@/utils/api";
import { getFilterBy, getOrderBy, getSortBy } from "@/utils/functions";
import type { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";

const Create = () => {
  const searchParams = useSearchParams();

  const filter_by = searchParams.get("filter_by") ?? Filter.all;
  const filter = getFilterBy(filter_by);

  const sort_by = searchParams.get("sort_by") ?? Sort.updatedAt;
  const sort = getSortBy(sort_by);

  const order_by = searchParams.get("order_by") ?? Order.desc;
  const order = getOrderBy(order_by);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = api.quiz.getQuizzes.useInfiniteQuery(
    {
      filter,
      sort,
      order,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  console.log("🚀 ~ Create ~ data:", data);

  if (isLoading) {
    <p>loading...</p>;
  }

  if (isError) {
    throw error;
  }

  return (
    <>
      <Head>
        <title>Quizeroo - Create</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavbarContainer>
        <div className="flex flex-col gap-2">
          <div className="flex w-full flex-col-reverse flex-wrap justify-between gap-2 sm:flex-row">
            <div className="flex justify-between gap-2 sm:justify-normal">
              <QuizCreate />
              <div className="flex gap-2">
                <Sortable />
                <Orderable />
              </div>
            </div>
            <Filterable />
          </div>
          <InfiniteScroll
            next={fetchNextPage}
            hasMore={hasNextPage ?? false}
            loader={isFetchingNextPage && <p>loading..</p>}
            dataLength={
              data?.pages.reduce(
                (total, page) => total + page.data.quizzes.length,
                0,
              ) ?? 0
            }
          >
            <div className="flex h-full w-full flex-row flex-wrap items-center justify-evenly gap-4">
              {data?.pages.map((quizzesData) =>
                quizzesData.data.quizzes.map((quizData) => (
                  <ViewQuizProvider key={quizData.id} value={quizData}>
                    <QuizCard />
                  </ViewQuizProvider>
                )),
              )}
            </div>
          </InfiniteScroll>
        </div>
      </NavbarContainer>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const userSession = await getServerSession(
      context.req,
      context.res,
      authOptions,
    );

    if (!userSession?.user?.id) {
      return { redirect: { destination: "/", permanent: false } };
    }

    return { props: { userSession } };
  } catch (error) {
    console.error(error);
    return { redirect: { destination: "/", permanent: false } };
  }
}

export default Create;
