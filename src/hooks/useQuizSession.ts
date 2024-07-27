import { QuizSessionContext } from "@/provider";
import { useContext } from "react";

export const useQuizSession = () => {
  const context = useContext(QuizSessionContext);

  if (!context) {
    throw new Error("useQuizSession must be used within a QuizSessionProvider");
  }

  return context;
};
