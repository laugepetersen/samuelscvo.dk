import Image from "next/image";
import { cn } from "@/lib/utils";

type MediaProps = {
  /** Image URL — set this to replace the image. Defaults to the placeholder. */
  src?: string;
  alt?: string;
  /** Size + aspect-ratio classes for the box, e.g. "aspect-16/10 w-full". */
  className?: string;
  /** Responsive sizes hint for next/image. */
  sizes?: string;
  priority?: boolean;
};

/**
 * The site's image primitive: fills its box with `object-cover` via
 * `next/image` (fill + sizes + a neutral loading background). The box's
 * size/aspect comes from `className`; swap `src` to drop in the real image —
 * sizing and optimization stay intact.
 */
export function Media({
  src = "/placeholder.png",
  alt = "",
  className,
  sizes = "100vw",
  priority = false,
}: MediaProps) {
  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
