import { createContext } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

type QuizDialogContextType = {
  id: null | string;
  title: string;
  isFavourite: boolean;
  isUpdate: boolean;
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  enableAi?: boolean;
  isPending: boolean;
  setIsPending: Dispatch<SetStateAction<boolean>>;
};

export const QuizDialogContext = createContext<
  QuizDialogContextType | undefined
>(undefined);

export const QuizDialogProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: QuizDialogContextType;
}) => {
  return (
    <QuizDialogContext.Provider value={value}>
      {children}
    </QuizDialogContext.Provider>
  );
};
