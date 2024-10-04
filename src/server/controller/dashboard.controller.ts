import { type Session } from "next-auth";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { db } from "../db";
import type { GetCardsSchemaType } from "../schema/dashboard.schema";
import type dynamicIconImports from "lucide-react/dynamicIconImports";
import { type DashboardColumnType, Interval } from "@/types/Dashboard.types";
import {
  calculatePercentageChange,
  generateMonthDetailsArray,
  getPercentageSign,
  getTimeFrame,
  roundIfNessesary,
} from "@/utils/functions";

type DashCardType = {
  id: number;
  title: string;
  icon: keyof typeof dynamicIconImports;
  data: string;
  description: string | null;
};

export const getDashboardCardsHandler = async ({
  input,
  session,
}: {
  input: GetCardsSchemaType;
  session: Session;
}) => {
  try {
    const userId = session.user.id;
    const { interval } = input;
    const isAll = interval === Interval.all;

    const { startTime, endTime, previousStartTime, previousEndTime } =
      getTimeFrame(interval);

    // Helper to generate card description
    const createDescription = (
      currentValue: number,
      previousValue: number,
    ): DashCardType["description"] => {
      const percentageChange = calculatePercentageChange(
        currentValue,
        previousValue,
      );
      return isAll
        ? null
        : `${getPercentageSign(percentageChange)}${Math.abs(percentageChange).toFixed(1)}% from last ${interval}`;
    };

    const createCountQuery = (
      model: "quiz" | "question" | "userAnswer" | "user" | "quizSession",
      conditions: object,
      isCurrent: boolean,
    ) => {
      return db[model as "quiz"].count({
        where: {
          ...conditions,
          createdAt: {
            gte: isCurrent ? startTime : previousStartTime,
            lte: isCurrent ? endTime : previousEndTime,
          },
        },
      });
    };
    // Queries for current and previous counts
    const quizCurr = createCountQuery("quiz", { userId }, true);
    const quizPrev = createCountQuery("quiz", { userId }, false);

    const questionCurr = createCountQuery(
      "question",
      { quiz: { userId } },
      true,
    );
    const questionPrev = createCountQuery(
      "question",
      { quiz: { userId } },
      false,
    );

    const correctAnsCurr = createCountQuery(
      "userAnswer",
      { answer: { isCorrect: true }, quizSession: { userId } },
      true,
    );
    const correctAnsPrev = createCountQuery(
      "userAnswer",
      { answer: { isCorrect: true }, quizSession: { userId } },
      false,
    );

    const tempUsersCurr = createCountQuery(
      "user",
      { quizSessions: { every: { userId } }, NOT: { id: userId } },
      true,
    );
    const tempUsersPrev = createCountQuery(
      "user",
      { quizSessions: { every: { userId } }, NOT: { id: userId } },
      false,
    );

    const quizSessCurr = createCountQuery("quizSession", { userId }, true);
    const quizSessPrev = createCountQuery("quizSession", { userId }, false);

    // Execute all queries in a transaction
    const [
      quizCurrResult,
      quizPrevResult,
      questionCurrResult,
      questionPrevResult,
      correctAnsCurrResult,
      correctAnsPrevResult,
      tempUsersCurrResult,
      tempUsersPrevResult,
      quizSessCurrResult,
      quizSessPrevResult,
    ] = await db.$transaction([
      quizCurr,
      quizPrev,
      questionCurr,
      questionPrev,
      correctAnsCurr,
      correctAnsPrev,
      tempUsersCurr,
      tempUsersPrev,
      quizSessCurr,
      quizSessPrev,
    ]);

    // Generate cards
    const totalQuiz: DashCardType = {
      id: 1,
      title: "Total Quiz",
      icon: "book-copy",
      data: roundIfNessesary(quizCurrResult),
      description: createDescription(quizCurrResult, quizPrevResult),
    };

    const avgCorrectAns: DashCardType = {
      id: 2,
      title: "Avg Correct Answer per User",
      icon: "check-check",
      data: roundIfNessesary(correctAnsCurrResult / tempUsersCurrResult || 0),
      description: createDescription(
        correctAnsCurrResult / tempUsersCurrResult || 0,
        correctAnsPrevResult / tempUsersPrevResult || 0,
      ),
    };

    const avgQuestion: DashCardType = {
      id: 3,
      title: "Avg Question per Quiz",
      icon: "circle-help",
      data: roundIfNessesary(questionCurrResult / quizCurrResult || 0),
      description: createDescription(
        questionCurrResult / quizCurrResult || 0,
        questionPrevResult / quizPrevResult || 0,
      ),
    };

    const avgUsersPerSession: DashCardType = {
      id: 4,
      title: "Avg Users per Quiz Session",
      icon: "users",
      data: roundIfNessesary(quizSessCurrResult / tempUsersCurrResult || 0),
      description: createDescription(
        quizSessCurrResult / tempUsersCurrResult || 0,
        quizSessPrevResult / tempUsersPrevResult || 0,
      ),
    };

    const data: DashCardType[] = [
      totalQuiz,
      avgCorrectAns,
      avgQuestion,
      avgUsersPerSession,
    ];

    if (!data) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Data for cards not found",
      });
    }

    return data;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: err.message,
      });
    }
    throw err;
  }
};

