import { useQuizSession } from "@/hooks";
import { useMemo } from "react";

export const useCurrentQuestion = () => {
  const {
    currentQuestionId,
    quiz: { questions },
  } = useQuizSession();

  const questionProperty = useMemo(() => {
    const totalQuestionLength = questions.length;

    const isWaiting = !currentQuestionId;

    const currentIndex = questions.findIndex(
      (question) => question.id === currentQuestionId,
    );

    const currentQuestionIndex = currentIndex + 1;

    const currentQuestion = currentIndex >= 0 ? questions[currentIndex] : null;

    const nextQuestion =
      currentIndex < questions.length - 1 ? questions[currentIndex + 1] : null;

    const hasNextQuestion = currentIndex < questions.length - 1;

    return {
      totalQuestionLength,
      currentQuestionIndex,
      isWaiting,
      currentQuestion,
      nextQuestion,
      hasNextQuestion,
    };
  }, [currentQuestionId, questions]);

  return questionProperty;
};
