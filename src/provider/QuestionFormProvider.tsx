import type { mutationQuestionsSchemaType } from "@/components/quizMutation/StepQuestions";
import { createContext } from "react";
import type { ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";

type MutateQuizContext = UseFormReturn<mutationQuestionsSchemaType>;

export const QuestionFormContext = createContext<MutateQuizContext | undefined>(
  undefined,
);

export const QuestionFormProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: MutateQuizContext;
}) => {
  return (
    <QuestionFormContext.Provider value={value}>
      {children}
    </QuestionFormContext.Provider>
  );
};
