import { Button } from "../ui/Button";
import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { useQuestion } from "@/hooks/useQuestion";

export const QuestionCollapseGrip = () => {
  const question = useQuestion();

  const { attributes, listeners } = useSortable({
    id: question.id,
    data: {
      question,
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
    >
      <GripVertical className="size-4" />
    </Button>
  );
};
