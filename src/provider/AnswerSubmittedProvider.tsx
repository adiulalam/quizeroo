import { createContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

type AnswerSubmittedContextType = {
  isAnswerSubmitted: boolean;
  setIsAnswerSubmitted: Dispatch<SetStateAction<boolean>>;
};

export const AnswerSubmittedContext = createContext<
  AnswerSubmittedContextType | undefined
>(undefined);

export const AnswerSubmittedProvider = ({
  children,
  defaultIsAnswerSubmitted,
}: {
  children: ReactNode;
  defaultIsAnswerSubmitted: boolean;
}) => {
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(
    defaultIsAnswerSubmitted,
  );

  return (
    <AnswerSubmittedContext.Provider
      value={{ isAnswerSubmitted, setIsAnswerSubmitted }}
    >
      {children}
    </AnswerSubmittedContext.Provider>
  );
};
