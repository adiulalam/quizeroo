import { useAnswerSubmitted } from "@/hooks/useAnswerSubmitted";
import { CircleCheck, CircleX } from "lucide-react";
import { cn } from "@/utils/theme";
import { H1 } from "../ui/Typography";

export const JoinQuestionOutcome = () => {
  const { isAnswerCorrect } = useAnswerSubmitted();

  const Icon = isAnswerCorrect ? CircleCheck : CircleX;
  const text = isAnswerCorrect ? "Correct" : "Incorrect";

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-2",
        isAnswerCorrect ? "bg-success" : "bg-destructive",
      )}
    >
      <Icon className="size-32 sm:size-48 md:size-60" />
      <H1>{text}</H1>
    </div>
  );
};
