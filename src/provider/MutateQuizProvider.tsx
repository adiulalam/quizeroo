import type { CreateQuizSchemaType } from "@/server/schema/quiz.schema";
import { createContext } from "react";
import type { ReactNode } from "react";

type MutateQuizContext = Omit<CreateQuizSchemaType, "id"> & { id: string };

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
