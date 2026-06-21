import { Hero } from "@/components/heroes/Hero";
import { NewsletterBanner } from "@/components/sections/NewsletterBanner";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { services } from "@/data/services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ydelser — Samuel's",
  description: "Klip, skæg og priser hos Samuel's i Valby.",
};

// Page copy (Danish, Samuel's brand voice).
const HERO_INTRO =
  "Klip, skæg og alt derimellem — taget med tid, omtanke og en skarp hånd. Fra det klassiske combo til en hurtig fresh-up finder du den ydelse, der passer til dig. Ærlige priser, skarpt resultat.";

export default function YdelserPage() {
  return (
    <>
      <Hero
        title="Ydelser"
        text={HERO_INTRO}
        image="/images/ydelser-hero.webp"
        imageAlt="Mand bag rattet i en åben veteranbil i sollys"
      />
      <ServicesSection services={services} />
      <NewsletterBanner heading="Bliv medlem. Få 50 kr. til næste klip – på husets regning." />
    </>
  );
}
