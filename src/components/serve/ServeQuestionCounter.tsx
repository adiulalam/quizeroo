import { useCountDown, useCurrentQuestion, useQuizSession } from "@/hooks";
import { H1 } from "../ui/Typography";
import { api } from "@/utils/api";
import { useCallback } from "react";

export const ServeQuestionCounter = () => {
  const { id } = useQuizSession();
  const {
    currentQuestion,
    setCurrentQuestionId,
    setShowSubmission,
    currentQuestionId,
  } = useCurrentQuestion();

  const { mutate } = api.quizSession.updateSessionQuestion.useMutation({
    onSuccess: (data) => {
      setCurrentQuestionId(data.currentQuestionId);
      setShowSubmission(data.showSubmission);
    },
  });

  const callback = useCallback(() => {
    if (currentQuestionId) {
      mutate({
        id,
        showSubmission: true,
        currentQuestionId: currentQuestionId,
      });
    }
  }, [currentQuestionId, id, mutate]);

  const counter = useCountDown({
    start: currentQuestion ? currentQuestion.countdown : 30,
    callback,
  });

  return (
    <div className="flex size-16 items-center justify-center rounded-full bg-muted/80 sm:size-32">
      <H1>{counter}</H1>
    </div>
  );
};
