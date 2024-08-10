import { createContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

type QuestionCountdownContextType = {
  counter: number;
  setCounter: Dispatch<SetStateAction<number>>;
};

export const QuestionCountdownContext = createContext<
  QuestionCountdownContextType | undefined
>(undefined);

export const QuestionCountdownProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [counter, setCounter] = useState(0);

  return (
    <QuestionCountdownContext.Provider
      value={{
        counter,
        setCounter,
      }}
    >
      {children}
    </QuestionCountdownContext.Provider>
  );
};
