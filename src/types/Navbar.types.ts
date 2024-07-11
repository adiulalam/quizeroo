import type { LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  href?: string;
  Icon: LucideIcon;
  onClick?: () => void;
};
