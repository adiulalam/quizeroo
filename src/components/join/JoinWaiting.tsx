import { Button } from "../ui/Button";

type JoinWaitingtype = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const JoinWaiting = ({ setShowForm }: JoinWaitingtype) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 p-2">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        You are in!
      </h1>
      <h4 className="scroll-m-20 text-center text-xl font-semibold tracking-tight">
        See your name on the screen
      </h4>
      <Button onClick={() => setShowForm(true)}>Change name</Button>
    </div>
  );
};
