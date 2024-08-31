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
import { useViewQuiz } from "@/hooks";
import { useState } from "react";
import { QuizDialogProvider } from "@/provider";

export const CardMenu = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { id, title, isFavourite } = useViewQuiz();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8 bg-muted/70"
                data-testid="button-menu-quiz"
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

        <QuizDialogProvider
          value={{
            id,
            title,
            isFavourite,
            isUpdate: true,
            isDialogOpen,
            setIsDialogOpen,
          }}
        >
          <QuizDialog />
        </QuizDialogProvider>
      </AlertDialog>
    </Dialog>
  );
};
