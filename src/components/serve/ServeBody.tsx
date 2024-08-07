import { useCurrentQuestion } from "@/hooks";
import { ServeWaiting, ServeQuestion } from ".";

export const ServeBody = () => {
  const { currentQuestionId } = useCurrentQuestion();
  const { isFinished } = useCurrentQuestion();

  return (
    <div className="flex h-full w-full bg-muted/40 p-2">
      {isFinished ? (
        <p>Quiz finished</p>
      ) : currentQuestionId ? (
        <ServeQuestion />
      ) : (
        <ServeWaiting />
      )}
    </div>
  );
};
