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
import { Prisma, type Quiz } from "@prisma/client";
import { db } from "../db";
import { Filter } from "@/types/Quiz.types";
import { enableAi } from "@/utils/constants";
import OpenAI from "openai";
import { zodFunction } from "openai/helpers/zod";
import {
  createAiQuestionSchema,
  type CreateAiQuestionSchemaType,
} from "../schema/question.schema";
import { env } from "@/env";

export const openaiApiKey = env.OPENAI_API_KEY;

export const createQuizHandler = async ({
  input,
  session,
}: {
  input: CreateQuizSchemaType;
  session: Session;
}) => {
  try {
    const isTempUser = session.user.isTempUser;

    if (isTempUser) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Temp user cannot create quiz",
      });
    }

    const userId = session.user.id;
    const { id, title, isFavourite, description } = input;
    let questions: CreateAiQuestionSchemaType["data"] = [];

    // Disable for updates - for now
    if (!id && description && enableAi && openaiApiKey) {
      const client = new OpenAI({ apiKey: openaiApiKey });

      const completion = await client.beta.chat.completions.parse({
        model: "gpt-4o-2024-08-06",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant. You help users create quiz questions by calling the query function.",
          },
          {
            role: "system",
            content: "Each question should only have one correct answer.",
          },
          {
            role: "system",
            content:
              "The maximum number of questions should be no more than 10, and the minimum number of question should be no less than 3.",
          },
          {
            role: "system",
            content:
              "The maximum number of answers per question should be no more than 4, and the minimum number of answers per question should be no less than 2.",
          },
          {
            role: "user",
            content: description,
          },
        ],

        tools: [
          zodFunction({ name: "query", parameters: createAiQuestionSchema }),
        ],
      });

      const { data: result } = createAiQuestionSchema.parse(
        completion.choices[0]?.message.tool_calls[0]?.function
          .parsed_arguments as CreateAiQuestionSchemaType,
      );

      questions = result;
    }

    const data = {
      title,
      isFavourite,
      userId,
    };

    let quiz: Quiz;
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

      // Insert AI generated questions
      if (questions.length > 0) {
        const questionsTransaction = questions.map((question, index) =>
          db.question.create({
            data: {
              quizId: quiz.id,
              name: question.name,
              countdown: 30,
              order: index + 1,
              answers: {
                create: question.answers.map((answer, index) => ({
                  name: answer.name,
                  isCorrect: answer.isCorrect,
                  order: index + 1,
                })),
              },
            },
          }),
        );
        await db.$transaction(questionsTransaction);
      }
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
        quizSessions: {
          take: 1,
          where: {
            isActive: true,
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
        ? { userId, title: { contains: input.title, mode: "insensitive" } }
        : { userId },
      orderBy: { updatedAt: "desc" },
      include: {
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
