import { Button } from "@/components/ui/Button";
import { WandSparkles } from "lucide-react";
import { QuizDialog } from ".";
import { Dialog, DialogTrigger } from "../ui/Dialog";
import { useState } from "react";
import { QuizDialogProvider } from "@/provider";
import { enableAi } from "@/utils/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/Tooltip";

export const QuizCreateAi = ({ isTempUser }: { isTempUser: boolean }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  if (!enableAi || isTempUser) {
    return null;
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <TooltipProvider>
        <Tooltip>
          <DialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button variant="ghost">
                <WandSparkles className="size-5" strokeWidth={2} />
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent>
            <p>Create quiz with AI</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <QuizDialogProvider
        value={{
          id: null,
          title: "",
          isFavourite: false,
          isUpdate: false,
          enableAi: enableAi,
          isDialogOpen,
          setIsDialogOpen,
          isPending,
          setIsPending,
        }}
      >
        <QuizDialog />
      </QuizDialogProvider>
    </Dialog>
  );
};
