import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { SidebarContent } from ".";

export const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="p-4">
            <SidebarContent isMobileNav={true} setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
