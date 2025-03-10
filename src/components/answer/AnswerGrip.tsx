import { Button } from "../ui/Button";
import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { useAnswer } from "@/hooks";

export const AnswerGrip = () => {
  const answer = useAnswer();

  const { attributes, listeners } = useSortable({
    id: answer.id,
    data: {
      answer,
    },
  });

  return (
    <Button
      variant="ghost"
      type="button"
      size="sm"
      className="relative cursor-grab p-0 text-primary/50 sm:p-2"
      {...attributes}
      {...listeners}
      data-testid="button-grip-answer"
    >
      <GripVertical className="size-4" />
    </Button>
  );
};
