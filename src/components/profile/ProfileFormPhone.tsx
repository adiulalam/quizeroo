import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { Input } from "../ui/Input";
import { type UpdateUserProfileSchemaType } from "@/server/schema/user.schema";
import { useProfile } from "@/hooks/useProfile";

export const ProfileFormPhone = () => {
  const { control } = useFormContext<UpdateUserProfileSchemaType>();

  const { session } = useProfile();
  const { isTempUser } = session.user;

  return (
    <FormField
      control={control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Phone</FormLabel>
          <FormDescription>This is your phone number.</FormDescription>
          <FormControl>
            <Input
              {...field}
              placeholder="Phone.."
              value={field.value ?? undefined}
              type="tel"
              disabled={isTempUser}
              data-testid="input-phone"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
