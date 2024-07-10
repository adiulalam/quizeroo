import type { NavItem } from "@/types/Navbar.types";
import { LayoutDashboardIcon, User2Icon, LogOut, Layers3 } from "lucide-react";
import { signOut } from "next-auth/react";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    Icon: LayoutDashboardIcon,
    label: "Dashboard",
    onClick: undefined,
  },
  {
    title: "Quizzes",
    href: "/create",
    Icon: Layers3,
    label: "quiz",
    onClick: undefined,
  },
  {
    title: "Profile",
    href: "/profile",
    Icon: User2Icon,
    label: "profile",
    onClick: undefined,
  },
  {
    title: "Logout",
    href: undefined,
    Icon: LogOut,
    label: "logout",
    onClick: () => void signOut({ callbackUrl: "/" }),
  },
];
