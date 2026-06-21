import Link from "next/link";
import { cn } from "@/lib/utils";
import { BrandMark } from "./brand-mark";
import { site } from "@/data/site";

/**
 * Brand marks. Each recolours to the inherited text colour via `BrandMark`
 * (header inherits brown; footer/CTA inherit off-white from their sections).
 */

/** Header wordmark — "SAMUEL'S". Links home unless `asLink={false}`. */
export function Logo({
  className,
  asLink = true,
}: {
  className?: string;
  asLink?: boolean;
}) {
  const mark = (
    <BrandMark
      src="/logos/logo-simple.svg"
      label={site.name}
      className={cn("h-7 w-[117px]", className)}
    />
  );

  if (!asLink) return mark;

  return (
    <Link
      href="/"
      aria-label={`${site.name} — forside`}
      className="inline-flex"
    >
      {mark}
    </Link>
  );
}

/** Footer lockup — wordmark + "opening hours since 2024". */
export function LogoFull({ className }: { className?: string }) {
  return (
    <BrandMark
      src="/logos/logo-full.svg"
      label={`${site.name} — copenhagen's very own`}
      className={cn("h-[88px] w-[200px] md:h-[110px] md:w-[250px]", className)}
    />
  );
}

/** "Samuel's Club" signature used above the launch-offer heading. */
export function ClubSamuels({ className }: { className?: string }) {
  return (
    <BrandMark
      src="/logos/club-samuels.svg"
      label="Samuel's Club"
      className={cn("h-10 w-[187px]", className)}
    />
  );
}
