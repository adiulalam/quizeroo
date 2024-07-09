import React from "react";
import { signIn } from "next-auth/react";
import { cn } from "@/utils/theme";
import { buttonVariants } from "@/components/ui/Button";
import { LoaderCircle, Fingerprint } from "lucide-react";

export function AuthUser({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [isAuth0Loading, setIsAuth0Loading] = React.useState<boolean>(false);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            continue with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsAuth0Loading(true);
          void signIn("auth0");
        }}
        disabled={isAuth0Loading}
      >
        {isAuth0Loading ? (
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Fingerprint className="mr-2 h-4 w-4" />
        )}{" "}
        Auth0
      </button>
    </div>
  );
}
