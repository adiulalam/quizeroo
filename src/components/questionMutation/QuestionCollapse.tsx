import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useSortable } from "@dnd-kit/sortable";
import { useQuestionForm } from "@/hooks/useQuestionForm";
import { useQuestion } from "@/hooks/useQuestion";
import { useState } from "react";
import { Collapsible, CollapsibleContent } from "../ui/Collapsible";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import {
  QuestionCollapseDelete,
  QuestionCollapseGrip,
  QuestionCollapseTrigger,
} from ".";

export const QuestionCollapse = ({
  isOverlay = false,
}: {
  isOverlay?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { control } = useQuestionForm();
  const question = useQuestion();

  const { setNodeRef, transform, transition, isDragging } = useSortable({
    id: question.id,
    data: {
      question,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva(
    "flex flex-col gap-4 rounded bg-muted/10 border border-muted p-2 snap-center",
    {
      variants: {
        dragging: {
          default: "border-2 border-transparent",
          over: "ring-2 opacity-30",
          overlay: "ring-2 ring-primary",
        },
      },
    },
  );

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 sm:gap-2">
          <QuestionCollapseGrip />

          <QuestionCollapseTrigger isOpen={isOpen} />

          <FormField
            control={control}
            name={`questions.${question.index}.name`}
            render={({ field: { value } }) => (
              <h4 className="px-2 text-sm font-semibold">{value}</h4>
            )}
          />
        </div>

        <QuestionCollapseDelete />
      </div>
      <CollapsibleContent>
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
      </CollapsibleContent>
    </Collapsible>
  );
};
