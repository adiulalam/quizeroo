import type { Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import _ from "lodash";

type CreateAnswersType = Prisma.AnswerCreateManyInput[];

export const createAnswers = (
  questionId: string,
  count: number,
): CreateAnswersType => {
  const randNum = faker.number.int({ min: 0, max: 3 });

  const answers: CreateAnswersType = _.range(count).map((index) => ({
    questionId,
    name: faker.word.sample(),
    order: index,
    isCorrect: randNum === index,
  }));

  return answers;
};
