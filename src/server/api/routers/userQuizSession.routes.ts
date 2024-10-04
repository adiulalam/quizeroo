import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getSessionScoreHandler } from "@/server/controller/userQuizSession.controller";
import { params } from "@/server/schema/userQuizSession.schema";

export const userQuizSessionRouter = createTRPCRouter({
  getSessionScore: protectedProcedure
    .input(params)
    .query(({ input, ctx: { session } }) =>
      getSessionScoreHandler({
        session,
        params: input,
      }),
    ),
});
