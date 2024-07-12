import z from "zod";

export const createQuizSchema = z.object({
  id: z.string().uuid().nullable(),
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  isFavourite: z.boolean().default(false),
});

export type CreateQuizSchemaType = z.infer<typeof createQuizSchema>;
