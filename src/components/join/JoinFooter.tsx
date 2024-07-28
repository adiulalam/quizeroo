import { useQuizTempUser } from "@/hooks";

export const JoinFooter = ({ isWaiting }: { isWaiting: boolean }) => {
  const { name } = useQuizTempUser();

  return (
    <div className="flex h-14 w-full items-center justify-between gap-2 p-2">
      <h3 className="w-full scroll-m-20 truncate text-2xl font-semibold tracking-tight">
        {name}
      </h3>

      {!isWaiting && (
        <div className="flex w-20 items-center justify-center bg-muted/80">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            0
          </h4>
        </div>
      )}
    </div>
  );
};
