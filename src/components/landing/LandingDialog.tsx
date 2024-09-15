import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { DoorOpen, Loader2, PanelLeftClose } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import {
  getSessionNameSchema,
  type GetSessionNameSchemaType,
} from "@/server/schema/quizSession.schema";
import { api } from "@/utils/api";
import { toast } from "../ui/useToast";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/theme";

export const LandingDialog = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { mutate, isPending } = api.quizSession.getSessionName.useMutation({
    onSuccess: ({ id }) => {
      router.push(`/join/${id}`);
    },
    onError: (e) => {
      const message = e?.message;
      toast({
        title: `Action Failed! ${message}`,
        variant: "destructive",
      });
    },
  });

  const form = useForm<GetSessionNameSchemaType>({
    resolver: zodResolver(getSessionNameSchema),
    defaultValues: {
      roomName: "",
    },
  });

  function onSubmit(values: GetSessionNameSchemaType) {
    mutate({ roomName: values.roomName });
  }

  const Icon = isPending ? Loader2 : DoorOpen;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        isCloseDisabled={isPending}
        onInteractOutside={(e) => isPending && e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Join a Room</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter the room name to join</DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="roomName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Room Name.."
                      disabled={isPending}
                      data-testid="input-room-name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex w-full gap-2 sm:justify-between">
              <DialogClose asChild disabled={isPending}>
                <Button type="button" variant="destructive">
                  <PanelLeftClose className="mr-2 h-4 w-4" /> Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isPending}
                data-testid="button-room-enter"
              >
                Join
                <Icon
                  className={cn("ml-2 h-4 w-4", isPending && "animate-spin")}
                />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
