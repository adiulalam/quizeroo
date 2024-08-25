import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useQuestionForm, useQuestion } from "@/hooks";
import { api } from "@/utils/api";

export const QuestionTitle = () => {
  const { control } = useQuestionForm();
  const { id, index } = useQuestion();
  const { question } = api.useUtils();

  const { mutate } = api.question.updateQuestionName.useMutation({
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
      name={`questions.${index}.name`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Question Title</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="Question.."
              data-testid="input-question-title"
              onBlur={onBlurHandler}
            />
          </FormControl>
          <FormDescription>This is your question title.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
