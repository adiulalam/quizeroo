import { useViewQuiz } from "@/hooks";
import { ExternalLink } from "lucide-react";
import { Button } from "../ui/Button";
import Link from "next/link";

export const CardSessionLink = () => {
  const { quizSessions } = useViewQuiz();

  const quizSession = Array.isArray(quizSessions) && quizSessions[0];

  if (!quizSession) return null;

  return (
    <Button asChild variant="outline" className="p-2">
      <Link
        href={`/serve/${quizSession.roomName}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <ExternalLink className="size-4" />
      </Link>
    </Button>
  );
};
