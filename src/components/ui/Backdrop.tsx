import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
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
        <LoaderCircle className="size-12 animate-spin" />
      </DialogContent>
    </Dialog>
  );
};

export { Backdrop };
