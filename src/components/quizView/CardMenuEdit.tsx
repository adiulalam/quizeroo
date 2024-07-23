import { DropdownMenuItem } from "../ui/DropdownMenu";
import { Pencil } from "lucide-react";
import { DialogTrigger } from "@/components/ui/Dialog";
import { useViewQuiz } from "@/hooks";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/Tooltip";

export const CardMenuEdit = () => {
  const { status, _count } = useViewQuiz();

  const isSession = _count.quizSessions > 0;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <DialogTrigger asChild>
              <DropdownMenuItem disabled={status === "COMPLETED" || isSession}>
                <Pencil className="mr-2 size-4" />
                Edit
              </DropdownMenuItem>
            </DialogTrigger>
          </span>
        </TooltipTrigger>
        {status === "COMPLETED" && (
          <TooltipContent>
            <p>
              Status must be in <b>Draft</b> mode to Edit
            </p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};
