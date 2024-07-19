import { Button } from "../ui/Button";
import { Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/Tooltip";
import { api } from "@/utils/api";
import { useQuestionForm } from "@/hooks/useQuestionForm";
import { useQuestion } from "@/hooks/useQuestion";

export const QuestionCollapseDelete = () => {
  const { id } = useQuestion();
  const { question } = api.useUtils();
  const { getValues } = useQuestionForm();

  const { mutate } = api.question.deleteQuestion.useMutation({
    onSuccess: () => {
      void question.getQuestions.invalidate();
    },
  });

  const onClickHandler = () => {
    const data = getValues();
    const questions = data.questions.map(({ id }, index) => ({
      id,
      order: index,
    }));

    mutate({ params: { id }, body: questions });
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
          <p>Delete question</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
