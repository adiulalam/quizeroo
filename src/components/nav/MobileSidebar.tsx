import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { SidebarContent } from ".";
import { navItems } from "@/utils/constants";

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
            <SidebarContent
              items={navItems}
              isMobileNav={true}
              setOpen={setOpen}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
