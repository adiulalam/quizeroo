import type {
  UpdateCountDownType,
  UpdateSessionQuestionType,
} from "@/server/schema/quizSession.schema";
import { type JoinQuizSessionSchemaType } from "@/server/schema/user.schema";
import type { UserAnswer } from "@prisma/client";
import { EventEmitter } from "events";

interface MyEvents {
  join: (data: JoinQuizSessionSchemaType) => void;
  nextQuestion: (data: UpdateSessionQuestionType) => void;
  answer: (data: UserAnswer) => void;
  countdown: (data: UpdateCountDownType) => void;
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
