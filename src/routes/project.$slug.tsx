import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { projects, type Project, type ProjectSection } from "@/lib/projects";

export const Route = createFileRoute("/project/$slug")({
  head: ({ params }) => {
    const p = projects.find(proj => proj.slug === params.slug);
    return {
      meta: [
        { title: p ? `${p.title} — Vansh Mandrawadker` : "Project" },
        { name: "description", content: p?.description ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    const p = projects.find(proj => proj.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  component: ProjectPage,
});

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────── Home-page atmosphere ─────────────────────── */

function SmoothScroll({ children }: { children: ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const noReduce = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || !noReduce) return;
    setEnabled(true);

    const content = contentRef.current;
    if (!content) return;
    const setH = () => { document.body.style.height = `${content.getBoundingClientRect().height}px`; };
    setH();
    const ro = new ResizeObserver(setH);
    ro.observe(content);

    let current = window.scrollY;
    let raf = 0;
    const loop = () => {
      const target = window.scrollY;
      current += (target - current) * 0.075;
      if (Math.abs(target - current) < 0.1) current = target;
      content.style.transform = `translate3d(0, ${-current}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.body.style.height = "";
    };
  }, []);

  if (!enabled) return <div ref={contentRef}>{children}</div>;
  return (
    <div className="fixed inset-x-0 top-0">
      <div ref={contentRef} className="will-change-transform">{children}</div>
    </div>
  );
}

function Atmosphere() {
  return (
    <>
      <div
        className="pointer-events-none fixed -left-40 top-[20%] z-[5] h-[600px] w-[600px] rounded-full opacity-[0.15] blur-3xl"
        style={{ background: "radial-gradient(circle, #ff2a3c, transparent 65%)", animation: "drift-a 16s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none fixed -right-48 top-[55%] z-[5] h-[640px] w-[640px] rounded-full opacity-[0.1] blur-3xl"
        style={{ background: "radial-gradient(circle, #f2efe6, transparent 65%)", animation: "drift-b 21s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-[4]"
        style={{ background: "radial-gradient(ellipse at 50% 120%, rgba(255,42,60,0.1), transparent 55%), radial-gradient(ellipse at center, transparent 62%, rgba(0,0,0,0.45) 100%)" }}
      />
    </>
  );
}

/* city skyline silhouette — same as home hero */
function Skyline() {
  const buildings = Array.from({ length: 16 }, (_, i) => ({
    h: 32 + ((i * 53) % 58),
    w: 4.5 + ((i * 37) % 5),
    antenna: i % 5 === 0,
  }));
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45vh]">
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#ff2a3c]/[0.07] to-transparent" />
      {/* far */}
      <div className="absolute inset-x-0 bottom-0 flex h-full items-end justify-center gap-[2px] opacity-30">
        {buildings.map((b, i) => (
          <div key={`far-${i}`} className="bg-[#101012]" style={{ height: `${b.h * 0.7}%`, width: `${b.w * 0.8}%` }} />
        ))}
      </div>
      {/* near */}
      <div className="absolute inset-x-0 bottom-0 flex h-full items-end justify-between gap-1 opacity-70">
        {buildings.map((b, i) => (
          <div key={i} className="relative bg-[#0d0d0f]" style={{ height: `${b.h}%`, width: `${b.w}%` }}>
            <div
              className="absolute inset-1 opacity-50"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(242,239,230,0.13) 0 2px, transparent 2px 8px), repeating-linear-gradient(90deg, rgba(242,239,230,0.13) 0 3px, transparent 3px 10px)",
              }}
            />
            {b.antenna && (
              <motion.div
                animate={{ opacity: [0.25, 0.9, 0.25] }}
                transition={{ duration: 2.2 + (i % 3), repeat: Infinity }}
                className="absolute -top-3 left-1/2 h-3 w-[3px] -translate-x-1/2 bg-[var(--neon)]"
              />
            )}
          </div>
        ))}
      </div>
      {/* passing traffic */}
      <motion.div
        animate={{ x: ["-15%", "115%"] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-2 left-0 h-[2px] w-28 bg-gradient-to-r from-transparent via-white/50 to-transparent"
      />
      <motion.div
        animate={{ x: ["115%", "-15%"] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
        className="absolute bottom-6 left-0 h-[2px] w-36 bg-gradient-to-r from-transparent via-[var(--neon)]/60 to-transparent"
      />
    </div>
  );
}

/* blinking city windows */
function CityWindows() {
  const windows = Array.from({ length: 48 }, (_, i) => ({
    left: (i * 37) % 96,
    top: (i * 53) % 65,
    w: 6 + ((i * 13) % 12),
    h: 8 + ((i * 7) % 14),
    dur: 2.5 + ((i * 11) % 50) / 10,
    delay: ((i * 17) % 40) / 10,
    red: i % 9 === 0,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {windows.map((w, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.06, 0.28, 0.06] }}
          transition={{ duration: w.dur, delay: w.delay, repeat: Infinity }}
          className="absolute"
          style={{ left: `${w.left}%`, top: `${w.top}%`, width: w.w, height: w.h, background: w.red ? "#ff2a3c" : "#f2efe6" }}
        />
      ))}
    </div>
  );
}

/* retro perspective grid — same as home Interlude */
function RetroGrid() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[50%] overflow-hidden opacity-25">
      <div
        className="absolute inset-x-[-30%] bottom-[-20%] top-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,42,60,0.5) 0 1px, transparent 1px 70px), repeating-linear-gradient(0deg, rgba(255,42,60,0.5) 0 1px, transparent 1px 56px)",
          transform: "perspective(420px) rotateX(58deg)",
          transformOrigin: "center top",
          animation: "grid-scroll 1.6s linear infinite",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--background)] to-transparent" />
    </div>
  );
}

/* ─────────────────────── Section renderers ─────────────────────── */

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 py-12 md:py-16">
      <span className="text-[var(--neon)]">◆</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--ink-soft)]">{text}</span>
      <div className="h-px flex-1 bg-[var(--divider)]" />
    </div>
  );
}

function SectionTagline({ attributes, headline, body, meta }: {
  attributes: string[]; headline: string; body: string; meta?: string;
}) {
  return (
    <div className="grid gap-12 py-14 md:grid-cols-[1fr_2fr] md:gap-24 md:py-20">
      {/* left — stacked attributes */}
      <div className="flex flex-col gap-1 pt-1">
        <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--neon)]">Vitalink</div>
        {attributes.map(a => (
          <span key={a} className="serif-display text-2xl leading-snug text-[var(--ink-soft)] md:text-3xl">{a}</span>
        ))}
        {meta && (
          <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-soft)]">
            Services / {meta}
          </div>
        )}
      </div>
      {/* right — headline + body */}
      <div>
        <p className="serif-display text-3xl leading-tight text-[var(--foreground)] md:text-5xl">{headline}</p>
        <p className="mt-8 text-sm leading-[1.9] text-[var(--ink-soft)] md:text-base">{body}</p>
      </div>
    </div>
  );
}

function SectionText({ heading, body }: { heading?: string; body: string }) {
  return (
    <div className="max-w-3xl py-4">
      {heading && (
        <h2 className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--neon)]">{heading}</h2>
      )}
      <p className="text-base leading-[1.85] text-[var(--ink-soft)] md:text-lg">{body}</p>
    </div>
  );
}

function SectionPalette({ colors }: { colors: { name: string; hex: string; role: string }[] }) {
  return (
    <div className="py-10">
      {/* full-bleed color strips */}
      <div className="flex h-48 overflow-hidden md:h-64">
        {colors.map(c => (
          <div
            key={c.hex}
            className="group relative flex-1 cursor-default transition-all duration-500 hover:flex-[2]"
            style={{ background: c.hex }}
          >
            {/* hex on hover */}
            <span className="absolute bottom-4 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/0 transition-all duration-300 group-hover:text-white/80">
              {c.hex}
            </span>
          </div>
        ))}
      </div>
      {/* labels below */}
      <div className="grid border-t border-[var(--divider)]" style={{ gridTemplateColumns: `repeat(${colors.length}, 1fr)` }}>
        {colors.map(c => (
          <div key={c.hex} className="border-r border-[var(--divider)] px-4 py-5 last:border-r-0">
            <div className="font-mono text-[11px] font-medium text-[var(--foreground)]">{c.name}</div>
            <div className="mt-1 font-mono text-[10px] text-[var(--ink-soft)]">{c.hex}</div>
            <div className="mt-1.5 font-mono text-[10px] leading-snug text-[var(--ink-soft)]">{c.role.split("—")[0].trim()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionTypography({ name, weights, description }: { name: string; weights: string[]; description: string }) {
  return (
    <div className="py-10">
      {/* dot-grid background panel */}
      <div
        className="relative overflow-hidden p-8 md:p-14"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          border: "1px solid var(--divider)",
        }}
      >
        <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
          {/* large specimen */}
          <div>
            <div
              style={{ fontFamily: name }}
              className="text-[6rem] font-light leading-none tracking-tight text-[var(--foreground)] md:text-[11rem]"
            >
              Aa
            </div>
            <div
              style={{ fontFamily: name }}
              className="mt-5 border-t border-[var(--divider)] pt-5 text-sm leading-relaxed text-[var(--ink-soft)]"
            >
              A B C D E F G H I J K L M N O P Q R S T U V W X Y Z<br />
              a b c d e f g h i j k l m n o p q r s t u v w x y z<br />
              0 1 2 3 4 5 6 7 8 9
            </div>
          </div>
          {/* meta right */}
          <div className="flex flex-col gap-8 border-l border-[var(--divider)] pl-8 md:pl-12">
            <div>
              <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--neon)]">Typeface</div>
              <div className="mt-1 text-3xl font-light text-[var(--foreground)]" style={{ fontFamily: name }}>{name}</div>
            </div>
            <div>
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--ink-soft)]">Weights</div>
              <div className="flex flex-col gap-2">
                {weights.map(w => (
                  <div key={w} className="font-mono text-[11px] text-[var(--foreground)]">{w}</div>
                ))}
              </div>
            </div>
            <p className="text-xs leading-relaxed text-[var(--ink-soft)]">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionPersonas({ persona }: { persona: { name: string; role: string; painPoints: string[]; goals: string[] } }) {
  const initials = persona.name.split(" ").map(n => n[0]).join("");
  return (
    <div className="py-10">
      {/* header with large faded initials in bg */}
      <div className="relative mb-10 overflow-hidden border-b border-[var(--divider)] pb-8">
        {/* decorative large initials */}
        <div
          className="pointer-events-none absolute -right-4 -top-6 select-none font-[Anton,sans-serif] text-[12rem] leading-none text-white/[0.03] md:text-[18rem]"
          aria-hidden
        >
          {initials}
        </div>
        <div className="relative">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--neon)]">User Persona</div>
          <div className="mt-3 serif-display text-5xl text-[var(--foreground)] md:text-7xl">{persona.name}</div>
          <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--ink-soft)]">{persona.role}</div>
        </div>
      </div>
      {/* two columns */}
      <div className="grid gap-12 md:grid-cols-2 md:gap-20">
        <div>
          <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--ink-soft)]">Pain Points</div>
          <ul className="flex flex-col gap-5">
            {persona.painPoints.map((p, i) => (
              <li key={i} className="flex gap-4 text-sm leading-relaxed text-[var(--foreground)]">
                <span className="mt-[7px] h-[2px] w-5 flex-shrink-0 bg-red-500/80" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--ink-soft)]">Goals</div>
          <ul className="flex flex-col gap-5">
            {persona.goals.map((g, i) => (
              <li key={i} className="flex gap-4 text-sm leading-relaxed text-[var(--foreground)]">
                <span className="mt-[7px] h-[2px] w-5 flex-shrink-0 bg-[var(--neon)]" />
                {g}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SectionLogoColors() {
  const PulseMark = ({ color }: { color: string }) => (
    <svg
      viewBox="0 0 140 100"
      xmlns="http://www.w3.org/2000/svg"
      className="w-20 md:w-28"
      fill="none"
      stroke={color}
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="10,50 42,50 55,30 68,72 80,14 93,50 130,50" />
    </svg>
  );
  return (
    <div className="py-4">
      <div className="grid grid-cols-2 gap-1">
        <div className="flex aspect-video items-center justify-center" style={{ background: "#6B6F7E" }}>
          <PulseMark color="#ffffff" />
        </div>
        <div className="flex aspect-video items-center justify-center" style={{ background: "#6C63FF" }}>
          <PulseMark color="#ffffff" />
        </div>
      </div>
    </div>
  );
}

function SectionConceptMark({ heading, body, variant = "vitalink" }: { heading: string; body: string; variant?: "vitalink" | "acoform" | "thrive" }) {
  const isAcoform = variant === "acoform";
  const isThrive = variant === "thrive";
  const accentColor = isAcoform ? "rgba(239,153,33,0.08)" : isThrive ? "rgba(167,201,85,0.08)" : "rgba(108,99,255,0.06)";
  const accentBorder = isAcoform ? "rgba(239,153,33,0.25)" : isThrive ? "rgba(167,201,85,0.25)" : "rgba(108,99,255,0.2)";

  return (
    <div className="py-10 md:py-14">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        {/* text left */}
        <div>
          <h2 className="mb-5 serif-display text-3xl text-[var(--foreground)] md:text-4xl">{heading}</h2>
          <p className="text-sm leading-[1.9] text-[var(--ink-soft)]">{body}</p>
        </div>
        {/* marks right */}
        <div
          className="flex items-center justify-around gap-8 px-8 py-12"
          style={{ background: accentColor, borderLeft: `1px solid ${accentBorder}` }}
        >
          {isThrive ? (
            <>
              {/* T lettermark */}
              <div className="flex flex-col items-center gap-5">
                <div className="font-[Anton,sans-serif] text-7xl font-normal leading-none tracking-wide text-[var(--foreground)] md:text-8xl">
                  T
                </div>
                <div className="h-px w-full bg-[var(--divider)]" />
                <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[var(--ink-soft)]">Naming</span>
              </div>
              {/* Leaf / growth mark */}
              <div className="flex flex-col items-center gap-5">
                <svg
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-20 md:w-28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "#A7C955" }}
                >
                  {/* leaf shape */}
                  <path d="M50 90 C50 90 10 70 10 35 C10 15 30 8 50 8 C70 8 90 15 90 35 C90 70 50 90 50 90Z" />
                  {/* centre vein */}
                  <line x1="50" y1="90" x2="50" y2="20" />
                  {/* side veins */}
                  <line x1="50" y1="55" x2="28" y2="38" />
                  <line x1="50" y1="55" x2="72" y2="38" />
                </svg>
                <div className="h-px w-full bg-[var(--divider)]" />
                <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[var(--ink-soft)]">Sustainable</span>
              </div>
            </>
          ) : isAcoform ? (
            <>
              {/* Af lettermark */}
              <div className="flex flex-col items-center gap-5">
                <div className="font-[Anton,sans-serif] text-7xl font-normal leading-none tracking-wide text-[var(--foreground)] md:text-8xl">
                  Af
                </div>
                <div className="h-px w-full bg-[var(--divider)]" />
                <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[var(--ink-soft)]">Naming</span>
              </div>
              {/* Formwork grid */}
              <div className="flex flex-col items-center gap-5">
                <svg
                  viewBox="0 0 120 100"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-28 text-[var(--foreground)] md:w-36"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="square"
                >
                  {/* 3×2 modular panel grid */}
                  <rect x="6" y="6" width="32" height="40" />
                  <rect x="44" y="6" width="32" height="40" />
                  <rect x="82" y="6" width="32" height="40" />
                  <rect x="6" y="54" width="32" height="40" />
                  <rect x="44" y="54" width="32" height="40" />
                  <rect x="82" y="54" width="32" height="40" />
                </svg>
                <div className="h-px w-full bg-[var(--divider)]" />
                <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[var(--ink-soft)]">Construction</span>
              </div>
            </>
          ) : (
            <>
              {/* LV lettermark */}
              <div className="flex flex-col items-center gap-5">
                <div className="font-[Anton,sans-serif] text-7xl font-normal leading-none tracking-wide text-[var(--foreground)] md:text-8xl">
                  LV
                </div>
                <div className="h-px w-full bg-[var(--divider)]" />
                <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[var(--ink-soft)]">Naming</span>
              </div>
              {/* ECG pulse */}
              <div className="flex flex-col items-center gap-5">
                <svg
                  viewBox="0 0 140 60"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-32 text-[var(--foreground)] md:w-40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="0,30 35,30 48,18 58,52 68,8 78,30 140,30" />
                </svg>
                <div className="h-px w-full bg-[var(--divider)]" />
                <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[var(--ink-soft)]">Health</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionImage({ src, caption }: { src: string; caption?: string }) {
  return (
    <div className="py-6">
      <div className="group overflow-hidden">
        <img
          src={src}
          alt={caption ?? ""}
          className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
          loading="lazy"
        />
      </div>
      {caption && (
        <div className="mt-4 flex items-center gap-3">
          <span className="h-[2px] w-5 bg-[var(--neon)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-soft)]">{caption}</span>
        </div>
      )}
    </div>
  );
}

function SectionScreens({ images }: { images: { src: string; caption: string }[] }) {
  return (
    <div className="py-6">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {images.map((img, i) => (
          <div key={i} className="group flex flex-col">
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={img.src}
                alt={img.caption}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="h-[2px] w-4 bg-[var(--divider)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink-soft)]">{img.caption}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────── Research infographics ─────────────────────── */

function SectionEvidenceCards({ intro, cards }: { intro: string; cards: { headline: string; body: string; date: string }[] }) {
  return (
    <div className="py-10">
      <p className="mb-10 max-w-2xl text-sm leading-[1.9] text-[var(--ink-soft)]">{intro}</p>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 border border-[var(--divider)] bg-[#0e0e10] p-5"
          >
            <div
              className="text-sm font-semibold leading-snug text-[var(--foreground)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {c.headline}
            </div>
            <p className="flex-1 text-[11px] leading-relaxed text-[var(--ink-soft)]">{c.body}</p>
            <div className="mt-auto border-t border-[var(--divider)] pt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">
              {c.date}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SectionComparison({ leftName, rightName, rows }: {
  leftName: string; rightName: string;
  rows: { label: string; left: string; right: string }[];
}) {
  return (
    <div className="py-10">
      <div className="grid grid-cols-[1fr_1fr] gap-px border border-[var(--divider)]">
        {/* header row */}
        <div className="border-b border-r border-[var(--divider)] bg-[#1565C0]/20 px-5 py-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#2196F3]">Selected</div>
          <div className="mt-1 font-semibold text-[var(--foreground)]">{leftName}</div>
        </div>
        <div className="border-b border-[var(--divider)] bg-white/[0.03] px-5 py-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--neon)]">Benchmark</div>
          <div className="mt-1 font-semibold text-[var(--foreground)]">{rightName}</div>
        </div>
        {/* data rows */}
        {rows.map((r, i) => (
          <>
            <div key={`l${i}`} className="border-b border-r border-[var(--divider)] px-5 py-5 last:border-b-0">
              <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--neon)]">{r.label}</div>
              <div className="text-sm leading-relaxed text-[var(--ink-soft)]">{r.left}</div>
            </div>
            <div key={`r${i}`} className="border-b border-[var(--divider)] bg-white/[0.02] px-5 py-5 last:border-b-0">
              <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--ink-soft)]">{r.label}</div>
              <div className="text-sm leading-relaxed text-[var(--foreground)]">{r.right}</div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

function SectionPlacesVisited({ description, places }: { description: string; places: { name: string; x: number; y: number }[] }) {
  return (
    <div className="py-10">
      <p className="mb-8 max-w-2xl text-sm leading-[1.9] text-[var(--ink-soft)]">{description}</p>
      {/* SVG map — simplified Ahmedabad city grid */}
      <div className="relative overflow-hidden border border-[var(--divider)]" style={{ background: "#111113" }}>
        <svg viewBox="0 0 900 380" xmlns="http://www.w3.org/2000/svg" className="w-full">
          {/* city grid lines — horizontal */}
          {Array.from({ length: 18 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={22 * i} x2="900" y2={22 * i} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          ))}
          {/* city grid lines — vertical */}
          {Array.from({ length: 36 }, (_, i) => (
            <line key={`v${i}`} x1={25 * i} y1="0" x2={25 * i} y2="380" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          ))}
          {/* river — Sabarmati */}
          <path d="M 300 0 C 310 80 290 160 305 240 C 315 300 300 380 310 380" stroke="rgba(255,255,255,0.12)" strokeWidth="18" fill="none" strokeLinecap="round" />
          <path d="M 300 0 C 310 80 290 160 305 240 C 315 300 300 380 310 380" stroke="rgba(255,255,255,0.06)" strokeWidth="10" fill="none" strokeLinecap="round" />
          {/* main roads */}
          <line x1="0" y1="190" x2="900" y2="190" stroke="rgba(255,255,255,0.09)" strokeWidth="3" />
          <line x1="450" y1="0" x2="450" y2="380" stroke="rgba(255,255,255,0.07)" strokeWidth="2" />
          <line x1="0" y1="95" x2="900" y2="95" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
          <line x1="0" y1="285" x2="900" y2="285" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
          {/* station pins */}
          {places.map((p, i) => {
            const cx = (p.x / 100) * 900;
            const cy = (p.y / 100) * 380;
            return (
              <g key={i}>
                {/* drop shadow */}
                <circle cx={cx} cy={cy + 2} r={12} fill="rgba(0,0,0,0.4)" />
                {/* pin body */}
                <circle cx={cx} cy={cy} r={12} fill="#C62828" />
                <circle cx={cx} cy={cy} r={5} fill="white" />
                {/* label pill */}
                <rect x={cx + 16} y={cy - 12} width={Math.max(160, p.name.length * 6.8)} height={24} rx="3" fill="#1a1a1c" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <text x={cx + 24} y={cy + 4} fill="#f2efe6" fontSize="9" fontFamily="monospace" letterSpacing="1">{p.name}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function SectionDemographicBars({ groups }: { groups: { title: string; bars: { label: string; value: number; max: number }[] }[] }) {
  return (
    <div className="flex flex-col gap-12 py-10">
      {groups.map((g, gi) => (
        <div key={gi}>
          <div className="mb-6 font-semibold text-[var(--foreground)]" style={{ fontFamily: "var(--font-sans)" }}>{g.title}</div>
          <div className="flex flex-col gap-4">
            {g.bars.map((b, i) => (
              <div key={i} className="grid items-center gap-4" style={{ gridTemplateColumns: "180px 1fr 32px" }}>
                <div className="text-sm text-[var(--foreground)]">{b.label}</div>
                <div className="relative h-6 overflow-hidden bg-[#1a1a1c]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(b.value / b.max) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.0, delay: i * 0.1 + gi * 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-y-0 left-0"
                    style={{ background: i === 0 ? "#212121" : "rgba(255,255,255,0.18)" }}
                  />
                </div>
                <div className="text-right font-mono text-[11px] text-[var(--ink-soft)]">{b.value}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionAreaChart({ charts }: { charts: { title: string; xLabels: string[]; bottomLabels: string[]; peakX: number; peakLabel: string }[] }) {
  // Build a smooth SVG area for each chart. Curve shape: one clear peak based on peakX position.
  const buildPath = (peakX: number, w: number, h: number) => {
    // Generate a series of y-values across 20 points, shaped as a smooth hump
    const pts = Array.from({ length: 20 }, (_, i) => {
      const t = i / 19;
      const dist = Math.abs(t - peakX);
      // Gaussian-like shape for peak
      const y = 1 - Math.exp(-dist * dist / (2 * 0.06));
      return { x: t * w, y: y * h * 0.82 + h * 0.05 };
    });
    // Add a secondary smaller hump to make it more interesting
    const pts2 = pts.map(p => {
      const t = p.x / w;
      const secondHump = Math.exp(-Math.pow(t - (peakX + 0.45), 2) / (2 * 0.04)) * h * 0.3;
      return { ...p, y: p.y - secondHump };
    });
    const d = pts2.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ");
    return `${d} L ${w} ${h} L 0 ${h} Z`;
  };

  return (
    <div className="flex flex-col gap-10 py-10">
      {charts.map((c, ci) => {
        const W = 900; const H = 200;
        const peakSvgX = c.peakX * W;
        return (
          <div key={ci}>
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-soft)]">{c.title}</div>
            <div className="relative border border-[var(--divider)]" style={{ background: "#0e0e10" }}>
              {/* x-axis dividers */}
              <div className="absolute inset-x-0 top-0 flex h-full">
                {c.xLabels.map((_, i) => i > 0 && (
                  <div key={i} className="h-full border-l border-[var(--divider)]" style={{ width: `${100 / c.xLabels.length}%`, marginLeft: i === 1 ? `${100 / c.xLabels.length}%` : 0 }} />
                ))}
              </div>
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`ag${ci}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3a3a3a" stopOpacity="1" />
                    <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <path d={buildPath(c.peakX, W, H)} fill={`url(#ag${ci})`} />
              </svg>
              {/* peak label */}
              <div
                className="absolute top-3 flex -translate-x-1/2 flex-col items-center"
                style={{ left: `${c.peakX * 100}%` }}
              >
                <div className="rounded-sm bg-[#1a1a1c] px-2 py-1 font-mono text-[11px] font-semibold text-[var(--foreground)] shadow ring-1 ring-[var(--divider)]">
                  {c.peakLabel}
                </div>
                <div className="mt-0.5 h-2 w-px bg-white/30" />
                <div className="h-1.5 w-1.5 rounded-full bg-white/60 ring-2 ring-[var(--background)]" />
              </div>
              {/* x-axis labels */}
              <div className="flex border-t border-[var(--divider)] px-1">
                {c.xLabels.map((l, i) => (
                  <div key={i} className="flex-1 py-2 text-center font-mono text-[8px] uppercase tracking-[0.15em] text-[var(--ink-soft)]">{l}</div>
                ))}
              </div>
            </div>
            {/* bottom labels */}
            <div className="mt-2 grid text-center" style={{ gridTemplateColumns: `repeat(${c.bottomLabels.length}, 1fr)` }}>
              {c.bottomLabels.map((l, i) => (
                <div key={i} className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--ink-soft)]">{l}</div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SectionJourneyMapFull({ phases }: { phases: { num: string; name: string; tasks: string[]; emotionY: number; opportunities: string[] }[] }) {
  const W = 1000; const H = 120;
  // Build smooth SVG emotion curve through phase points
  const pts = phases.map((p, i) => ({
    x: (i / (phases.length - 1)) * W,
    y: p.emotionY * H,
  }));
  // Catmull-Rom to bezier
  const path = pts.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = pts[i - 1];
    const cpx1 = prev.x + (p.x - prev.x) * 0.4;
    const cpy1 = prev.y;
    const cpx2 = p.x - (p.x - prev.x) * 0.4;
    const cpy2 = p.y;
    return `C ${cpx1} ${cpy1} ${cpx2} ${cpy2} ${p.x} ${p.y}`;
  }).join(" ");

  return (
    <div className="py-10">
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          {/* phase headers */}
          <div className="grid border border-[var(--divider)]" style={{ gridTemplateColumns: `repeat(${phases.length}, 1fr)` }}>
            {phases.map((ph, i) => (
              <div key={i} className="border-r border-[var(--divider)] bg-[#111113] p-4 last:border-r-0">
                <div className="serif-display text-3xl text-[var(--ink-soft)] md:text-5xl">{ph.num}</div>
                <div className="mt-1 text-sm font-semibold text-[var(--foreground)]" style={{ fontFamily: "var(--font-sans)" }}>{ph.name}</div>
              </div>
            ))}
          </div>
          {/* tasks row */}
          <div className="grid border-x border-b border-[var(--divider)]" style={{ gridTemplateColumns: `repeat(${phases.length}, 1fr)` }}>
            {phases.map((ph, i) => (
              <div key={i} className="border-r border-[var(--divider)] p-4 last:border-r-0">
                <div className="mb-2 font-mono text-[8px] uppercase tracking-[0.3em] text-[var(--ink-soft)]">Tasks</div>
                <ul className="flex flex-col gap-1.5">
                  {ph.tasks.map((t, j) => (
                    <li key={j} className="flex items-start gap-1.5 text-[11px] leading-snug text-[var(--foreground)]">
                      <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-[var(--ink-soft)]" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* emotion curve */}
          <div className="border-x border-b border-[var(--divider)] bg-[#0e0e10] px-4 py-2">
            <div className="mb-1 font-mono text-[8px] uppercase tracking-[0.3em] text-[var(--ink-soft)]">Emotion</div>
            <svg viewBox={`0 0 ${W} ${H + 20}`} className="w-full" style={{ height: 80 }}>
              <defs>
                <linearGradient id="emgrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,42,60,0.25)" />
                  <stop offset="100%" stopColor="rgba(255,42,60,0)" />
                </linearGradient>
              </defs>
              {/* filled area under curve */}
              <path
                d={`${path} L ${W} ${H + 10} L 0 ${H + 10} Z`}
                fill="url(#emgrad)"
              />
              <path d={path} fill="none" stroke="#ff2a3c" strokeWidth="2.5" strokeLinecap="round" />
              {/* dots at each phase point */}
              {pts.map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r={5} fill="#ff2a3c" />
                  <circle cx={p.x} cy={p.y} r={3} fill="var(--background)" />
                  {/* emoji label */}
                  <text x={p.x} y={p.y - 10} textAnchor="middle" fontSize="14">
                    {phases[i].emotionY > 0.65 ? "😣" : phases[i].emotionY > 0.4 ? "😕" : "😌"}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          {/* opportunities row */}
          <div className="grid border-x border-b border-[var(--divider)]" style={{ gridTemplateColumns: `repeat(${phases.length}, 1fr)` }}>
            {phases.map((ph, i) => (
              <div key={i} className="border-r border-[var(--divider)] p-4 last:border-r-0">
                <div className="mb-2 font-mono text-[8px] uppercase tracking-[0.3em] text-[var(--neon)]">Opportunities</div>
                <ul className="flex flex-col gap-1.5">
                  {ph.opportunities.map((o, j) => (
                    <li key={j} className="flex items-start gap-1.5 text-[11px] leading-snug text-[var(--ink-soft)]">
                      <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-[var(--neon)]" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionPlatformColorcode({ description, platforms }: { description: string; platforms: { num: number; color: string }[] }) {
  return (
    <div className="py-10">
      <p className="mb-8 max-w-2xl text-sm leading-[1.9] text-[var(--ink-soft)]">{description}</p>
      {/* Station layout — entrance at bottom, platforms stacked up */}
      <div className="border border-[var(--divider)] bg-[#0e0e10] p-6">
        <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-soft)]">Station Platform Layout</div>
        <div className="flex flex-col gap-1">
          {[...platforms].reverse().map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3"
            >
              <div className="w-6 shrink-0 text-right font-mono text-[10px] text-[var(--ink-soft)]">{p.num}</div>
              <div
                className="h-8 flex-1 transition-all duration-300 hover:brightness-110"
                style={{ background: p.color }}
              />
            </motion.div>
          ))}
        </div>
        {/* entrance indicator */}
        <div className="mt-3 flex items-center justify-center gap-2 border-t border-[var(--divider)] pt-3">
          <div className="h-px w-12 bg-[var(--ink-soft)]" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--ink-soft)]">You Are Here · Entrance</span>
          <div className="h-px w-12 bg-[var(--ink-soft)]" />
        </div>
      </div>
      {/* platform legend */}
      <div className="mt-3 grid grid-cols-4 gap-1 md:grid-cols-6">
        {platforms.map((p, i) => (
          <div key={i} className="flex items-center gap-2 p-2">
            <div className="h-4 w-4 shrink-0 rounded-sm" style={{ background: p.color }} />
            <span className="font-mono text-[9px] text-[var(--ink-soft)]">Pltfm {p.num}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────── Custom infographic renderers ─────────────────────── */

function SectionStatGrid({ stats }: { stats: { value: string; label: string; sub?: string }[] }) {
  return (
    <div className="py-10">
      <div className={`grid gap-px border border-[var(--divider)] ${stats.length === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2"}`}>
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-2 border-r border-[var(--divider)] bg-[var(--background)] px-6 py-10 last:border-r-0"
          >
            <div
              className="serif-display leading-none text-[var(--foreground)]"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              {s.value}
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--neon)]">{s.label}</div>
            {s.sub && <div className="font-mono text-[10px] text-[var(--ink-soft)]">{s.sub}</div>}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SectionBarChart({ title, bars, caption }: { title: string; bars: { label: string; value: number; color?: string }[]; caption?: string }) {
  const max = Math.max(...bars.map(b => b.value));
  return (
    <div className="py-10">
      <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--neon)]">{title}</div>
      <div className="flex flex-col gap-4">
        {bars.map((b, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-44 shrink-0 text-right font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--ink-soft)]">
              {b.label}
            </div>
            <div className="flex flex-1 items-center gap-3">
              <div className="relative h-8 flex-1 overflow-hidden bg-white/[0.04]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(b.value / max) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-y-0 left-0"
                  style={{ background: b.color ?? "var(--neon)" }}
                />
              </div>
              <span className="w-10 shrink-0 font-mono text-[11px] font-medium text-[var(--foreground)]">
                {b.value}%
              </span>
            </div>
          </div>
        ))}
      </div>
      {caption && (
        <div className="mt-6 flex items-center gap-3">
          <span className="h-[2px] w-5 bg-[var(--neon)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink-soft)]">{caption}</span>
        </div>
      )}
    </div>
  );
}

function SectionRouteLine({ title, stations, color }: { title: string; stations: { name: string; major?: boolean; interchange?: boolean }[]; color: string }) {
  return (
    <div className="py-10">
      <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--neon)]">{title}</div>
      <div className="relative overflow-x-auto pb-8">
        <div className="flex min-w-max items-start gap-0">
          {stations.map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              {/* connector line segment */}
              <div className="flex items-center">
                {i > 0 && (
                  <div className="h-[3px] w-12 md:w-16" style={{ background: color }} />
                )}
                {/* station dot */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="relative"
                >
                  <div
                    className="rounded-full border-2 border-[var(--background)]"
                    style={{
                      background: s.major ? color : "var(--ink-soft)",
                      width: s.major ? 16 : s.interchange ? 14 : 10,
                      height: s.major ? 16 : s.interchange ? 14 : 10,
                      boxShadow: s.major ? `0 0 12px ${color}80` : "none",
                    }}
                  />
                  {s.interchange && (
                    <div
                      className="absolute inset-[3px] rounded-full"
                      style={{ background: "var(--background)" }}
                    />
                  )}
                </motion.div>
                {i < stations.length - 1 && (
                  <div className="h-[3px] w-12 md:w-16" style={{ background: color }} />
                )}
              </div>
              {/* station name */}
              <div
                className="mt-3 max-w-[68px] text-center font-mono text-[8px] uppercase leading-tight tracking-[0.15em]"
                style={{ color: s.major ? "var(--foreground)" : "var(--ink-soft)" }}
              >
                {s.name}
              </div>
              {s.interchange && (
                <div className="mt-1 font-mono text-[7px] uppercase tracking-[0.1em] text-[var(--neon)]">⇄</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-center gap-6 border-t border-[var(--divider)] pt-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full" style={{ background: color }} />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">Major Station</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full ring-2 ring-[var(--ink-soft)]" style={{ background: "var(--background)" }} />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">Interchange</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-[10px] w-[10px] rounded-full bg-[var(--ink-soft)]" />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">Regular Stop</span>
        </div>
      </div>
    </div>
  );
}

function SectionInfoHierarchy({ title, levels }: { title: string; levels: { name: string; examples: string[]; color: string }[] }) {
  return (
    <div className="py-10">
      <div className="mb-8 font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--neon)]">{title}</div>
      <div className="flex flex-col gap-px">
        {levels.map((level, i) => {
          const widthPct = 100 - i * (100 / (levels.length + 1));
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-stretch gap-4"
            >
              {/* pyramid bar */}
              <div className="relative flex h-14 items-center justify-between px-5" style={{ width: `${widthPct}%`, background: level.color }}>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-white">
                  L{i + 1} — {level.name}
                </span>
                <span className="text-right font-mono text-[9px] uppercase tracking-[0.15em] text-white/70">
                  {level.examples[0]}
                </span>
              </div>
              {/* examples */}
              <div className="flex flex-1 items-center gap-2 overflow-hidden">
                {level.examples.slice(1).map((ex, j) => (
                  <span key={j} className="border border-[var(--divider)] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--ink-soft)]">
                    {ex}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function SectionSignSystem({ signs }: { signs: { type: string; color: string; textColor: string; label: string; sub: string }[] }) {
  return (
    <div className="py-10">
      <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--neon)]">Sign System</div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {signs.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden"
            style={{ background: s.color }}
          >
            {/* sign stripe */}
            <div className="absolute left-0 top-0 h-full w-1 bg-white/20" />
            <div className="flex flex-col gap-1 p-5 pl-7">
              <div className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: s.textColor + "aa" }}>
                {s.type}
              </div>
              <div className="serif-display text-xl leading-tight md:text-2xl" style={{ color: s.textColor }}>
                {s.label}
              </div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.15em]" style={{ color: s.textColor + "99" }}>
                {s.sub}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SectionUserJourney({ title, steps }: { title: string; steps: { phase: string; action: string; pain?: string }[] }) {
  return (
    <div className="py-10">
      <div className="mb-8 font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--neon)]">{title}</div>
      <div className="relative">
        {/* connecting line */}
        <div className="absolute left-4 top-4 bottom-4 w-px bg-[var(--divider)]" />
        <div className="flex flex-col gap-6 pl-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* dot */}
              <div
                className="absolute -left-[2.1rem] top-1 h-3 w-3 rounded-full border-2"
                style={{ background: step.pain ? "var(--neon)" : "var(--ink-soft)", borderColor: "var(--background)" }}
              />
              <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--neon)]">{step.phase}</div>
              <div className="text-sm text-[var(--foreground)]">{step.action}</div>
              {step.pain && (
                <div className="mt-2 flex items-start gap-2 text-[11px] text-[var(--ink-soft)]">
                  <span className="mt-[3px] h-[2px] w-3 shrink-0 bg-red-500/70" />
                  {step.pain}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function renderSection(section: ProjectSection, i: number) {
  return (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      {section.type === "label" && <SectionLabel text={section.text} />}
      {section.type === "tagline" && (
        <SectionTagline
          attributes={section.attributes}
          headline={section.headline}
          body={section.body}
          meta={section.meta}
        />
      )}
      {section.type === "text" && <SectionText heading={section.heading} body={section.body} />}
      {section.type === "palette" && <SectionPalette colors={section.colors} />}
      {section.type === "typography" && (
        <SectionTypography name={section.name} weights={section.weights} description={section.description} />
      )}
      {section.type === "personas" && <SectionPersonas persona={section.persona} />}
      {section.type === "image" && <SectionImage src={section.src} caption={section.caption} />}
      {section.type === "screens" && <SectionScreens images={section.images} />}
      {section.type === "concept-mark" && <SectionConceptMark heading={section.heading} body={section.body} variant={section.variant} />}
      {section.type === "logo-colors" && <SectionLogoColors />}
      {section.type === "stat-grid" && <SectionStatGrid stats={section.stats} />}
      {section.type === "bar-chart" && <SectionBarChart title={section.title} bars={section.bars} caption={section.caption} />}
      {section.type === "route-line" && <SectionRouteLine title={section.title} stations={section.stations} color={section.color} />}
      {section.type === "info-hierarchy" && <SectionInfoHierarchy title={section.title} levels={section.levels} />}
      {section.type === "sign-system" && <SectionSignSystem signs={section.signs} />}
      {section.type === "user-journey" && <SectionUserJourney title={section.title} steps={section.steps} />}
      {section.type === "evidence-cards" && <SectionEvidenceCards intro={section.intro} cards={section.cards} />}
      {section.type === "comparison" && <SectionComparison leftName={section.leftName} rightName={section.rightName} rows={section.rows} />}
      {section.type === "places-visited" && <SectionPlacesVisited description={section.description} places={section.places} />}
      {section.type === "demographic-bars" && <SectionDemographicBars groups={section.groups} />}
      {section.type === "area-chart" && <SectionAreaChart charts={section.charts} />}
      {section.type === "journey-map-full" && <SectionJourneyMapFull phases={section.phases} />}
      {section.type === "platform-colorcode" && <SectionPlatformColorcode description={section.description} platforms={section.platforms} />}
    </motion.div>
  );
}

/* ─────────────────────── Page component ─────────────────────── */

function ProjectPage() {
  const project = Route.useLoaderData() as unknown as Project;
  const all = projects.filter(p => p.href.startsWith("/project/"));
  const idx = all.findIndex(p => p.slug === project.slug);
  const prev = all[idx - 1];
  const next = all[idx + 1];

  const hasSections = project.sections && project.sections.length > 0;
  const gallery = project.gallery ?? [];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* atmosphere — matches home page */}
      <div className="rain pointer-events-none fixed inset-0 z-[5] opacity-50" />
      <div className="scanlines pointer-events-none fixed inset-0 z-[6] opacity-20" />
      <Atmosphere />

      {/* NAV — fixed, outside smooth scroll */}
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-[var(--divider)] bg-black/80 px-5 py-4 backdrop-blur-md md:px-10">
        <Link to="/" className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--ink-soft)] transition-colors hover:text-[var(--neon)]">
          ← Back
        </Link>
        <span className="serif-display text-sm">{project.title}</span>
        <div className="flex gap-6">
          {prev && (
            <Link to="/project/$slug" params={{ slug: prev.slug }} className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink-soft)] transition-colors hover:text-white md:inline">
              ← {prev.title}
            </Link>
          )}
          {next && (
            <Link to="/project/$slug" params={{ slug: next.slug }} className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink-soft)] transition-colors hover:text-white md:inline">
              {next.title} →
            </Link>
          )}
        </div>
      </nav>

      {/* SCROLLABLE CONTENT — lerp smooth scroll */}
      <SmoothScroll>
        <main>
          {/* HERO */}
          <section className="grain relative flex min-h-[80vh] items-end overflow-hidden bg-black pb-12 pt-24">
            <CityWindows />
            <Skyline />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url(${project.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "grayscale(1) contrast(1.1)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

            <div className="relative z-10 mx-auto w-full max-w-[1300px] px-5 md:px-10">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <div className="mb-6 flex items-center gap-4">
                  <span className="bg-[var(--neon)] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                    {project.category}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-soft)]">
                    {project.year}
                  </span>
                </div>
                <h1 className="serif-display text-5xl leading-none md:text-8xl lg:text-[9rem]">
                  {project.title}
                </h1>
                {project.description && (
                  <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--ink-soft)] md:text-lg">
                    {project.description}
                  </p>
                )}
                {project.externalHref && (
                  <a
                    href={project.externalHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-block border border-[var(--divider)] px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink-soft)] transition-all hover:border-[var(--neon)] hover:text-[var(--neon)]"
                  >
                    View on Behance ↗
                  </a>
                )}
              </motion.div>
            </div>
          </section>

          {/* CONTENT — sections or gallery */}
          <section className="relative overflow-hidden px-5 py-16 md:px-10 md:py-24">
            {/* retro perspective grid at bottom of content */}
            <RetroGrid />
            {/* huge faded project title letter in background */}
            <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center overflow-hidden select-none" aria-hidden>
              <span className="serif-display leading-none text-white/[0.025]" style={{ fontSize: "clamp(12rem, 30vw, 28rem)" }}>
                {project.title.charAt(0)}
              </span>
            </div>
            <div className="relative mx-auto max-w-[1300px]">
            {hasSections ? (
              <div className="relative flex flex-col">
                {project.sections!.map((s, i) => renderSection(s, i))}
              </div>
            ) : gallery.length > 0 ? (
              <div className="flex flex-col gap-4 md:gap-6">
                {gallery.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, delay: i * 0.04, ease: EASE }}
                    className="overflow-hidden border border-[var(--divider)]"
                  >
                    <img
                      src={src}
                      alt={`${project.title} — slide ${i + 1}`}
                      className="w-full object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center border border-dashed border-[var(--divider)]">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-soft)]">
                  Gallery coming soon
                </span>
              </div>
            )}
            </div>
          </section>

          {/* NEXT / PREV */}
          <section className="border-t border-[var(--divider)]">
            <div className="mx-auto grid max-w-[1300px] grid-cols-2">
              {prev ? (
                <Link
                  to="/project/$slug"
                  params={{ slug: prev.slug }}
                  className="group flex flex-col gap-3 border-r border-[var(--divider)] px-5 py-10 transition-colors hover:bg-white/[0.02] md:px-10"
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--ink-soft)]">← Previous</span>
                  <span className="serif-display text-2xl transition-colors group-hover:text-[var(--neon)] md:text-4xl">{prev.title}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">{prev.category}</span>
                </Link>
              ) : <div />}
              {next ? (
                <Link
                  to="/project/$slug"
                  params={{ slug: next.slug }}
                  className="group flex flex-col items-end gap-3 px-5 py-10 text-right transition-colors hover:bg-white/[0.02] md:px-10"
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--ink-soft)]">Next →</span>
                  <span className="serif-display text-2xl transition-colors group-hover:text-[var(--neon)] md:text-4xl">{next.title}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">{next.category}</span>
                </Link>
              ) : <div />}
            </div>
          </section>
        </main>
      </SmoothScroll>
    </div>
  );
}
