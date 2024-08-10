import { H4 } from "../ui/Typography";
import { useCurrentQuestion, useQuizTempUser } from "@/hooks";
import { useQuestionCountdown } from "@/hooks";
import { api } from "@/utils/api";

export const JoinHeaderCountdown = () => {
  const { quizSession } = useQuizTempUser();
  const { currentQuestionId } = useCurrentQuestion();
  const { counter, setCounter } = useQuestionCountdown();

  api.quizSession.onCountdown.useSubscription(
    {
      id: quizSession!.id,
      currentQuestionId: currentQuestionId!,
    },
    {
      onData: (data) => {
        setCounter(data.countdown);
      },
    },
  );

  return (
    <div className="flex min-w-14 items-center justify-center rounded-full bg-muted/80">
      <H4>{counter}</H4>
    </div>
  );
};
