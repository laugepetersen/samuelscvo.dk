import { Container } from "@/components/layout/Container";
import { BgVideo } from "@/components/ui/bg-video";
import { ClubSamuels } from "@/components/ui/logo";
import { SignupButton } from "@/components/ui/signup-button";
import { Reveal } from "@/components/ui/reveal";

/**
 * Launch-offer / sign-up section: a looping background video inset by the site
 * gutter, with the club mark, heading and button overlaid.
 */
export function NewsletterBanner({ heading }: { heading: string }) {
  return (
    <section className="bg-white pb-[clamp(16px,2vw,32px)]">
      <Container>
        <Reveal className="relative flex min-h-128 items-center justify-center overflow-hidden md:min-h-[70vh]">
          <BgVideo
            mobile="/videos/signup-mobile.mp4"
            desktop="/videos/signup-desktop.mp4"
            poster="/images/signup-poster.webp"
            className="absolute inset-0 size-full object-cover object-center"
          />
          {/* Scrim for legibility of the overlaid white content */}
          <div className="absolute inset-0 bg-linear-to-tr from-black/40 via-black/0 to-black/40" />

          <div className="relative z-10 px-[6vw] text-center text-white">
            <ClubSamuels className="relative -left-3 mb-1" />
            <h2 className="max-w-lg h3 montaga md:h2 mb-6">{heading}</h2>
            <SignupButton variant="hvid" className="px-12">
              Ja, tilmeld mig
            </SignupButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
