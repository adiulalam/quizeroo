import { type Session } from "next-auth";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { db } from "../db";
import type { GetCardsSchemaType } from "../schema/dashboard.schema";
import type dynamicIconImports from "lucide-react/dynamicIconImports";
import { Interval } from "@/types/Dashboard.types";
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
