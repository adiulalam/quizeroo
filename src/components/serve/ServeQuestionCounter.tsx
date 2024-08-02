import { useCountDown, useCurrentQuestion } from "@/hooks";

export const ServeQuestionCounter = () => {
  const { currentQuestion } = useCurrentQuestion();

  const counter = useCountDown({ start: currentQuestion!.countdown, callback });

  function callback() {
    console.log("first");
  }

  return (
    <div className="flex size-16 items-center justify-center rounded-full bg-muted/80 sm:size-32">
      <h1 className="scroll-m-20 text-center text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
        {counter}
      </h1>
    </div>
  );
};
