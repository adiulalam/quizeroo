import { useCurrentQuestion } from "@/hooks";
import { cn } from "@/utils/theme";
import { useRouter } from "next/router";

export const ServeFooter = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { isWaiting } = useCurrentQuestion();

  return (
    <div
      className={cn(
        "h-14 w-full items-center justify-between gap-2 p-2",
        isWaiting ? "hidden" : "flex",
      )}
    >
      <h3 className="scroll-m-20 truncate text-base font-semibold tracking-tight sm:text-2xl">
        www.website.com
      </h3>

      <h4 className="scroll-m-20 text-base tracking-tight sm:text-xl">
        Room Code: <b>{id}</b>
      </h4>
    </div>
  );
};
