import { CollapsibleTrigger } from "../ui/Collapsible";
import { Button } from "../ui/Button";
import { ChevronDown, ChevronUp } from "lucide-react";

export const QuestionCollapseTrigger = ({ isOpen }: { isOpen: boolean }) => {
  const Icon = isOpen ? ChevronUp : ChevronDown;

  return (
    <CollapsibleTrigger asChild>
      <Button variant="outline" size="sm" className="p-1 sm:p-2">
        <Icon className="size-4" />
      </Button>
    </CollapsibleTrigger>
  );
};
