import { type Session } from "next-auth";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { db } from "../db";
import type {
  ParamsType,
  UpdateAnswerNameSchemaType,
  UpdateAnswerOrderSchemaType,
  UpdateAnswerToggleSchemaType,
} from "../schema/answer.schema";

export const createAnswerHandler = async ({
  params,
  session,
}: {
  params: ParamsType;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const question = await db.question.findFirstOrThrow({
      where: {
        id: params.id,
        quiz: { userId },
      },
      include: {
        _count: {
          select: { answers: true },
        },
      },
    });

    if (question._count.answers >= 4) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Maximium 4 answers",
      });
    }

    const answer = await db.answer.create({
      data: {
        name: `New Answer ${question._count.answers + 1}`,
        questionId: params.id,
      },
    });

    if (!answer) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Answer with that ID not found",
      });
    }

    return answer;
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

export const deleteAnswerHandler = async ({
  params,
  session,
}: {
  params: ParamsType;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const answer = await db.answer.delete({
      where: {
        id: params.id,
        question: {
          quiz: {
            userId,
          },
        },
      },
    });

    if (!answer) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Answer with that ID not found",
      });
    }

    return answer;
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

export const updateAnswerOrderHandler = async ({
  input,
  session,
}: {
  input: UpdateAnswerOrderSchemaType;
  session: Session;
}) => {
  try {
    const userId = session.user.id;

    const transaction = input.map(({ order, id }) =>
      db.answer.update({
        data: { order },
        where: { id, question: { quiz: { userId } } },
      }),
    );

    const answers = await db.$transaction(transaction);

    if (!answers) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Could not update order",
      });
    }

    return answers;
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

export const updateAnswerNameHandler = async ({
  input,
  session,
  params,
}: {
  input: UpdateAnswerNameSchemaType;
  session: Session;
  params: ParamsType;
}) => {
  try {
    const userId = session.user.id;

    const answer = await db.answer.update({
      where: {
        id: params.id,
        question: { quiz: { userId } },
      },
      data: {
        name: input.name,
      },
    });

    if (!answer) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Could not update name",
      });
    }

    return answer;
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

export const updateAnswerToggleHandler = async ({
  input,
  session,
  params,
}: {
  input: UpdateAnswerToggleSchemaType;
  session: Session;
  params: ParamsType;
}) => {
  try {
    const userId = session.user.id;

    const answer = await db.answer.update({
      where: {
        id: params.id,
        question: { quiz: { userId } },
      },
      data: {
        isCorrect: input.isCorrect,
      },
    });

    if (!answer) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Could not update answer",
      });
    }

    return answer;
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
