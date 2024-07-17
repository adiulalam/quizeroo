import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  createQuestionHandler,
  getQuestionsHandler,
} from "@/server/controller/question.controller";
import { params } from "@/server/schema/question.schema";

export const questionRouter = createTRPCRouter({
  getQuestions: protectedProcedure
    .input(params)
    .query(({ input, ctx: { session } }) =>
      getQuestionsHandler({ session, input }),
    ),
  createQuestion: protectedProcedure
    .input(params)
    .mutation(({ input, ctx: { session } }) =>
      createQuestionHandler({ session, input }),
    ),
});
