import { z, type TypeOf } from "zod";

export const params = z.object({
  id: z.string().uuid(),
});

export const updateQuestionNameSchema = z.object({
  params,
  body: z.object({
    name: z.string().min(8),
  }),
});

export const createQuestionSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(8, {
      message: "Question title must be at least 8 characters.",
    }),
    answers: z
      .object({
        id: z.string().uuid(),
        name: z.string().min(1, {
          message: "Answer must be at least 1 characters.",
        }),
        isCorrect: z.boolean({
          message: "Correct value must be true or false.",
        }),
      })
      .array()
      .max(4, { message: "Maximium of 4 answers" }),
  })
  .array();

export const createAiQuestionSchema = z.object({
  data: z
    .object({
      name: z.string(),
      answers: z
        .object({
          name: z.string(),
          isCorrect: z.boolean(),
        })
        .array(),
    })
    .array(),
});

export const updateQuestionOrderSchema = z
  .object({
    id: z.string().uuid(),
    order: z.number(),
  })
  .array();

export const updateQuestionsSchema = createQuestionSchema;

export type ParamsType = TypeOf<typeof params>;
export type CreateQuestionSchemaType = TypeOf<typeof createQuestionSchema>;
export type UpdateQuestionsSchemaType = TypeOf<typeof updateQuestionsSchema>;
export type CreateAiQuestionSchemaType = TypeOf<typeof createAiQuestionSchema>;
export type UpdateQuestionOrderSchemaType = TypeOf<
  typeof updateQuestionOrderSchema
>;
export type UpdateQuestionNameSchemaType = TypeOf<
  typeof updateQuestionNameSchema
>["body"];
