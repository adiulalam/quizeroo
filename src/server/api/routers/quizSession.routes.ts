import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import {
  getSessionNameHandler,
  updateQuizSessionHandler,
} from "@/server/controller/quizSession.controller";
import { params } from "@/server/schema/quiz.schema";
import { getSessionNameSchema } from "@/server/schema/quizSession.schema";

export const quizSessionRouter = createTRPCRouter({
  updateQuizSession: protectedProcedure
    .input(params)
    .mutation(({ input, ctx: { session } }) =>
      updateQuizSessionHandler({
        session,
        params: input,
      }),
    ),
  getSessionName: publicProcedure
    .input(getSessionNameSchema)
    .mutation(({ input }) =>
      getSessionNameHandler({
        input,
      }),
    ),
});
