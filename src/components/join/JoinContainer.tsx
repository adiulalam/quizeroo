import { useSession } from "next-auth/react";
import { useState } from "react";
import { JoinBody, JoinFooter, JoinForm, JoinHeader } from ".";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import {
  AnswerSubmittedProvider,
  CurrentQuestionProvider,
  QuestionCountdownProvider,
  QuizTempUserProvider,
  UserScoreProvider,
} from "@/provider";
import { SessionSkeleton } from "../skeleton/SessionSkeleton";
import { ErrorBox } from "../ui/ErrorBox";

export const JoinContainer = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { status } = useSession();
  const [showForm, setShowForm] = useState(false);

  const { data, isLoading, isError } = api.user.getTempUser.useQuery(
    undefined,
    {
      enabled: status === "authenticated",
    },
  );

  const isEqualQuizSession = !!(data && data.quizSessionId === id);

  if (status === "loading" || isLoading) {
    return <SessionSkeleton />;
  }

  if (showForm || status === "unauthenticated" || !isEqualQuizSession) {
    return <JoinForm setShowForm={setShowForm} />;
  }

  if (isError) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <ErrorBox homeButton />
      </div>
    );
  }

  return (
    <QuizTempUserProvider value={data}>
      <CurrentQuestionProvider
        defaultCurrentQuestionId={data.quizSession?.currentQuestionId ?? null}
        questions={data.quizSession?.quiz.questions ?? []}
        defaultShowSubmission={!!data.quizSession?.showSubmission}
      >
        <QuestionCountdownProvider>
          <UserScoreProvider>
            <AnswerSubmittedProvider
              userAnswers={data.quizSession?.question?.userAnswers ?? []}
            >
              <div className="flex h-dvh flex-col items-center justify-between">
                <JoinHeader />

                <JoinBody setShowForm={setShowForm} />

                <JoinFooter />
              </div>
            </AnswerSubmittedProvider>
          </UserScoreProvider>
        </QuestionCountdownProvider>
      </CurrentQuestionProvider>
    </QuizTempUserProvider>
  );
};
