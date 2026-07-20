import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell, Reveal, PowerOn, SectionTag, LEDTicker, FloatShapes, NeonCTA, Tilt } from "@/components/site";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Vansh Mandrawadker" },
      { name: "description", content: "Selected freelance work in branding, UI/UX, and industrial design." },
      { property: "og:title", content: "Work — Vansh Mandrawadker" },
      { property: "og:description", content: "Brand identity, product, and industrial design projects." },
      { property: "og:url", content: "/work" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
  component: Work,
});

const filters = ["All", "Brand Identity", "UI/UX", "Industrial Design"] as const;

function Work() {
  const [f, setF] = useState<(typeof filters)[number]>("All");
  const list = useMemo(() => {
    if (f === "All") return projects;
    if (f === "UI/UX") return projects.filter(p => p.category === "UI/UX" || p.category === "Web / Brand");
    return projects.filter(p => p.category === f);
  }, [f]);

  return (
    <PageShell>
      {/* HERO */}
      <section className="relative overflow-hidden px-5 pb-14 pt-28 md:px-10 md:pb-20 md:pt-36">
        <FloatShapes variant={1} />
        <div className="relative mx-auto max-w-[1300px]">
          <Reveal>
            <SectionTag chip="Work" label="02 — Full archive" />
          </Reveal>
          <PowerOn delay={0.15}>
            <h1 className="serif-display mt-10 text-[15vw] leading-[0.95] md:text-[9vw]">
              <span className="neon-white">The</span> <span className="neon-red flicker-slow">District</span>
            </h1>
          </PowerOn>
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-md font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink-soft)]">
              Every storefront on the street — {projects.length} projects and counting
            </p>
          </Reveal>

          {/* filters as sign buttons */}
          <div className="mt-10 flex flex-wrap gap-3">
            {filters.map((tab) => (
              <button
                key={tab}
                onClick={() => setF(tab)}
                data-cursor="Filter"
                className={`px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                  f === tab
                    ? "neon-border bg-[var(--neon)] text-black shadow-[0_0_20px_rgba(255,42,60,0.4)]"
                    : "border-2 border-[var(--divider)] bg-black/60 text-[var(--ink-soft)] hover:border-white/50 hover:text-[var(--ink)]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>
      <LEDTicker text="Brand identity ✦ UI/UX ✦ Industrial design ✦ All open tonight ✦" />

      {/* GRID */}
      <section className="relative px-5 py-20 md:px-10 md:py-28">
        <div className="relative mx-auto grid max-w-[1300px] gap-6 md:grid-cols-3 md:gap-8">
          {list.map((p, i) => (
            <div key={p.slug}>
              <PowerOn delay={(i % 3) * 0.08}>
                <Tilt max={3.5}>
                  <a
                    href={p.href}
                    target={p.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    data-cursor="View"
                    className="group block border-2 border-[var(--divider)] bg-black/70 transition-all duration-500 hover:border-[var(--neon)] hover:shadow-[0_0_22px_rgba(255,42,60,0.25)]"
                  >
                    <div className={`relative overflow-hidden ${p.contain ? "bg-black" : ""}`}>
                      <img
                        src={p.image}
                        alt={p.title}
                        className={`w-full aspect-[16/10] transition-all duration-700 group-hover:scale-[1.02] group-hover:[filter:grayscale(0)_contrast(1)_brightness(1)] ${p.contain ? "object-contain p-6" : "object-cover"}`}
                        style={{ filter: "grayscale(1) contrast(1.1) brightness(0.85)" }}
                      />
                      <div className="absolute left-4 top-4 bg-black/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/70">
                        CAM {String(i + 1).padStart(2, "0")} — {p.year}
                      </div>
                      {p.meta && (
                        <div className="absolute right-4 top-4 bg-[var(--neon)] px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-black">
                          {p.meta}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-4 p-5 md:p-6">
                      <div>
                        <div className="serif-display text-2xl transition-all duration-300 group-hover:neon-red md:text-3xl">{p.title}</div>
                        <div className="mt-2 flex flex-wrap items-center gap-3">
                          <span className="bg-[var(--neon)] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-black">{p.category}</span>
                          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">{p.year}</span>
                        </div>
                      </div>
                      <span className="flicker-fast font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--neon)] opacity-0 transition group-hover:opacity-100">● View ↗</span>
                    </div>
                  </a>
                </Tilt>
              </PowerOn>
            </div>
          ))}
        </div>
      </section>

      <NeonCTA />
    </PageShell>
  );
}
