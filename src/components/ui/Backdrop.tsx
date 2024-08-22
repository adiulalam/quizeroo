import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import { LoaderCircle } from "lucide-react";

type BackdropType = {
  open: boolean;
  children?: React.ReactNode;
};

const Backdrop = ({ open, children }: BackdropType) => {
  return (
    <Dialog open={open}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent
        className="flex items-center justify-center border-transparent bg-transparent"
        allowDisabledButton={false}
      >
        <DialogTitle className="hidden" aria-hidden="true">
          Loading
        </DialogTitle>
        <DialogDescription className="hidden" aria-hidden="true">
          Page is loading
        </DialogDescription>
        <LoaderCircle className="size-12 animate-spin" />
      </DialogContent>
    </Dialog>
  );
};

export { Backdrop };
