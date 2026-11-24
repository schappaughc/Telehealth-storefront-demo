"use client";

import { useEffect, useState } from "react";

const THEMES = [
  { id: "fern", label: "Fern", swatch: "#2f6b4f" },
  { id: "dusk", label: "Dusk", swatch: "#4a45a8" },
  { id: "clay", label: "Clay", swatch: "#9a4a2b" },
] as const;

type ThemeId = (typeof THEMES)[number]["id"];

/**
 * Re-brands the whole page by changing one attribute. This is the
 * "white-label" idea in miniature: components never hard-code a colour.
 */
export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>("fern");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <fieldset className="flex items-center gap-2">
      <legend className="sr-only">Brand theme</legend>
      <span className="mr-1 hidden text-sm text-muted sm:inline" aria-hidden="true">
        Brand
      </span>
      {THEMES.map((t) => (
        <label key={t.id} className="relative cursor-pointer">
          <input
            type="radio"
            name="theme"
            value={t.id}
            checked={theme === t.id}
            onChange={() => setTheme(t.id)}
            className="peer sr-only"
          />
          <span
            className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm text-ink transition peer-checked:border-ink peer-checked:bg-soft peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent"
          >
            <span className="size-3 rounded-full" style={{ background: t.swatch }} aria-hidden="true" />
            {t.label}
          </span>
        </label>
      ))}
    </fieldset>
  );
}
