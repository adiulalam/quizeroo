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
import { CollapsibleContent } from "../ui/Collapsible";
import { Label } from "../ui/Label";
import { AnswerCreate, AnswersDragable } from "../answer";
import { Separator } from "../ui/Separator";

export const QuestionCollapseContent = () => {
  const { control } = useQuestionForm();
  const question = useQuestion();

  return (
    <CollapsibleContent>
      <div className="flex flex-col gap-3">
        <FormField
          control={control}
          name={`questions.${question.index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>This is your question title.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <div className="flex flex-col gap-2">
          <Label>Answers</Label>
          <AnswersDragable />
          <AnswerCreate />
        </div>
      </div>
    </CollapsibleContent>
  );
};
