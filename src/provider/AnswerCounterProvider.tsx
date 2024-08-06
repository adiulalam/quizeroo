import type { UserAnswer } from "@prisma/client";
import { createContext, useState } from "react";
import type { ReactNode } from "react";

type AnswerCounterContextType = {
  answerCount: number;
  setAnswerCount: React.Dispatch<React.SetStateAction<number>>;
  answers: UserAnswer[];
  setAnswers: React.Dispatch<React.SetStateAction<UserAnswer[]>>;
};

export const AnswerCounterContext = createContext<
  AnswerCounterContextType | undefined
>(undefined);

export const AnswerCounterProvider = ({
  children,
  defaultCount,
  defaultAnswers,
}: {
  children: ReactNode;
  defaultCount: number;
  defaultAnswers: UserAnswer[];
}) => {
  const [answerCount, setAnswerCount] = useState(defaultCount);
  const [answers, setAnswers] = useState<UserAnswer[]>(defaultAnswers);

  return (
    <AnswerCounterContext.Provider
      value={{ answerCount, setAnswerCount, answers, setAnswers }}
    >
      {children}
    </AnswerCounterContext.Provider>
  );
};
