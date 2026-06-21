import type { Metadata } from "next";
import { HeroFull } from "@/components/heroes/HeroFull";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Launch Party — Samuel's",
  description: "1. juli åbner Samuel's i Valby — du er inviteret.",
};

// Page-specific placeholder copy (to be replaced).
const INTRO =
  "In tempor lorem id ornare sem blandit. Sit amet viverra eu aliquam. Et sed cursus libero ac mi nisi. Consectetur ut ut auctor vel rutrum. Iaculis nisl magnis enim ligula luctus eleifend. Est cursus etiam orci amet ullamcorper orci elit.";

export default function LaunchPartyPage() {
  return (
    <HeroFull
      title="Launch Party"
      video={{
        mobile: "/videos/launch-mobile.mp4",
        desktop: "/videos/launch-desktop.mp4",
        poster: "/images/launch-poster.webp",
      }}
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
