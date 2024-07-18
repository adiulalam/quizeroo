import { CollapsibleTrigger } from "../ui/Collapsible";
import { Button } from "../ui/Button";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/Tooltip";

export const QuestionCollapseTrigger = ({ isOpen }: { isOpen: boolean }) => {
  const Icon = isOpen ? ChevronUp : ChevronDown;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm" className="p-1 sm:p-2">
              <Icon className="size-4" />
            </Button>
          </CollapsibleTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isOpen ? "Collapse" : "Expand"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
