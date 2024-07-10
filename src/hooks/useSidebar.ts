import { NavbarContext } from "@/provider";
import { useContext } from "react";

export const useSidebar = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a NavbarProvider");
  }
  return context;
};
