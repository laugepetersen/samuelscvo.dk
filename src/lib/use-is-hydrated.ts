import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Returns `false` during SSR and the hydration render, then `true` once mounted
 * on the client. Lets client-only UI (portals, time-based values) render without
 * a hydration mismatch — and without `setState` inside an effect.
 */
export function useIsHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
