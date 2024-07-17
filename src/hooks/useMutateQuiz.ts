import { MutateQuizContext } from "@/provider";
import { useContext } from "react";

export const useMutateQuiz = () => {
  const context = useContext(MutateQuizContext);

  if (!context) {
    throw new Error("useMutateQuiz must be used within a MutateQuizProvider");
  }

  return context;
};
