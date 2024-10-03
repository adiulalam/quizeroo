import type { Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { db } from "prisma/seed";

type CreateQuizSessionType = Prisma.QuizSessionUncheckedCreateInput[];

export const createQuizSessions = async (
  userId: string,
): Promise<CreateQuizSessionType> => {
  const quizzes = await db.quiz.findMany({
    where: { status: "COMPLETED", userId },
    select: {
      id: true,
      questions: {
        select: {
          id: true,
        },
      },
    },
  });

  const quizSessions: CreateQuizSessionType = quizzes.map((quiz) => ({
    roomName: faker.string.alpha({ length: 8, casing: "mixed" }),
    isActive: true,
    showSubmission: true,
    userId,
    quizId: quiz.id,
    currentQuestionId: quiz.questions[quiz.questions.length - 1]?.id ?? null,
  }));

  return quizSessions;
};
