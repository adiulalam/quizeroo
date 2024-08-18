import { useRouter } from "next/router";
import { useCurrentQuestion, useHostname } from "@/hooks";
import { H1, H2, H3 } from "../ui/Typography";
import { ServeHeaderQuestion } from "./ServeHeaderQuestion";

export const ServeHeader = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { isWaiting } = useCurrentQuestion();
  const { origin } = useHostname();

  return (
    <div className="flex max-h-32 w-full justify-center gap-2 p-2">
      {isWaiting ? (
        <div className="flex w-full flex-wrap items-center justify-center gap-2">
          <div className="flex flex-col items-center justify-center overflow-hidden text-ellipsis bg-muted/80 p-2">
            <H3 className="hidden font-light sm:block">Join at</H3>
            <H2 className="font-bold">{origin}</H2>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 bg-muted/80 p-2">
            <H3 className="hidden sm:block">Room Code:</H3>
            <H1 className="font-extrabold">{id}</H1>
          </div>
        </div>
      ) : (
        <ServeHeaderQuestion />
      )}
    </div>
  );
};
