import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Skeleton } from "../ui/Skeleton";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/theme";

const dropdownLinks = [
  { href: "/dashboard", name: "Dashboard", shortcut: "⌘D" },
  { href: "/create", name: "Quizzes", shortcut: "⌘Q" },
  { href: "/profile", name: "Profile", shortcut: "⇧⌘P" },
];

export const UserNav = () => {
  const path = usePathname();
  const { data: session, status } = useSession();

  if (status === "loading" || !session) {
    return (
      <div>
        <Skeleton className="size-8 rounded-full" />
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={session.user?.image ?? ""}
              alt={session.user?.name ?? ""}
            />
            <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {dropdownLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <DropdownMenuItem
                className={cn(
                  path === link.href ? "bg-accent/60" : "transparent",
                )}
              >
                {link.name}
                <DropdownMenuShortcut>{link.shortcut}</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
          Logout
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
