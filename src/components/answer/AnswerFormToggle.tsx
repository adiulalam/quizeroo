import { FormControl, FormField, FormItem } from "@/components/ui/Form";
import { useAnswer, useQuestion, useQuestionForm } from "@/hooks";
import { Switch } from "../ui/Switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/Tooltip";
import { api } from "@/utils/api";

// todo: only allow one correct answer per question?
// or allow multiple submission
export const AnswerFormToggle = () => {
  const { index: questionIndex } = useQuestion();
  const { index: answerIndex, id } = useAnswer();
  const { control } = useQuestionForm();
  const { question } = api.useUtils();

  const { mutate } = api.answer.updateAnswerToggle.useMutation({
    onSuccess: () => {
      void question.getQuestions.invalidate();
    },
  });

  const onClickHandler = (isChecked: boolean) => {
    mutate({ params: { id }, body: { isCorrect: isChecked } });
  };

  return (
    <FormField
      control={control}
      name={`questions.${questionIndex}.answers.${answerIndex}.isCorrect`}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center gap-2">
          <FormControl>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger type="button">
                  <Switch
                    checked={field.value}
                    onCheckedChange={onClickHandler}
                    data-testid="switch-answer-correct"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Is correct answer?</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
