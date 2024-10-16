import { useCurrentQuestion, useQuizTempUser, useUserScore } from "@/hooks";
import { type JoinWaitingtype } from "./JoinWaiting";
import { JoinQuestion, JoinWaiting } from ".";
import { api } from "@/utils/api";
import { useAnswerSubmitted } from "@/hooks/useAnswerSubmitted";

export const JoinBody = ({ setShowForm }: JoinWaitingtype) => {
  const { setIsAnswerSubmitted } = useAnswerSubmitted();
  const { quizSession } = useQuizTempUser();
  const { setScore } = useUserScore();
  const { currentQuestionId, setCurrentQuestionId, setShowSubmission } =
    useCurrentQuestion();

  api.quizSession.onNextQuestion.useSubscription(
    { id: quizSession!.id },
    {
      onData: (data) => {
        setCurrentQuestionId(data.currentQuestionId);
        setShowSubmission(data.showSubmission);
        setIsAnswerSubmitted(false);
        setScore((prev) => ({
          currentScore: prev.pendingScore + prev.currentScore,
          pendingScore: 0,
        }));
      },
    },
  );

  return (
    <div className="flex h-full w-full bg-muted/40 p-2">
      {currentQuestionId ? (
        <JoinQuestion />
      ) : (
        <JoinWaiting setShowForm={setShowForm} />
      )}
    </div>
  );
};