export const getDashboardLinechartHandler = async ({
  session,
}: {
  session: Session;
}) => {
  try {
    const userId = session.user.id;
    const monthsArray = generateMonthDetailsArray(6);

    const queries = monthsArray.map((month) =>
      db.userAnswer.count({
        where: {
          answer: { isCorrect: true },
          quizSession: { userId },
          createdAt: {
            gte: new Date(month.iso_start_date),
            lte: new Date(month.iso_end_date),
          },
        },
      }),
    );
    const result = await db.$transaction(queries);

    const data = monthsArray.map((month, index) => ({
      month: month.short_month,
      answer: result[index],
    }));

    if (!data) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Data for cards not found",
      });
    }

    return data;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: err.message,
      });
    }
    throw err;
  }
};

export const getDashboardBarchartHandler = async ({
  session,
}: {
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const quizzes = await db.quiz.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        title: true,
        quizSessions: {
          select: {
            userAnswers: {
              select: {
                score: true,
              },
            },
          },
        },
      },
    });

    const data = quizzes
      .map((quiz) => {
        // Get all the scores for each quiz
        const allScores = quiz.quizSessions.flatMap((session) =>
          session.userAnswers.map((answer) => answer.score),
        );

        // Calculate the average score
        const totalScore = allScores.reduce((sum, score) => sum + score, 0);
        const averageScore = allScores.length
          ? totalScore / allScores.length
          : 0;

        return {
          quiz: quiz.title,
          score: +averageScore.toFixed(2),
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5) // Limit the result to maximum 5 records
      .map((data, index) => ({
        ...data,
        fill: `hsl(var(--chart-${index + 1}))`,
      }));

    if (!data) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Data for cards not found",
      });
    }

    return data;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: err.message,
      });
    }
    throw err;
  }
};

export const getDashboardTableHandler = async ({
  session,
}: {
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const quizzes = await db.quiz.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
        _count: true,
        questions: {
          select: {
            _count: { select: { answers: true } },
          },
        },
        quizSessions: {
          select: {
            userAnswers: {
              select: {
                score: true,
              },
            },
            _count: {
              select: {
                userAnswers: { where: { answer: { isCorrect: true } } },
                userQuizSessions: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const data: DashboardColumnType[] = quizzes.map((quiz) => {
      const { questions, quizSessions } = quiz;

      const avg_answer =
        questions.reduce((a, { _count: { answers } }) => a + answers, 0) /
        questions.length;

      const avg_correct_answer =
        quizSessions.reduce(
          (a, { _count: { userAnswers } }) => a + userAnswers,
          0,
        ) / quizSessions.length;

      const avg_score =
        quizSessions
          .flatMap((session) => session.userAnswers)
          .reduce((sum, answer) => sum + answer.score, 0) / quizSessions.length;

      const total_users = quizSessions.reduce(
        (a, { _count: { userQuizSessions } }) => a + userQuizSessions,
        0,
      );

      return {
        id: quiz.id,
        title: quiz.title,
        status: quiz.status,
        total_questions: quiz._count.questions,
        avg_answer: +avg_answer.toFixed(2) || 0,
        avg_correct_answer: +avg_correct_answer.toFixed(2) || 0,
        avg_score: +avg_score.toFixed(2) || 0,
        total_sessions: quiz._count.quizSessions,
        total_users,
        created_at: quiz.createdAt,
      };
    });

    if (!data) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Data for cards not found",
      });
    }

    return data;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: err.message,
      });
    }
    throw err;
  }
};
