export const JoinFooter = () => {
  return (
    <div className="flex h-14 w-full items-center justify-between gap-2 p-2">
      <h3 className="w-full scroll-m-20 truncate text-2xl font-semibold tracking-tight">
        The Joke Tax
      </h3>

      <div className="flex w-20 items-center justify-center bg-muted/80">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">0</h4>
      </div>
    </div>
  );
};
