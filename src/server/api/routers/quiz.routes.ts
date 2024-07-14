import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  creatQuizHandler,
  getQuizzesHandler,
  updateQuizFavouriteHandler,
} from "@/server/controller/quiz.controller";
import {
  allQuizSchema,
  createQuizSchema,
  updateQuizFavouriteSchema,
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
  updateFormFavourite: protectedProcedure
    .input(updateQuizFavouriteSchema)
    .mutation(({ input, ctx: { session } }) =>
      updateQuizFavouriteHandler({
        session,
        params: input.params,
        input: input.body,
      }),
    ),
});
