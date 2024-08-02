import { createContext, useState } from "react";
import type { ReactNode } from "react";

type AnswerCounterContextType = {
  answerCount: number;
  setAnswerCount: React.Dispatch<React.SetStateAction<number>>;
};

export const AnswerCounterContext = createContext<
  AnswerCounterContextType | undefined
>(undefined);

export const AnswerCounterProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: number;
}) => {
  const [answerCount, setAnswerCount] = useState(value);

  return (
    <AnswerCounterContext.Provider value={{ answerCount, setAnswerCount }}>
      {children}
    </AnswerCounterContext.Provider>
  );
};
