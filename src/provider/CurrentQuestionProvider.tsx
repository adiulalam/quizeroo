import type { RouterOutputs } from "@/utils/api";
import { createContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

type ServeOutputType =
  RouterOutputs["quizSession"]["getUserQuizSession"]["quiz"]["questions"][number];

type JoinOutputType = NonNullable<
  RouterOutputs["user"]["getTempUser"]["quizSession"]
>["quiz"]["questions"][number];

type CurrentQuestionType = {
  totalQuestionLength: number;
  currentQuestionIndex: number;
  isWaiting: boolean;
  currentQuestion: ServeOutputType | JoinOutputType | null | undefined;
  nextQuestion: ServeOutputType | JoinOutputType | null | undefined;
  hasNextQuestion: boolean;
  currentQuestionId: string | null;
  setCurrentQuestionId: React.Dispatch<React.SetStateAction<string | null>>;
};

export const CurrentQuestionContext = createContext<
  CurrentQuestionType | undefined
>(undefined);

type CurrentQuestionProviderType = {
  children: ReactNode;
  defaultCurrentQuestionId: string | null;
  questions: ServeOutputType[] | JoinOutputType[];
};

export const CurrentQuestionProvider = ({
  children,
  defaultCurrentQuestionId,
  questions,
}: CurrentQuestionProviderType) => {
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(
    defaultCurrentQuestionId,
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
