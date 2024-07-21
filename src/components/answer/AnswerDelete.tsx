import { Button } from "../ui/Button";
import { Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/Tooltip";
import { api } from "@/utils/api";
import { useAnswer } from "@/hooks";

export const AnswerDelete = () => {
  const { id } = useAnswer();
  const { question } = api.useUtils();

  const { mutate } = api.answer.deleteAnswer.useMutation({
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
          >
            <Trash2 />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete answer</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
