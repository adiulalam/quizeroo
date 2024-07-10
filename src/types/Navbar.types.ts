import type { LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  Icon: LucideIcon;
  label?: string;
  description?: string;
  onClick?: () => void;
};
