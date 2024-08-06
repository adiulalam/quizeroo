import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  updateTempUserHandler,
  getTempUserHandler,
} from "@/server/controller/user.controller";
import type { UpdateSessionQuestionType } from "@/server/schema/quizSession.schema";
import { mutateTempUserSchema } from "@/server/schema/user.schema";
import type { UserAnswer } from "@prisma/client";
import { observable } from "@trpc/server/observable";
import { EventEmitter } from "events";
import { z } from "zod";

interface MyEvents {
  join: (data: JoinQuizSession) => void;
  nextQuestion: (data: UpdateSessionQuestionType) => void;
  answer: (data: UserAnswer) => void;
}

class MyEventEmitter extends EventEmitter {
  on<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this {
    return super.on(event, listener);
  }
  off<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this {
    return super.off(event, listener);
  }
  once<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this {
    return super.once(event, listener);
  }
  emit<TEv extends keyof MyEvents>(
    event: TEv,
    ...args: Parameters<MyEvents[TEv]>
  ): boolean {
    return super.emit(event, ...args);
  }
}

export const ee = new MyEventEmitter();

const joinQuizSessionSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  quizSessionId: z.string().uuid(),
});

export type JoinQuizSession = z.TypeOf<typeof joinQuizSessionSchema>;

export const userRouter = createTRPCRouter({
  onJoin: protectedProcedure
    .input(joinQuizSessionSchema)
    .subscription(({ input, ctx: { session } }) => {
      return observable<JoinQuizSession>((emit) => {
        const onJoin = (data: JoinQuizSession) => {
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
  getTempUser: protectedProcedure.query(async ({ ctx: { session } }) => {
    const tempUser = await getTempUserHandler({
      session,
    });

    if (tempUser.name && tempUser.quizSessionId) {
      const joinParams: JoinQuizSession = {
        id: tempUser.id,
        name: tempUser.name,
        quizSessionId: tempUser.quizSessionId,
      };

      ee.emit("join", joinParams);
    }

    return tempUser;
  }),
});
