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

export type ParamsType = TypeOf<typeof params>;
export type MutateTempUserSchemaType = TypeOf<typeof mutateTempUserSchema>;
