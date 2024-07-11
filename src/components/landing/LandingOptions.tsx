import { Button } from "@/components/ui/Button";
import { signIn, useSession } from "next-auth/react";
import { LandingDialog } from ".";
import { useRouter } from "next/navigation";

export const LandingOptions = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const onClickHandler = () => {
    if (session) {
      void router.push("/create");
    } else {
      void signIn("auth0", { callbackUrl: "/create" });
    }
  };

  return (
    <div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
      <LandingDialog>
        <Button>Join a Room</Button>
      </LandingDialog>

      <Button variant="outline" onClick={onClickHandler}>
        Create a Room
      </Button>
    </div>
  );
};
