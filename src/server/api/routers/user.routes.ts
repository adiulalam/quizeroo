import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  updateTempUserHandler,
  getUserHandler,
} from "@/server/controller/user.controller";
import { mutateTempUserSchema } from "@/server/schema/user.schema";

export const userRouter = createTRPCRouter({
  updateTempUser: protectedProcedure
    .input(mutateTempUserSchema)
    .mutation(({ input, ctx: { session } }) =>
      updateTempUserHandler({
        session,
        input,
      }),
    ),
  getUser: protectedProcedure.query(({ ctx: { session } }) =>
    getUserHandler({
      session,
    }),
  ),
});
