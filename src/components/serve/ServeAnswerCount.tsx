import { useAnswerCounter, useCurrentQuestion, useQuizSession } from "@/hooks";
import { H3 } from "../ui/Typography";
import { api } from "@/utils/api";

export const ServeAnswerCount = () => {
  const { answerCount, setAnswerCount, setAnswers } = useAnswerCounter();
  const { currentQuestionId } = useCurrentQuestion();
  const { id } = useQuizSession();

  api.userAnswer.onSubmitAnswer.useSubscription(
    { questionId: currentQuestionId!, quizSessionId: id },
    {
      onData: (answer) => {
        setAnswerCount((prev) => prev + 1);
        setAnswers((prev) => [...prev, answer]);
      },
    },
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <H3 className="w-full truncate font-normal">Answers</H3>
      <H3 className="w-full truncate text-center font-bold">{answerCount}</H3>
    </div>
  );
};
