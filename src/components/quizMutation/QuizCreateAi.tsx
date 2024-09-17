import { Button } from "@/components/ui/Button";
import { WandSparkles } from "lucide-react";
import { QuizDialog } from ".";
import { Dialog, DialogTrigger } from "../ui/Dialog";
import { useState } from "react";
import { QuizDialogProvider } from "@/provider";
import { enableAi } from "@/utils/constants";

export const QuizCreateAi = ({ isTempUser }: { isTempUser: boolean }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!enableAi) {
    return null;
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button disabled={isTempUser} variant="ghost">
          <WandSparkles className="size-5" strokeWidth={2} />
        </Button>
      </DialogTrigger>

      <QuizDialogProvider
        value={{
          id: null,
          title: "",
          isFavourite: false,
          isUpdate: false,
          enableAi: enableAi,
          isDialogOpen,
          setIsDialogOpen,
        }}
      >
        <QuizDialog />
      </QuizDialogProvider>
    </Dialog>
  );
};
