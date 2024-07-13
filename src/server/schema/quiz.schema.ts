import { z, type TypeOf } from "zod";
import { Filter, Sort } from "@/types/Quiz.types";

export const createQuizSchema = z.object({
  id: z.string().uuid().nullable(),
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  isFavourite: z.boolean().default(false),
});

export const allQuizSchema = z.object({
  sort: z.nativeEnum(Sort),
  filter: z.nativeEnum(Filter),
  cursor: z.string().nullish(),
});

export type CreateQuizSchemaType = TypeOf<typeof createQuizSchema>;
export type AllQuizSchemaType = TypeOf<typeof allQuizSchema>;
