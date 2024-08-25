import { Button } from "../ui/Button";
import { Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/Tooltip";
import { api } from "@/utils/api";
import { useQuestion } from "@/hooks";

export const QuestionCollapseDelete = () => {
  const { id } = useQuestion();
  const { question } = api.useUtils();

  const { mutate } = api.question.deleteQuestion.useMutation({
    onSuccess: () => {
      void question.getQuestions.invalidate();
    },
  });

  const onClickHandler = () => {
    mutate({ id });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="destructive"
            type="button"
            size="sm"
            className="p-1 sm:p-2"
            onClick={onClickHandler}
            data-testid="button-delete-question"
          >
            <Trash2 />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete question</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
