import { Button } from "@/components/ui/Button";
import { signIn } from "next-auth/react";
import { LandingDialog } from ".";

export const LandingOptions = () => {
  return (
    <div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
      <LandingDialog>
        <Button>Join a Room</Button>
      </LandingDialog>

      <Button
        variant="outline"
        onClick={() => void signIn("auth0", { callbackUrl: "/quiz" })}
      >
        Create a Room
      </Button>
    </div>
  );
};
