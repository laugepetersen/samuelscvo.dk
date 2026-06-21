"use client";

import Link from "next/link";
import { site } from "@/data/site";
import { useIsHydrated } from "@/lib/use-is-hydrated";

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

type Badge = { line1: string; line2: string };

/** Whole days from "today in Copenhagen" until the launch date. */
function daysUntilLaunch(launchISO: string): number {
  const todayISO = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Copenhagen",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date()); // e.g. "2026-06-21"

  const MS_PER_DAY = 86_400_000;
  // Both parse as UTC midnight → clean day difference, no DST drift.
  return Math.round((Date.parse(launchISO) - Date.parse(todayISO)) / MS_PER_DAY);
}

function formatLaunchDate(launchISO: string): string {
  const [y, m, d] = launchISO.split("-").map(Number);
  return `${String(d).padStart(2, "0")} ${MONTHS[m - 1]} ${y}`; // "01 JUL 2026"
}

function computeBadge(): Badge {
  const { date, label, openText } = site.launch;
  const left = daysUntilLaunch(date);

  if (left > 0) {
    return { line1: `${left} ${left === 1 ? "Day" : "Days"} Left`, line2: label };
  }
  return { line1: openText, line2: formatLaunchDate(date) };
}

/**
 * Header countdown badge. Counts down to the launch date in Danish time;
 * once the day arrives it switches to "We're open" + the launch date.
 * Computed on the client so it stays fresh on the statically-rendered page.
 */
export function LaunchBadge() {
  const hydrated = useIsHydrated();

  // Non-breaking spaces reserve the two lines until the client computes (no CLS).
  const { line1, line2 } = hydrated ? computeBadge() : { line1: " ", line2: " " };

  return (
    <Link
      href="/launch-party"
      // Colour is inherited from the header (brown normally, white over the hero).
      className="flex flex-col text-caption leading-tight text-center"
    >
      <span className="montaga">{line1}</span>
      <span className="kicker text-caption!">{line2}</span>
    </Link>
  );
}
