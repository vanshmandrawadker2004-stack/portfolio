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
            transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 border border-[var(--divider)] bg-[#111113] p-5"
          >
            <div className="text-sm font-semibold leading-snug" style={{ color: "#e07070" }}>
              {c.headline}
            </div>
            <p className="flex-1 text-[11px] leading-relaxed text-[var(--ink-soft)]">{c.body}</p>
            <div className="mt-auto pt-3 border-t border-[var(--divider)] font-mono text-[9px] italic text-[var(--ink-soft)]">
              Last Updated: {c.date}
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
      <div className="grid grid-cols-2">
        {/* column headers */}
        <div className="border border-r-0 border-[var(--divider)] bg-[#111113] px-6 py-5">
          <div className="font-mono text-[9px] uppercase tracking-[0.35em] text-[var(--ink-soft)] mb-1">Selected Station</div>
          <div className="font-semibold text-lg text-[var(--foreground)]">{leftName}</div>
        </div>
        <div className="border border-[var(--divider)] bg-[#111113] px-6 py-5">
          <div className="font-mono text-[9px] uppercase tracking-[0.35em] text-[var(--ink-soft)] mb-1">Benchmark</div>
          <div className="font-semibold text-lg text-[var(--foreground)]">{rightName}</div>
        </div>
        {/* rows */}
        {rows.map((r, i) => (
          <>
            <div key={`l${i}`} className="border-b border-r border-[var(--divider)] px-6 py-5">
              <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--ink-soft)]">{r.label}</div>
              <div className="text-sm leading-relaxed text-[var(--ink-soft)]">{r.left}</div>
            </div>
            <div key={`r${i}`} className="border-b border-r border-[var(--divider)] bg-white/[0.01] px-6 py-5">
              <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--ink-soft)]">{r.label}</div>
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
      <div className="relative overflow-hidden border border-[var(--divider)]" style={{ background: "#1a1a1c" }}>
        <svg viewBox="0 0 900 360" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <defs>
            <filter id="mapgrain">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" result="noise"/>
              <feColorMatrix type="saturate" values="0" in="noise" result="gray"/>
              <feBlend in="SourceGraphic" in2="gray" mode="overlay" result="blended"/>
              <feComposite in="blended" in2="SourceGraphic" operator="in"/>
            </filter>
          </defs>
          {/* grainy background */}
          <rect width="900" height="360" fill="#1a1a1c" filter="url(#mapgrain)" opacity="0.3" />
          {/* road network — Ahmedabad style */}
          {/* major east-west roads */}
          {[60,120,180,240,290,340,390].map(y => (
            <line key={`ew${y}`} x1="0" y1={y} x2="900" y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth={y === 180 ? 3 : 1.5} />
          ))}
          {/* major north-south roads */}
          {[100,200,300,360,450,540,640,750,850].map(x => (
            <line key={`ns${x}`} x1={x} y1="0" x2={x} y2="360" stroke="rgba(255,255,255,0.07)" strokeWidth={x === 450 ? 3 : 1.5} />
          ))}
          {/* city blocks */}
          {[0,1,2,3,4,5,6].flatMap(row => [0,1,2,3,4,5,6,7,8].map(col => (
            <rect key={`b${row}-${col}`}
              x={col * 100 + 2} y={row * 52 + 2}
              width={96} height={48}
              fill="rgba(255,255,255,0.015)" stroke="none"
            />
          )))}
          {/* Sabarmati river */}
          <path d="M 330 0 C 340 60 320 120 335 180 C 345 230 325 290 340 360"
            stroke="rgba(100,140,200,0.35)" strokeWidth="22" fill="none" strokeLinecap="round" />
          <path d="M 330 0 C 340 60 320 120 335 180 C 345 230 325 290 340 360"
            stroke="rgba(100,140,200,0.15)" strokeWidth="12" fill="none" strokeLinecap="round" />
          {/* railway line */}
          <path d="M 0 135 L 900 135" stroke="rgba(200,80,80,0.4)" strokeWidth="3" strokeDasharray="12 5" />
          <path d="M 580 0 L 580 360" stroke="rgba(200,80,80,0.25)" strokeWidth="2" strokeDasharray="8 4" />
          {/* station pins */}
          {places.map((p, i) => {
            const cx = (p.x / 100) * 900;
            const cy = (p.y / 100) * 360;
            const labelW = p.name.length * 7 + 20;
            const above = cy > 200;
            return (
              <g key={i}>
                {/* pin shadow */}
                <circle cx={cx} cy={cy + 3} r={14} fill="rgba(0,0,0,0.5)" />
                {/* pin */}
                <circle cx={cx} cy={cy} r={14} fill="#C62828" />
                <path d={`M ${cx} ${cy + 14} L ${cx - 7} ${cy + 26} L ${cx + 7} ${cy + 26} Z`} fill="#C62828" />
                <circle cx={cx} cy={cy} r={6} fill="white" />
                {/* callout box */}
                <rect x={cx + 18} y={above ? cy - 20 : cy - 12} width={labelW} height={24} rx="4"
                  fill="#0d0d0f" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <text x={cx + 27} y={above ? cy - 3 : cy + 5}
                  fill="#f2efe6" fontSize="9.5" fontFamily="monospace" letterSpacing="0.5">{p.name}</text>
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
    <div className="flex flex-col gap-14 py-10">
      {groups.map((g, gi) => (
        <div key={gi}>
          {/* section title — matches original bold heading style */}
          <div className="mb-6 text-lg font-semibold text-[var(--foreground)]" style={{ fontFamily: "var(--font-sans)" }}>
            {g.title}
          </div>
          <div className="flex flex-col gap-5">
            {g.bars.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-0"
              >
                {/* label + dotted leader + number */}
                <div className="flex items-baseline gap-0 shrink-0" style={{ width: "52%" }}>
                  <span className="text-sm text-[var(--foreground)] whitespace-nowrap">{b.label}</span>
                  <span className="flex-1 mx-2 pb-[3px]" style={{
                    borderBottom: "1.5px dotted rgba(255,255,255,0.18)",
                    minWidth: 16,
                  }} />
                  <span className="text-sm font-mono text-[var(--ink-soft)] whitespace-nowrap pr-3">{b.value}</span>
                </div>
                {/* bar */}
                <div className="relative h-7 flex-1 bg-[#1a1a1c]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(b.value / b.max) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.0, delay: i * 0.12 + gi * 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-y-0 left-0"
                    style={{ background: i === 0 ? "#333336" : "rgba(255,255,255,0.18)" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionAreaChart({ charts }: { charts: { title: string; xLabels: string[]; bottomLabels: string[]; peakX: number; peakLabel: string }[] }) {
  // y values: low = curve near top = large fill area = PEAK; high = near bottom = small fill = TROUGH
  // topPad reserves px above the peak so the label badge never clips the top border
  const topPad = 56, botPad = 8;
  const yValSets: number[][] = [
    // Chart 0 — bimodal: moderate start → morning peak ~10% → long afternoon trough → evening rise
    [0.36, 0.22, 0.10, 0.14, 0.24, 0.38, 0.56, 0.70, 0.80, 0.84, 0.82, 0.76, 0.66, 0.54, 0.44, 0.36, 0.24, 0.18, 0.20, 0.24],
    // Chart 1 — monthly: Jan-Feb hump (~10%), long trough, massive Oct spike at idx15 (≈79%), recovery
    [0.40, 0.26, 0.18, 0.28, 0.40, 0.52, 0.62, 0.70, 0.74, 0.76, 0.78, 0.79, 0.78, 0.76, 0.80, 0.06, 0.64, 0.56, 0.50, 0.46],
  ];

  // Proper Catmull-Rom → Cubic Bezier: control points derived from neighboring segments
  const buildCurve = (W: number, H: number, yVals: number[], closed: boolean): string => {
    const n = yVals.length;
    const pts = yVals.map((y, i) => ({ x: (i / (n - 1)) * W, y: topPad + y * (H - topPad - botPad) }));
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < n - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[Math.min(n - 1, i + 2)];
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`;
    }
    return closed ? `${d} L ${W} ${H} L 0 ${H} Z` : d;
  };

  return (
    <div className="flex flex-col gap-10 py-10">
      {charts.map((c, ci) => {
        const W = 900; const H = 200;
        const yVals = yValSets[ci] ?? yValSets[0];
        // Find the actual peak: minimum yVal = highest point on screen
        const peakIdx = yVals.indexOf(Math.min(...yVals));
        const peakSvgX = (peakIdx / (yVals.length - 1)) * W;
        const peakSvgY = topPad + yVals[peakIdx] * (H - topPad - botPad);
        const peakXpct = (peakSvgX / W) * 100;
        const peakYpct = (peakSvgY / H) * 100;
        return (
          <div key={ci}>
            <div className="relative overflow-hidden border border-[var(--divider)]" style={{ background: "#0d0d0f" }}>
              {/* vertical section dividers + top x-labels */}
              <div className="absolute inset-0 flex pointer-events-none z-10">
                {c.xLabels.map((l, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center"
                    style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <span className="pt-3 font-mono text-[8px] uppercase tracking-[0.18em] text-[var(--ink-soft)]">{l}</span>
                  </div>
                ))}
              </div>
              {/* area chart */}
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none" style={{ display: "block" }}>
                <defs>
                  <linearGradient id={`ac${ci}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(210,205,205,0.62)" />
                    <stop offset="55%" stopColor="rgba(90,82,82,0.30)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                  </linearGradient>
                  <filter id={`acgrain${ci}`} x="0%" y="0%" width="100%" height="100%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="3" stitchTiles="stitch" result="n"/>
                    <feColorMatrix type="saturate" values="0" in="n" result="g"/>
                    <feBlend in="SourceGraphic" in2="g" mode="overlay" result="b"/>
                    <feComposite in="b" in2="SourceGraphic" operator="in"/>
                  </filter>
                </defs>
                {/* area fill with grain */}
                <path d={buildCurve(W, H, yVals, true)} fill={`url(#ac${ci})`} filter={`url(#acgrain${ci})`} />
                {/* curve stroke */}
                <path d={buildCurve(W, H, yVals, false)} fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2" strokeLinecap="round" />
                {/* peak dot exactly on the curve */}
                <circle cx={peakSvgX} cy={peakSvgY} r={5} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                <circle cx={peakSvgX} cy={peakSvgY} r={2.5} fill="rgba(255,255,255,0.9)" />
              </svg>
              {/* peak label — bottom edge anchored at the curve's peak position */}
              <div className="absolute z-20 flex flex-col items-center -translate-x-1/2"
                style={{ left: `${peakXpct}%`, bottom: `${100 - peakYpct}%` }}>
                <div className="rounded bg-[#1c1c1e] px-2.5 py-1 font-mono text-[11px] font-bold text-[var(--foreground)] ring-1 ring-white/20 shadow-lg whitespace-nowrap">
                  {c.peakLabel}
                </div>
                <div className="mt-1 h-3 w-px bg-white/30" />
              </div>
            </div>
            <div className="mt-2 grid text-center font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--ink-soft)]"
              style={{ gridTemplateColumns: `repeat(${c.bottomLabels.length}, 1fr)` }}>
              {c.bottomLabels.map((l, i) => <div key={i}>{l}</div>)}
            </div>
          </div>
        );
      })}
    </div>
  );
}


function SectionJourneyMapFull({ phases }: { phases: { num: string; name: string; tasks: string[]; emotionY: number; opportunities: string[] }[] }) {
  const W = 1000; const H = 180;
  const n = phases.length;
  // Dots at column centres: (i + 0.5) / n * W
  const pts = phases.map((p, i) => ({
    x: (i + 0.5) / n * W,
    y: p.emotionY * H * 0.88 + 8,
  }));
  // Extend to left/right edges so the fill covers the full width
  const allPts = [
    { x: 0, y: pts[0].y },
    ...pts,
    { x: W, y: pts[n - 1].y },
  ];
  const curvePath = allPts.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = allPts[i - 1];
    const p0 = allPts[Math.max(0, i - 2)];
    const p2 = allPts[Math.min(allPts.length - 1, i + 1)];
    const cp1x = prev.x + (p.x - p0.x) / 6;
    const cp1y = prev.y + (p.y - p0.y) / 6;
    const cp2x = p.x - (p2.x - prev.x) / 6;
    const cp2y = p.y - (p2.y - prev.y) / 6;
    return `C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p.x} ${p.y}`;
  }).join(" ");

  return (
    <div className="py-10 overflow-x-auto">
      <div className="min-w-[900px]" style={{ display: "grid", gridTemplateColumns: "130px 1fr" }}>

        {/* LEFT SIDEBAR — row labels */}
        <div className="flex flex-col border border-r-0 border-[var(--divider)] bg-[#080809]">
          {/* spacer for header row */}
          <div className="border-b border-[var(--divider)]" style={{ height: 84 }} />
          {/* Task list label */}
          <div className="flex flex-1 items-center justify-center border-b border-[var(--divider)] px-3 text-center" style={{ minHeight: 100 }}>
            <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-[var(--ink-soft)]">Task list</span>
          </div>
          {/* Emotion label */}
          <div className="flex items-center justify-center border-b border-[var(--divider)] px-3 text-center" style={{ height: 180 }}>
            <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-[var(--ink-soft)]">Emotion</span>
          </div>
          {/* Opportunities label */}
          <div className="flex flex-1 items-center justify-center border-b border-[var(--divider)] px-3 text-center" style={{ minHeight: 120 }}>
            <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-[var(--neon)]">Opportunities</span>
          </div>
        </div>

        {/* MAIN TABLE */}
        <div>
          {/* phase headers */}
          <div className="grid border border-[var(--divider)]" style={{ gridTemplateColumns: `repeat(${phases.length}, 1fr)` }}>
            {phases.map((ph, i) => (
              <div key={i} className="border-r border-[var(--divider)] bg-[#0d0d0f] p-4 last:border-r-0">
                <div className="serif-display text-4xl leading-none text-[var(--ink-soft)] md:text-5xl">{ph.num}</div>
                <div className="mt-2 font-semibold text-sm text-[var(--foreground)]" style={{ fontFamily: "var(--font-sans)" }}>{ph.name}</div>
              </div>
            ))}
          </div>
          {/* tasks */}
          <div className="grid border-x border-b border-[var(--divider)]" style={{ gridTemplateColumns: `repeat(${phases.length}, 1fr)` }}>
            {phases.map((ph, i) => (
              <div key={i} className="border-r border-[var(--divider)] p-4 last:border-r-0">
                <ul className="flex flex-col gap-2">
                  {ph.tasks.map((t, j) => (
                    <li key={j} className="flex items-start gap-2 text-[11px] leading-snug text-[var(--foreground)]">
                      <span className="mt-[5px] h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--ink-soft)]" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* emotion curve */}
          <div className="border-x border-b border-[var(--divider)] bg-[#0d0d0f]">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none" style={{ height: 180, display: "block" }}>
              <defs>
                <linearGradient id="emg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(168,160,160,0.55)" />
                  <stop offset="55%" stopColor="rgba(70,62,62,0.25)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </linearGradient>
                <filter id="emgrain" x="0%" y="0%" width="100%" height="100%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="3" stitchTiles="stitch" result="n"/>
                  <feColorMatrix type="saturate" values="0" in="n" result="g"/>
                  <feBlend in="SourceGraphic" in2="g" mode="overlay" result="b"/>
                  <feComposite in="b" in2="SourceGraphic" operator="in"/>
                </filter>
              </defs>
              <path d={`${curvePath} L ${W} ${H} L 0 ${H} Z`} fill="url(#emg)" filter="url(#emgrain)" />
              <path d={curvePath} fill="none" stroke="rgba(255,255,255,0.62)" strokeWidth="2" strokeLinecap="round" />
              {pts.map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r={5} fill="rgba(255,255,255,0.7)" />
                  <circle cx={p.x} cy={p.y} r={2.5} fill="#0d0d0f" />
                  <text x={p.x} y={p.y - 12} textAnchor="middle" fontSize="13" fontFamily="Apple Color Emoji,sans-serif">
                    {phases[i].emotionY > 0.65 ? "😣" : phases[i].emotionY > 0.4 ? "😕" : "🙂"}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          {/* opportunities */}
          <div className="grid border-x border-b border-[var(--divider)]" style={{ gridTemplateColumns: `repeat(${phases.length}, 1fr)` }}>
            {phases.map((ph, i) => (
              <div key={i} className="border-r border-[var(--divider)] p-4 last:border-r-0">
                <ul className="flex flex-col gap-2">
                  {ph.opportunities.map((o, j) => (
                    <li key={j} className="flex items-start gap-2 text-[11px] leading-snug text-[var(--ink-soft)]">
                      <span className="mt-[5px] h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--neon)]" />
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
      <div className="border border-[var(--divider)] bg-[#0e0e10] p-6">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-soft)]">16.1  Platform Color Code</div>
        {/* top-down station view: platforms as horizontal colored strips */}
        <div className="relative mx-auto max-w-lg">
          <div className="flex flex-col gap-[3px]">
            {[...platforms].reverse().map((p, i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center"
                style={{ originX: "left" }}
              >
                <div className="w-8 shrink-0 text-right font-mono text-[9px] text-[var(--ink-soft)] pr-2">{platforms[platforms.length - 1 - i].num}</div>
                <div className="flex-1 h-7" style={{ background: p.color }} />
              </motion.div>
            ))}
          </div>
          {/* entrance */}
          <div className="mt-3 flex flex-col items-center gap-1">
            <div className="h-5 w-px bg-[var(--divider)]" />
            <div className="flex items-center gap-2 rounded bg-[#1a1a1c] px-3 py-1 ring-1 ring-[var(--divider)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon)]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--foreground)]">You Are Here</span>
            </div>
            <div className="font-mono text-[8px] uppercase tracking-[0.3em] text-[var(--ink-soft)] mt-1">ENTRANCE</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTicketRedesign() {
  const beforeFields = [
    "TRAIN NO / NAME","DATE OF JOURNEY","QUOTA",
    "CLASS","BOOKING DATE","CHART PREPARED",
    "PNR NUMBER","TRANSACTION ID","ADULT",
    "CHILD","FARE","TAT NO",
    "FROM","TO","BOARDING",
    "RESERVATION UPTO","DEP TIME","ARR TIME",
    "COACH NO","BERTH NO","BERTH TYPE",
    "PASSENGER NAME","AGE","GENDER",
    "CONCESSION","STATUS","FOOD",
    "CONTACT","REMARKS","DISTANCE",
  ];
  const afterFields = [
    { label: "TRAIN NO.", value: "12952 RAJDHANI EXP" },
    { label: "FROM", value: "NDLS (New Delhi)" },
    { label: "TO", value: "MMCT (Mumbai Central)" },
    { label: "DATE", value: "15-Oct-2024" },
    { label: "COACH", value: "B1 · Berth 32 (Side Upper)" },
    { label: "PLATFORM", value: "Platform 3" },
  ];
  return (
    <div className="py-10">
      <div className="grid gap-8 md:grid-cols-2">

        {/* ── BEFORE ── */}
        <div>
          <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.28em] text-[var(--ink-soft)]">
            16.2.1 Before — Current Reservation Slip
          </div>
          <div className="border border-[var(--divider)] bg-[#f4efe6] p-5 font-mono">
            <div className="mb-3 border-b border-gray-400 pb-3 text-center text-[8.5px] font-bold uppercase tracking-widest text-gray-800">
              Indian Railways — Reservation Cum Journey Ticket
            </div>
            <div className="grid grid-cols-3 border-l border-t border-gray-300">
              {beforeFields.map((f, i) => (
                <div key={i} className="border-b border-r border-gray-300 px-1.5 py-1">
                  <div className="text-[6.5px] uppercase tracking-wide text-gray-500">{f}</div>
                  <div className="mt-0.5 text-[7.5px] font-semibold text-gray-800">— — —</div>
                </div>
              ))}
            </div>
            <div className="mt-3 border-t border-gray-300 pt-2 text-[6px] leading-relaxed text-gray-500">
              *THIS IS NOT A VALID TICKET WITHOUT CONDUCTOR'S SIGNATURE. PASSENGERS ARE ADVISED TO CARRY VALID PHOTO ID.
              T&amp;C APPLY. VALID ONLY IF SIGNED BY AUTHORISED RAILWAY OFFICIAL.
            </div>
          </div>
        </div>

        {/* ── AFTER ── */}
        <div>
          <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.28em] text-[var(--neon)]">
            16.2.2 After — Redesigned Reservation Slip
          </div>
          <div className="overflow-hidden border border-[var(--divider)] bg-[#111214]">

            {/* Header band */}
            <div className="flex items-stretch bg-[#6e1010]">
              {/* Platform number */}
              <div className="flex flex-col justify-center px-5 py-4">
                <span className="font-mono text-[7px] uppercase tracking-[0.35em] text-white/60">Platform</span>
                <span className="font-bold leading-none text-white" style={{ fontSize: "3.2rem" }}>3</span>
              </div>
              {/* Divider */}
              <div className="my-4 w-px bg-white/15" />
              {/* Train info */}
              <div className="flex flex-col justify-center px-5 py-4">
                <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-white/55">Rajdhani Express</span>
                <span className="mt-1 text-[15px] font-semibold text-white">12952 · B1 · 32</span>
              </div>
              {/* Date / dep — pushed right */}
              <div className="ml-auto flex flex-col items-end justify-center px-5 py-4">
                <span className="font-mono text-[7.5px] text-white/55">15 Oct 2024</span>
                <span className="mt-0.5 font-mono text-[7.5px] text-white/55">DEP 16:55</span>
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2" style={{ gap: "1px", background: "var(--divider)" }}>
              {afterFields.map((f, i) => (
                <div key={i} className="bg-[#111214] px-5 py-4">
                  <div className="font-mono text-[7.5px] uppercase tracking-[0.3em] text-[var(--ink-soft)]">{f.label}</div>
                  <div className="mt-1 text-[13px] font-medium text-[var(--foreground)]">{f.value}</div>
                </div>
              ))}
            </div>

            {/* PNR + barcode */}
            <div className="flex items-center justify-between border-t border-[var(--divider)] bg-[#0d0d0f] px-5 py-4">
              <div>
                <div className="font-mono text-[7.5px] uppercase tracking-[0.3em] text-[var(--ink-soft)]">PNR</div>
                <div className="mt-1 font-mono text-[15px] font-bold tracking-[0.12em] text-[var(--foreground)]">
                  4124 5678 90
                </div>
              </div>
              {/* barcode */}
              <svg width="96" height="40" viewBox="0 0 96 40" xmlns="http://www.w3.org/2000/svg">
                {[2,1,3,1,2,1,1,2,3,1,2,1,1,3,1,2,1,2,1,3,2,1,1,2,3,1,1,2].map((w, i, arr) => {
                  const x = arr.slice(0, i).reduce((s, v) => s + v + 1, 0);
                  return i % 2 === 0 ? (
                    <rect key={i} x={x} y="0" width={w} height="40"
                      fill="rgba(255,255,255,0.75)" />
                  ) : null;
                })}
              </svg>
            </div>
          </div>
        </div>

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
      {section.type === "ticket-redesign" && <SectionTicketRedesign />}
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
