"use client";

import { useId, useState } from "react";

const GOALS = [
  { id: "energy", label: "More energy through the day" },
  { id: "sleep", label: "Better sleep routines" },
  { id: "skin", label: "Clearer, calmer skin" },
  { id: "unsure", label: "I'm not sure yet" },
] as const;

function sleepZone(hours: number) {
  if (hours < 6) return "Shorter than you might like";
  if (hours <= 8) return "In the typical range";
  return "Longer than typical";
}

/**
 * A demo intake form. It shows accessible form patterns rather than
 * collecting anything: real <fieldset>/<legend> grouping, labels tied to
 * inputs, a slider with a text equivalent, and a polite live-region result.
 * Nothing is sent anywhere. Questions are generic, not medical advice.
 */
export function Questionnaire() {
  const uid = useId();
  const [hours, setHours] = useState(7);
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="mx-auto max-w-xl space-y-8 rounded-2xl border border-line bg-white/60 p-6 shadow-sm sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div>
        <label htmlFor={`${uid}-name`} className="block font-medium">
          First name
        </label>
        <input
          id={`${uid}-name`}
          name="name"
          type="text"
          autoComplete="given-name"
          required
          className="mt-2 w-full rounded-lg border border-muted/60 bg-white px-4 py-3 text-ink"
        />
      </div>

      <fieldset>
        <legend className="font-medium">What would you like help with?</legend>
        <div className="mt-3 space-y-2">
          {GOALS.map((g, i) => (
            <label
              key={g.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-line bg-white px-4 py-3 has-[:checked]:border-brand has-[:checked]:bg-soft"
            >
              <input
                type="radio"
                name="goal"
                value={g.id}
                defaultChecked={i === 0}
                className="size-5 accent-[var(--brand)]"
              />
              {g.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor={`${uid}-sleep`} className="block font-medium">
          Hours of sleep on a typical night
        </label>
        <div className="mt-3 flex items-center gap-4">
          <input
            id={`${uid}-sleep`}
            name="sleep"
            type="range"
            min={4}
            max={10}
            step={0.5}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            aria-valuetext={`${hours} hours, ${sleepZone(hours)}`}
            className="h-2 w-full cursor-pointer accent-[var(--brand)]"
          />
          <output htmlFor={`${uid}-sleep`} className="w-20 text-right font-display text-2xl font-semibold">
            {hours} h
          </output>
        </div>
        <p className="mt-2 text-sm text-muted" aria-live="polite">
          {sleepZone(hours)}
        </p>
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-brand px-6 py-3.5 font-semibold text-brand-ink transition hover:brightness-110 active:scale-[0.99]"
      >
        See my recommended plan
      </button>

      <p role="status" className="min-h-6 text-sm text-muted">
        {submitted
          ? "Thanks! This is a demo, so nothing was sent and no plan was made."
          : "Demo form: nothing you enter is saved or sent."}
      </p>
    </form>
  );
}
