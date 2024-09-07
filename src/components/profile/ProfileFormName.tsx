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

export const ProfileFormName = () => {
  const { control } = useFormContext<UpdateUserProfileSchemaType>();

  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormDescription>This is your public display name.</FormDescription>
          <FormControl>
            <Input placeholder="Name.." data-testid="input-name" {...field} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
