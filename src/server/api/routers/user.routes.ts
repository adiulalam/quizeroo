import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  updateTempUserHandler,
  getTempUserHandler,
  getUserQuizSessionHandler,
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
  getTempUser: protectedProcedure.query(({ ctx: { session } }) =>
    getTempUserHandler({
      session,
    }),
  ),
  getUserQuizSession: protectedProcedure.query(({ ctx: { session } }) =>
    getUserQuizSessionHandler({
      session,
    }),
  ),
});
