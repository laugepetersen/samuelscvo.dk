import { Media } from "@/components/ui/media";
import type { Barber } from "@/data/barbers";

/** A single barber: portrait + name + role. */
export function BarberCard({ barber }: { barber: Barber }) {
  return (
    <figure className="flex flex-col gap-1">
      <Media
        className="aspect-4/5 w-full"
        src={barber.image}
        alt={barber.name}
        sizes="(max-width: 768px) 46vw, 23vw"
      />
      <figcaption className="flex flex-col text-brown mt-1">
        <span className="lead condensed leading-none mb-px">{barber.name}</span>
        <span className="montaga leading-none">{barber.role}</span>
      </figcaption>
    </figure>
  );
}
