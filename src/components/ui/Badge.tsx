import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-primary/10 text-primary border-primary/20",
  outline: "bg-transparent text-muted-foreground border-border",
};

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
