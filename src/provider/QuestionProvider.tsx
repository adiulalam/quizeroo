import type { RouterOutputs } from "@/utils/api";
import { createContext } from "react";
import type { ReactNode } from "react";
import type { FieldArrayWithId } from "react-hook-form";

type QuestionType = RouterOutputs["question"]["getQuestions"][number];

type QuestionContextType = FieldArrayWithId<QuestionType> & { index: number };

export const QuestionContext = createContext<QuestionContextType | undefined>(
  undefined,
);

export const QuestionProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: QuestionContextType;
}) => {
  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
};
