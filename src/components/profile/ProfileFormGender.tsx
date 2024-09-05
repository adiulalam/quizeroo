import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { Gender } from "@prisma/client";
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup";
import { type UpdateUserProfileSchemaType } from "@/server/schema/user.schema";
import { useProfile } from "@/hooks/useProfile";

export const ProfileFormGender = () => {
  const { control } = useFormContext<UpdateUserProfileSchemaType>();

  const { session } = useProfile();
  const { isTempUser } = session.user;

  return (
    <FormField
      control={control}
      name="gender"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Gender</FormLabel>
          <FormDescription>This is your gender.</FormDescription>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value ?? undefined}
              className="flex gap-8"
              disabled={isTempUser}
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value={Gender.MALE} />
                </FormControl>
                <FormLabel className="font-normal">Male</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value={Gender.FEMALE} />
                </FormControl>
                <FormLabel className="font-normal">Female</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value={Gender.OTHER} />
                </FormControl>
                <FormLabel className="font-normal">Other</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
