import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type HeroHomeProps = {
  /** Two-line headline — pass `<br />` for the line break. */
  title: React.ReactNode;
  ctaLabel: string;
  ctaHref: string;
  /** Image src. Falls back to the shared placeholder when omitted. */
  image?: string;
  imageAlt?: string;
};

/**
 * Full-screen home hero: a treated full-bleed photo with the (transparent)
 * header overlaid on top, and a vertically-centred headline + outline CTA.
 *
 * The section is pulled up under the sticky header (`-mt-16`) so the image
 * bleeds behind it, and fills the viewport minus the announcement strip
 * (`100svh - 2rem`). The header renders white-on-transparent over the image
 * via its own route check — see `Header`.
 */
export function HeroHome({
  title,
  ctaLabel,
  ctaHref,
  image = "/placeholder.png",
  imageAlt = "",
}: HeroHomeProps) {
  return (
    <section className="relative -mt-16 flex min-h-[calc(100svh-2rem)] items-center justify-center overflow-hidden">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Scrim: darker at the edges for header/footer legibility, lighter over
          the centred headline. Keeps the white marks readable on the photo. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/30"
      />

      {/* Block hugs the headline; the button stretches to match its width. */}
      <div className="relative flex w-fit max-w-[90vw] flex-col items-center gap-6 text-center">
        <h1 className="h3 montaga leading-none text-white md:h1">{title}</h1>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href={ctaHref} />}
          className="w-full"
        >
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}
