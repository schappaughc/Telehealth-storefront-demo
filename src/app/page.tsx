import { Counter } from "@/components/Counter";
import { FadeIn } from "@/components/FadeIn";
import { HeroBackground } from "@/components/HeroBackground";
import { OrderTimeline } from "@/components/OrderTimeline";
import { Questionnaire } from "@/components/Questionnaire";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const FEATURES = [
  {
    title: "Brand it as your own",
    text: "Colors, type and tone live in a handful of design tokens, so a new brand is a few lines of CSS, not a rebuild.",
  },
  {
    title: "Intake that feels easy",
    text: "Clear labels, one question at a time, and controls that work with a keyboard and a screen reader.",
  },
  {
    title: "Orders you can follow",
    text: "A calm, step-by-step view of where every order is, from first answer to front door.",
  },
] as const;

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="#top" className="font-display text-2xl font-semibold tracking-tight">
            Fernwell<span className="text-brand"> Care</span>
          </a>
          <nav aria-label="Primary" className="order-3 flex w-full gap-5 text-sm font-medium sm:order-none sm:w-auto">
            <a href="#how" className="hover:underline">How it works</a>
            <a href="#journey" className="hover:underline">Your order</a>
            <a href="#start" className="hover:underline">Get started</a>
          </nav>
          <ThemeSwitcher />
        </div>
      </header>

      <main id="main">
        <div id="top">
          <HeroBackground>
            <div className="mx-auto max-w-6xl px-4 pb-28 pt-20 sm:px-6 sm:pb-36 sm:pt-28">
              <FadeIn>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-on-deep/80">
                  A fictional white-label storefront
                </p>
              </FadeIn>
              <FadeIn delay={0.08}>
                <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
                  Care that comes to you, in your brand.
                </h1>
              </FadeIn>
              <FadeIn delay={0.16}>
                <p className="mt-6 max-w-xl text-lg text-on-deep/90">
                  A demo of a themeable telehealth storefront: accessible forms, honest motion, and
                  components built to be reused.
                </p>
              </FadeIn>
              <FadeIn delay={0.24}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href="#start"
                    className="rounded-full bg-on-deep px-7 py-3.5 font-semibold text-deep transition hover:brightness-95"
                  >
                    Start your visit
                  </a>
                  <a
                    href="#how"
                    className="rounded-full border border-on-deep/60 px-7 py-3.5 font-semibold transition hover:bg-on-deep/10"
                  >
                    How it works
                  </a>
                </div>
              </FadeIn>
            </div>
          </HeroBackground>
        </div>

        <section aria-labelledby="stats-h" className="border-b border-line">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <h2 id="stats-h" className="sr-only">Fernwell in numbers (sample data)</h2>
            <div className="grid gap-10 sm:grid-cols-3">
              <Counter value={48200} suffix="+" label="sample visits completed" />
              <Counter value={126000} suffix="+" label="sample orders delivered" />
              <Counter value={4.9} decimals={1} label="sample average rating" />
            </div>
          </div>
        </section>

        <section id="how" aria-labelledby="how-h" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <FadeIn>
            <h2 id="how-h" className="max-w-2xl font-display text-4xl font-semibold tracking-tight">
              Built like a design system, not a one-off page
            </h2>
          </FadeIn>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {FEATURES.map((f, i) => (
              <li key={f.title}>
                <FadeIn delay={i * 0.1} className="h-full">
                  <div className="h-full rounded-2xl border border-line bg-white/60 p-6">
                    <h3 className="font-display text-xl font-semibold">{f.title}</h3>
                    <p className="mt-3 text-muted">{f.text}</p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </section>

        <section id="journey" aria-labelledby="journey-h" className="bg-soft py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <FadeIn>
              <h2 id="journey-h" className="text-center font-display text-4xl font-semibold tracking-tight">
                Your order, step by step
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-center text-muted">
                Scroll to follow a sample order. The line fills as you go, and the whole list is
                shown complete if you prefer reduced motion.
              </p>
            </FadeIn>
            <div className="mt-14">
              <OrderTimeline />
            </div>
          </div>
        </section>

        <section id="start" aria-labelledby="start-h" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <FadeIn>
            <h2 id="start-h" className="text-center font-display text-4xl font-semibold tracking-tight">
              Start with a few questions
            </h2>
            <p className="mx-auto mb-12 mt-4 max-w-xl text-center text-muted">
              A sample intake form that shows accessible patterns. It is a demo and does not
              collect or send anything.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Questionnaire />
          </FadeIn>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted sm:px-6">
          <p>
            <strong className="text-ink">Fernwell Care is a fictional brand</strong> created for a
            portfolio demo. It is not a real medical service and offers no medical advice. All
            numbers, names and content are made up.
          </p>
          <p className="mt-2">Built with Next.js, TypeScript, Tailwind CSS and Framer Motion.</p>
        </div>
      </footer>
    </>
  );
}
