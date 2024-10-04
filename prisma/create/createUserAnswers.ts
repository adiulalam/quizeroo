import type { Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { db } from "prisma/seed";
import _ from "lodash";

type CreateUserAnswerType = Prisma.UserAnswerUncheckedCreateInput[];

export const createUserAnswers = async (): Promise<CreateUserAnswerType> => {
  const tempUsers = await db.user.createManyAndReturn({
    data: _.range(100).map(() => ({
      name: faker.person.fullName(),
      isTempUser: true,
    })),
    select: {
      id: true,
    },
  });

  const quizSessions = await db.quizSession.findMany({
    select: {
      id: true,
      quiz: {
        select: {
          id: true,
          questions: {
            select: {
              id: true,
              answers: {
                select: {
                  id: true,
                  isCorrect: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const userAnswers: CreateUserAnswerType = quizSessions.flatMap((session) => {
    // Pick 10 random users for the session
    const randomUsers = faker.helpers.arrayElements(tempUsers, 10);

    return randomUsers.flatMap((user) =>
      session.quiz.questions.map((question) => {
        // Pick a random answer for each question
        const randomAnswer = faker.helpers.arrayElement(question.answers);
        const score = randomAnswer.isCorrect
          ? faker.number.int({ min: 1, max: 99 })
          : 0;

        return {
          quizSessionId: session.id,
          userId: user.id,
          questionId: question.id,
          answerId: randomAnswer.id,
          score,
        };
      }),
    );
  });

  return userAnswers;
};
