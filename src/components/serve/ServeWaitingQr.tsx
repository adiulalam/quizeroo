import { useHostname } from "@/hooks";
import QRCode from "react-qr-code";

export const ServeWaitingQr = () => {
  const { origin } = useHostname();

  return (
    <div className="flex w-full max-w-40 items-center justify-between gap-2 bg-white p-2 sm:max-w-60 md:max-w-80">
      <QRCode size={100} value={origin} className="h-auto w-full max-w-full" />
    </div>
  );
};
