import { useFormContext } from "react-hook-form";
import { Button } from "../ui/Button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/Calendar";
import { cn } from "@/utils/theme";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { type UpdateUserProfileSchemaType } from "@/server/schema/user.schema";
import { useProfile } from "@/hooks/useProfile";

export const ProfileFormDoB = () => {
  const { control } = useFormContext<UpdateUserProfileSchemaType>();

  const { session } = useProfile();
  const { isTempUser } = session.user;

  return (
    <FormField
      control={control}
      name="dateOfBirth"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Date of Birth</FormLabel>
          <FormDescription>This is your date of birth.</FormDescription>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                  disabled={isTempUser}
                  data-testid="button-dob"
                >
                  {field.value ? (
                    format(field.value, "PP", { locale: enGB })
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                captionLayout="dropdown"
                selected={field.value ?? undefined}
                onSelect={field.onChange}
                fromYear={1900}
                toYear={new Date().getFullYear()}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
              />
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
