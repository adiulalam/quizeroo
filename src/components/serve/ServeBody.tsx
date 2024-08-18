import { useCurrentQuestion, useQuizSession } from "@/hooks";
import { ServeWaiting, ServeQuestion, ServeResult } from ".";
import { AnswerCounterProvider } from "@/provider";

export const ServeBody = () => {
  const { question } = useQuizSession();
  const { currentQuestionId, isFinished } = useCurrentQuestion();

  return (
    <AnswerCounterProvider
      defaultCount={question?.userAnswers.length ?? 0}
      defaultAnswers={question?.userAnswers ?? []}
    >
      <div className="flex h-full w-full bg-muted/40 p-2">
        {isFinished ? (
          <ServeResult />
        ) : currentQuestionId ? (
          <ServeQuestion />
        ) : (
          <ServeWaiting />
        )}
      </div>
    </AnswerCounterProvider>
  );
};
