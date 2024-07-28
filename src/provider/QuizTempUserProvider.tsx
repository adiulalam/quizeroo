import type { RouterOutputs } from "@/utils/api";
import { createContext } from "react";
import type { ReactNode } from "react";

type QuizTempUserType = RouterOutputs["user"]["getTempUser"];

export const QuizTempUserContext = createContext<QuizTempUserType | undefined>(
  undefined,
);

export const QuizTempUserProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: QuizTempUserType;
}) => {
  return (
    <QuizTempUserContext.Provider value={value}>
      {children}
    </QuizTempUserContext.Provider>
  );
};
