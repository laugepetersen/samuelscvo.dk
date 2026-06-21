import { Section } from "@/components/layout/Section";
import { ArrowUpRight } from "@/components/ui/arrow-up-right";
import { Reveal } from "@/components/ui/reveal";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";
import Link from "next/link";

const BOOKING_HREF = "/booking";

/** Ydelser price list: a divided list of services, each name + description + ↗. */
export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <Section contained className="py-16 md:py-24">
      <Reveal>
        <ul className="flex flex-col [&>li:last-child>*]:pb-0">
          {services.map((service) => (
            <ServiceRow key={service.name} service={service} />
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}

function ServiceRow({ service }: { service: Service }) {
  const inner = (
    <>
      <div className="flex flex-col gap-0.5 text-brown">
        <span className="h3 condensed leading-none md:h2">{service.name}</span>
        <span className="text-body leading-tight">{service.description}</span>
      </div>
      {service.inStoreOnly ? (
        <span className="mt-1 shrink-0 rounded-full border border-brown px-1.5 py-0.5 text-caption uppercase text-brown kicker">
          in-store only
        </span>
      ) : (
        <ArrowUpRight className="mt-1.5 size-6 shrink-0 text-brown transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </>
  );

  const base =
    "flex items-start justify-between gap-4 border-t border-brown/25 pt-3 pb-6";

  return (
    <li>
      {service.inStoreOnly ? (
        <div className={base}>{inner}</div>
      ) : (
        <Link href={BOOKING_HREF} className={cn(base, "group")}>
          {inner}
        </Link>
      )}
    </li>
  );
}
