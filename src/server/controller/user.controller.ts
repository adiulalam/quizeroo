import { type Session } from "next-auth";
import type {
  MutateTempUserSchemaType,
  ParamsType,
} from "../schema/user.schema";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { db } from "../db";

export const createTempUserHandler = async ({
  input,
}: {
  input: MutateTempUserSchemaType;
}) => {
  try {
    const user = await db.user.create({
      data: {
        name: input.name,
        isTempUser: true,
        isActive: true,
        quizSessionId: input.quizSessionId,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    return user;
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

export const updateTempUserHandler = async ({
  input,
  session,
}: {
  input: MutateTempUserSchemaType;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        name: input.name,
        isActive: true,
        quizSessionId: input.quizSessionId,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    return user;
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

export const getTempUserHandler = async ({
  session,
  params,
}: {
  session: Session;
  params: ParamsType;
}) => {
  try {
    // Check if the quiz session active
    const sessionId = params.id;
    const quizSessionQuery = db.quizSession.findFirstOrThrow({
      where: {
        id: sessionId,
        isActive: true,
      },
    });

    const userId = session.user.id;
    const userQuery = db.user.findFirstOrThrow({
      where: {
        id: userId,
      },
      include: {
        quizSession: {
          where: {
            isActive: true,
          },
          include: {
            userAnswers: {
              where: {
                userId,
              },
            },
            question: {
              include: {
                userAnswers: {
                  where: {
                    userId,
                  },
                  include: { answer: true },
                },
              },
            },
            quiz: {
              include: {
                questions: {
                  orderBy: {
                    order: "asc",
                  },
                  include: {
                    answers: {
                      orderBy: {
                        order: "asc",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const [, user] = await db.$transaction([quizSessionQuery, userQuery]);

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    return user;
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
