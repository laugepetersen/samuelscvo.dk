import { Section } from "@/components/layout/Section";
import { BarberCard } from "@/components/ui/barber-card";
import { Reveal } from "@/components/ui/reveal";
import type { Barber } from "@/data/barbers";

type BarbersSectionProps = {
  title: string;
  intro: string;
  barbers: Barber[];
};

/** "Vores barbers" — centered intro + responsive grid of barber cards. */
export function BarbersSection({ title, intro, barbers }: BarbersSectionProps) {
  return (
    <Section contained className="py-16 md:py-24">
      <div className="flex flex-col items-center gap-8 md:gap-10">
        <Reveal className="flex flex-col items-center gap-4 text-center text-brown">
          <h2 className="h3 montaga md:h1">{title}</h2>
          <p className="max-w-[460px] text-body">{intro}</p>
        </Reveal>

        <div className="grid w-full grid-cols-2 gap-x-0.5 gap-y-4 md:grid-cols-4 md:gap-y-10">
          {barbers.map((barber, i) => (
            <Reveal key={i} delay={(i % 4) * 0.05}>
              <BarberCard barber={barber} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
