import { Shapes } from "lucide-react";
import Link from "next/link";
import { H3, H4 } from "../ui/Typography";

export const JoinHeader = ({ isWaiting }: { isWaiting: boolean }) => {
  return (
    <div className="flex h-14 w-full items-center justify-between gap-2 p-2">
      {!isWaiting && <H3 className="truncate">1/10</H3>}

      <Link href="/" className="m-auto">
        <Shapes className="size-8" />
      </Link>

      {!isWaiting && (
        <div className="flex min-w-14 items-center justify-center rounded-full bg-muted/80">
          <H4>30</H4>
        </div>
      )}
    </div>
  );
};
