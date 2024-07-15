import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { MoreVertical } from "lucide-react";
import {
  CardMenuDelete,
  CardMenuDeleteAlert,
  CardMenuEdit,
  CardMenuFavourite,
  CardMenuStatus,
} from ".";
import { AlertDialog } from "../ui/AlertDialog";
import { Dialog } from "../ui/Dialog";
import { QuizDialog } from "../quizMutation";
import { useViewQuiz } from "@/hooks/useViewQuiz";

export const CardMenu = () => {
  const { id, title, isFavourite } = useViewQuiz();

  return (
    <Dialog>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8 bg-muted/70"
              >
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <CardMenuEdit />
            <CardMenuStatus />

            <CardMenuFavourite />
            <DropdownMenuSeparator />

            <CardMenuDelete />
          </DropdownMenuContent>
        </DropdownMenu>

        <CardMenuDeleteAlert />
        <QuizDialog id={id} title={title} isFavourite={isFavourite} />
      </AlertDialog>
    </Dialog>
  );
};
