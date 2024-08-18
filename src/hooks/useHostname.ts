import { useRouter } from "next/router";

export const useHostname = () => {
  const { asPath } = useRouter();

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const url = `${origin}${asPath}`;

  return { origin, url };
};
