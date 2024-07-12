import { type Session } from "next-auth";
import { type CreateQuizSchemaType } from "../schema/quiz.schema";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { db } from "../db";

export const creatQuizHandler = async ({
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
        message: "Quiz with that ID not found",
      });
    }

    return quiz;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Quiz with that id already exists",
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
