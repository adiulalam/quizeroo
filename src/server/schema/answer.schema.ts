import { z, type TypeOf } from "zod";

export const params = z.object({
  id: z.string().uuid(),
});

export const updateAnswerNameSchema = z.object({
  params,
  body: z.object({
    name: z.string().min(8),
  }),
});

export const updateAnswerToggleSchema = z.object({
  params,
  body: z.object({
    isCorrect: z.boolean(),
  }),
});

export const updateAnswerOrderSchema = z
  .object({
    id: z.string().uuid(),
    order: z.number(),
  })
  .array();

export type ParamsType = TypeOf<typeof params>;
export type UpdateAnswerOrderSchemaType = TypeOf<
  typeof updateAnswerOrderSchema
>;
export type UpdateAnswerNameSchemaType = TypeOf<
  typeof updateAnswerNameSchema
>["body"];
export type UpdateAnswerToggleSchemaType = TypeOf<
  typeof updateAnswerToggleSchema
>["body"];
