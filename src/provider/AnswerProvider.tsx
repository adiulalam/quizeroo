import type { RouterOutputs } from "@/utils/api";
import { createContext } from "react";
import type { ReactNode } from "react";

type AnswerType =
  RouterOutputs["question"]["getQuestions"][number]["answers"][number];

type AnswerContextType = AnswerType & {
  index: number;
};

export const AnswerContext = createContext<AnswerContextType | undefined>(
  undefined,
);

export const AnswerProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: AnswerContextType;
}) => {
  return (
    <AnswerContext.Provider value={value}>{children}</AnswerContext.Provider>
  );
};
