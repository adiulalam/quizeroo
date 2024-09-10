import { type Session } from "next-auth";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
// import { db } from "../db";
import type { GetCardsSchemaType } from "../schema/dashboard.schema";
import type dynamicIconImports from "lucide-react/dynamicIconImports";
import { Interval } from "@/types/Dashboard.types";

type DashboardCardsType = {
  id: number;
  title: string;
  icon: keyof typeof dynamicIconImports;
  data: string;
  description: string | null;
};

export const getDashboardCardsHandler = async ({
  input,
  // session,
}: {
  input: GetCardsSchemaType;
  session: Session;
}) => {
  try {
    // const userId = session.user.id;
    const { interval } = input;
    const isAll = interval === Interval.all;

    const data: DashboardCardsType[] = [
      {
        id: 1,
        title: "Total Quiz",
        icon: "book-copy",
        data: "+2350",
        description: isAll ? null : `+20.1% from last ${interval}`,
      },
      {
        id: 2,
        title: "Avg Correct Answer per User",
        icon: "check-check",
        data: "+2350",
        description: isAll ? null : `+180.1% from last ${interval}`,
      },
      {
        id: 3,
        title: "Avg Qustion per Quiz",
        icon: "circle-help",
        data: "+12,234",
        description: isAll ? null : `+20.1% from last ${interval}`,
      },
      {
        id: 4,
        title: "Avg Users per Quiz Session",
        icon: "users",
        data: "+573",
        description: isAll ? null : `+201 since last ${interval}`,
      },
    ];

    if (!data) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User Answer not found",
      });
    }

    return data;
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
