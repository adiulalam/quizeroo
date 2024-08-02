import { cn } from "@/utils/theme";

type HeadingType = {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLHeadingElement>["className"];
};

export function H1({ children, className }: HeadingType) {
  return (
    <h1
      className={cn(
        "scroll-m-20 whitespace-normal text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className }: HeadingType) {
  return (
    <h2
      className={cn(
        "scroll-m-20 whitespace-normal text-xl font-semibold tracking-tight first:mt-0 sm:text-2xl lg:text-3xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className }: HeadingType) {
  return (
    <h3
      className={cn(
        "scroll-m-20 whitespace-normal text-lg font-semibold tracking-tight sm:text-xl lg:text-2xl",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className }: HeadingType) {
  return (
    <h4
      className={cn(
        "scroll-m-20 whitespace-normal text-base font-semibold tracking-tight sm:text-lg lg:text-xl",
        className,
      )}
    >
      {children}
    </h4>
  );
}
