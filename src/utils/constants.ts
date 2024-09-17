import type { NavItem } from "@/types/Navbar.types";
import { Filter, Sort } from "@/types/Quiz.types";
import {
  LayoutDashboardIcon,
  User2Icon,
  LogOut,
  Layers3,
  Triangle,
  Diamond,
  Circle,
  Square,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { type answerButtonVariants } from "@/components/ui/AnswerButton";
import type { VariantProps } from "class-variance-authority";
import { Interval } from "@/types/Dashboard.types";
import { env } from "@/env";

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

export const answerMap = {
  "0": "triangle",
  "1": "diamond",
  "2": "circle",
  "3": "square",
} as Record<string, VariantProps<typeof answerButtonVariants>["variant"]>;

export const shapeMap = {
  triangle: { color: "var(--color-triangle)", Icon: Triangle },
  diamond: { color: "var(--color-diamond)", Icon: Diamond },
  circle: { color: "var(--color-circle)", Icon: Circle },
  square: { color: "var(--color-square)", Icon: Square },
} as const;

export const intervalLists = [
  { name: "Day", value: Interval.day },
  { name: "Week", value: Interval.week },
  { name: "Month", value: Interval.month },
  { name: "All", value: Interval.all },
] as const;

export const enableAi = env.NEXT_PUBLIC_ENABLE_AI === "true";
