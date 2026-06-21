import { Hero } from "@/components/heroes/Hero";
import { NewsletterBanner } from "@/components/sections/NewsletterBanner";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { services } from "@/data/services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ydelser — Samuel's",
  description: "Klip, skæg og priser hos Samuel's i Valby.",
};

// Page-specific placeholder copy (to be replaced).
const HERO_INTRO =
  "In tempor lorem id ornare sem blandit. Sit amet viverra eu aliquam. Et sed cursus libero ac mi nisi. Consectetur ut ut auctor vel rutrum. Iaculis nisl magnis enim ligula luctus eleifend. Est cursus etiam orci amet ullamcorper orci elit.";

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
      <NewsletterBanner heading="Tilmeld dig og få 50 kr. gratis til næste klip som medlem." />
    </>
  );
}
