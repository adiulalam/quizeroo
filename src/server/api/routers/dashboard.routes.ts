import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getDashboardCardsHandler } from "@/server/controller/dashboard.controller";
import { getCardsSchema } from "@/server/schema/dashboard.schema";

export const dashboardRouter = createTRPCRouter({
  getDashboardCards: protectedProcedure
    .input(getCardsSchema)
    .query(({ input, ctx: { session } }) =>
      getDashboardCardsHandler({ session, input }),
    ),
});
