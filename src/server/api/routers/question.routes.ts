import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  createQuestionHandler,
  deleteQuestionHandler,
  getQuestionsHandler,
} from "@/server/controller/question.controller";
import {
  params,
  updateQuestionOrderSchema,
} from "@/server/schema/question.schema";

export const questionRouter = createTRPCRouter({
  getQuestions: protectedProcedure
    .input(params)
    .query(({ input, ctx: { session } }) =>
      getQuestionsHandler({ session, input }),
    ),
  createQuestion: protectedProcedure
    .input(updateQuestionOrderSchema)
    .mutation(({ input, ctx: { session } }) =>
      createQuestionHandler({
        session,
        params: input.params,
        input: input.body,
      }),
    ),
  deleteQuestion: protectedProcedure
    .input(updateQuestionOrderSchema)
    .mutation(({ input, ctx: { session } }) =>
      deleteQuestionHandler({
        session,
        params: input.params,
        input: input.body,
      }),
    ),
});
