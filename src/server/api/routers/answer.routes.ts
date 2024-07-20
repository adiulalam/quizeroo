import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  createAnswerHandler,
  deleteAnswerHandler,
  updateAnswerOrderHandler,
} from "@/server/controller/answer.controller";
import { params, updateAnswerOrderSchema } from "@/server/schema/answer.schema";

export const answerRouter = createTRPCRouter({
  createAnswer: protectedProcedure
    .input(params)
    .mutation(({ input, ctx: { session } }) =>
      createAnswerHandler({
        session,
        params: input,
      }),
    ),
  deleteAnswer: protectedProcedure
    .input(params)
    .mutation(({ input, ctx: { session } }) =>
      deleteAnswerHandler({
        session,
        params: input,
      }),
    ),
  updateAnswerOrder: protectedProcedure
    .input(updateAnswerOrderSchema)
    .mutation(({ input, ctx: { session } }) =>
      updateAnswerOrderHandler({
        session,
        input,
      }),
    ),
});
