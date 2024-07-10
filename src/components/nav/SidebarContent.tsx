import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/theme";
import type { Dispatch, SetStateAction } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/Tooltip";
import type { NavItem } from "@/types/Navbar.types";
import { useSidebar } from "@/hooks";
import { Button } from "../ui/Button";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export const SidebarContent = ({
  items,
  setOpen,
  isMobileNav = false,
}: DashboardNavProps) => {
  const path = usePathname();
  const { isMinimized } = useSidebar();

  console.log("isActive", isMobileNav, isMinimized);

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {items.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              {item.onClick ? (
                <Button
                  size={
                    isMobileNav || (!isMinimized && !isMobileNav)
                      ? "default"
                      : "icon"
                  }
                  onClick={item.onClick}
                >
                  {isMobileNav || (!isMinimized && !isMobileNav)
                    ? item.title
                    : ""}
                  <item.Icon
                    className={cn(
                      isMobileNav || (!isMinimized && !isMobileNav)
                        ? "ml-3 size-5"
                        : "h-4 w-4",
                    )}
                  />
                </Button>
              ) : (
                <Link
                  href={item.href ?? "/"}
                  className={cn(
                    "flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    path === item.href ? "bg-accent" : "transparent",
                    item.disabled && "cursor-not-allowed opacity-80",
                  )}
                  onClick={() => {
                    if (setOpen) setOpen(false);
                  }}
                >
                  <item.Icon className="ml-3 size-5" />

                  {isMobileNav || (!isMinimized && !isMobileNav) ? (
                    <span className="mr-2 truncate">{item.title}</span>
                  ) : (
                    ""
                  )}
                </Link>
              )}
            </TooltipTrigger>
            <TooltipContent
              align="center"
              side="right"
              sideOffset={8}
              className={!isMinimized ? "hidden" : "inline-block"}
            >
              {item.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </nav>
  );
};
