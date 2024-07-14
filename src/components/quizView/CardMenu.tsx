import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import {
  CircleAlert,
  CircleCheck,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { useViewQuiz } from "@/hooks/useViewQuiz";
import { CardMenuFavourite } from ".";

export const CardMenu = () => {
  const { status, questions } = useViewQuiz();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <Button size="icon" variant="outline" className="h-8 w-8 bg-muted/70">
            <MoreVertical className="h-3.5 w-3.5" />
            <span className="sr-only">More</span>
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Pencil className="mr-2 size-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={Array.isArray(questions) && questions.length <= 0}
        >
          {status === "DRAFT" ? (
            <CircleCheck className="mr-2 size-4" />
          ) : (
            <CircleAlert className="mr-2 size-4" />
          )}
          Mark as {status === "DRAFT" ? "Completed" : "Draft"}
        </DropdownMenuItem>

        <CardMenuFavourite />
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Trash2 className="mr-2 size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
