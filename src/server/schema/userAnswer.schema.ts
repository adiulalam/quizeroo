import { z, type TypeOf } from "zod";

export const params = z.object({
  id: z.string().uuid(),
});

export const streamUserAnswerSchema = z.object({
  quizSessionId: z.string().uuid(),
  questionId: z.string().uuid(),
});

export const createUserAnswerSchema = z
  .object({
    answerId: z.string().uuid(),
  })
  .merge(streamUserAnswerSchema);

export type ParamsType = TypeOf<typeof params>;
export type CreateUserAnswerSchemaType = TypeOf<typeof createUserAnswerSchema>;
export type StreamUserAnswerSchemaType = TypeOf<typeof streamUserAnswerSchema>;
