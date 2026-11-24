"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
};

const format = (n: number, decimals: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/**
 * Counts up when scrolled into view. Screen readers get the final number
 * immediately (the animated text is aria-hidden), and reduced-motion users
 * see the final number with no animation at all.
 */
export function Counter({ value, prefix = "", suffix = "", decimals = 0, label }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [animated, setAnimated] = useState(0);
  const display = reduce ? value : animated;

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setAnimated,
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <div>
      <p className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        <span ref={ref} aria-hidden="true">
          {prefix}
          {format(display, decimals)}
          {suffix}
        </span>
        <span className="sr-only">
          {prefix}
          {format(value, decimals)}
          {suffix}
        </span>
      </p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}
