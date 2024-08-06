import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { createUserAnswerHandler } from "@/server/controller/userAnswer.controller";
import {
  createUserAnswerSchema,
  streamUserAnswerSchema,
} from "@/server/schema/userAnswer.schema";
import { ee } from "./user.routes";
import { observable } from "@trpc/server/observable";
import type { UserAnswer } from "@prisma/client";

export const userAnswerRouter = createTRPCRouter({
  onSubmitAnswer: protectedProcedure
    .input(streamUserAnswerSchema)
    .subscription(({ input, ctx: { session } }) => {
      return observable<UserAnswer>((emit) => {
        const onSubmitAnswer = (data: UserAnswer) => {
          if (
            data.quizSessionId === input.quizSessionId &&
            data.questionId === input.questionId &&
            session.user.id
          ) {
            emit.next(data);
          }
        };
        ee.on("answer", onSubmitAnswer);
        return () => {
          ee.off("answer", onSubmitAnswer);
        };
      });
    }),
  createUserAnswer: protectedProcedure
    .input(createUserAnswerSchema)
    .mutation(async ({ input, ctx: { session } }) => {
      const userAnswer = await createUserAnswerHandler({
        session,
        input,
      });

      ee.emit("answer", userAnswer);

      return userAnswer;
    }),
});
