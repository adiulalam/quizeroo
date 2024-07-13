import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { MoreVertical } from "lucide-react";

export const QuizCard = () => {
  return (
    <Card className="grid h-72 w-full grid-cols-5 grid-rows-5 gap-2 shadow-md hover:shadow-lg sm:max-w-sm">
      <div className="col-span-5 row-span-3 bg-muted">
        <Button>hello</Button>
      </div>

      <div className="col-span-5 row-span-2 row-start-4 flex flex-col justify-evenly gap-2 p-2 ">
        <div className="max-h-18 flex justify-between gap-2">
          <CardTitle className="truncate">
            Create project Create project Create project Create project Create
            project
          </CardTitle>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 bg-muted/70"
                >
                  <MoreVertical className="h-3.5 w-3.5" />
                  <span className="sr-only">More</span>
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Trash</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex justify-between gap-2">
          <Button className="w-full">Deploy</Button>
        </div>
      </div>
    </Card>
  );
};
