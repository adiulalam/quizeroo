import { AnswerContext } from "@/provider";
import { useContext } from "react";

export const useAnswer = () => {
  const context = useContext(AnswerContext);

  if (!context) {
    throw new Error("useAnswer must be used within a AnswerProvider");
  }

  return context;
};
