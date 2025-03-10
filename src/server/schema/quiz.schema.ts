import { z, type TypeOf } from "zod";
import { Filter, Order, Sort } from "@/types/Quiz.types";
import { Status } from "@prisma/client";

export const params = z.object({
  id: z.string().uuid(),
});

export const createQuizSchema = z.object({
  id: z.string().uuid().nullable(),
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z
    .string()
    .min(10, {
      message: "description must be at least 10 characters.",
    })
    .optional(),
  isFavourite: z.boolean().default(false),
});

export const allQuizSchema = z.object({
  sort: z.nativeEnum(Sort),
  filter: z.nativeEnum(Filter),
  order: z.nativeEnum(Order),
  cursor: z.string().nullish(),
});

export const getSearchSchema = z.object({
  title: z.string(),
});

export const updateQuizFavouriteSchema = z.object({
  params,
  body: z.object({
    isFavourite: z.boolean(),
  }),
});

export const updateQuizStatusSchema = z.object({
  params,
  body: z.object({
    status: z.nativeEnum(Status),
  }),
});

export type ParamsType = TypeOf<typeof params>;
export type GetSearchSchemaType = TypeOf<typeof getSearchSchema>;
export type CreateQuizSchemaType = TypeOf<typeof createQuizSchema>;
export type AllQuizSchemaType = TypeOf<typeof allQuizSchema>;
export type UpdateQuizFavouriteType = TypeOf<
  typeof updateQuizFavouriteSchema
>["body"];
export type UpdateQuizStatusType = TypeOf<
  typeof updateQuizStatusSchema
>["body"];
