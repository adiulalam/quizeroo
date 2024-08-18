import { api } from "@/utils/api";
import { Button } from "../ui/Button";
import { ArrowRight, CirclePlay, Flag, SkipForward } from "lucide-react";
import { useAnswerCounter, useCurrentQuestion, useQuizSession } from "@/hooks";

export const ServeButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  const { id } = useQuizSession();
  const { setAnswerCount, setAnswers } = useAnswerCounter();

  const {
    setCurrentQuestionId,
    setShowSubmission,
    nextQuestion,
    showSubmission,
    currentQuestionId,
    isFinished,
    hasNextQuestion,
  } = useCurrentQuestion();

  const { mutate } = api.quizSession.updateSessionQuestion.useMutation({
    onSuccess: (data) => {
      setCurrentQuestionId(data.currentQuestionId);
      setShowSubmission(data.showSubmission);

      // Reset user submission count on chart page when clicking on next
      if (!data.showSubmission) {
        setAnswerCount(0);
        setAnswers([]);
      }
    },
  });

  const onClickHandler = () => {
    if (isFinished) return;

    if (currentQuestionId && !showSubmission) {
      // chart page
      mutate({
        id,
        showSubmission: true,
        currentQuestionId: currentQuestionId,
      });
    } else if (nextQuestion) {
      // question page
      mutate({ id, showSubmission: false, currentQuestionId: nextQuestion.id });
    }
  };

  // todo: fix this nexted shit
  const Icon = !hasNextQuestion
    ? Flag
    : showSubmission
      ? ArrowRight
      : currentQuestionId
        ? SkipForward
        : CirclePlay;

  // todo: this too
  const text = !hasNextQuestion
    ? "Finish"
    : showSubmission
      ? "Next"
      : currentQuestionId
        ? "Skip"
        : "Start";

  if (isFinished) return null;

  return (
    <Button
      size="lg"
      className="h-9 px-6 sm:h-11 sm:px-8"
      onClick={onClickHandler}
      {...props}
    >
      {text}
      <Icon className="ml-2 size-4" />
    </Button>
  );
};
