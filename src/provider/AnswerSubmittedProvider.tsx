import type { RouterOutputs } from "@/utils/api";
import { createContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

type JoinOutputType = NonNullable<
  NonNullable<RouterOutputs["user"]["getTempUser"]["quizSession"]>["question"]
>["userAnswers"];

type AnswerSubmittedContextType = {
  isAnswerSubmitted: boolean;
  setIsAnswerSubmitted: Dispatch<SetStateAction<boolean>>;
  isAnswerCorrect: boolean;
  setIsAnswerCorrect: Dispatch<SetStateAction<boolean>>;
};

export const AnswerSubmittedContext = createContext<
  AnswerSubmittedContextType | undefined
>(undefined);

export const AnswerSubmittedProvider = ({
  children,
  userAnswers,
}: {
  children: ReactNode;
  userAnswers: JoinOutputType;
}) => {
  const defaultIsAnswerSubmitted = !!(userAnswers && userAnswers.length > 0);

  const defaultIsAnswerCorrect = !!userAnswers[0]?.answer.isCorrect;

  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(
    defaultIsAnswerSubmitted,
  );

  const [isAnswerCorrect, setIsAnswerCorrect] = useState(
    defaultIsAnswerCorrect,
  );

  return (
    <AnswerSubmittedContext.Provider
      value={{
        isAnswerSubmitted,
        setIsAnswerSubmitted,
        isAnswerCorrect,
        setIsAnswerCorrect,
      }}
    >
      {children}
    </AnswerSubmittedContext.Provider>
  );
};
