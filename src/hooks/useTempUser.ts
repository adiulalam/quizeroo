import { QuizTempUserContext } from "@/provider";
import { useContext } from "react";

export const useQuizTempUser = () => {
  const context = useContext(QuizTempUserContext);

  if (!context) {
    throw new Error(
      "useQuizTempUser must be used within a QuizTempUserProvider",
    );
  }

  return context;
};
