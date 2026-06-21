import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionProps = React.ComponentProps<"section"> & {
  /** Cap inner content at the 1080px content width, centered. */
  contained?: boolean;
  /** Render edge-to-edge with no gutter container (e.g. full-bleed image banners). */
  bleed?: boolean;
};

/**
 * Semantic section wrapper. By default it wraps children in a `Container`
 * (fluid 3vw gutter). Vertical spacing is set per-usage via `className`.
 */
export function Section({
  className,
  contained = false,
  bleed = false,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(className)} {...props}>
      {bleed ? (
        children
      ) : (
        <Container contained={contained}>{children}</Container>
      )}
    </section>
  );
}
