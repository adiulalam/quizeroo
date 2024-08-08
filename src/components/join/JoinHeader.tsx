import { Shapes } from "lucide-react";
import Link from "next/link";
import { H3 } from "../ui/Typography";
import { useCurrentQuestion } from "@/hooks";
import { JoinHeaderCountdown } from "./JoinHeaderCountdown";

export const JoinHeader = () => {
  const { isWaiting, currentQuestionIndex, totalQuestionLength } =
    useCurrentQuestion();

  return (
    <div className="flex h-14 w-full items-center justify-between gap-2 p-2">
      {!isWaiting && (
        <H3 className="truncate">
          {currentQuestionIndex}/{totalQuestionLength}
        </H3>
      )}

      <Link href="/" className="m-auto">
        <Shapes className="size-8" />
      </Link>

      {!isWaiting && <JoinHeaderCountdown />}
    </div>
  );
};
