import { AnswerCounterContext } from "@/provider";
import { useContext } from "react";

export const useAnswerCounter = () => {
  const context = useContext(AnswerCounterContext);

  if (!context) {
    throw new Error(
      "useAnswerCounter must be used within a AnswerCounterProvider",
    );
  }

  return context;
};
