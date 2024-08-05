import { api } from "@/utils/api";
import { CurrentQuestionProvider, QuizSessionProvider } from "@/provider";
import { ServeFooter, ServeHeader, ServeBody } from ".";

export const ServeContainer = ({ id }: { id: string }) => {
  const { data, isLoading, isError } =
    api.quizSession.getUserQuizSession.useQuery({
      id,
    });

  if (isLoading) {
    return <p>loading..</p>;
  }

  if (!data || isError) {
    return <p>Error..</p>;
  }

  return (
    <QuizSessionProvider value={data}>
      <CurrentQuestionProvider
        defaultCurrentQuestionId={data.currentQuestionId}
        questions={data.quiz.questions}
        defaultShowSubmission={data.showSubmission}
      >
        <div className="flex h-dvh flex-col items-center justify-between">
          <ServeHeader />

          <ServeBody />

          <ServeFooter />
        </div>
      </CurrentQuestionProvider>
    </QuizSessionProvider>
  );
};
