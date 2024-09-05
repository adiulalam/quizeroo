import type { RouterOutputs } from "@/utils/api";
import { createContext } from "react";
import type { ReactNode } from "react";
import { type Session } from "next-auth";

type ProfileType = {
  profile: RouterOutputs["user"]["getProfile"];
  session: Session;
};

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
