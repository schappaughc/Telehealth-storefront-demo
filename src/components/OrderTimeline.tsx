"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";

const STEPS = [
  { title: "Ordered", detail: "Your care kit order is placed and confirmed.", time: "Mon 07:41" },
  { title: "Reviewed", detail: "A licensed provider reviews your answers.", time: "Mon 09:14" },
  { title: "Prepared", detail: "A partner pharmacy packs your order.", time: "Mon 16:20" },
  { title: "On the way", detail: "Shipped with tracking to your door.", time: "Tue 02:47" },
  { title: "Delivered", detail: "Arrives in discreet, recyclable packaging.", time: "Wed 11:52" },
] as const;

/**
 * A scroll-driven timeline: the line fills as the list moves through the
 * viewport and each step "lights up" when the line reaches it.
 * Under reduced motion, every step is shown complete and nothing animates.
 * The list is a real <ol>, so assistive tech reads it in order either way.
 */
export function OrderTimeline() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length + 0.2)));
  });

  const activeCount = reduce ? STEPS.length : active + 1;

  return (
    <ol ref={ref} className="relative mx-auto max-w-2xl space-y-10 py-2 pl-10">
      <span className="absolute bottom-3 left-[13px] top-3 w-0.5 bg-line" aria-hidden="true" />
      <motion.span
        className="absolute bottom-3 left-[13px] top-3 w-0.5 origin-top bg-brand"
        style={{ scaleY: reduce ? 1 : fill }}
        aria-hidden="true"
      />
      {STEPS.map((s, i) => {
        const done = i < activeCount;
        return (
          <li key={s.title} className="relative">
            <span
              className={`absolute -left-10 top-0.5 grid size-7 place-items-center rounded-full border-2 text-xs font-semibold transition-colors duration-300 ${
                done
                  ? "border-brand bg-brand text-brand-ink"
                  : "border-line bg-bg text-muted"
              }`}
              aria-hidden="true"
            >
              {done ? "✓" : i + 1}
            </span>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-display text-xl font-semibold">{s.title}</h3>
              <p className="text-sm text-muted">{s.time}</p>
            </div>
            <p className="mt-1 text-muted">{s.detail}</p>
          </li>
        );
      })}
    </ol>
  );
}
