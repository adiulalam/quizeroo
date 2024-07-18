import { type Session } from "next-auth";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { db } from "../db";
import type {
  ParamsType,
  UpdateQuestionOrderSchemaType,
} from "../schema/question.schema";

export const getQuestionsHandler = async ({
  input,
  session,
}: {
  input: ParamsType;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const questions = await db.question.findMany({
      where: {
        quizId: input.id,
        quiz: { userId },
      },
      orderBy: {
        order: "asc",
      },
      include: {
        answers: {
          orderBy: {
            order: "asc",
          },
          take: 4,
        },
      },
    });

    if (!questions) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Questions with that ID not found",
      });
    }

    return questions;
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

export const createQuestionHandler = async ({
  input,
  params,
  session,
}: {
  input: UpdateQuestionOrderSchemaType;
  params: ParamsType;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const quiz = await db.quiz.findFirstOrThrow({
      where: {
        id: params.id,
        userId,
      },
      include: {
        _count: {
          select: { questions: true },
        },
      },
    });

    const transaction = input.map(({ order, id }) =>
      db.question.update({ data: { order }, where: { id } }),
    );

    await db.$transaction(transaction);

    const question = await db.question.create({
      data: {
        name: `New Question ${quiz._count.questions + 1}`,
        quizId: params.id,
      },
    });

    if (!question) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Question with that ID not found",
      });
    }

    return question;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Question with that id already exists",
        });
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: err.message,
      });
    }
    throw err;
  }
};

export const deleteQuestionHandler = async ({
  input,
  params,
  session,
}: {
  input: UpdateQuestionOrderSchemaType;
  params: ParamsType;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const transaction = input.map(({ order, id }) =>
      db.question.update({ data: { order }, where: { id } }),
    );

    await db.$transaction(transaction);

    const question = await db.question.delete({
      where: {
        id: params.id,
        quiz: {
          userId,
        },
      },
    });

    if (!question) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Question with that ID not found",
      });
    }

    return question;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Question with that id already exists",
        });
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: err.message,
      });
    }
    throw err;
  }
};
