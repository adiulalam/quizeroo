import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  getDashboardLinechartHandler,
  getDashboardCardsHandler,
  getDashboardBarchartHandler,
  getDashboardTableHandler,
} from "@/server/controller/dashboard.controller";
import { getCardsSchema } from "@/server/schema/dashboard.schema";

export const dashboardRouter = createTRPCRouter({
  getDashboardCards: protectedProcedure
    .input(getCardsSchema)
    .query(({ input, ctx: { session } }) =>
      getDashboardCardsHandler({ session, input }),
    ),
  getDashboardLinechart: protectedProcedure.query(({ ctx: { session } }) =>
    getDashboardLinechartHandler({ session }),
  ),
  getDashboardBarchart: protectedProcedure.query(({ ctx: { session } }) =>
    getDashboardBarchartHandler({ session }),
  ),
  getDashboardTable: protectedProcedure.query(({ ctx: { session } }) =>
    getDashboardTableHandler({ session }),
  ),
});
