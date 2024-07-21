import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  createQuizHandler,
  deleteQuizHandler,
  getQuizzesHandler,
  searchQuizzesHandler,
  updateQuizFavouriteHandler,
  updateQuizStatusHandler,
} from "@/server/controller/quiz.controller";
import {
  allQuizSchema,
  createQuizSchema,
  getSearchSchema,
  params,
  updateQuizFavouriteSchema,
  updateQuizStatusSchema,
} from "@/server/schema/quiz.schema";

export const quizRouter = createTRPCRouter({
  createQuiz: protectedProcedure
    .input(createQuizSchema)
    .mutation(({ input, ctx: { session } }) =>
      createQuizHandler({ session, input }),
    ),
  getQuizzes: protectedProcedure
    .input(allQuizSchema)
    .query(({ input, ctx: { session } }) =>
      getQuizzesHandler({ session, input }),
    ),
  searchQuizzes: protectedProcedure
    .input(getSearchSchema)
    .query(({ input, ctx: { session } }) =>
      searchQuizzesHandler({ session, input }),
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
