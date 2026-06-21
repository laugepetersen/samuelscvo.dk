import { Section } from "@/components/layout/Section";
import { Media } from "@/components/ui/media";
import { Reveal } from "@/components/ui/reveal";

type HeroProps = {
  title: string;
  /** Free text / body copy beside the title (string or rich nodes). */
  text: React.ReactNode;
  /** Image src. Falls back to the shared placeholder when omitted. */
  image?: string;
  imageAlt?: string;
  priority?: boolean;
};

/**
 * Editorial hero: title + free text (4fr) beside a 16:10 image (6fr).
 * On mobile it stacks (title → image → body) via `display: contents` so the
 * image sits between them.
 *
 * Each part reveals (fade + rise) on load with a subtle stagger — matching the
 * `Reveal` entrance used across the site. The parts are wrapped individually so
 * the `contents`/`order` stacking stays intact.
 */
export function Hero({
  title,
  text,
  image,
  imageAlt = "",
  priority = true,
}: HeroProps) {
  return (
    <Section className="pt-8">
      <div className="grid gap-6 md:grid-cols-[4fr_6fr] md:items-center md:gap-x-[clamp(32px,4vw,64px)]">
        <div className="contents md:top-24 md:flex md:flex-col md:gap-6">
          <Reveal className="order-1 md:order-0">
            <h1 className="h1 montaga text-brown md:display">{title}</h1>
          </Reveal>
          <Reveal
            delay={0.1}
            className="order-3 max-w-[460px] text-body text-brown md:order-0"
          >
            {text}
          </Reveal>
        </div>

        <Reveal delay={0.05} className="order-2 md:order-0">
          <Media
            src={image}
            alt={imageAlt}
            className="aspect-16/10 w-full"
            sizes="(max-width: 768px) 94vw, 56vw"
            priority={priority}
          />
        </Reveal>
      </div>
    </Section>
  );
}
