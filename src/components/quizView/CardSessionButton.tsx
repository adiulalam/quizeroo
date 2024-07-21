import { Button, type buttonVariants } from "@/components/ui/Button";
import { Dot } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/Tooltip";
import clsx from "clsx";
import { type VariantProps } from "class-variance-authority";
import { type Status } from "@prisma/client";

type CardSessionButtonType = {
  buttonSize: VariantProps<typeof buttonVariants>["size"];
  status: Status;
  isSession: boolean;
};

export const CardSessionButton = ({
  buttonSize,
  status,
  isSession,
}: CardSessionButtonType) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex justify-between gap-2">
            <Button
              size={buttonSize}
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
        <TooltipContent side="left">
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
