"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  /** Seconds to wait before the animation starts (for staggering). */
  delay?: number;
  /** Distance in px the element travels upward while fading in. */
  y?: number;
  className?: string;
};

/**
 * Reveals its children once, when they scroll into view.
 * With `prefers-reduced-motion: reduce` the content is simply shown:
 * no movement, no opacity change.
 */
export function FadeIn({ children, delay = 0, y = 20, className }: FadeInProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
