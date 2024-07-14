import { z, type TypeOf } from "zod";
import { Filter, Order, Sort } from "@/types/Quiz.types";

export const params = z.object({
  id: z.string().uuid(),
});

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
  order: z.nativeEnum(Order),
  cursor: z.string().nullish(),
});

export const updateQuizFavouriteSchema = z.object({
  params,
  body: z.object({
    isFavourite: z.boolean(),
  }),
});

export type ParamsType = TypeOf<typeof params>;
export type CreateQuizSchemaType = TypeOf<typeof createQuizSchema>;
export type AllQuizSchemaType = TypeOf<typeof allQuizSchema>;
export type UpdateQuizFavouriteType = TypeOf<
  typeof updateQuizFavouriteSchema
>["body"];
