import { createContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

type NavbarContextType = {
  isMinimized: boolean;
  setIsMinimized: Dispatch<SetStateAction<boolean>>;
};

export const NavbarContext = createContext<NavbarContextType | undefined>(
  undefined,
);

export const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [isMinimized, setIsMinimized] = useState(true);

  return (
    <NavbarContext.Provider value={{ isMinimized, setIsMinimized }}>
      {children}
    </NavbarContext.Provider>
  );
};
