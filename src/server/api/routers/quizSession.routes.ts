import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { updateQuizSessionHandler } from "@/server/controller/quizSession.controller";
import { params } from "@/server/schema/quiz.schema";

export const quizSessionRouter = createTRPCRouter({
  updateQuizSession: protectedProcedure
    .input(params)
    .mutation(({ input, ctx: { session } }) =>
      updateQuizSessionHandler({
        session,
        params: input,
      }),
    ),
});
