import type { RouterOutputs } from "@/utils/api";
import { createContext } from "react";
import type { ReactNode } from "react";

type QuizSessionType = RouterOutputs["quizSession"]["getUserQuizSession"];

export const QuizSessionContext = createContext<QuizSessionType | undefined>(
  undefined,
);

export const QuizSessionProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: QuizSessionType;
}) => {
  return (
    <QuizSessionContext.Provider value={value}>
      {children}
    </QuizSessionContext.Provider>
  );
};
