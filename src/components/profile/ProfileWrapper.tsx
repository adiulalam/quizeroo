import { NavbarContainer } from "@/components/nav";
import { Separator } from "@/components/ui/Separator";
import { H2 } from "@/components/ui/Typography";
import Head from "next/head";
import { TempUserAlert } from "../quizView";

export const ProfileWrapper = ({
  children,
  isTempUser,
}: {
  children: React.ReactNode;
  isTempUser: boolean;
}) => {
  return (
    <>
      <Head>
        <title>Quizeroo - Profile</title>
        <meta name="description" content="Generated by Adiul Alam Adil" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavbarContainer>
        <div className="flex w-full justify-center gap-2">
          <div className="flex w-full max-w-2xl flex-col gap-6 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            {isTempUser && <TempUserAlert />}
            <div>
              <H2>Profile</H2>
              <p className="text-sm text-muted-foreground">
                Manage you profile details.
              </p>
            </div>
            <Separator />
            {children}
          </div>
        </div>
      </NavbarContainer>
    </>
  );
};
