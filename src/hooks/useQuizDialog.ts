import { QuizDialogContext } from "@/provider";
import { useContext } from "react";

export const useQuizDialog = () => {
  const context = useContext(QuizDialogContext);

  if (!context) {
    throw new Error("useQuizDialog must be used within a QuizDialogContext");
  }

  return context;
};
