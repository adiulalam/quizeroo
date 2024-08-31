import { DropdownMenuItem } from "../ui/DropdownMenu";
import { CircleAlert, CircleCheck } from "lucide-react";
import { useViewQuiz } from "@/hooks";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/Tooltip";
import { api } from "@/utils/api";

export const CardMenuStatus = () => {
  const { quiz } = api.useUtils();
  const { id, status, questions } = useViewQuiz();

  const hasQuestion = Array.isArray(questions) && questions.length > 0;

  const Icon = status === "DRAFT" ? CircleCheck : CircleAlert;

  const { mutate } = api.quiz.updateQuizStatus.useMutation({
    onSuccess: () => quiz.getQuizzes.invalidate(),
  });

  const onClickHandler = () => {
    mutate({
      params: { id },
      body: { status: status === "DRAFT" ? "COMPLETED" : "DRAFT" },
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <DropdownMenuItem
              disabled={!hasQuestion}
              onClick={onClickHandler}
              data-testid="menu-item-status"
            >
              <Icon className="mr-2 size-4" />
              Mark as {status === "DRAFT" ? "Completed" : "Draft"}
            </DropdownMenuItem>
          </span>
        </TooltipTrigger>
        {!hasQuestion && (
          <TooltipContent>
            <p>No questions been found!</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};
