import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  createAnswerHandler,
  deleteAnswerHandler,
  updateAnswerNameHandler,
  updateAnswerOrderHandler,
  updateAnswerToggleHandler,
} from "@/server/controller/answer.controller";
import {
  params,
  updateAnswerNameSchema,
  updateAnswerOrderSchema,
  updateAnswerToggleSchema,
} from "@/server/schema/answer.schema";

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
  updateAnswerName: protectedProcedure
    .input(updateAnswerNameSchema)
    .mutation(({ input, ctx: { session } }) =>
      updateAnswerNameHandler({
        session,
        params: input.params,
        input: input.body,
      }),
    ),
  updateAnswerToggle: protectedProcedure
    .input(updateAnswerToggleSchema)
    .mutation(({ input, ctx: { session } }) =>
      updateAnswerToggleHandler({
        session,
        params: input.params,
        input: input.body,
      }),
    ),
});
