import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { useAnswer, useQuestion, useQuestionForm } from "@/hooks";
import { Input } from "@/components/ui/Input";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { draggingVariants } from "@/utils/functions";
import { AnswerDelete, AnswerGrip } from ".";
import { Switch } from "../ui/Switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/Tooltip";

export const AnswerForm = () => {
  const question = useQuestion();
  const answer = useAnswer();
  const { control } = useQuestionForm();

  const { setNodeRef, transform, transition, isDragging } = useSortable({
    id: answer.id,
    data: {
      answer,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={draggingVariants({
        dragging: isDragging ? "over" : undefined,
      })}
    >
      <div className="flex flex-row gap-2">
        <AnswerGrip />
        <AnswerDelete />
        <FormField
          control={control}
          name={`questions.${question.index}.answers.${answer.index}.name`}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`questions.${question.index}.answers.${answer.index}.isCorrect`}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2">
              <FormControl>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger type="button">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
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
      </div>
    </div>
  );
};
