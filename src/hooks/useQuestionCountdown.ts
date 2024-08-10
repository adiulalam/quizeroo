import { QuestionCountdownContext } from "@/provider";
import { useContext } from "react";

export const useQuestionCountdown = () => {
  const context = useContext(QuestionCountdownContext);

  if (!context) {
    throw new Error(
      "useQuestionCountdown must be used within a QuestionCountdownProvider",
    );
  }

  return context;
};
