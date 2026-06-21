import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div"> & {
  /** Cap inner content at the 1080px content width, centered. */
  contained?: boolean;
};

/**
 * Full-width layout wrapper with the site's fluid gutter (3vw).
 * Pass `contained` to additionally center inner content at `max-w-content`.
 */
export function Container({
  className,
  contained = false,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("w-full px-[clamp(16px,2vw,32px)]", className)}
      {...props}
    >
      {contained ? (
        <div className="mx-auto w-full max-w-content">{children}</div>
      ) : (
        children
      )}
    </div>
  );
}
