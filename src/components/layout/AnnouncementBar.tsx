import { site } from "@/data/site";
import Link from "next/link";
import { Container } from "./Container";

/** Top green promo strip. */
export function AnnouncementBar() {
  return (
    <div className="bg-green text-white">
      <Link href="/launch-party">
        <Container>
          <div className="flex h-8 items-center justify-center gap-2 text-center kicker">
            <span>
              {site.announcement.label} – {site.announcement.value}
            </span>
          </div>
        </Container>
      </Link>
    </div>
  );
}
