import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  updateTempUserHandler,
  getTempUserHandler,
  getProfileHandler,
} from "@/server/controller/user.controller";
import {
  joinQuizSessionSchema,
  type JoinQuizSessionSchemaType,
  mutateTempUserSchema,
  params,
} from "@/server/schema/user.schema";
import { observable } from "@trpc/server/observable";
import { ee } from "../wssEmitter";

export const userRouter = createTRPCRouter({
  onJoin: protectedProcedure
    .input(joinQuizSessionSchema)
    .subscription(({ input, ctx: { session } }) => {
      return observable<JoinQuizSessionSchemaType>((emit) => {
        const onJoin = (data: JoinQuizSessionSchemaType) => {
          if (data.quizSessionId === input.quizSessionId && session.user.id) {
            emit.next(data);
          }
        };
        ee.on("join", onJoin);
        return () => {
          ee.off("join", onJoin);
        };
      });
    }),
  updateTempUser: protectedProcedure
    .input(mutateTempUserSchema)
    .mutation(({ input, ctx: { session } }) =>
      updateTempUserHandler({
        session,
        input,
      }),
    ),
  getTempUser: protectedProcedure
    .input(params)
    .query(async ({ input, ctx: { session } }) => {
      const tempUser = await getTempUserHandler({
        session,
        params: input,
      });

      if (tempUser.name && tempUser.quizSessionId) {
        const joinParams: JoinQuizSessionSchemaType = {
          id: tempUser.id,
          name: tempUser.name,
          quizSessionId: tempUser.quizSessionId,
        };

        ee.emit("join", joinParams);
      }

      return tempUser;
    }),
  getProfile: protectedProcedure.query(({ ctx: { session } }) =>
    getProfileHandler({ session }),
  ),
});
