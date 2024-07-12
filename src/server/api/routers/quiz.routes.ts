import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { creatQuizHandler } from "@/server/controller/form.controller";
import { createQuizSchema } from "@/server/schema/quiz.schema";

export const quizRouter = createTRPCRouter({
  createQuiz: protectedProcedure
    .input(createQuizSchema)
    .mutation(({ input, ctx: { session } }) =>
      creatQuizHandler({ session, input }),
    ),
});
