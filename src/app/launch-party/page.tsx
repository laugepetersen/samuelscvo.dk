import type { Metadata } from "next";
import { HeroFull } from "@/components/heroes/HeroFull";
import { Button } from "@/components/ui/button";
import { Typewriter } from "@/components/ui/typewriter";
import { fullAddress } from "@/data/site";

export const metadata: Metadata = {
  title: "Launch Party — Samuel's",
  description: "1. juli åbner Samuel's i Valby — du er inviteret.",
};

// Page copy (Danish, Samuel's brand voice).
const INTRO =
  "1. juli slår vi dørene op i Skolegade 9. Kom forbi til dit første klip, en kold én i hånden og stemningen, når en ny nabolagsbarber finder sin plads. Ingen venteliste, ingen dikkedarer — bare klip, karakter og fællesskab fra dag ét. Vi ses i Valby.";

export default function LaunchPartyPage() {
  return (
    <HeroFull
      title="Launch Party"
      video={{
        mobile: "/videos/launch-mobile.mp4",
        desktop: "/videos/launch-desktop.mp4",
        poster: "/images/launch-poster.webp",
      }}
      mediaOverlay={
        <>
          {/* Scrim so the white label stays legible over any video frame */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-black/55 to-transparent" />
          <Typewriter
            className="pointer-events-none absolute top-5 left-5 text-white md:top-7 md:left-7"
            holdMs={3500}
            lines={[
              {
                text: "01.07.2026",
                className: "h2 condensed leading-none whitespace-nowrap md:display",
                typeMs: 190,
              },
              { text: fullAddress, className: "kicker mt-1.5", typeMs: 45 },
            ]}
          />
        </>
      }
    >
      <h2 className="lead condensed max-w-[360px] text-brown">
        1. juli åbner Samuel&rsquo;s og du inviteret! Vi giver 50 kr. gratis til
        dit første klip de næste par måneder.
      </h2>
      <p className="max-w-[460px] text-body text-brown">{INTRO}</p>
      <Button type="button" className="w-full px-10 sm:w-auto">
        Få 50 kr. til første klip
      </Button>
    </HeroFull>
  );
}
