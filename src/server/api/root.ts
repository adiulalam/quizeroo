import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { quizRouter } from "./routers/quiz.routes";
import { questionRouter } from "./routers/question.routes";
import { answerRouter } from "./routers/answer.routes";
import { quizSessionRouter } from "./routers/quizSession.routes";
import { userRouter } from "./routers/user.routes";
import { userAnswerRouter } from "./routers/userAnswer.routes";
import { dashboardRouter } from "./routers/dashboard.routes";
import { userQuizSessionRouter } from "./routers/userQuizSession.routes";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  quiz: quizRouter,
  question: questionRouter,
  answer: answerRouter,
  quizSession: quizSessionRouter,
  userQuizSession: userQuizSessionRouter,
  user: userRouter,
  userAnswer: userAnswerRouter,
  dashboard: dashboardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
