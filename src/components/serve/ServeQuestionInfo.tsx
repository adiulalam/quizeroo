import { ArrowRight, SkipForward } from "lucide-react";
import { Button } from "../ui/Button";
import { ServeQuestionCounter } from "./ServeQuestionCounter";
import { useQuizSession } from "@/hooks";
import { ServeAnswerCount } from "./ServeAnswerCount";

export const ServeQuestionInfo = () => {
  const { showSubmission } = useQuizSession();

  const Icon = showSubmission ? ArrowRight : SkipForward;

  return (
    <div className="flex h-auto w-full items-center justify-between gap-2 p-2">
      {!showSubmission && <ServeQuestionCounter />}

      <ServeAnswerCount />

      <Button
        size="lg"
        className="h-9 px-6 sm:h-11 sm:px-8"
        onClick={() => console.log("next")}
      >
        {showSubmission ? "Next" : "Skip"}
        <Icon className="ml-2 size-4" />
      </Button>
    </div>
  );
};
