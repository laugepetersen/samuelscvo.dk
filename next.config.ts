import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Let phones reach the dev server through a tunnel (e.g. ngrok) — otherwise
  // Next blocks cross-origin dev resources (HMR/RSC) and the app never hydrates.
  // Wildcards cover ngrok's rotating free-tier URLs. Dev-only; no prod effect.
  allowedDevOrigins: ["*.ngrok-free.app", "*.ngrok.app"],
};

export default nextConfig;
