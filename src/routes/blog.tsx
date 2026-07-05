import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Reveal, PowerOn, SectionTag, LEDTicker, FloatShapes, SignHover, NeonCTA } from "@/components/site";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Vansh Mandrawadker" },
      { name: "description", content: "Notes on design, branding, and using AI to work smarter — from The Pixel Post." },
      { property: "og:title", content: "Blog — Vansh Mandrawadker" },
      { property: "og:description", content: "Writing on design and AI workflows." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

const posts = [
  {
    d: "3 min read",
    c: "Solopreneur",
    t: 'The Solopreneur Stack #1: The AI "Sniper" Play',
    x: "After 10 weeks of mastering the craft of design, the series shifts to mastering the business of it.",
    href: "https://www.linkedin.com/pulse/solopreneur-stack-1-ai-sniper-play-vansh-mandrawadker-5ebof",
  },
  {
    d: "2 min read",
    c: "AI × Design",
    t: "The AI Upskill Play: Learn Any Tool in a Weekend",
    x: "Figma, Framer, Spline, Rive — a system for learning whatever tool is next before it becomes 'must-learn'.",
    href: "https://www.linkedin.com/pulse/ai-upskill-play-learn-any-tool-weekend-vansh-mandrawadker-ywjne",
  },
  {
    d: "2 min read",
    c: "Workflow",
    t: "The AI Velocity Play: How to Design 10x Faster",
    x: "Speed is a superpower. How to stop pixel-pushing and let AI take the production grunt work.",
    href: "https://www.linkedin.com/pulse/ai-velocity-play-how-design-10x-faster-vansh-mandrawadker-uekqe",
  },
  {
    d: "2 min read",
    c: "Career",
    t: "The AI Interview Play: Turn Your Experience into Answers That Close",
    x: "The recruiter is interested. Walk in with proof and structure instead of rambling about 'collaboration'.",
    href: "https://www.linkedin.com/pulse/ai-interview-play-turn-your-experience-answers-close-mandrawadker-irbre",
  },
  {
    d: "2 min read",
    c: "Career",
    t: "The AI Networking Play: Get Your Work Seen by the Right People",
    x: "Your portfolio is brilliant — but it doesn't matter if the right people never see it. Networking, minus the cringe.",
    href: "https://www.linkedin.com/pulse/ai-networking-play-get-your-work-seen-right-people-vansh-mandrawadker-dwjle",
  },
];

function Blog() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative overflow-hidden px-5 pb-14 pt-28 md:px-10 md:pb-20 md:pt-36">
        <FloatShapes variant={0} />
        <div className="relative mx-auto max-w-[1300px]">
          <Reveal>
            <SectionTag chip="Press" label="04 — The paper stand" />
          </Reveal>
          <PowerOn delay={0.15}>
            <h1 className="serif-display mt-10 text-[15vw] leading-[0.95] md:text-[9vw]">
              <span className="neon-white">Field</span> <span className="neon-red flicker-slow">Notes</span>
            </h1>
          </PowerOn>
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-md font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink-soft)]">
              A slower archive for ideas that don't fit in The Pixel Post
            </p>
          </Reveal>
        </div>
      </section>
      <LEDTicker text="Fresh off the press ✦ Design ✦ Branding ✦ AI workflows ✦" />

      {/* POSTS — newspaper stand */}
      <section className="relative px-5 py-20 md:px-10 md:py-32">
        <div className="relative mx-auto grid max-w-[1300px] gap-8 md:grid-cols-3">
          {posts.map((p, i) => (
            <PowerOn key={p.t} delay={i * 0.1}>
              <SignHover className={i % 2 ? "md:rotate-[0.6deg]" : "md:-rotate-[0.6deg]"}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Read"
                  className="group flex h-full flex-col justify-between border-2 border-[var(--divider)] bg-black/70 p-7 transition-all duration-500 hover:border-[var(--neon)] hover:shadow-[0_0_22px_rgba(255,42,60,0.25)] md:p-8"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="bg-[var(--neon)] px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-black">{p.c}</span>
                      <span className="serif-display text-4xl text-white/10">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h2 className="serif-display mt-6 text-2xl leading-tight transition-colors duration-300 group-hover:neon-red md:text-3xl">{p.t}</h2>
                    <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)]">{p.x}</p>
                  </div>
                  <div className="mt-8 flex items-center justify-between border-t border-[var(--divider)] pt-4">
                    <span className="flicker-fast font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--neon)]">● {p.d}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--ink-soft)] transition-colors duration-300 group-hover:text-[var(--neon)]">Read on LinkedIn ↗</span>
                  </div>
                </a>
              </SignHover>
            </PowerOn>
          ))}
        </div>

        {/* Pixel Post stand */}
        <PowerOn delay={0.2}>
          <div className="relative mx-auto mt-16 max-w-[1300px]">
            <div className="neon-border flex flex-col items-start justify-between gap-6 bg-black p-8 md:flex-row md:items-center md:p-10">
              <div>
                <div className="flicker-slow neon-red serif-display text-3xl md:text-4xl">The Pixel Post</div>
                <p className="mt-3 text-sm text-[var(--ink-soft)]">The weekly edition — AI × Design, read by 1,500+ designers on LinkedIn.</p>
              </div>
              <a
                href="https://www.linkedin.com/in/vanshmandrawadker2004/"
                target="_blank"
                rel="noreferrer"
                data-cursor="Read"
                className="shrink-0 bg-[var(--neon)] px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-black transition hover:shadow-[0_0_20px_rgba(255,42,60,0.5)]"
              >
                Subscribe →
              </a>
            </div>
          </div>
        </PowerOn>
      </section>

      <NeonCTA />
    </PageShell>
  );
}
