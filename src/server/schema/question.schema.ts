import { z, type TypeOf } from "zod";

export const params = z.object({
  id: z.string().uuid(),
});

export const createQuestionSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(8, {
    message: "Question title must be at least 8 characters.",
  }),
});

export type ParamsType = TypeOf<typeof params>;
export type CreateQuestionSchemaType = TypeOf<typeof createQuestionSchema>;
