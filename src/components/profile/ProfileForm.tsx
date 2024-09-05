import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "../ui/useToast";
import { Form } from "../ui/Form";
import { useProfile } from "@/hooks/useProfile";
import {
  updateUserProfileSchema,
  type UpdateUserProfileSchemaType,
} from "@/server/schema/user.schema";
import {
  ProfileFormDoB,
  ProfileFormGender,
  ProfileFormImage,
  ProfileFormName,
  ProfileFormPhone,
  ProfileFormSubmit,
} from ".";
import { api } from "@/utils/api";

export const ProfileForm = () => {
  const { profile } = useProfile();
  const { user } = api.useUtils();

  const { mutate, isPending } = api.user.updateProfile.useMutation({
    onSuccess: () => {
      void user.getProfile.invalidate();
    },
    onError: (e) => {
      const message = e.message;

      toast({
        title: `Action Failed! ${message}`,
        variant: "destructive",
      });
    },
  });

  const data: UpdateUserProfileSchemaType = {
    name: profile.name ?? "",
    image: profile.image,
    phone: profile.phone,
    gender: profile.gender,
    dateOfBirth: profile.dateOfBirth,
  };

  const form = useForm<UpdateUserProfileSchemaType>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: data,
    values: data,
  });

  const onSubmit = (data: UpdateUserProfileSchemaType) => {
    void mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <ProfileFormName />

        <ProfileFormImage />

        <ProfileFormPhone />

        <ProfileFormGender />

        <ProfileFormDoB />

        <ProfileFormSubmit isPending={isPending} />
      </form>
    </Form>
  );
};
