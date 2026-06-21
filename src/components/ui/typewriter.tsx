"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TypewriterLine = {
  text: string;
  /** Styling for this line's block. */
  className?: string;
  /** ms per character while typing this line. */
  typeMs?: number;
};

type TypewriterProps = {
  lines: TypewriterLine[];
  className?: string;
  /** Pause (ms) once everything is typed, before deleting. */
  holdMs?: number;
  /** ms per character while deleting. */
  deleteMs?: number;
  /** Delay (ms) before each typing pass starts. */
  startDelayMs?: number;
};

/**
 * Looping typewriter: types each line in order with a blinking caret, holds for
 * a moment, then deletes everything in reverse and repeats. The caret is solid
 * while typing/deleting and blinks while idle. Honors reduced-motion by
 * rendering the full text with no animation.
 */
export function Typewriter({
  lines,
  className,
  holdMs = 3500,
  deleteMs = 35,
  startDelayMs = 600,
}: TypewriterProps) {
  const reduce = useReducedMotion();
  const [counts, setCounts] = useState<number[]>(() => lines.map(() => 0));
  const [active, setActive] = useState(0);
  const [idle, setIdle] = useState(true);

  useEffect(() => {
    if (reduce) return; // static full text is handled in render below

    let cancelled = false;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    const setCount = (li: number, n: number) =>
      setCounts((prev) => prev.map((v, i) => (i === li ? n : v)));

    (async () => {
      while (!cancelled) {
        setCounts(lines.map(() => 0));
        setActive(0);
        setIdle(true);
        await sleep(startDelayMs);
        if (cancelled) return;

        // type each line, slow→quick per `typeMs`
        setIdle(false);
        for (let li = 0; li < lines.length; li++) {
          setActive(li);
          const speed = lines[li].typeMs ?? 140;
          for (let c = 1; c <= lines[li].text.length; c++) {
            if (cancelled) return;
            setCount(li, c);
            await sleep(speed);
          }
        }

        // hold (caret blinks)
        setIdle(true);
        await sleep(holdMs);
        if (cancelled) return;

        // delete everything in reverse, then loop
        setIdle(false);
        for (let li = lines.length - 1; li >= 0; li--) {
          setActive(li);
          for (let c = lines[li].text.length - 1; c >= 0; c--) {
            if (cancelled) return;
            setCount(li, c);
            await sleep(deleteMs);
          }
        }
        await sleep(400);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [lines, reduce, holdMs, deleteMs, startDelayMs]);

  const isReduced = reduce === true;

  return (
    <div className={className}>
      <span className="sr-only">{lines.map((l) => l.text).join(" — ")}</span>
      <div aria-hidden>
        {lines.map((line, i) => (
          <p key={i} className={line.className}>
            {isReduced ? line.text : line.text.slice(0, counts[i] ?? 0)}
            {!isReduced && i === active && (
              <span className={cn("ml-0.5", idle && "caret-blink")}>|</span>
            )}
          </p>
        ))}
      </div>
    </div>
  );
}
