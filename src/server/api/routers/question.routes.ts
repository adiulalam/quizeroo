import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  createQuestionHandler,
  deleteQuestionHandler,
  getQuestionsHandler,
  updateQuestionNameHandler,
  updateQuestionOrderHandler,
  updateQuestionsHandler,
} from "@/server/controller/question.controller";
import {
  params,
  updateQuestionNameSchema,
  updateQuestionOrderSchema,
  updateQuestionsSchema,
} from "@/server/schema/question.schema";

export const questionRouter = createTRPCRouter({
  getQuestions: protectedProcedure
    .input(params)
    .query(({ input, ctx: { session } }) =>
      getQuestionsHandler({ session, input }),
    ),
  createQuestion: protectedProcedure
    .input(params)
    .mutation(({ input, ctx: { session } }) =>
      createQuestionHandler({
        session,
        params: input,
      }),
    ),
  deleteQuestion: protectedProcedure
    .input(params)
    .mutation(({ input, ctx: { session } }) =>
      deleteQuestionHandler({
        session,
        params: input,
      }),
    ),
  updateQuestionOrder: protectedProcedure
    .input(updateQuestionOrderSchema)
    .mutation(({ input, ctx: { session } }) =>
      updateQuestionOrderHandler({
        session,
        input,
      }),
    ),
  updateQuestions: protectedProcedure
    .input(updateQuestionsSchema)
    .mutation(({ input, ctx: { session } }) =>
      updateQuestionsHandler({
        session,
        input,
      }),
    ),
  updateQuestionName: protectedProcedure
    .input(updateQuestionNameSchema)
    .mutation(({ input, ctx: { session } }) =>
      updateQuestionNameHandler({
        session,
        params: input.params,
        input: input.body,
      }),
    ),
});
