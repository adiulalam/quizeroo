import { AnswerCounterProvider } from "@/provider";
import { ServeQuestionAnswer, ServeQuestionInfo } from ".";
import { useQuizSession } from "@/hooks";

export const ServeQuestion = () => {
  const { question } = useQuizSession();

  return (
    <AnswerCounterProvider
      defaultCount={question?.userAnswers.length ?? 0}
      defaultAnswers={question?.userAnswers ?? []}
    >
      <div className="flex h-full w-full flex-col gap-2">
        <ServeQuestionInfo />
        <ServeQuestionAnswer />
      </div>
    </AnswerCounterProvider>
  );
};
