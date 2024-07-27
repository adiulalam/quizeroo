import { authOptions } from "@/server/auth";
import { getSessionNameHandler } from "@/server/controller/quizSession.controller";
import type { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { useRouter } from "next/router";

const Serve = () => {
  const router = useRouter();
  const id = router.query.id as string;
  console.log("🚀 ~ Serve ~ router:", id);
  return (
    <>
      <Head>
        <title>Quizeroo - Serve</title>
        <meta name="description" content="Generated by Adiul" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p>Serve {id}</p>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const id = context.query.id;

    const userSession = await getServerSession(
      context.req,
      context.res,
      authOptions,
    );

    if (!userSession || typeof id !== "string") {
      return { redirect: { destination: "/", permanent: false } };
    }

    const quizSession = await getSessionNameHandler({
      input: { roomName: id },
    });

    if (userSession.user.id !== quizSession.userId) {
      return { redirect: { destination: "/", permanent: false } };
    }

    return { props: { userSession, quizSession } };
  } catch (error) {
    console.error(error);
    return { redirect: { destination: "/", permanent: false } };
  }
}

export default Serve;