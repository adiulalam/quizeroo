import { api } from "@/utils/api";
import { Button } from "../ui/Button";
import { CirclePlay } from "lucide-react";
import { useCurrentQuestion, useQuizSession } from "@/hooks";
import { H1 } from "../ui/Typography";

export const ServeWaitingStart = ({ userCount }: { userCount: number }) => {
  const { id } = useQuizSession();

  const { setCurrentQuestionId, nextQuestion } = useCurrentQuestion();

  const { mutate } = api.quizSession.updateSessionQuestion.useMutation({
    onSuccess: (data) => setCurrentQuestionId(data.currentQuestionId),
  });

  const onClickHandler = () => {
    if (nextQuestion) {
      mutate({ id, currentQuestionId: nextQuestion.id });
    }
  };

  return (
    <div className="flex w-full items-center justify-between gap-2">
      <H1 className="m-auto">Quizeroo</H1>

      <Button onClick={onClickHandler} disabled={userCount <= 0}>
        Start <CirclePlay className="ml-2 size-4" />
      </Button>
    </div>
  );
};
