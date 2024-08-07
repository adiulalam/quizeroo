import { H1 } from "../ui/Typography";
import { ServeButton } from "./ServeButton";

export const ServeWaitingStart = ({ userCount }: { userCount: number }) => {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <H1 className="m-auto">Quizeroo</H1>

      <ServeButton disabled={userCount <= 0} />
    </div>
  );
};
