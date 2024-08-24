import { FormField } from "@/components/ui/Form";
import { useSortable } from "@dnd-kit/sortable";
import { useQuestionForm, useQuestion } from "@/hooks";
import { useState } from "react";
import { Collapsible } from "../ui/Collapsible";
import { CSS } from "@dnd-kit/utilities";
import {
  QuestionCollapseContent,
  QuestionCollapseDelete,
  QuestionCollapseGrip,
  QuestionCollapseTrigger,
} from ".";
import { draggingVariants } from "@/utils/functions";

export const QuestionCollapse = () => {
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

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      ref={setNodeRef}
      style={style}
      className={draggingVariants({
        dragging: isDragging ? "over" : undefined,
      })}
      data-testid="question-card"
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
      <QuestionCollapseContent />
    </Collapsible>
  );
};
