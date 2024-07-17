import { QuestionFormContext } from "@/provider";
import { useContext } from "react";

export const useQuestionForm = () => {
  const context = useContext(QuestionFormContext);

  if (!context) {
    throw new Error(
      "useQuestionForm must be used within a QuestionFormProvider",
    );
  }

  return context;
};
