import { cn } from "@/utils/theme";
import { UserNav, MobileSidebar, ThemeToggle, SearchBar } from ".";
import Link from "next/link";
import { Shapes } from "lucide-react";

export const Navbar = () => {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-14 items-center justify-between px-4">
        <div className="hidden md:block">
          <Link href="/">
            <Shapes className="h-8 w-8" />
          </Link>
        </div>
        <div className={cn("block md:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <SearchBar />
          <UserNav />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
};
