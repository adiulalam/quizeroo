import { api } from "@/utils/api";
import { Button } from "../ui/Button";
import {
  ArrowRight,
  CirclePlay,
  Flag,
  SkipForward,
  type LucideIcon,
} from "lucide-react";
import { useAnswerCounter, useCurrentQuestion, useQuizSession } from "@/hooks";
import { useMemo } from "react";

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

  const { Icon, text } = useMemo<{ text: string; Icon: LucideIcon }>(() => {
    // No next question, quiz finish
    if (!hasNextQuestion) return { text: "Finish", Icon: Flag };

    // Quiz chart page, show next button
    if (showSubmission) return { text: "Next", Icon: ArrowRight };

    // Quiz in progress page, can skip
    if (currentQuestionId) return { text: "Skip", Icon: SkipForward };

    // Must be in the start page
    return { text: "Start", Icon: CirclePlay };
  }, [hasNextQuestion, showSubmission, currentQuestionId]);

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
