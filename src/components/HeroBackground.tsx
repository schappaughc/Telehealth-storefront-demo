"use client";

import { useState } from "react";

type LeafSpec = {
  x: string;
  size: string;
  rot: string;
  dur: string;
  delay: string;
  sway: string;
  stillY: string;
};

// Fixed values (no Math.random) so server and client render identically.
const LEAVES: LeafSpec[] = [
  { x: "4%", size: "46px", rot: "20deg", dur: "26s", delay: "-4s", sway: "40px", stillY: "10%" },
  { x: "13%", size: "28px", rot: "-35deg", dur: "32s", delay: "-18s", sway: "-30px", stillY: "58%" },
  { x: "22%", size: "62px", rot: "70deg", dur: "38s", delay: "-9s", sway: "50px", stillY: "30%" },
  { x: "31%", size: "34px", rot: "-10deg", dur: "29s", delay: "-22s", sway: "-45px", stillY: "72%" },
  { x: "42%", size: "52px", rot: "40deg", dur: "35s", delay: "-2s", sway: "35px", stillY: "18%" },
  { x: "51%", size: "26px", rot: "-60deg", dur: "24s", delay: "-13s", sway: "-25px", stillY: "64%" },
  { x: "60%", size: "58px", rot: "15deg", dur: "40s", delay: "-27s", sway: "55px", stillY: "36%" },
  { x: "69%", size: "32px", rot: "-25deg", dur: "27s", delay: "-6s", sway: "-40px", stillY: "8%" },
  { x: "77%", size: "48px", rot: "55deg", dur: "33s", delay: "-16s", sway: "30px", stillY: "52%" },
  { x: "85%", size: "30px", rot: "-45deg", dur: "25s", delay: "-11s", sway: "-35px", stillY: "76%" },
  { x: "92%", size: "56px", rot: "30deg", dur: "37s", delay: "-20s", sway: "45px", stillY: "24%" },
];

function Leaf() {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M8 56C8 28 26 8 56 8c0 30-18 48-44 48-1.4 0-2.7-.1-4-.2Z" />
      <path d="M10 54 44 20" stroke="var(--deep)" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/**
 * Decorative looping background. Meets WCAG 2.2.2 (Pause, Stop, Hide):
 * motion loops longer than 5s, so there is a visible pause control, and
 * the whole thing is removed under `prefers-reduced-motion: reduce`.
 */
export function HeroBackground({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(false);

  return (
    <div data-paused={paused} className="relative isolate overflow-hidden bg-deep text-on-deep">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {LEAVES.map((l, i) => (
          <span
            key={i}
            className="leaf"
            style={
              {
                "--x": l.x,
                "--size": l.size,
                "--rot": l.rot,
                "--dur": l.dur,
                "--delay": l.delay,
                "--sway": l.sway,
                "--still-y": l.stillY,
              } as React.CSSProperties
            }
          >
            <Leaf />
          </span>
        ))}
      </div>

      {children}

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        className="motion-control absolute bottom-4 right-4 rounded-full border border-on-deep/50 bg-deep/80 px-4 py-2 text-sm font-medium text-on-deep backdrop-blur transition hover:bg-on-deep hover:text-deep"
      >
        {paused ? "Play background motion" : "Pause background motion"}
      </button>
    </div>
  );
}
