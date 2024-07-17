import { Button } from "../ui/Button";
import { GripVertical } from "lucide-react";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

type QuestionCollapseGripType = {
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
};
export const QuestionCollapseGrip = (props: QuestionCollapseGripType) => {
  return (
    <Button
      variant="ghost"
      type="button"
      size="sm"
      className="relative cursor-grab p-0 text-primary/50 sm:p-2"
      {...props}
    >
      <GripVertical className="size-4" />
    </Button>
  );
};
