import { z, type TypeOf } from "zod";

export const params = z.object({
  id: z.string().uuid(),
});

export const mutateTempUserSchema = z.object({
  name: z.string().min(2, {
    message: "Name must have 2 characters ",
  }),
  quizSessionId: z.string().uuid(),
});

export const joinQuizSessionSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  quizSessionId: z.string().uuid(),
});

export type ParamsType = TypeOf<typeof params>;
export type MutateTempUserSchemaType = TypeOf<typeof mutateTempUserSchema>;
export type JoinQuizSessionSchemaType = TypeOf<typeof joinQuizSessionSchema>;
