import { Button } from "@/components/ui/Button";
import { useViewQuiz } from "@/hooks";
import { Dot } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/Tooltip";
import clsx from "clsx";

export const CardSessionButton = () => {
  const { quizSessions, status } = useViewQuiz();

  const isSession = Array.isArray(quizSessions) && quizSessions.length > 0;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex justify-between gap-2">
            <Button
              className={clsx(
                "w-full",
                isSession &&
                  "after:content-['Quiz_Running'] hover:bg-destructive hover:after:content-['Stop_Running_Quiz']",
              )}
              disabled={status === "DRAFT"}
            >
              <Dot className="size-8" color={isSession ? "green" : "red"} />
              {isSession ? "" : "Start Quiz"}
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {status === "DRAFT"
              ? "Quiz must be completed"
              : isSession
                ? "Stop Running Quiz"
                : "Start Quiz"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
