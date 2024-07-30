import { api } from "@/utils/api";
import { Button } from "../ui/Button";
import { CirclePlay } from "lucide-react";
import { useCurrentQuestion, useQuizSession } from "@/hooks";

export const ServeWaitingStart = ({ userCount }: { userCount: number }) => {
  const { id } = useQuizSession();
  const { nextQuestion } = useCurrentQuestion();

  const { quizSession } = api.useUtils();

  const { mutate } = api.quizSession.updateSessionQuestion.useMutation({
    onSuccess: () => quizSession.getUserQuizSession.invalidate(),
  });

  const onClickHandler = () => {
    if (nextQuestion) {
      mutate({ id, currentQuestionId: nextQuestion.id });
    }
  };

  return (
    <div className="flex w-full items-center justify-between gap-2">
      <h1 className="m-auto scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Quizeroo
      </h1>

      <Button onClick={onClickHandler} disabled={userCount <= 0}>
        Start <CirclePlay className="ml-2 size-4" />
      </Button>
    </div>
  );
};
