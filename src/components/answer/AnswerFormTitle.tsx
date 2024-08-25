import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { useAnswer, useQuestion, useQuestionForm } from "@/hooks";
import { Input } from "@/components/ui/Input";
import { api } from "@/utils/api";

export const AnswerFormTitle = () => {
  const { index: questionIndex } = useQuestion();
  const { index: answerIndex, id } = useAnswer();
  const { control } = useQuestionForm();
  const { question } = api.useUtils();

  const { mutate } = api.answer.updateAnswerName.useMutation({
    onSuccess: () => {
      void question.getQuestions.invalidate();
    },
  });

  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { value } = e.target;

    mutate({ params: { id }, body: { name: value } });
  };

  return (
    <FormField
      control={control}
      name={`questions.${questionIndex}.answers.${answerIndex}.name`}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Input
              {...field}
              placeholder="Answer.."
              data-testid="input-answer-title"
              onBlur={onBlurHandler}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
