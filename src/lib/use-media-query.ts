import { useSyncExternalStore } from "react";

/**
 * SSR-safe media query hook. Returns `false` during SSR and the hydration
 * render, then the live value on the client — no `setState`-in-effect.
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
