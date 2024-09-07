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

export const ProfileFormImage = () => {
  const { control } = useFormContext<UpdateUserProfileSchemaType>();

  const { session } = useProfile();
  const { isTempUser } = session.user;

  return (
    <FormField
      control={control}
      name="image"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Image</FormLabel>
          <FormDescription>This is your display image.</FormDescription>
          <FormControl>
            <Input
              {...field}
              placeholder="Image.."
              value={field.value ?? undefined}
              disabled={isTempUser || true}
              data-testid="input-image"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
