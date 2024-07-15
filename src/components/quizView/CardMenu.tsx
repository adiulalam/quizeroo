import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { MoreVertical, Pencil } from "lucide-react";
import {
  CardMenuDelete,
  CardMenuDeleteAlert,
  CardMenuFavourite,
  CardMenuStatus,
} from ".";
import { AlertDialog } from "../ui/AlertDialog";

export const CardMenu = () => {
  return (
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
          <DropdownMenuItem>
            <Pencil className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
          <CardMenuStatus />

          <CardMenuFavourite />
          <DropdownMenuSeparator />

          <CardMenuDelete />
        </DropdownMenuContent>
      </DropdownMenu>

      <CardMenuDeleteAlert />
    </AlertDialog>
  );
};
