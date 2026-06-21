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

// Page copy (Danish, Samuel's brand voice).
const HERO_INTRO =
  "Samuel's er ikke bare endnu en barbershop. Det er et sted i Valby, hvor håndværk, fællesskab og karakter mødes — bygget for mænd, der sætter pris på detaljen: det skarpe klip, den gode samtale og følelsen af at høre til. Velkommen ind.";

const BARBERS_INTRO =
  "Mød holdet bag stolen. Erfarne hænder, skarpe øjne og altid tid til en god samtale — det er dem, der får dig til at føle dig hjemme.";

export default function OmOsPage() {
  return (
    <>
      <Hero
        title="Om Os"
        text={HERO_INTRO}
        image="/images/om-os-hero.webp"
        imageAlt="Mand i oversized jakkesæt og solbriller foran en spejlende glasfacade"
      />
      <BarbersSection title="Mød holdet" intro={BARBERS_INTRO} barbers={barbers} />
      <NewsletterBanner heading="Bliv medlem. Få 50 kr. til næste klip – på husets regning." />
    </>
  );
}
