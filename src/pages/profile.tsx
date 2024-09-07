import { ProfileForm, ProfileWrapper } from "@/components/profile";
import { ProfileSkeleton } from "@/components/skeleton";
import { ErrorBox } from "@/components/ui/ErrorBox";
import { ProfileProvider } from "@/provider";
import { authOptions } from "@/server/auth";
import { api } from "@/utils/api";
import type { GetServerSidePropsContext } from "next";
import { getServerSession, type Session } from "next-auth";

const Profile = ({ userSession }: { userSession: Session }) => {
  const { data, isLoading, isError, refetch } = api.user.getProfile.useQuery();

  if (isLoading) {
    return (
      <ProfileWrapper isTempUser={userSession.user.isTempUser}>
        <ProfileSkeleton />
      </ProfileWrapper>
    );
  }

  if (!data || isError) {
    return (
      <ProfileWrapper isTempUser={userSession.user.isTempUser}>
        <ErrorBox refetch={refetch} />
      </ProfileWrapper>
    );
  }

  return (
    <ProfileProvider value={{ profile: data, session: userSession }}>
      <ProfileWrapper isTempUser={userSession.user.isTempUser}>
        <ProfileForm />
      </ProfileWrapper>
    </ProfileProvider>
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

export default Profile;
