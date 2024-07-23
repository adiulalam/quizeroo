import { type Session } from "next-auth";
import type {
  AllQuizSchemaType,
  CreateQuizSchemaType,
  GetSearchSchemaType,
  ParamsType,
  UpdateQuizFavouriteType,
  UpdateQuizStatusType,
} from "../schema/quiz.schema";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { db } from "../db";
import { Filter } from "@/types/Quiz.types";

export const createQuizHandler = async ({
  input,
  session,
}: {
  input: CreateQuizSchemaType;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const { id, title, isFavourite } = input;

    const data = {
      title,
      isFavourite,
      userId,
    };

    let quiz;
    if (id) {
      quiz = await db.quiz.update({
        where: {
          id,
        },
        data,
      });
    } else {
      quiz = await db.quiz.create({
        data,
      });
    }

    if (!quiz) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Quiz not found",
      });
    }

    return quiz;
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

export const getQuizzesHandler = async ({
  input,
  session,
}: {
  input: AllQuizSchemaType;
  session: Session;
}) => {
  try {
    const limit = 20;

    const userId = session.user.id;
    const { cursor, sort, filter, order } = input;

    const quizzes = await db.quiz.findMany({
      take: limit + 1,
      orderBy: { [sort]: order },
      where: {
        userId,
        ...(filter === Filter.draft ? { status: "DRAFT" } : {}),
        ...(filter === Filter.completed ? { status: "COMPLETED" } : {}),
        ...(filter === Filter.favourite ? { isFavourite: true } : {}),
      },
      cursor: cursor ? { id: cursor } : undefined,
      include: {
        questions: {
          take: 1,
          orderBy: { order: "asc" },
          include: {
            answers: true,
          },
        },
        _count: {
          select: {
            quizSessions: {
              where: {
                isActive: true,
              },
            },
          },
        },
      },
    });

    let nextCursor: typeof cursor | undefined = undefined;
    if (quizzes.length > limit) {
      const nextItem = quizzes.pop();
      nextCursor = nextItem?.id;
    }

    if (!quizzes) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Quizzes not found",
      });
    }

    return {
      nextCursor,
      data: {
        quizzes,
      },
    };
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

export const updateQuizFavouriteHandler = async ({
  input,
  session,
  params,
}: {
  input: UpdateQuizFavouriteType;
  session: Session;
  params: ParamsType;
}) => {
  try {
    const userId = session.user.id;

    const quiz = await db.quiz.update({
      where: {
        id: params.id,
        userId,
      },
      data: {
        isFavourite: input.isFavourite,
      },
    });

    if (!quiz) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Quiz not found",
      });
    }

    return quiz;
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

export const updateQuizStatusHandler = async ({
  input,
  session,
  params,
}: {
  input: UpdateQuizStatusType;
  session: Session;
  params: ParamsType;
}) => {
  try {
    const userId = session.user.id;

    const questionCount = await db.question.count({
      where: {
        quizId: params.id,
        quiz: { userId },
      },
    });

    if (questionCount <= 0) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "No questions found for quiz",
      });
    }

    const quiz = await db.quiz.update({
      where: {
        id: params.id,
        userId,
      },
      data: {
        status: input.status,
      },
    });

    if (!quiz) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Quiz not found",
      });
    }

    return quiz;
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

export const deleteQuizHandler = async ({
  session,
  input,
}: {
  session: Session;
  input: ParamsType;
}) => {
  try {
    const userId = session.user.id;

    const quiz = await db.quiz.delete({
      where: {
        id: input.id,
        userId,
      },
    });

    if (!quiz) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Quiz not found",
      });
    }

    return quiz;
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

export const searchQuizzesHandler = async ({
  input,
  session,
}: {
  input: GetSearchSchemaType;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const quiz = await db.quiz.findMany({
      take: 5,
      where: input.title
        ? { userId, title: { contains: input.title } }
        : { userId },
      orderBy: { updatedAt: "desc" },
      include: {
        _count: {
          select: { quizSessions: true },
        },
      },
    });

    if (!quiz) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Quiz not found",
      });
    }

    return quiz;
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
