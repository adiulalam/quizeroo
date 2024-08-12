import { H4 } from "../ui/Typography";
import { useCurrentQuestion, useQuizTempUser } from "@/hooks";
import { useQuestionCountdown } from "@/hooks";
import { useAnswerSubmitted } from "@/hooks/useAnswerSubmitted";
import { api } from "@/utils/api";

export const JoinHeaderCountdown = () => {
  const { quizSession } = useQuizTempUser();
  const { currentQuestionId } = useCurrentQuestion();
  const { counter, setCounter } = useQuestionCountdown();
  const { isAnswerSubmitted, setIsAnswerCorrect } = useAnswerSubmitted();

  api.quizSession.onCountdown.useSubscription(
    {
      id: quizSession!.id,
      currentQuestionId: currentQuestionId!,
    },
    {
      onData: ({ countdown }) => {
        setCounter(countdown);

        if (!isAnswerSubmitted && countdown <= 0) {
          setIsAnswerCorrect(false);
        }
      },
    },
  );

  return (
    <div className="flex min-w-14 items-center justify-center rounded-full bg-muted/80">
      <H4>{counter}</H4>
    </div>
  );
};
