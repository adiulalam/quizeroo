import { type Session } from "next-auth";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { db } from "../db";
import type { GetCardsSchemaType } from "../schema/dashboard.schema";
import type dynamicIconImports from "lucide-react/dynamicIconImports";
import { Interval } from "@/types/Dashboard.types";
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subDays,
  subWeeks,
  subMonths,
} from "date-fns";

type DashboardCardsType = {
  id: number;
  title: string;
  icon: keyof typeof dynamicIconImports;
  data: string;
  description: string | null;
};

const getTimeFrame = (interval: Interval) => {
  const today = new Date();
  let startTime, endTime, previousStartTime, previousEndTime;

  switch (interval) {
    case Interval.day:
      startTime = startOfDay(today);
      endTime = endOfDay(today);
      previousStartTime = startOfDay(subDays(today, 1));
      previousEndTime = endOfDay(subDays(today, 1));
      break;
    case Interval.week:
      startTime = startOfWeek(today);
      endTime = endOfWeek(today);
      previousStartTime = startOfWeek(subWeeks(today, 1));
      previousEndTime = endOfWeek(subWeeks(today, 1));
      break;
    case Interval.month:
      startTime = startOfMonth(today);
      endTime = endOfMonth(today);
      previousStartTime = startOfMonth(subMonths(today, 1));
      previousEndTime = endOfMonth(subMonths(today, 1));
      break;
    case Interval.all:
      startTime = new Date(1970, 0, 1); // 1-1-1970
      endTime = today;

      previousStartTime = new Date(1970, 0, 1); // 1-1-1970
      previousEndTime = today;
      break;
    default:
      throw new Error("Invalid interval");
  }

  return { startTime, endTime, previousStartTime, previousEndTime };
};

// Helper function to calculate percentage change
const calculatePercentageChange = (current: number, previous: number) => {
  if (previous === 0) return current === 0 ? 0 : 100; // If previous is 0 and current is not 0, it is 100% change
  return ((current - previous) / Math.abs(previous)) * 100;
};

const getPercentageSign = (percentage: number) => {
  if (percentage > 0) return "+";
  if (percentage < 0) return "-";
  return ""; // No sign for 0%
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

    // total quiz
    const totalQuizCountCurrent = db.quiz.count({
      where: {
        userId,
        createdAt: {
          gte: startTime,
          lte: endTime,
        },
      },
    });

    const totalQuizCountPrevious = db.quiz.count({
      where: {
        userId,
        createdAt: {
          gte: previousStartTime,
          lte: previousEndTime,
        },
      },
    });

    const [totalQuizCountCurrentResult, totalQuizCountPreviousResult] =
      await db.$transaction([totalQuizCountCurrent, totalQuizCountPrevious]);

    const quizPercentageChange = calculatePercentageChange(
      totalQuizCountCurrentResult,
      totalQuizCountPreviousResult,
    );

    const totalQuiz: DashboardCardsType = {
      id: 1,
      title: "Total Quiz",
      icon: "book-copy",
      data: `${totalQuizCountCurrentResult}`,
      description: isAll
        ? null
        : `${getPercentageSign(quizPercentageChange)}${Math.abs(quizPercentageChange).toFixed(1)}% from last ${interval}`,
    };

    // avg correct answer per user

    const totalCorrectAnswerCurrent = db.userAnswer.count({
      where: {
        answer: {
          isCorrect: true,
        },
        quizSession: {
          userId,
        },
        createdAt: {
          gte: startTime,
          lte: endTime,
        },
      },
    });

    const totalTempUsersCurrent = db.user.count({
      where: {
        quizSessions: {
          every: {
            userId,
          },
        },
        NOT: {
          id: userId,
        },
        createdAt: {
          gte: startTime,
          lte: endTime,
        },
      },
    });

    const totalCorrectAnswerPrevious = db.userAnswer.count({
      where: {
        answer: {
          isCorrect: true,
        },
        quizSession: {
          userId,
        },
        createdAt: {
          gte: previousStartTime,
          lte: previousEndTime,
        },
      },
    });

    const totalTempUsersPrevious = db.user.count({
      where: {
        quizSessions: {
          every: {
            userId,
          },
        },
        NOT: {
          id: userId,
        },
        createdAt: {
          gte: previousStartTime,
          lte: previousEndTime,
        },
      },
    });

    const [
      totalCorrectAnswerCurrentResult,
      totalTempUsersCurrentResult,
      totalCorrectAnswerPreviousResult,
      totalTempUsersPreviousResult,
    ] = await db.$transaction([
      totalCorrectAnswerCurrent,
      totalTempUsersCurrent,
      totalCorrectAnswerPrevious,
      totalTempUsersPrevious,
    ]);

    const avgCorrectAnswerPerUserCurrent =
      totalCorrectAnswerCurrentResult / totalTempUsersCurrentResult;
    const avgCorrectAnswerPerUserPrevious =
      totalCorrectAnswerPreviousResult / totalTempUsersPreviousResult;

    const correctAnswerPercentageChange = calculatePercentageChange(
      avgCorrectAnswerPerUserCurrent || 0,
      avgCorrectAnswerPerUserPrevious || 0,
    );

    const avgCorrectAnsPerUser: DashboardCardsType = {
      id: 2,
      title: "Avg Correct Answer per User",
      icon: "check-check",
      data: `${avgCorrectAnswerPerUserCurrent || 0}`,
      description: isAll
        ? null
        : `${getPercentageSign(correctAnswerPercentageChange)}${Math.abs(correctAnswerPercentageChange).toFixed(1)}% from last ${interval}`,
    };

    const data: DashboardCardsType[] = [
      totalQuiz,
      avgCorrectAnsPerUser,
      {
        id: 3,
        title: "Avg Qustion per Quiz",
        icon: "circle-help",
        data: "+12,234",
        description: isAll ? null : `+20.1% from last ${interval}`,
      },
      {
        id: 4,
        title: "Avg Users per Quiz Session",
        icon: "users",
        data: "+573",
        description: isAll ? null : `+201 since last ${interval}`,
      },
    ];

    if (!data) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User Answer not found",
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
