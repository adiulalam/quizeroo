import { type Session } from "next-auth";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { db } from "../db";
import type { CreateUserAnswerSchemaType } from "../schema/userAnswer.schema";

export const createUserAnswerHandler = async ({
  input,
  session,
}: {
  input: CreateUserAnswerSchemaType;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const userAnswerCount = await db.userAnswer.count({
      where: {
        userId,
        questionId: input.questionId,
        quizSessionId: input.quizSessionId,
      },
    });

    if (userAnswerCount > 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User Answer already found",
      });
    }

    const userAnswer = await db.userAnswer.create({
      data: {
        userId,
        answerId: input.answerId,
        questionId: input.questionId,
        quizSessionId: input.quizSessionId,
      },
    });

    if (!userAnswer) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User Answer not found",
      });
    }

    return userAnswer;
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
