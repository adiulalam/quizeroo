import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";

export const TempUserAlert = () => {
  return (
    <Alert variant="destructive" className="bg-destructive-foreground">
      <AlertCircle className="size-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Limited functionality with this temporary account. Log out and create a
        new account for full access.
      </AlertDescription>
    </Alert>
  );
};
