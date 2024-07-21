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
  const { status } = useViewQuiz();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <span>
              <DropdownMenuItem disabled={status === "COMPLETED"}>
                <Pencil className="mr-2 size-4" />
                Edit
              </DropdownMenuItem>
            </span>
          </DialogTrigger>
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
