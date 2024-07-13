import type { NavItem } from "@/types/Navbar.types";
import { Filter, Sort } from "@/types/Quiz.types";
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

export const sortLists = [
  { name: "Updated At", value: Sort.updatedAt },
  { name: "Status", value: Sort.status },
  { name: "Favourite", value: Sort.isFavourite },
] as const;

export const filterLists = [
  { name: "All", value: Filter.all },
  { name: "Draft", value: Filter.draft },
  { name: "Completed", value: Filter.completed },
  { name: "Favourite", value: Filter.favourite },
] as const;
