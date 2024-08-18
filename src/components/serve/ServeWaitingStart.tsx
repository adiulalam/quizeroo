import { H1 } from "../ui/Typography";
import { ServeButton } from "./ServeButton";

export const ServeWaitingStart = ({ userCount }: { userCount: number }) => {
  return (
    <div className="relative flex w-full flex-wrap items-center justify-evenly gap-4 sm:justify-center">
      <H1>Quizeroo</H1>

      <div className="right-0 top-0 flex sm:absolute">
        <ServeButton disabled={userCount <= 0} />
      </div>
    </div>
  );
};
