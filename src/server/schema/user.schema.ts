import { z, type TypeOf } from "zod";
import { Gender } from "@prisma/client";

export const params = z.object({
  id: z.string().uuid(),
});

export const mutateTempUserSchema = z.object({
  name: z.string().min(2, {
    message: "Name must have 2 characters ",
  }),
  quizSessionId: z.string().uuid(),
});

export const joinQuizSessionSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  quizSessionId: z.string().uuid(),
});

export const updateUserProfileSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  image: z.string().url({ message: "Please enter a valid URL." }).nullable(),
  phone: z
    .string()
    .max(15, {
      message: "Phone must not be longer than 15 characters.",
    })
    .nullable(),
  gender: z.nativeEnum(Gender, { message: "Gender is required" }).nullable(),
  dateOfBirth: z.date({ message: "Date is required" }).nullable(),
});

export type ParamsType = TypeOf<typeof params>;
export type MutateTempUserSchemaType = TypeOf<typeof mutateTempUserSchema>;
export type JoinQuizSessionSchemaType = TypeOf<typeof joinQuizSessionSchema>;
export type UpdateUserProfileSchemaType = TypeOf<
  typeof updateUserProfileSchema
>;
