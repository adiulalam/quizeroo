import { Shapes } from "lucide-react";
import Link from "next/link";

export const JoinHeader = ({ isWaiting }: { isWaiting: boolean }) => {
  return (
    <div className="flex h-14 w-full items-center justify-between gap-2 p-2">
      {!isWaiting && (
        <h3 className="scroll-m-20 truncate text-2xl font-semibold tracking-tight">
          1/10
        </h3>
      )}

      <Link href="/" className="m-auto">
        <Shapes className="size-8" />
      </Link>

      {!isWaiting && (
        <div className="flex min-w-14 items-center justify-center rounded-full bg-muted/80">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            30
          </h4>
        </div>
      )}
    </div>
  );
};
