import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer";
}

/**
 * Responsive max-width content wrapper.
 * Centers content and applies consistent horizontal padding.
 */
export default function Container({
  children,
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </Component>
  );
}
