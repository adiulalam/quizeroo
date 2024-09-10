import { BookCopy, CheckCheck, CircleHelp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";
import { CardsPagination } from "./CardsPagination";

export const CardsContainer = () => {
  return (
    <Tabs defaultValue="day" className="space-y-4">
      <TabsList className="w-full max-w-sm">
        <TabsTrigger value="day" className="flex-grow">
          Day
        </TabsTrigger>
        <TabsTrigger value="week" className="flex-grow" disabled>
          Week
        </TabsTrigger>
        <TabsTrigger value="month" className="flex-grow" disabled>
          Month
        </TabsTrigger>
        <TabsTrigger value="all" className="flex-grow" disabled>
          All
        </TabsTrigger>
      </TabsList>
      <TabsContent value="day" className="flex flex-col gap-1">
        <div className="flex w-full flex-nowrap gap-1 overflow-x-hidden sm:flex-wrap sm:overflow-x-auto">
          <Card className="flex w-full min-w-full flex-1 flex-col sm:w-72 sm:min-w-72">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Quiz</CardTitle>
              <BookCopy className="size-4 stroke-primary/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="flex w-full min-w-full flex-1 flex-col sm:w-72 sm:min-w-72">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Correct Answer per User
              </CardTitle>
              <CheckCheck className="size-4 stroke-primary/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="flex w-full min-w-full flex-1 flex-col sm:w-72 sm:min-w-72">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Qustion per Quiz
              </CardTitle>
              <CircleHelp className="size-4 stroke-primary/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="flex w-full min-w-full flex-1 flex-col sm:w-72 sm:min-w-72">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Users per Quiz Session
              </CardTitle>
              <Users className="size-4 stroke-primary/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <CardsPagination />
      </TabsContent>
    </Tabs>
  );
};
