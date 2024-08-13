import Link from "next/link";
import { H1, H4 } from "./Typography";
import { Button } from "./Button";
import { House, RefreshCw } from "lucide-react";

export const ErrorBox = ({
  children,
  refetch,
  homeButton,
  header = "Oops, something went wrong!",
  description = "We're sorry, but an unexpected error has occurred. Please try again later or contact support if the issue persists.",
}: {
  children?: React.ReactNode;
  homeButton?: boolean;
  header?: string;
  description?: string;
  refetch?: () => void;
}) => {
  return (
    <div className="flex h-full w-full max-w-lg flex-col items-center justify-center gap-4 p-2 text-center">
      <H1>{header}</H1>
      {description && <H4 className="text-muted-foreground">{description}</H4>}

      {homeButton && (
        <Button asChild>
          <Link href="/" className="flex items-center justify-center gap-2">
            <span>Go to Homepage</span>
            <House className="size-4" />
          </Link>
        </Button>
      )}

      {refetch && (
        <Button
          onClick={() => refetch()}
          className="flex items-center justify-center gap-2"
        >
          <span>Retry</span>
          <RefreshCw className="size-4" />
        </Button>
      )}

      {children}
    </div>
  );
};
