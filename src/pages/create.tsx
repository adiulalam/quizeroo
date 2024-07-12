import { NavbarContainer } from "@/components/nav";
import { QuizCreate } from "@/components/quizMutation";
import { Filterable, Sortable } from "@/components/quizView";
import { authOptions } from "@/server/auth";
import type { GetServerSidePropsContext } from "next";
import { getServerSession, type Session } from "next-auth";
import Head from "next/head";

const Create = ({ userSession }: { userSession: Session }) => {
  console.log("🚀 ~ Create ~ userSession:", userSession);
  return (
    <>
      <Head>
        <title>Quizeroo - Create</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavbarContainer>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col justify-between gap-2 sm:flex-row-reverse">
            <Filterable />
            <div className="flex justify-between gap-2 sm:justify-normal">
              <QuizCreate />
              <Sortable />
            </div>
          </div>
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
