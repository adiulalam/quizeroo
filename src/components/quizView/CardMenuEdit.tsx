import { DropdownMenuItem } from "../ui/DropdownMenu";
import { Pencil } from "lucide-react";
import { DialogTrigger } from "@/components/ui/Dialog";

export const CardMenuEdit = () => {
  return (
    <DialogTrigger asChild>
      <DropdownMenuItem>
        <Pencil className="mr-2 size-4" />
        Edit
      </DropdownMenuItem>
    </DialogTrigger>
  );
};
