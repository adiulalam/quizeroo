import { useCountDown, useCurrentQuestion } from "@/hooks";
import { H1 } from "../ui/Typography";

export const ServeQuestionCounter = () => {
  const { currentQuestion } = useCurrentQuestion();

  const counter = useCountDown({ start: currentQuestion!.countdown, callback });

  function callback() {
    console.log("first");
  }

  return (
    <div className="flex size-16 items-center justify-center rounded-full bg-muted/80 sm:size-32">
      <H1>{counter}</H1>
    </div>
  );
};
