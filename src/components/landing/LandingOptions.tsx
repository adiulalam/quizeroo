import { Button } from "@/components/ui/Button";
import { signIn, useSession } from "next-auth/react";
import { LandingDialog } from ".";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Backdrop } from "../ui/Backdrop";

export const LandingOptions = () => {
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const onClickHandler = () => {
    setIsBackdropOpen(true);

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

      <Backdrop open={isBackdropOpen}>
        <Button
          variant="outline"
          onClick={onClickHandler}
          data-testid="create-room-button"
        >
          Create a Room
        </Button>
      </Backdrop>
    </div>
  );
};
