import { useCurrentQuestion, useHostname } from "@/hooks";
import { cn } from "@/utils/theme";
import { useRouter } from "next/router";
import { H3, H4 } from "../ui/Typography";

export const ServeFooter = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { isWaiting } = useCurrentQuestion();
  const { origin } = useHostname();

  return (
    <div
      className={cn(
        "h-14 w-full items-center justify-between gap-2 p-2",
        isWaiting ? "hidden" : "flex",
      )}
    >
      <H3 className="truncate">{origin}</H3>

      <H4>
        Room Code: <b>{id}</b>
      </H4>
    </div>
  );
};
