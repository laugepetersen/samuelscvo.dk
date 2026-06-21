"use client";

import { useMediaQuery } from "@/lib/use-media-query";

type BgVideoProps = {
  /** MP4 source for < md screens. */
  mobile: string;
  /** MP4 source for ≥ md screens. */
  desktop: string;
  /** Shown before the video loads, and as a static fallback for reduced-motion. */
  poster?: string;
  /** Sizing classes (e.g. "absolute inset-0 size-full object-cover"). */
  className?: string;
};

/**
 * Decorative looping background video. Serves the mobile or desktop file based
 * on viewport, falls back to the poster when motion is reduced, and is muted +
 * `playsInline` so it autoplays everywhere. `key={src}` reloads on breakpoint change.
 */
export function BgVideo({ mobile, desktop, poster, className }: BgVideoProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const src = isDesktop ? desktop : mobile;

  return (
    <video
      key={src}
      autoPlay={!reduceMotion}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden
      className={className}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
