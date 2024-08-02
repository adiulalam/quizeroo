import { AnswerCounterProvider } from "@/provider";
import { ServeQuestionAnswer, ServeQuestionInfo } from ".";
import { useQuizSession } from "@/hooks";

export const ServeQuestion = () => {
  const { question } = useQuizSession();

  return (
    <AnswerCounterProvider value={question?._count.userAnswers ?? 0}>
      <div className="flex h-full w-full flex-col gap-2">
        <ServeQuestionInfo />
        <ServeQuestionAnswer />
      </div>
    </AnswerCounterProvider>
  );
};
