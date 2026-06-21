import type { Metadata } from "next";
import { Hero } from "@/components/heroes/Hero";
import { BarbersSection } from "@/components/sections/BarbersSection";
import { NewsletterBanner } from "@/components/sections/NewsletterBanner";
import { barbers } from "@/data/barbers";

export const metadata: Metadata = {
  title: "Om Os — Samuel's",
  description:
    "Mød holdet bag Samuel's — barbershoppen i Valby. Vores barbers og historie.",
};

// Page-specific placeholder copy (to be replaced).
const HERO_INTRO =
  "In tempor lorem id ornare sem blandit. Sit amet viverra eu aliquam. Et sed cursus libero ac mi nisi. Consectetur ut ut auctor vel rutrum. Iaculis nisl magnis enim ligula luctus eleifend. Est cursus etiam orci amet ullamcorper orci elit.";

const BARBERS_INTRO =
  "In tempor lorem id ornare sem blandit. Sit amet viverra eu aliquam. Et sed cursus libero ac mi nisi.";

export default function OmOsPage() {
  return (
    <>
      <Hero
        title="Om Os"
        text={HERO_INTRO}
        image="/images/om-os-hero.webp"
        imageAlt="Mand i oversized jakkesæt og solbriller foran en spejlende glasfacade"
      />
      <BarbersSection
        title="Vores barbers"
        intro={BARBERS_INTRO}
        barbers={barbers}
      />
      <NewsletterBanner heading="Få 50 kr. til dit første klip – det på huset." />
    </>
  );
}
