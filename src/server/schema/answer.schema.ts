import { z, type TypeOf } from "zod";

export const params = z.object({
  id: z.string().uuid(),
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
