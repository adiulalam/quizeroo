import type { Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import _ from "lodash";

type CreateQuestionsType = Prisma.QuestionCreateManyInput[];

export const createQuestions = (
  quizId: string,
  count: number,
): CreateQuestionsType => {
  const questions: CreateQuestionsType = _.range(count).map((index) => ({
    name: faker.lorem.sentence(6),
    order: index,
    quizId,
  }));

  return questions;
};
