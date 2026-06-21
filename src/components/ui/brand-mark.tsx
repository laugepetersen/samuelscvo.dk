import { cn } from "@/lib/utils";

type BrandMarkProps = {
  /** Path to an SVG in /public (single-colour artwork). */
  src: string;
  /** Accessible label for the mark. */
  label: string;
  /**
   * Size + colour classes. Colour comes from the text colour via `bg-current`
   * masking (e.g. `text-brown`). Always include a width and height.
   */
  className?: string;
};

/**
 * Renders a single-colour SVG logo as a CSS mask so it recolours to the
 * current text colour — lets one white SVG sit on any brand background.
 */
export function BrandMark({ src, label, className }: BrandMarkProps) {
  const mask = {
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
    maskSize: "contain",
    WebkitMaskSize: "contain",
  } as const;

  return (
    <span
      role="img"
      aria-label={label}
      style={mask}
      className={cn("inline-block bg-current", className)}
    />
  );
}
