import { UserScoreContext } from "@/provider";
import { useContext } from "react";

export const useUserScore = () => {
  const context = useContext(UserScoreContext);

  if (!context) {
    throw new Error("useUserScore must be used within a UserScoreProvider");
  }

  return context;
};
