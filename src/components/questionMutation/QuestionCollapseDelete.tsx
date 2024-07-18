import { Button } from "../ui/Button";
import { Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/Tooltip";

export const QuestionCollapseDelete = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="destructive"
            type="button"
            size="sm"
            className="p-1 sm:p-2"
          >
            <Trash2 />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete question</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
