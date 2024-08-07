import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import {
  getSessionNameHandler,
  getUserQuizSessionHandler,
  updateQuizSessionHandler,
  updateSessionQuestionHandler,
} from "@/server/controller/quizSession.controller";
import {
  getSessionNameSchema,
  updateSessionQuestionSchema,
  params,
  type UpdateSessionQuestionType,
} from "@/server/schema/quizSession.schema";
import { observable } from "@trpc/server/observable";
import { ee } from "./user.routes";

export const quizSessionRouter = createTRPCRouter({
  onNextQuestion: protectedProcedure
    .input(params)
    .subscription(({ input, ctx: { session } }) => {
      return observable<UpdateSessionQuestionType>((emit) => {
        const onNextQuestion = (data: UpdateSessionQuestionType) => {
          if (data.id === input.id && session.user.id) {
            emit.next(data);
          }
        };
        ee.on("nextQuestion", onNextQuestion);
        return () => {
          ee.off("nextQuestion", onNextQuestion);
        };
      });
    }),
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
  getUserQuizSession: protectedProcedure
    .input(params)
    .query(({ input, ctx: { session } }) =>
      getUserQuizSessionHandler({
        session,
        params: input,
      }),
    ),
  updateSessionQuestion: protectedProcedure
    .input(updateSessionQuestionSchema)
    .mutation(async ({ input, ctx: { session } }) => {
      const quizSession = await updateSessionQuestionHandler({
        session,
        input,
      });

      if (quizSession.currentQuestionId) {
        const nextQuestionParams: UpdateSessionQuestionType = {
          id: quizSession.id,
          currentQuestionId: quizSession.currentQuestionId,
          showSubmission: quizSession.showSubmission,
        };

        ee.emit("nextQuestion", nextQuestionParams);
      }

      return quizSession;
    }),
});
