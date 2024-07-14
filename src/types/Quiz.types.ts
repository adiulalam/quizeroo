import { type RouterOutputs } from "@/utils/api";

export enum Sort {
  "status" = "status",
  "updatedAt" = "updatedAt",
  "isFavourite" = "isFavourite",
}

export enum Filter {
  "all" = "all",
  "draft" = "draft",
  "completed" = "completed",
  "favourite" = "favourite",
}

export enum Order {
  "asc" = "asc",
  "desc" = "desc",
}

export type ViewQuizType =
  RouterOutputs["quiz"]["getQuizzes"]["data"]["quizzes"][number];

export type ViewQuestionsType =
  RouterOutputs["quiz"]["getQuizzes"]["data"]["quizzes"][number]["questions"];

export type ViewAnswersType =
  RouterOutputs["quiz"]["getQuizzes"]["data"]["quizzes"][number]["questions"][number]["answers"];

export type ViewQuizSessionsType =
  RouterOutputs["quiz"]["getQuizzes"]["data"]["quizzes"][number]["quizSessions"];
