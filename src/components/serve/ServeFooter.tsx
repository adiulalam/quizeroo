import { cn } from "@/utils/theme";
import { useRouter } from "next/router";

export const ServeFooter = ({ isWaiting }: { isWaiting: boolean }) => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <div
      className={cn(
        "h-14 w-full items-center justify-between gap-2 p-2",
        isWaiting ? "hidden" : "flex",
      )}
    >
      <h3 className="scroll-m-20 truncate text-2xl font-semibold tracking-tight">
        www.website.com
      </h3>

      <h4 className="scroll-m-20 text-xl tracking-tight">
        Room Code: <b>{id}</b>
      </h4>
    </div>
  );
};
