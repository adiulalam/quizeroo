import { Button } from "@/components/ui/Button";
import { signIn } from "next-auth/react";
import { LandingDialog } from ".";

export const LandingOptions = () => {
  return (
    <div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
      <Button onClick={() => void signIn("auth0", { callbackUrl: "/quiz" })}>
        Join a Server
      </Button>

      <LandingDialog>
        <Button variant="outline">Create a Server</Button>
      </LandingDialog>
    </div>
  );
};
