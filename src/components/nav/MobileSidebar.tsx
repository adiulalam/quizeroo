import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { SidebarContent } from ".";
import { Button } from "../ui/Button";

export const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTitle className="hidden" aria-hidden="true">
        Navbar
      </SheetTitle>
      <SheetDescription className="hidden" aria-hidden="true">
        Navbar for mobile
      </SheetDescription>
      <SheetTrigger asChild>
        <Button variant="ghost" className="px-2">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="!px-0">
        <div className="h-full p-4">
          <SidebarContent isMobileNav={true} setOpen={setOpen} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
