import { useCurrentQuestion } from "@/hooks";
import { ServeWaiting, ServeQuestion, ServeResult } from ".";

export const ServeBody = () => {
  const { currentQuestionId, isFinished } = useCurrentQuestion();

  return (
    <div className="flex h-full w-full bg-muted/40 p-2">
      {isFinished ? (
        <ServeResult />
      ) : currentQuestionId ? (
        <ServeQuestion />
      ) : (
        <ServeWaiting />
      )}
    </div>
  );
};
