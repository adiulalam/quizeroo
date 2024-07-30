import { useQuizSession } from "@/hooks";
import type { JoinQuizSession } from "@/server/api/routers/user.routes";
import { api } from "@/utils/api";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { useState } from "react";
import { ScrollArea } from "../ui/ScrollArea";
import { Button } from "../ui/Button";
import { CirclePlay } from "lucide-react";

export const ServeWaiting = () => {
  const { id, user } = useQuizSession();

  const [tempUsers, setTempUsers] = useState<JoinQuizSession[]>([]);

  api.user.onJoin.useSubscription(
    { id: user.id, name: user.name ?? "Unknown", quizSessionId: id },
    {
      onData: (user) => {
        const hasTempUser = tempUsers.some(
          (tempUser) => tempUser.id === user.id,
        );

        if (hasTempUser) {
          setTempUsers((prev) =>
            prev.map((tempUser) =>
              tempUser.id === user.id ? { ...tempUser, ...user } : tempUser,
            ),
          );
        } else {
          setTempUsers((prev) => [...prev, user]);
        }
      },
    },
  );

  const onClickHandler = () => {
    console.log("first");
  };

  return (
    <ScrollArea className="flex h-[calc(100dvh-8rem)] w-full p-2">
      <div className="flex flex-col flex-wrap items-center justify-center gap-8">
        <div className="flex w-full items-center justify-between gap-2">
          <h1 className="m-auto scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Quizeroo
          </h1>

          <Button onClick={onClickHandler}>
            Start <CirclePlay className="ml-2 size-4" />
          </Button>
        </div>
        {tempUsers.length <= 0 ? (
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Waiting for users...
          </h2>
        ) : (
          <div className="flex flex-wrap justify-center gap-2">
            {tempUsers.map((user) => (
              <Card key={user.id}>
                <CardHeader>
                  <CardTitle>{user.name}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ScrollArea>
  );
};
