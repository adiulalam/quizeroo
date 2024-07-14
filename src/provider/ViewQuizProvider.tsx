import type { ViewQuizType } from "@/types/Quiz.types";
import { createContext } from "react";
import type { ReactNode } from "react";

export const ViewQuizContext = createContext<ViewQuizType | undefined>(
  undefined,
);

export const ViewQuizProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: ViewQuizType;
}) => {
  return (
    <ViewQuizContext.Provider value={value}>
      {children}
    </ViewQuizContext.Provider>
  );
};
