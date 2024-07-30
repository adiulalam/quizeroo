import { api } from "@/utils/api";
import { QuizSessionProvider } from "@/provider";
import { ServeFooter, ServeHeader, ServeWaiting } from ".";

export const ServeContainer = ({ id }: { id: string }) => {
  const { data, isLoading } = api.quizSession.getUserQuizSession.useQuery({
    id,
  });

  const isWaiting = true;

  if (isLoading) {
    return <p>loading..</p>;
  }

  return (
    <QuizSessionProvider value={data!}>
      <div className="flex h-dvh flex-col items-center justify-between">
        <ServeHeader isWaiting={isWaiting} />

        <div className="flex h-full w-full bg-muted/40 p-2">
          <ServeWaiting />
        </div>

        <ServeFooter isWaiting={isWaiting} />
      </div>
    </QuizSessionProvider>
  );
};
