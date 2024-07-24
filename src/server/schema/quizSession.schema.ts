import { z, type TypeOf } from "zod";

export const params = z.object({
  id: z.string().uuid(),
});

export const getSessionNameSchema = z.object({
  roomName: z.string().min(2, {
    message: "Room name must be at least 2 characters.",
  }),
});

export type ParamsType = TypeOf<typeof params>;
export type GetSessionNameSchemaType = TypeOf<typeof getSessionNameSchema>;
