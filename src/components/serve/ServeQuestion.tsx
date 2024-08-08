import { AnswerCounterProvider } from "@/provider";
import { ServeQuestionAnswer, ServeQuestionChart, ServeQuestionInfo } from ".";
import { useCurrentQuestion, useQuizSession } from "@/hooks";

export const ServeQuestion = () => {
  const { question } = useQuizSession();
  const { showSubmission } = useCurrentQuestion();

  return (
    <AnswerCounterProvider
      defaultCount={question?.userAnswers.length ?? 0}
      defaultAnswers={question?.userAnswers ?? []}
    >
      <div className="flex h-full w-full flex-col gap-2">
        <ServeQuestionInfo />
        {showSubmission ? <ServeQuestionChart /> : <ServeQuestionAnswer />}
      </div>
    </AnswerCounterProvider>
  );
};
