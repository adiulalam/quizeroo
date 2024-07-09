import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { DoorOpen, Loader2, PanelLeftClose } from "lucide-react";
import { useState } from "react";

export const LandingDialog = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        isCloseDisabled={isLoading}
        onInteractOutside={(e) => isLoading && e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Join a Server</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" className="col-span-3" disabled={isLoading} />
        </div>
        <DialogFooter className="flex w-full gap-2 sm:justify-between">
          <DialogClose asChild disabled={isLoading}>
            <Button type="button" variant="destructive">
              <PanelLeftClose className="mr-2 h-4 w-4" /> Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={isLoading}
            onClick={() => setIsLoading(true)}
          >
            Join
            {isLoading ? (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            ) : (
              <DoorOpen className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
