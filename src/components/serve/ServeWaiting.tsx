import { useQuizSession } from "@/hooks";
import type { JoinQuizSessionSchemaType } from "@/server/schema/user.schema";
import { api } from "@/utils/api";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { useState } from "react";
import { ScrollArea } from "../ui/ScrollArea";
import { ServeWaitingQr, ServeWaitingStart } from ".";
import { H2 } from "../ui/Typography";

export const ServeWaiting = () => {
  const { id, user, users } = useQuizSession();

  const defaultUsers: JoinQuizSessionSchemaType[] = users.map((user) => ({
    id: user.id,
    name: user.name ?? "Unknown",
    quizSessionId: user.quizSessionId ?? id,
  }));

  const [tempUsers, setTempUsers] =
    useState<JoinQuizSessionSchemaType[]>(defaultUsers);

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

  return (
    <ScrollArea className="flex h-[calc(100dvh-8rem)] w-full p-2">
      <div className="flex flex-col flex-wrap items-center justify-center gap-8">
        <ServeWaitingStart userCount={tempUsers.length} />

        <ServeWaitingQr />

        {tempUsers.length <= 0 ? (
          <H2 className="border-b pb-2">Waiting for users...</H2>
        ) : (
          <div className="flex flex-wrap justify-center gap-2">
            {tempUsers.map((user) => (
              <Card key={user.id}>
                <CardHeader>
                  <CardTitle data-testid="heading-serve-user">
                    {user.name}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ScrollArea>
  );
};
