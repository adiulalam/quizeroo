import { GeistSans } from "geist/font/sans";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { ThemeProvider } from "next-themes";
import { api } from "@/utils/api";
import { Toaster } from "@/components/ui/Toaster";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";
import "@/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <SessionProvider session={session}>
        <style jsx global>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
          }
        `}</style>
        <Toaster />
        <Component {...pageProps} />
        <ProgressBar
          height="2px"
          color="hsl(var(--primary))"
          options={{ showSpinner: true }}
          shallowRouting
        />
      </SessionProvider>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
