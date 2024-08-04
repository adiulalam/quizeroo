import { CurrentQuestionContext } from "@/provider";
import { useContext } from "react";

export const useCurrentQuestion = () => {
  const context = useContext(CurrentQuestionContext);

  if (!context) {
    throw new Error(
      "useCurrentQuestion must be used within a CurrentQuestionContext",
    );
  }

  return context;
};
