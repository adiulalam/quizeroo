import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  creatQuizHandler,
  deleteQuizHandler,
  getQuizzesHandler,
  updateQuizFavouriteHandler,
  updateQuizStatusHandler,
} from "@/server/controller/quiz.controller";
import {
  allQuizSchema,
  createQuizSchema,
  params,
  updateQuizFavouriteSchema,
  updateQuizStatusSchema,
} from "@/server/schema/quiz.schema";

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
  updateQuizFavourite: protectedProcedure
    .input(updateQuizFavouriteSchema)
    .mutation(({ input, ctx: { session } }) =>
      updateQuizFavouriteHandler({
        session,
        params: input.params,
        input: input.body,
      }),
    ),
  updateQuizStatus: protectedProcedure
    .input(updateQuizStatusSchema)
    .mutation(({ input, ctx: { session } }) =>
      updateQuizStatusHandler({
        session,
        params: input.params,
        input: input.body,
      }),
    ),
  deleteQuiz: protectedProcedure
    .input(params)
    .mutation(({ input, ctx: { session } }) =>
      deleteQuizHandler({ session, input }),
    ),
});
