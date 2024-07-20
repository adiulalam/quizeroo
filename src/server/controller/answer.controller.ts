import { type Session } from "next-auth";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { db } from "../db";
import type {
  ParamsType,
  UpdateAnswerOrderSchemaType,
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
