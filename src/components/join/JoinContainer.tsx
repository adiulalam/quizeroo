import { useSession } from "next-auth/react";
import { useState } from "react";
import { JoinFooter, JoinForm, JoinHeader, JoinWaiting } from ".";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { QuizTempUserProvider } from "@/provider";

export const JoinContainer = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { status } = useSession();
  const [showForm, setShowForm] = useState(false);

  const { data, isLoading } = api.user.getTempUser.useQuery(undefined, {
    enabled: status === "authenticated",
  });

  const isEqualQuizSession = !!(data && data.quizSessionId === id);

  if (status === "loading" || isLoading) {
    return <p>loading</p>;
  }

  if (showForm || status === "unauthenticated" || !isEqualQuizSession) {
    return <JoinForm setShowForm={setShowForm} />;
  }

  return (
    <QuizTempUserProvider value={data}>
      <div className="flex h-dvh flex-col items-center justify-between">
        <JoinHeader isWaiting={false} />

        <div className="flex h-full w-full bg-muted/40 p-2">
          <JoinWaiting setShowForm={setShowForm} />
        </div>

        <JoinFooter isWaiting={false} />
      </div>
    </QuizTempUserProvider>
  );
};
