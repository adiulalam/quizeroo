import { Button } from "../ui/Button";
import { H1, H4 } from "../ui/Typography";

type JoinWaitingtype = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const JoinWaiting = ({ setShowForm }: JoinWaitingtype) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 p-2">
      <H1>You are in!</H1>
      <H4 className="text-center">See your name on the screen</H4>
      <Button onClick={() => setShowForm(true)}>Change name</Button>
    </div>
  );
};
