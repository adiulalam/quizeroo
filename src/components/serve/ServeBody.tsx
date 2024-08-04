import { useCurrentQuestion } from "@/hooks";
import { ServeWaiting, ServeQuestion } from ".";

export const ServeBody = () => {
  const { currentQuestionId } = useCurrentQuestion();

  return (
    <div className="flex h-full w-full bg-muted/40 p-2">
      {currentQuestionId ? <ServeQuestion /> : <ServeWaiting />}
    </div>
  );
};
