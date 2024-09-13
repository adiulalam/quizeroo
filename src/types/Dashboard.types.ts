import type { Status } from "@prisma/client";

export enum Interval {
  "day" = "day",
  "week" = "week",
  "month" = "month",
  "all" = "all",
}

export type DashboardColumnType = {
  id: string;
  title: string;
  status: Status;
  total_questions: number;
  avg_answer: number;
  avg_correct_answer: number;
  avg_score: number;
  total_sessions: number;
  total_users: number;
  created_at: Date;
};
