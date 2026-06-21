/**
 * Reusable business information for Samuel's.
 * Page-specific copy lives in the components/pages — this file holds only
 * data that is reused across the site (contact, hours, nav, promos, …).
 */

export type OpeningHours = { days: string; hours: string };
export type NavItem = { label: string; href: string };

export const site = {
  name: "Samuel's",

  /** Primary navigation (burger menu), in display order. */
  nav: [
    { label: "Launch Party", href: "/launch-party" },
    { label: "Booking", href: "/booking" },
    { label: "Ydelser", href: "/ydelser" },
    { label: "Om Os", href: "/om-os" },
  ] satisfies NavItem[],

  /** Launch countdown badge (top-left). Date is in Danish time (Europe/Copenhagen). */
  launch: {
    date: "2026-07-01", // launch day (YYYY-MM-DD), Copenhagen
    label: "Launch Party", // line 2 while counting down
    openText: "We're open", // line 1 once the launch day has arrived
  },

  /** Top announcement bar */
  announcement: {
    label: "Launch Offer",
    value: "Få 50 kr rabat",
  },

  contact: {
    phone: "+45 00 00 00 00",
    phoneHref: "tel:+4500000000",
    email: "hej@samuelscvo.dk",
    emailHref: "mailto:hej@samuelscvo.dk",
  },

  openingHours: [
    { days: "Hverdage", hours: "09.00 – 17.00" },
    { days: "Lørdage", hours: "10.00 – 14.00" },
    { days: "Søndage", hours: "10.00 – 14.00" },
  ] satisfies OpeningHours[],

  address: {
    street: "Skolegade 9",
    city: "2500 Valby",
  },

  copyrightYear: 2026,
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city}`;
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  fullAddress,
)}`;
