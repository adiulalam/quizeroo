import { api } from "@/utils/api";
import { QuizSessionProvider } from "@/provider";
import { ServeFooter, ServeHeader, ServeWaiting, ServeQuestion } from ".";

export const ServeContainer = ({ id }: { id: string }) => {
  const { data, isLoading } = api.quizSession.getUserQuizSession.useQuery({
    id,
  });

  if (isLoading) {
    return <p>loading..</p>;
  }

  return (
    <QuizSessionProvider value={data!}>
      <div className="flex h-dvh flex-col items-center justify-between">
        <ServeHeader />

        <div className="flex h-full w-full bg-muted/40 p-2">
          {!data?.currentQuestionId ? <ServeWaiting /> : <ServeQuestion />}
        </div>

        <ServeFooter />
      </div>
    </QuizSessionProvider>
  );
};
