import type { RouterOutputs } from "@/utils/api";
import { createContext } from "react";
import type { ReactNode } from "react";

type ProfileType = RouterOutputs["user"]["getProfile"];

export const ProfileContext = createContext<ProfileType | undefined>(undefined);

export const ProfileProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: ProfileType;
}) => {
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
