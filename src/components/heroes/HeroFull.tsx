import { Container } from "@/components/layout/Container";
import { BgVideo } from "@/components/ui/bg-video";
import { Media } from "@/components/ui/media";

type HeroFullProps = {
  title: string;
  /** Body content: subheading, paragraph, button, … (top-aligned, sticky on desktop). */
  children: React.ReactNode;
  /** Image src. Falls back to the shared placeholder when omitted. */
  image?: string;
  imageAlt?: string;
  /** Looping video for the media column — takes precedence over `image`. */
  video?: { mobile: string; desktop: string; poster?: string };
};

/**
 * Full-screen hero variant: the image fills its column height; the title + body
 * sit at the **top** of the text column and are **sticky** on desktop (they stay
 * in view while the tall image scrolls). On mobile it stacks (title → image →
 * body) with a 64px top inset.
 *
 * The text uses `display: contents` on mobile so the image can sit *between* the
 * title and body, and becomes a real sticky flex column on desktop.
 */
export function HeroFull({
  title,
  children,
  image,
  imageAlt = "",
  video,
}: HeroFullProps) {
  return (
    <section className="pt-8 pb-8">
      <Container>
        {/* full viewport minus header (6rem) minus top + bottom padding (2×2rem) */}
        <div className="grid gap-6 md:min-h-[calc(100svh-10rem)] md:grid-cols-2 lg:grid-cols-[4fr_6fr] md:items-center md:gap-x-[clamp(32px,4vw,64px)]">
          <div className="contents md:top-24 md:flex md:flex-col md:gap-6">
            <h1 className="h1 montaga order-1 text-brown md:order-0 md:display">
              {title}
            </h1>
            <div className="order-3 flex flex-col gap-6 md:order-0">
              {children}
            </div>
          </div>

          <div className="order-2 md:order-0 md:h-[calc(100svh-10rem)]">
            {video ? (
              <BgVideo
                mobile={video.mobile}
                desktop={video.desktop}
                poster={video.poster}
                className="aspect-16/10 w-full object-cover md:aspect-auto md:h-full"
              />
            ) : (
              <Media
                src={image}
                alt={imageAlt}
                className="aspect-16/10 w-full md:aspect-auto md:h-full"
                sizes="(max-width: 768px) 92vw, 56vw"
                priority
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
