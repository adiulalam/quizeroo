import { api } from "@/utils/api";
import { QuizSessionProvider } from "@/provider";
import { ServeFooter, ServeHeader } from ".";

export const ServeContainer = () => {
  const { data, isLoading } = api.user.getUserQuizSession.useQuery();

  const isWaiting = true;

  if (isLoading) {
    return <p>loading..</p>;
  }

  return (
    <QuizSessionProvider value={data!}>
      <div className="flex h-dvh flex-col items-center justify-between">
        <ServeHeader isWaiting={isWaiting} />

        <div className="flex h-full w-full bg-muted/40 p-2">
          {/* <JoinWaiting setShowForm={setShowForm} /> */}
        </div>

        <ServeFooter isWaiting={isWaiting} />
      </div>
    </QuizSessionProvider>
  );
};
