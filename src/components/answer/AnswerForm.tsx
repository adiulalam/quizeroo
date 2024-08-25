import { useAnswer } from "@/hooks";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { draggingVariants } from "@/utils/functions";
import { AnswerDelete, AnswerFormTitle, AnswerFormToggle, AnswerGrip } from ".";

export const AnswerForm = () => {
  const answer = useAnswer();

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

        <AnswerFormTitle />
        <AnswerFormToggle />
      </div>
    </div>
  );
};
