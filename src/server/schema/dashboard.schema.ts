import { z, type TypeOf } from "zod";
import { Interval } from "@/types/Dashboard.types";

export const getCardsSchema = z.object({
  interval: z.nativeEnum(Interval),
});

export type GetCardsSchemaType = TypeOf<typeof getCardsSchema>;
