import { type Session } from "next-auth";
import type {
  GetSessionNameSchemaType,
  ParamsType,
  UpdateSessionQuestionType,
} from "../schema/quizSession.schema";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { db } from "../db";

// todo: add logic to delete quiz session with no users
export const updateQuizSessionHandler = async ({
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
        userId,
        id: params.id,
      },
      include: {
        questions: {
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

    if (quiz.status === "DRAFT") {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Quiz status must be completed.",
      });
    }

    if (quiz.questions.length <= 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No questions found",
      });
    }

    quiz.questions.forEach((question) => {
      if (question.answers.length <= 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No answers found for question ${question.name}`,
        });
      }

      const hasCorrectAnswer = question.answers.some(
        (answer) => answer.isCorrect,
      );

      if (!hasCorrectAnswer) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `One correct answer is required for question ${question.name}`,
        });
      }
    });

    const isActive = quiz._count.quizSessions > 0;

    let quizSession;
    const randomStr = Math.random().toString(36).slice(2, 10);

    if (isActive) {
      quizSession = await db.quizSession.updateMany({
        where: {
          quizId: params.id,
          userId,
        },
        data: {
          isActive: false,
        },
      });
    } else {
      quizSession = await db.quizSession.create({
        data: {
          userId,
          roomName: randomStr,
          quizId: params.id,
          isActive: true,
        },
      });
    }

    if (!quizSession) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "QuizSession not found",
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

export const getSessionNameHandler = async ({
  input,
}: {
  input: GetSessionNameSchemaType;
}) => {
  try {
    const quizSession = await db.quizSession.findFirstOrThrow({
      where: {
        roomName: input.roomName,
        isActive: true,
      },
    });

    if (!quizSession) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Quiz Session not found",
      });
    }

    return quizSession;
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

export const getUserQuizSessionHandler = async ({
  params,
  session,
}: {
  params: ParamsType;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const quizSession = await db.quizSession.findFirstOrThrow({
      where: {
        id: params.id,
        isActive: true,
        userId,
      },
      include: {
        users: true,
        user: true,
        userAnswers: true,
        question: {
          include: { userAnswers: true },
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
    });

    if (!quizSession) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Quiz Session not found",
      });
    }

    return quizSession;
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

export const updateSessionQuestionHandler = async ({
  input,
  session,
}: {
  input: UpdateSessionQuestionType;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const quizSession = await db.quizSession.update({
      where: {
        id: input.id,
        userId,
      },
      data: {
        currentQuestionId: input.currentQuestionId,
        showSubmission: input.showSubmission,
      },
    });

    if (!quizSession) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Quiz Session Session not found",
      });
    }

    return quizSession;
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

export const getSessionScoreHandler = async ({
  params,
  session,
}: {
  params: ParamsType;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const quizSession = await db.quizSession.findFirstOrThrow({
      where: {
        id: params.id,
        isActive: true,
        userId,
      },
      include: {
        users: {
          include: {
            userAnswers: true,
          },
        },
      },
    });

    if (!quizSession) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Quiz Session not found",
      });
    }

    return quizSession;
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
