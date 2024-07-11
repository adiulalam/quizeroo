import type { NavItem } from "@/types/Navbar.types";
import { LayoutDashboardIcon, User2Icon, LogOut, Layers3 } from "lucide-react";
import { signOut } from "next-auth/react";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    Icon: LayoutDashboardIcon,
    onClick: undefined,
  },
  {
    title: "Quizzes",
    href: "/create",
    Icon: Layers3,
    onClick: undefined,
  },
  {
    title: "Profile",
    href: "/profile",
    Icon: User2Icon,
    onClick: undefined,
  },
  {
    title: "Logout",
    href: undefined,
    Icon: LogOut,
    onClick: () => void signOut({ callbackUrl: "/" }),
  },
];
