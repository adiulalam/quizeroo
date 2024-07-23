import { useTheme } from "next-themes";
import { Button } from "../ui/Button";
import { cn } from "@/utils/theme";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../ui/Command";
import { ScrollArea } from "@/components/ui/ScrollArea";
import {
  FileIcon,
  Layers3,
  LayoutDashboardIcon,
  MoonIcon,
  SunIcon,
  User2Icon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { api } from "@/utils/api";
import { Badge } from "../ui/Badge";
import { CardSessionButton } from "../quizView";
import { DialogTitle } from "../ui/Dialog";
import { DialogDescription } from "@radix-ui/react-dialog";

export const SearchBar = () => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();

  const { data } = api.quiz.searchQuizzes.useQuery({ title: input });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  const functionDebounce = debounce((value: string) => setInput(value), 300);

  const handleOnChange = (value: string) => void functionDebounce(value);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64",
        )}
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search quizzes...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="hidden" aria-hidden="true">
          Searchbar
        </DialogTitle>
        <DialogDescription className="hidden" aria-hidden="true">
          Searchbar for quizzes
        </DialogDescription>
        <CommandInput
          placeholder="Type a command or search..."
          onValueChange={handleOnChange}
        />
        <CommandList>
          <ScrollArea
            className={"[&>[data-radix-scroll-area-viewport]]:max-h-[40rem]"}
          >
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup heading="Links">
              {data?.map((quiz, index) => (
                <CommandItem
                  key={quiz.id}
                  className="flex justify-between"
                  value={`${index}-${quiz.title}`}
                >
                  <div className="flex w-full items-center gap-2">
                    <FileIcon className="size-4 min-w-4" />
                    <span>{quiz.title}</span>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <Badge>{quiz.status}</Badge>
                    <CardSessionButton
                      buttonSize="xxs"
                      status={quiz.status}
                      isSession={quiz._count.quizSessions > 0}
                      id={quiz.id}
                    />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandGroup heading="Settings">
              <CommandItem>
                <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
                <CommandShortcut>⌘D</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Layers3 className="mr-2 h-4 w-4" />
                <span>Quizzes</span>
                <CommandShortcut>⌘Q</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <User2Icon className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Theme">
              <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
                <SunIcon className="mr-2 h-4 w-4" />
                Light
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
                <MoonIcon className="mr-2 h-4 w-4" />
                Dark
              </CommandItem>
            </CommandGroup>
          </ScrollArea>
        </CommandList>
      </CommandDialog>
    </>
  );
};
