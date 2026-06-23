"use client";

import { ArrowUpRight } from "@/components/ui/arrow-up-right";
import { fullAddress, mapsHref, site } from "@/data/site";
import { useIsHydrated } from "@/lib/use-is-hydrated";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// The panel (AnimatePresence child) is the single animation driver; the list
// and items inherit "open"/"closed" via variant propagation — no independent
// animate state, so rapid open/close can't leave items stuck hidden.
const listVariants: Variants = {
  closed: {},
  open: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};
const itemVariants: Variants = {
  closed: { opacity: 0, x: -24 },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

// Panel slides in from the right on every breakpoint.
const navVariants: Variants = {
  closed: { x: "100%" },
  open: { x: "-1px" },
};

type NavMenuProps = {
  /** Open state — owned by `Header` so it can restyle while the menu is open. */
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function NavMenu({ open, onOpenChange }: NavMenuProps) {
  const [top, setTop] = useState(64); // viewport offset = header bottom
  const panelRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const mounted = useIsHydrated();

  // Lock the page while the menu is open. `overflow: hidden` covers desktop
  // wheel/scrollbar, but iOS Safari ignores it for touch — so also cancel
  // touchmove everywhere except inside the panel when its content actually
  // overflows (the panel's `overscroll-contain` keeps that scroll from chaining
  // back to the page). Keeping the page from moving also keeps the measured
  // `top` offset aligned with the sticky header — no announcement-bar-sized gap.
  // Esc closes.
  useEffect(() => {
    if (!open) return;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const onTouchMove = (e: TouchEvent) => {
      const panel = panelRef.current;
      if (
        panel &&
        panel.contains(e.target as Node) &&
        panel.scrollHeight > panel.clientHeight
      ) {
        return; // let an overflowing panel scroll itself
      }
      e.preventDefault(); // otherwise the page must not move
    };
    document.addEventListener("touchmove", onTouchMove, { passive: false });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onOpenChange]);

  const handleToggle = () => {
    if (!open) {
      const bottom = document
        .querySelector("header")
        ?.getBoundingClientRect().bottom;
      setTop(bottom ?? 64);
    }
    onOpenChange(!open);
  };
  const close = () => onOpenChange(false);

  return (
    <>
      <button
        type="button"
        onClick={handleToggle}
        aria-label={open ? "Luk menu" : "Åbn menu"}
        aria-expanded={open}
        className="relative flex size-10 items-center justify-center cursor-pointer"
      >
        <motion.span
          aria-hidden
          animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -3 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute h-px w-6 bg-current"
        />
        <motion.span
          aria-hidden
          animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 3 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute h-px w-6 bg-current"
        />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <motion.div
                  key="overlay"
                  onClick={close}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ top, bottom: 0 }}
                  className="fixed inset-x-0 z-30 bg-white/10 backdrop-blur-sm"
                />

                <motion.nav
                  key="panel"
                  ref={panelRef}
                  variants={navVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{ top, bottom: 0 }}
                  aria-label="Hovedmenu"
                  className={cn(
                    "fixed z-30 flex flex-col overflow-y-auto overscroll-contain bg-white",
                    "inset-x-0 gap-10 px-4 py-8",
                    "md:inset-x-auto md:right-0 w-[calc(100%+1px)] md:w-[460px] md:gap-0 border-l border-brown md:p-8",
                    "md:justify-between",
                  )}
                >
                  <motion.ul
                    variants={listVariants}
                    className="flex w-full flex-col gap-1"
                  >
                    {site.nav.map((item) => {
                      const active = pathname === item.href;
                      return (
                        <motion.li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={close}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "group flex w-full items-center justify-between gap-4 text-left",
                              active ? "text-brown" : "text-brown",
                            )}
                          >
                            <span className="h1 condensed whitespace-nowrap leading-none md:h1">
                              {item.label}
                            </span>
                            {/* arrow: shows on hover (desktop) and always on the active item */}
                            <ArrowUpRight
                              className={cn(
                                "hidden size-8 shrink-0 md:block",
                                "md:-translate-x-2 md:opacity-0 md:transition-all md:duration-200",
                                "md:group-hover:translate-x-0 md:group-hover:opacity-100",
                              )}
                            />
                          </Link>
                        </motion.li>
                      );
                    })}
                  </motion.ul>

                  <div className="flex w-full flex-col gap-5 text-brown">
                    <NavInfo label="Kontakt">
                      <a
                        href={site.contact.phoneHref}
                        className="hover:underline"
                      >
                        {site.contact.phone}
                      </a>
                      <a
                        href={site.contact.emailHref}
                        className="hover:underline"
                      >
                        {site.contact.email}
                      </a>
                    </NavInfo>
                    <NavInfo label="Åbningstider">
                      {site.openingHours.map((o) => (
                        <p key={o.days}>
                          {o.days} {o.hours}
                        </p>
                      ))}
                    </NavInfo>
                    <NavInfo label={`© ${site.copyrightYear} ${site.name}`}>
                      <a
                        href={mapsHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {fullAddress}
                      </a>
                    </NavInfo>
                  </div>
                </motion.nav>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

function NavInfo({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="kicker">{label}</span>
      <div className="flex flex-col gap-1 text-body">{children}</div>
    </div>
  );
}
