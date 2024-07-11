import React, { useState } from "react";
import { SidebarContent } from ".";
import { cn } from "@/utils/theme";
import { ChevronLeft } from "lucide-react";
import { useSidebar } from "@/hooks";

type SidebarProps = {
  className?: string;
};

export const Sidebar = ({ className }: SidebarProps) => {
  const { isMinimized, setIsMinimized } = useSidebar();
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    setIsMinimized((prev) => !prev);
    setTimeout(() => setStatus(false), 500);
  };

  return (
    <nav
      className={cn(
        `relative z-10 hidden h-screen flex-none border-r pt-20 md:block`,
        status && "duration-500",
        !isMinimized ? "w-48" : "w-[72px]",
        className,
      )}
    >
      <ChevronLeft
        className={cn(
          "absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
          isMinimized && "rotate-180",
        )}
        onClick={handleToggle}
      />
      <div className="h-full p-3">
        <SidebarContent />
      </div>
    </nav>
  );
};
