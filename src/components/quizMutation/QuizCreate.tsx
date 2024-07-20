import { Button } from "@/components/ui/Button";
import { CirclePlus } from "lucide-react";
import { QuizDialog } from ".";
import { Dialog, DialogTrigger } from "../ui/Dialog";
import { useState } from "react";
import { QuizDialogProvider } from "@/provider";

export const QuizCreate = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit">
          <CirclePlus className="size-5" strokeWidth={3} />
          <span className="ml-2 hidden md:block">Create New Quiz</span>
        </Button>
      </DialogTrigger>

      <QuizDialogProvider
        value={{
          id: null,
          title: "",
          isFavourite: false,
          isUpdate: false,
          isDialogOpen,
          setIsDialogOpen,
        }}
      >
        <QuizDialog />
      </QuizDialogProvider>
    </Dialog>
  );
};
