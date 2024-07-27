import { useSession } from "next-auth/react";
import { useState } from "react";
import { JoinForm } from ".";
import { Button } from "../ui/Button";
import { useRouter } from "next/router";
import { api } from "@/utils/api";

export const JoinContainer = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { status } = useSession();
  const [showForm, setShowForm] = useState(false);

  const { data, isPending } = api.user.getUser.useQuery(undefined, {
    enabled: status === "authenticated",
  });

  const isEqualQuizSession = !!(data && data.quizSessionId === id);

  if (status === "loading" || isPending) {
    return <p>loading</p>;
  }

  if (showForm || status === "unauthenticated" || !isEqualQuizSession) {
    return <JoinForm setShowForm={setShowForm} />;
  }

  return (
    <div>
      <Button onClick={() => setShowForm(true)}>Change name</Button>
    </div>
  );
};
