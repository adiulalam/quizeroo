import { AnswerSubmittedContext } from "@/provider";
import { useContext } from "react";

export const useAnswerSubmitted = () => {
  const context = useContext(AnswerSubmittedContext);

  if (!context) {
    throw new Error(
      "useAnswerSubmitted must be used within a AnswerSubmittedProvider",
    );
  }

  return context;
};
