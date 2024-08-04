import { useQuizSession } from "@/hooks";
import type { RouterOutputs } from "@/utils/api";
import { createContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

type CurrentQuestionOutputType =
  RouterOutputs["quizSession"]["getUserQuizSession"]["quiz"]["questions"][number];

type CurrentQuestionType = {
  totalQuestionLength: number;
  currentQuestionIndex: number;
  isWaiting: boolean;
  currentQuestion: CurrentQuestionOutputType | null | undefined;
  nextQuestion: CurrentQuestionOutputType | null | undefined;
  hasNextQuestion: boolean;
} & CurrentQuestionProviderType;

type CurrentQuestionProviderType = {
  currentQuestionId: string | null;
  setCurrentQuestionId: React.Dispatch<React.SetStateAction<string | null>>;
};

export const CurrentQuestionContext = createContext<
  CurrentQuestionType | undefined
>(undefined);

export const CurrentQuestionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const {
    quiz: { questions },
    ...rest
  } = useQuizSession();

  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(
    rest.currentQuestionId,
  );

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
      currentQuestionId,
      setCurrentQuestionId,
    };
  }, [currentQuestionId, questions, setCurrentQuestionId]);

  return (
    <CurrentQuestionContext.Provider value={questionProperty}>
      {children}
    </CurrentQuestionContext.Provider>
  );
};
