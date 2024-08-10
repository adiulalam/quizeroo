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
} from "@/provider";

export const JoinContainer = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { status } = useSession();
  const [showForm, setShowForm] = useState(false);

  const { data, isLoading } = api.user.getTempUser.useQuery(undefined, {
    enabled: status === "authenticated",
  });

  console.log("🚀 ~ JoinContainer ~ data:", data);

  const isEqualQuizSession = !!(data && data.quizSessionId === id);

  if (status === "loading" || isLoading) {
    return <p>loading</p>;
  }

  if (showForm || status === "unauthenticated" || !isEqualQuizSession) {
    return <JoinForm setShowForm={setShowForm} />;
  }

  return (
    <QuizTempUserProvider value={data}>
      <CurrentQuestionProvider
        defaultCurrentQuestionId={data.quizSession?.currentQuestionId ?? null}
        questions={data.quizSession?.quiz.questions ?? []}
        defaultShowSubmission={!!data.quizSession?.showSubmission}
      >
        <QuestionCountdownProvider>
          <div className="flex h-dvh flex-col items-center justify-between">
            <JoinHeader />

            <AnswerSubmittedProvider
              userAnswers={data.quizSession?.question?.userAnswers ?? []}
            >
              <JoinBody setShowForm={setShowForm} />
            </AnswerSubmittedProvider>

            <JoinFooter />
          </div>
        </QuestionCountdownProvider>
      </CurrentQuestionProvider>
    </QuizTempUserProvider>
  );
};
