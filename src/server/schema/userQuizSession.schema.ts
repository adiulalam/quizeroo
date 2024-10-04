import { z, type TypeOf } from "zod";

export const params = z.object({
  id: z.string().uuid(),
});

export type ParamsType = TypeOf<typeof params>;
