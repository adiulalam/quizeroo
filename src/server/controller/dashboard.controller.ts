import { type Session } from "next-auth";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { db } from "../db";
import type { GetCardsSchemaType } from "../schema/dashboard.schema";
import type dynamicIconImports from "lucide-react/dynamicIconImports";
import { Interval } from "@/types/Dashboard.types";
import {
  calculatePercentageChange,
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

    // Helper to generate card data
    const createCard = (
      id: number,
      title: string,
      icon: keyof typeof dynamicIconImports,
      currentValue: number,
      previousValue: number,
    ): DashCardType => {
      const percentageChange = calculatePercentageChange(
        currentValue,
        previousValue,
      );
      return {
        id,
        title,
        icon,
        data: roundIfNessesary(currentValue),
        description: isAll
          ? null
          : `${getPercentageSign(percentageChange)}${Math.abs(percentageChange).toFixed(1)}% from last ${interval}`,
      };
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
    const totalQuiz = createCard(
      1,
      "Total Quiz",
      "book-copy",
      quizCurrResult,
      quizPrevResult,
    );
    const avgCorrectAns = createCard(
      2,
      "Avg Correct Answer per User",
      "check-check",
      correctAnsCurrResult / tempUsersCurrResult || 0,
      correctAnsPrevResult / tempUsersPrevResult || 0,
    );
    const avgQuestion = createCard(
      3,
      "Avg Question per Quiz",
      "circle-help",
      questionCurrResult / quizCurrResult || 0,
      questionPrevResult / quizPrevResult || 0,
    );
    const avgUsersPerSession = createCard(
      4,
      "Avg Users per Quiz Session",
      "users",
      quizSessCurrResult / tempUsersCurrResult || 0,
      quizSessPrevResult / tempUsersPrevResult || 0,
    );

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
