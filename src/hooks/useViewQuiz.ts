import { ViewQuizContext } from "@/provider";
import { useContext } from "react";

export const useViewQuiz = () => {
  const context = useContext(ViewQuizContext);
  if (!context) {
    throw new Error("useViewQuiz must be used within a ViewQuizProvider");
  }
  return context;
};
