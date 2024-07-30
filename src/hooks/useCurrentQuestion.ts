import { useQuizSession } from "@/hooks";
import { useMemo } from "react";

export const useCurrentQuestion = () => {
  const {
    currentQuestionId,
    quiz: { questions },
  } = useQuizSession();

  const questionProperty = useMemo(() => {
    const isWaiting = !currentQuestionId;

    const currentIndex = questions.findIndex(
      (question) => question.id === currentQuestionId,
    );

    const currentQuestion = currentIndex >= 0 ? questions[currentIndex] : null;

    const nextQuestion =
      currentIndex < questions.length - 1 ? questions[currentIndex + 1] : null;

    const hasNextQuestion = currentIndex < questions.length - 1;

    return { isWaiting, currentQuestion, nextQuestion, hasNextQuestion };
  }, [currentQuestionId, questions]);

  return questionProperty;
};
