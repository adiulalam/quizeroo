// import { authOptions } from "@/server/auth";
// import { getSessionNameHandler } from "@/server/controller/quizSession.controller";
// import type { GetServerSidePropsContext } from "next";
// import { getServerSession } from "next-auth";
import { JoinContainer } from "@/components/join";
import Head from "next/head";

const Join = () => {
  return (
    <>
      <Head>
        <title>Quizeroo - Join</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <JoinContainer />
    </>
  );
};

// todo: fix this shit right here
// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   try {
//     const id = context.query.id;

//     const userSession = await getServerSession(
//       context.req,
//       context.res,
//       authOptions,
//     );

//     if (!userSession?.user?.id || typeof id !== "string") {
//       return { redirect: { destination: "/", permanent: false } };
//     }

//     const quizSession = await getSessionNameHandler({
//       input: { roomName: id },
//     });

//     return { props: { userSession, quizSession } };
//   } catch (error) {
//     console.error(error);
//     return { redirect: { destination: "/", permanent: false } };
//   }
// }

export default Join;
