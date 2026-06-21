import { Container } from "./Container";
import { LogoFull } from "@/components/ui/logo";
import { site, fullAddress, mapsHref } from "@/data/site";

/** Green site footer: contact · hours · address columns + wordmark lockup. */
export function Footer() {
  return (
    <footer className="mt-auto bg-green text-white">
      <Container>
        <div className="flex flex-col items-center gap-14 pt-16 pb-8">
          <div className="grid w-full grid-cols-1 gap-10 text-center md:grid-cols-3 md:items-start md:gap-8">
            <FooterColumn label={`Kontakt`}>
              <a href={site.contact.phoneHref} className="lead montaga">
                {site.contact.phone}
              </a>
              <a href={site.contact.emailHref} className="lead montaga">
                {site.contact.email}
              </a>
            </FooterColumn>

            <FooterColumn label="Åbningstider">
              {site.openingHours.map((o) => (
                <span key={o.days} className="lead montaga">
                  {o.days} {o.hours}
                </span>
              ))}
            </FooterColumn>

            <FooterColumn label={`© ${site.copyrightYear} ${site.name}`}>
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="lead montaga"
              >
                {fullAddress}
              </a>
            </FooterColumn>
          </div>

          <LogoFull />
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="kicker">{label}</span>
      {children}
    </div>
  );
}
