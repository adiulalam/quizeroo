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
import { api } from "@/utils/api";
import { toast } from "../ui/useToast";

type CardSessionButtonType = {
  buttonSize: VariantProps<typeof buttonVariants>["size"];
  status: Status;
  isSession: boolean;
  id: string;
};

export const CardSessionButton = ({
  buttonSize,
  status,
  isSession,
  id,
}: CardSessionButtonType) => {
  const { quiz } = api.useUtils();

  const { mutate } = api.quizSession.updateQuizSession.useMutation({
    onSuccess: () => {
      void quiz.getQuizzes.invalidate();
      void quiz.searchQuizzes.invalidate();

      toast({
        title: isSession ? "Session stopped" : "Session started",
      });
    },
    onError: (e) => {
      const message = e?.message;
      toast({
        title: `Action Failed! ${message}`,
        variant: "destructive",
      });
    },
  });

  const onClickHandler = () => {
    mutate({ id });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex w-full justify-between gap-2">
            <Button
              onClick={onClickHandler}
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
