import { useFormContext } from "react-hook-form";
import { Button } from "../ui/Button";
import { type UpdateUserProfileSchemaType } from "@/server/schema/user.schema";
import { Loader2, SendHorizontal } from "lucide-react";
import { cn } from "@/utils/theme";

export const ProfileFormSubmit = ({ isPending }: { isPending: boolean }) => {
  const {
    formState: { isDirty },
  } = useFormContext<UpdateUserProfileSchemaType>();

  const Icon = isPending ? Loader2 : SendHorizontal;

  return (
    <Button
      type="submit"
      className="w-min self-end"
      disabled={!isDirty || isPending}
    >
      {isPending ? "Updating" : "Update"} profile
      <Icon className={cn("ml-2 h-4 w-4", isPending && "animate-spin")} />
    </Button>
  );
};
