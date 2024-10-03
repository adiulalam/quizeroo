import type { Prisma } from "@prisma/client";
import { Status } from "@prisma/client";
import { faker } from "@faker-js/faker";
import _ from "lodash";
import { endOfYear, startOfYear } from "date-fns";

type CreateQuizType = Prisma.QuizUncheckedCreateInput[];

export const createQuizzes = (
  userId: string,
  count: number,
): CreateQuizType => {
  const quizzes: CreateQuizType = _.range(count).map(() => ({
    status: faker.helpers.enumValue(Status),
    title: faker.lorem.sentence(3),
    isFavourite: faker.datatype.boolean(0.5),
    userId,
    createdAt: faker.date.between({
      from: startOfYear(new Date()),
      to: endOfYear(new Date()),
    }),
  }));

  return quizzes;
};
