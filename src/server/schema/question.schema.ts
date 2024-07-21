import { z, type TypeOf } from "zod";

export const params = z.object({
  id: z.string().uuid(),
});

export const createQuestionSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(8, {
    message: "Question title must be at least 8 characters.",
  }),
  answers: z
    .object({
      id: z.string().uuid(),
      name: z.string().min(8, {
        message: "Question title must be at least 8 characters.",
      }),
      isCorrect: z.boolean({
        message: "Correct value must be true or false.",
      }),
    })
    .array(),
});

export const updateQuestionOrderSchema = z
  .object({
    id: z.string().uuid(),
    order: z.number(),
  })
  .array();

export const updateQuestionsSchema = createQuestionSchema.array();

export type ParamsType = TypeOf<typeof params>;
export type CreateQuestionSchemaType = TypeOf<typeof createQuestionSchema>;
export type UpdateQuestionsSchemaType = TypeOf<typeof updateQuestionsSchema>;
export type UpdateQuestionOrderSchemaType = TypeOf<
  typeof updateQuestionOrderSchema
>;
