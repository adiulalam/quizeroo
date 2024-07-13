import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  creatQuizHandler,
  getQuizzesHandler,
} from "@/server/controller/quiz.controller";
import { allQuizSchema, createQuizSchema } from "@/server/schema/quiz.schema";

export const quizRouter = createTRPCRouter({
  createQuiz: protectedProcedure
    .input(createQuizSchema)
    .mutation(({ input, ctx: { session } }) =>
      creatQuizHandler({ session, input }),
    ),
  getQuizzes: protectedProcedure
    .input(allQuizSchema)
    .query(({ input, ctx: { session } }) =>
      getQuizzesHandler({ session, input }),
    ),
});
