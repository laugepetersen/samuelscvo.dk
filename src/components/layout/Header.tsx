"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { LaunchBadge } from "./LaunchBadge";
import { NavMenu } from "./NavMenu";

/**
 * Sticky header: promo badge · wordmark · burger menu.
 *
 * On the home page it overlays the full-screen hero — transparent with white
 * marks — but ONLY while resting at the top with the menu closed. As soon as the
 * page is scrolled or the nav menu opens, it becomes the normal solid bar
 * (`bg-white/90` + backdrop blur + brown marks), same as every other route. The
 * marks (logo, badge, burger) inherit the header's text colour via `currentColor`,
 * so this single switch recolours all of them.
 */
export function Header() {
  const isHome = usePathname() === "/";
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll(); // sync if the page loads already scrolled
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overlay = isHome && !scrolled && !navOpen;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 h-16 border-b transition-colors",
        overlay
          ? "border-white/25 bg-transparent text-white"
          : cn(
              "bg-white/90 text-brown backdrop-blur-md",
              // Border deepens to solid brown while the menu is open.
              navOpen ? "border-brown" : "border-brown/10",
            ),
      )}
    >
      <Container className="h-full">
        <div className="items-center flex justify-between h-full">
          <LaunchBadge />

          <Logo className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          <div className="justify-self-end">
            <NavMenu open={navOpen} onOpenChange={setNavOpen} />
          </div>
        </div>
      </Container>
    </header>
  );
}
