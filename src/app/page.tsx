import { HeroHome } from "@/components/heroes/HeroHome";

export default function Home() {
  return (
    <HeroHome
      title={
        <>
          Feel at home.
          <br aria-hidden />
          Look your best.
        </>
      }
      ctaLabel="Book tid"
      ctaHref="/booking"
      image="/images/hero.webp"
      imageAlt="Mand foran en klassisk Mercedes-cabriolet ved en villa med palmer"
    />
  );
}
