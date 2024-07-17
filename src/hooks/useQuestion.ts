import { QuestionContext } from "@/provider";
import { useContext } from "react";

export const useQuestion = () => {
  const context = useContext(QuestionContext);

  if (!context) {
    throw new Error("useQuestion must be used within a QuestionProvider");
  }

  return context;
};
