import type { Metadata } from "next";
import { Montaga, Special_Gothic } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { KlaviyoScript } from "@/components/analytics/KlaviyoScript";

const montaga = Montaga({
  weight: "400",
  subsets: ["latin"],
  variable: "--ff-montaga",
  display: "swap",
});

const specialGothic = Special_Gothic({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--ff-gothic",
  display: "swap",
  // next/font has no metric data for Special Gothic, so disable the
  // auto-generated size-adjusted fallback (silences the build warning).
  adjustFontFallback: false,
  fallback: ["system-ui", "arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Samuel's — Barbershop i Valby",
  description:
    "Samuel's er en barbershop i Valby. Mød vores barbers og book din tid.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="da"
      className={`${montaga.variable} ${specialGothic.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <KlaviyoScript />
      </body>
    </html>
  );
}
