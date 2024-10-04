import { type Session } from "next-auth";
import type { ParamsType } from "../schema/userQuizSession.schema";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { db } from "../db";

export const getSessionScoreHandler = async ({
  params,
  session,
}: {
  params: ParamsType;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const quizSession = await db.userQuizSession.findMany({
      where: {
        quizSessionId: params.id,
        quizSession: {
          isActive: true,
          userId,
        },
      },
      select: {
        user: {
          select: {
            id: true,
            name: true,
            userAnswers: {
              where: { quizSessionId: params.id },
              select: { score: true },
            },
          },
        },
      },
    });

    const data = quizSession
      .map((session) => {
        const score = session.user.userAnswers.reduce(
          (accumulator, currentValue) => accumulator + currentValue.score,
          0,
        );

        return {
          id: session.user.id,
          name: session.user.name ?? "Unknown",
          score,
        };
      })
      .sort((a, b) => b.score - a.score)
      .map((user, index) => ({ ...user, rank: index + 1 }));

    if (!data) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Data not found",
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
