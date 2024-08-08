import { z, type TypeOf } from "zod";

export const params = z.object({
  id: z.string().uuid(),
});

export const getSessionNameSchema = z.object({
  roomName: z.string().min(2, {
    message: "Room name must be at least 2 characters.",
  }),
});

export const streamQuizSessionSchema = z.object({
  id: z.string().uuid(),
  currentQuestionId: z.string().uuid(),
});

export const updateSessionQuestionSchema = z
  .object({
    showSubmission: z.boolean(),
  })
  .merge(streamQuizSessionSchema);

export const updateCountdownSchema = z
  .object({
    countdown: z.number(),
  })
  .merge(streamQuizSessionSchema);

export type ParamsType = TypeOf<typeof params>;
export type GetSessionNameSchemaType = TypeOf<typeof getSessionNameSchema>;
export type UpdateSessionQuestionType = TypeOf<
  typeof updateSessionQuestionSchema
>;
export type UpdateCountDownType = TypeOf<typeof updateCountdownSchema>;
