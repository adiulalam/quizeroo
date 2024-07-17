import type { CreateQuizSchemaType } from "@/server/schema/quiz.schema";
import type { RouterOutputs } from "@/utils/api";
import { createContext } from "react";
import type { ReactNode } from "react";

export type ViewQuestionsType = RouterOutputs["question"]["getQuestions"];

type MutateQuizContext = Omit<CreateQuizSchemaType, "id"> & {
  id: string;
  questions: ViewQuestionsType;
};

export const MutateQuizContext = createContext<MutateQuizContext | undefined>(
  undefined,
);

export const MutateQuizProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: MutateQuizContext;
}) => {
  return (
    <MutateQuizContext.Provider value={value}>
      {children}
    </MutateQuizContext.Provider>
  );
};
