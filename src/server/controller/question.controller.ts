import { type Session } from "next-auth";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { db } from "../db";
import type {
  ParamsType,
  UpdateQuestionOrderSchemaType,
  UpdateQuestionsSchemaType,
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
  params,
  session,
}: {
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
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: err.message,
      });
    }
    throw err;
  }
};

export const deleteQuestionHandler = async ({
  params,
  session,
}: {
  params: ParamsType;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

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
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: err.message,
      });
    }
    throw err;
  }
};

export const updateQuestionOrderHandler = async ({
  input,
  session,
}: {
  input: UpdateQuestionOrderSchemaType;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const transaction = input.map(({ order, id }) =>
      db.question.update({ data: { order }, where: { id, quiz: { userId } } }),
    );

    const questions = await db.$transaction(transaction);

    if (!questions) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Could not update order",
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

export const updateQuestionsHandler = async ({
  input,
  session,
}: {
  input: UpdateQuestionsSchemaType;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const transaction = input.map((question) =>
      db.question.update({
        data: { name: question.name },
        where: { id: question.id, quiz: { userId } },
      }),
    );

    const questions = await db.$transaction(transaction);

    if (!questions) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Could not update questions",
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
