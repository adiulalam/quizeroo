import { LandingOptions } from "@/components/landing";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Quizeroo</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container flex h-screen w-screen flex-col items-center justify-center">
        <LandingOptions />
      </main>
    </>
  );
}
