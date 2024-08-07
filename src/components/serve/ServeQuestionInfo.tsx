import { ServeQuestionCounter } from "./ServeQuestionCounter";
import { useCurrentQuestion } from "@/hooks";
import { ServeAnswerCount } from "./ServeAnswerCount";
import { ServeButton } from "./ServeButton";

export const ServeQuestionInfo = () => {
  const { showSubmission } = useCurrentQuestion();

  return (
    <div className="flex h-auto w-full items-center justify-between gap-2 p-2">
      {!showSubmission && <ServeQuestionCounter />}

      <ServeAnswerCount />

      <ServeButton />
    </div>
  );
};
