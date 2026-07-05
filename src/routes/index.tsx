import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Cursor, Navigation, Counter, Magnetic, Tilt } from "@/components/site";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vansh Mandrawadker — Product Designer" },
      { name: "description", content: "Freelance Product Designer crafting brands, digital experiences, and design systems that make people stop and look twice." },
      { property: "og:title", content: "Vansh Mandrawadker — Product Designer" },
      { property: "og:description", content: "Branding, UI/UX, and Industrial Design — for founders who care about the details." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------- smooth eased scrolling (lerp) ---------- */
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

  if (!enabled) {
    return <div ref={contentRef}>{children}</div>;
  }
  return (
    <div className="fixed inset-x-0 top-0">
      <div ref={contentRef} className="will-change-transform">{children}</div>
    </div>
  );
}

/* ---------- atmosphere ---------- */
function Atmosphere() {
  return (
    <>
      <div className="rain pointer-events-none fixed inset-0 z-[55] opacity-70" />
      <div className="scanlines pointer-events-none fixed inset-0 z-[56] opacity-30" />
      <div
        className="pointer-events-none fixed -left-40 top-[20%] z-[5] h-[480px] w-[480px] rounded-full opacity-[0.1] blur-3xl"
        style={{ background: "radial-gradient(circle, #ff2a3c, transparent 65%)", animation: "drift-a 16s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none fixed -right-48 top-[58%] z-[5] h-[560px] w-[560px] rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "radial-gradient(circle, #f2efe6, transparent 65%)", animation: "drift-b 21s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-[54]"
        style={{ background: "radial-gradient(ellipse at 50% 120%, rgba(255,42,60,0.1), transparent 55%), radial-gradient(ellipse at center, transparent 62%, rgba(0,0,0,0.45) 100%)" }}
      />
    </>
  );
}

/* ---------- hero background: city skyline at night ---------- */
function Skyline() {
  const buildings = Array.from({ length: 16 }, (_, i) => ({
    h: 32 + ((i * 53) % 58),
    w: 4.5 + ((i * 37) % 5),
    antenna: i % 5 === 0,
  }));
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40vh]">
      {/* horizon glow */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#ff2a3c]/[0.09] to-transparent" />
      {/* far skyline */}
      <div className="absolute inset-x-0 bottom-0 flex h-full items-end justify-center gap-[2px] opacity-40">
        {buildings.map((b, i) => (
          <div key={`far-${i}`} className="bg-[#101012]" style={{ height: `${b.h * 0.7}%`, width: `${b.w * 0.8}%` }} />
        ))}
      </div>
      {/* near skyline with lit windows */}
      <div className="absolute inset-x-0 bottom-0 flex h-full items-end justify-between gap-1 opacity-80">
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
      {/* passing traffic lights */}
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

/* ---------- blinking city windows (upper backdrop) ---------- */
function CityWindows() {
  const windows = Array.from({ length: 36 }, (_, i) => ({
    left: (i * 37) % 96,
    top: (i * 53) % 55,
    w: 5 + ((i * 13) % 10),
    h: 7 + ((i * 7) % 12),
    dur: 2.5 + ((i * 11) % 50) / 10,
    delay: ((i * 17) % 40) / 10,
    red: i % 9 === 0,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {windows.map((w, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.03, 0.12, 0.03] }}
          transition={{ duration: w.dur, delay: w.delay, repeat: Infinity }}
          className="absolute"
          style={{ left: `${w.left}%`, top: `${w.top}%`, width: w.w, height: w.h, background: w.red ? "#ff2a3c" : "#f2efe6" }}
        />
      ))}
    </div>
  );
}

/* ---------- floating shapes ---------- */
function FloatShapes({ variant = 0 }: { variant?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={`absolute h-40 w-40 rounded-full border border-[var(--neon)]/12 md:h-64 md:w-64 ${variant % 2 ? "right-[6%] top-[10%]" : "left-[4%] top-[14%]"}`}
        style={{ animation: "drift-a 18s ease-in-out infinite" }}
      />
      <div
        className={`absolute h-24 w-24 border border-white/8 md:h-36 md:w-36 ${variant % 2 ? "left-[8%] bottom-[12%]" : "right-[10%] bottom-[16%]"}`}
        style={{ animation: "drift-b 23s ease-in-out infinite", transform: "rotate(18deg)" }}
      />
      <div
        className="absolute left-[46%] top-[6%] text-6xl text-[var(--neon)]/10 md:text-8xl"
        style={{ animation: "spin-very-slow 40s linear infinite" }}
      >
        ✱
      </div>
    </div>
  );
}

/* ---------- retro perspective grid ---------- */
function RetroGrid() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] overflow-hidden opacity-20">
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
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent" />
    </div>
  );
}

/* ---------- helpers ---------- */
function Fade({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function PowerOn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: [0, 1, 0.35, 1, 0.6, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, times: [0, 0.2, 0.35, 0.55, 0.7, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* small signs get a hover pop */
function SignHover({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div whileHover={{ scale: 1.05, rotate: 0 }} transition={{ type: "spring", stiffness: 300, damping: 14 }} className={className}>
      {children}
    </motion.div>
  );
}

function SectionTag({ chip, label, invert = false }: { chip: string; label: string; invert?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <span className={`px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-[0.15em] ${invert ? "bg-white text-black" : "bg-[var(--neon)] text-black"}`}>{chip}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-soft)]">{label}</span>
    </div>
  );
}

/* ---------- LED ticker ---------- */
function LEDTicker({ text, reverse = false, className = "" }: { text: string; reverse?: boolean; className?: string }) {
  return (
    <div className={`marquee overflow-hidden border-y-2 border-[var(--divider)] bg-black py-2.5 ${className}`}>
      <div className={reverse ? "marquee-track-reverse" : "marquee-track"} style={{ animationDuration: "26s" }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="neon-red whitespace-nowrap px-4 font-mono text-xs uppercase tracking-[0.35em]">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- loader ---------- */
function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => { setDone(true); document.body.style.overflow = ""; }, 1400);
    return () => { clearTimeout(t); document.body.style.overflow = ""; };
  }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] flex flex-col items-end justify-end bg-black p-8 md:p-14"
        >
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/10">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="h-full origin-left bg-[var(--neon)]"
            />
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/30"
          >
            Vansh Mandrawadker
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="grain relative flex min-h-screen flex-col overflow-hidden pb-0 pt-16">
      <CityWindows />
      <Skyline />

      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] flex-1 grid-cols-12 gap-4 px-5 py-10 md:gap-8 md:px-10">
        {/* LEFT stack */}
        <div className="col-span-3 hidden flex-col justify-center gap-7 md:flex">
          <PowerOn delay={0.6}>
            <SignHover>
              <div className="flex justify-center bg-[var(--neon)] px-3 py-8 font-mono text-lg font-bold uppercase tracking-[0.3em] text-black [writing-mode:vertical-rl]" style={{ boxShadow: "0 0 14px rgba(255,42,60,0.35)" }}>
                Designer
              </div>
            </SignHover>
          </PowerOn>
          <PowerOn delay={0.9}>
            <SignHover className="-rotate-1">
              <div className="neon-border-white bg-black px-3 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.25em]">
                Est. 2004 — Pune, IN
              </div>
            </SignHover>
          </PowerOn>
          <PowerOn delay={1.2}>
            <SignHover className="rotate-1">
              <div className="flicker-fast neon-border bg-black px-3 py-3.5 text-center">
                <span className="neon-red font-mono text-xs font-bold uppercase tracking-[0.3em]">Open 24/7</span>
              </div>
            </SignHover>
          </PowerOn>
          <PowerOn delay={1.4}>
            <SignHover>
              <div className="bg-[#16161a] px-3 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                Brand · UI/UX · Industrial
              </div>
            </SignHover>
          </PowerOn>
        </div>

        {/* CENTER — main sign, letters spaced + playful */}
        <div className="col-span-12 flex items-center justify-center md:col-span-6">
          <PowerOn delay={0.2} className="w-full max-w-[460px]">
            <div className="neon-border relative bg-black/80 px-6 py-12 md:px-12 md:py-14">
              <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-white/30" />
              <div className="flicker-slow flex flex-col items-center gap-[1.2vh] text-center md:gap-3">
                {"VANSH".split("").map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.12 }}
                    whileHover={{ scale: 1.1, x: 8 }}
                    className="neon-red serif-display cursor-default text-[13vw] leading-[0.92] md:text-[6.2rem]"
                  >
                    {c}
                  </motion.div>
                ))}
              </div>
              <div className="mt-7 border-t border-white/15 pt-5 text-center font-mono text-xs uppercase tracking-[0.42em] text-white/80">
                Mandrawadker
              </div>
            </div>
          </PowerOn>
        </div>

        {/* RIGHT stack */}
        <div className="col-span-3 hidden flex-col justify-center gap-7 md:flex">
          <PowerOn delay={0.7}>
            <SignHover className="rotate-1">
              <div className="neon-border-white bg-black px-4 py-5 text-center">
                <div className="neon-white serif-display text-2xl leading-snug">Product<br />Designer</div>
              </div>
            </SignHover>
          </PowerOn>
          <PowerOn delay={1.0}>
            <SignHover>
              <div className="flex justify-center bg-white px-3 py-6 font-mono text-base font-bold uppercase tracking-[0.3em] text-black [writing-mode:vertical-rl]">
                Open
              </div>
            </SignHover>
          </PowerOn>
          <PowerOn delay={1.3}>
            <SignHover className="-rotate-1">
              <div className="bg-[var(--neon)] px-3 py-2.5 text-center font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-black">
                Mandrawadker®
              </div>
            </SignHover>
          </PowerOn>
          <PowerOn delay={1.5}>
            <SignHover>
              <div className="flicker neon-border bg-black px-3 py-3.5 text-center">
                <span className="neon-red font-mono text-xs uppercase tracking-[0.25em]">↓ Work this way</span>
              </div>
            </SignHover>
          </PowerOn>
        </div>

        {/* mobile mini-signs */}
        <div className="col-span-12 mt-4 flex flex-wrap justify-center gap-3 md:hidden">
          <span className="bg-[var(--neon)] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black">Designer</span>
          <span className="flicker-fast neon-border bg-black px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em]"><span className="neon-red">Open 24/7</span></span>
          <span className="bg-white px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black">Est. 2004</span>
          <span className="bg-[#16161a] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">Pune, IN</span>
        </div>
      </div>

      <div className="relative z-10">
        <LEDTicker text="Brand identity ✦ UI/UX ✦ Industrial design ✦ Now taking commissions ✦" />
        <div className="crosswalk" />
      </div>
    </section>
  );
}

/* ---------- ABOUT — statement + portrait ---------- */
function About() {
  return (
    <section className="relative px-5 py-28 md:px-10 md:py-40">
      <FloatShapes variant={0} />
      <div className="relative mx-auto max-w-[1240px]">
        <Fade>
          <SectionTag chip="Info" label="01 — Who's running this place" />
        </Fade>
        <div className="mt-12 grid gap-8 md:grid-cols-12">
          <Fade className="md:col-span-7">
            <div className="neon-border-white flex h-full flex-col justify-between bg-black/60 p-8 md:p-12">
              <div>
                <h2 className="serif-display text-3xl leading-[1.1] md:text-5xl">
                  A designer who thinks in <span className="neon-red">systems</span> and feels in <span className="neon-red">details.</span>
                </h2>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)] md:text-xl">
                  One designer taking products from idea to identity to interface. Research first — I talk to users
                  before I open Figma. Working with founders who'd rather have a partner than a vendor.
                </p>
              </div>
              <Link to="/about" className="nav-link mt-8 inline-block self-start font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--neon)]">
                Full story →
              </Link>
            </div>
          </Fade>

          {/* the portrait — street ID card */}
          <PowerOn delay={0.2} className="md:col-span-5">
            <Tilt max={5} className="h-full">
              <div className="group relative h-full border-2 border-[var(--divider)] bg-black/70 p-4 transition-colors duration-500 hover:border-[var(--neon)]">
                <div className="relative overflow-hidden">
                  <img
                    src="/photo of myself.jpg"
                    alt="Vansh Mandrawadker"
                    className="aspect-[3/4] w-full object-cover transition-all duration-700 group-hover:[filter:grayscale(0)_contrast(1)_brightness(1)]"
                    style={{ filter: "grayscale(1) contrast(1.1) brightness(0.85)" }}
                  />
                  {/* scan line */}
                  <motion.div
                    animate={{ top: ["3%", "95%", "3%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 h-px w-full bg-[var(--neon)]/70"
                  />
                  <div className="absolute left-2 top-2 h-5 w-5 border-l-2 border-t-2 border-[var(--neon)]" />
                  <div className="absolute right-2 top-2 h-5 w-5 border-r-2 border-t-2 border-[var(--neon)]" />
                  <div className="absolute bottom-2 left-2 h-5 w-5 border-b-2 border-l-2 border-[var(--neon)]" />
                  <div className="absolute bottom-2 right-2 h-5 w-5 border-b-2 border-r-2 border-[var(--neon)]" />
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <div className="serif-display text-xl">Vansh M.</div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">Resident designer — № 01</div>
                  </div>
                  <span className="flicker-fast font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--neon)]">On duty</span>
                </div>
              </div>
            </Tilt>
          </PowerOn>
        </div>

        {/* vending-machine stats */}
        <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
          {[
            [4, "+", "Internships"],
            [10, "+", "Projects"],
            [1500, "+", "Newsletter subs"],
            [100, "+", "Users researched"],
          ].map(([n, s, l], i) => (
            <PowerOn key={l as string} delay={i * 0.12}>
              <SignHover>
                <div className={`flex flex-col gap-1 px-4 py-4 md:flex-row md:items-center md:justify-between md:gap-3 md:px-5 ${i % 2 ? "bg-white text-black" : "neon-border bg-black"}`}>
                  <span className={`serif-display text-2xl md:text-4xl ${i % 2 ? "text-black" : "neon-red"}`}>
                    <Counter to={n as number} suffix={s as string} />
                  </span>
                  <span className={`font-mono text-[8px] uppercase leading-tight tracking-[0.15em] md:text-right md:text-[9px] md:tracking-[0.18em] ${i % 2 ? "text-black/60" : "text-[var(--ink-soft)]"}`}>{l}</span>
                </div>
              </SignHover>
            </PowerOn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- WORK ---------- */
const catShort: Record<string, string> = {
  "Brand Identity": "Brand",
  "UI/UX": "UI/UX",
  "Industrial Design": "Industrial",
  "Web / Brand": "Web",
};

function Work() {
  const featured = projects.slice(0, 6);
  return (
    <section className="relative px-5 py-28 md:px-10 md:py-40">
      <FloatShapes variant={1} />
      <div className="relative mx-auto max-w-[1300px]">
        <Fade>
          <div className="flex items-center justify-between">
            <SectionTag chip="Work" label="02 — The district" />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-soft)] md:inline">6 storefronts open tonight</span>
          </div>
        </Fade>

        <div className="mt-14 flex flex-col gap-12">
          {featured.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <PowerOn key={p.slug} delay={0.05}>
                <Tilt max={3.5}>
                  <a
                    href={p.href}
                    target={p.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    data-cursor="View"
                    className={`group relative flex flex-col gap-0 border-2 border-[var(--divider)] bg-black/70 transition-all duration-500 hover:border-[var(--neon)] hover:shadow-[0_0_22px_rgba(255,42,60,0.25)] md:flex-row ${flip ? "md:flex-row-reverse" : ""}`}
                  >
                    <div className={`relative w-full overflow-hidden md:w-[46%] ${p.contain ? "bg-black" : ""}`}>
                      <img
                        src={p.image}
                        alt={p.title}
                        className={`aspect-[16/10] w-full transition-all duration-700 group-hover:scale-[1.02] group-hover:[filter:grayscale(0)_contrast(1)_brightness(1)] ${p.contain ? "object-contain p-6" : "object-cover"}`}
                        style={{ filter: "grayscale(1) contrast(1.1) brightness(0.85)" }}
                      />
                      <div className="absolute left-4 top-4 bg-black/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/70">
                        CAM {String(i + 1).padStart(2, "0")} — {p.year}
                      </div>
                    </div>

                    <div className="relative flex flex-1 items-center justify-between gap-6 p-6 md:p-10">
                      <div>
                        <div className="serif-display text-4xl transition-all duration-300 group-hover:neon-red md:text-6xl">{p.title}</div>
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <span className="bg-[var(--neon)] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-black">{p.category}</span>
                          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">No. {String(i + 1).padStart(2, "0")}</span>
                          <span className="flicker-fast font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--neon)] opacity-0 transition group-hover:opacity-100">● View on Behance ↗</span>
                        </div>
                      </div>
                      <div className="hidden shrink-0 border border-[var(--divider)] px-2.5 py-4 font-mono text-xs font-bold uppercase tracking-[0.25em] text-white/70 [writing-mode:vertical-rl] transition-colors duration-300 group-hover:border-[var(--neon)] group-hover:text-[var(--neon)] md:block">
                        {catShort[p.category] ?? "Design"}
                      </div>
                    </div>
                  </a>
                </Tilt>
              </PowerOn>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Magnetic>
            <Link to="/work" data-cursor="More" className="neon-border inline-block bg-black px-10 py-5 font-mono text-xs font-bold uppercase tracking-[0.3em] text-[var(--neon)] transition hover:bg-[var(--neon)] hover:text-black">
              Full archive →
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

/* ---------- INTERLUDE ---------- */
function Interlude() {
  return (
    <section className="relative overflow-hidden border-y-2 border-[var(--divider)] bg-black px-5 py-32 text-center md:py-44">
      <RetroGrid />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="serif-display text-[46vw] leading-none text-white/[0.025]">V</span>
      </div>
      <div className="relative">
        {["Stop.", "Look.", "Twice."].map((w, i) => (
          <PowerOn key={w} delay={i * 0.35}>
            <motion.div
              whileHover={{ scale: 1.04, letterSpacing: "0.04em" }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
              className={`serif-display cursor-default text-[13vw] leading-[1] md:text-[8vw] ${i === 2 ? "neon-red flicker-slow" : "neon-white"}`}
            >
              {w}
            </motion.div>
          </PowerOn>
        ))}
        <Fade delay={0.6}>
          <p className="mx-auto mt-10 max-w-md font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
            That's the reaction your brand should get. I design for it.
          </p>
        </Fade>
      </div>
    </section>
  );
}

/* ---------- SERVICES — hanging banners that sway ---------- */
const services = [
  { t: "Brand Identity", n: "01", items: ["Logos", "Identity systems", "Guidelines", "Naming", "Strategy"] },
  { t: "UI/UX Design", n: "02", items: ["Web & app", "UX research", "Prototyping", "Design systems"] },
  { t: "Industrial Design", n: "03", items: ["Concepts", "Fusion 360", "Keyshot", "Mockups"] },
  { t: "Consultation", n: "04", items: ["Audits", "UX reviews", "Direction"] },
];

function Services() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="relative px-5 py-28 md:px-10 md:py-40">
      <FloatShapes variant={0} />
      <div className="relative mx-auto max-w-[1300px]">
        <Fade>
          <SectionTag chip="Menu" label="03 — What's on offer" />
        </Fade>
        <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
          {services.map((s, i) => {
            const isActive = active === i;
            return (
              <PowerOn key={s.t} delay={i * 0.1}>
                {/* idle sway, like a hanging sign in the wind */}
                <motion.div
                  animate={{ rotate: isActive ? 0 : [0.7, -0.7, 0.7] }}
                  transition={isActive ? { duration: 0.3 } : { duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "top center" }}
                >
                  <button
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    onClick={() => setActive(isActive ? null : i)}
                    data-cursor="Open"
                    className={`relative flex h-[360px] w-full flex-col items-center justify-between gap-5 border-2 px-4 py-8 transition-all duration-500 md:h-[470px] ${isActive ? "border-[var(--neon)] bg-[var(--neon)] shadow-[0_0_26px_rgba(255,42,60,0.35)]" : "border-[var(--divider)] bg-black/60 hover:border-white/50"}`}
                  >
                    <div className={`absolute -top-2 left-1/2 h-2 w-8 -translate-x-1/2 ${isActive ? "bg-black" : "bg-white/25"}`} />
                    <span className={`serif-display text-2xl md:text-3xl ${isActive ? "text-black" : "text-white/50"}`}>{s.n}</span>
                    <span className={`serif-display text-xl [writing-mode:vertical-rl] md:text-3xl ${isActive ? "text-black" : "neon-white"}`}>
                      {s.t}
                    </span>
                    <div className="min-h-[80px]">
                      <AnimatePresence>
                        {isActive && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-1">
                            {s.items.map((it) => (
                              <span key={it} className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-black">— {it}</span>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                </motion.div>
              </PowerOn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- NEWSLETTER + FAQ ---------- */
const faqs = [
  { q: "What projects do you take on?", a: "Branding, UI/UX, and industrial design — for startups and founders who want a design partner, not a vendor." },
  { q: "How do you price?", a: "By scope and deliverables, never hourly. Custom proposal after a quick discovery call." },
  { q: "Do you work remotely?", a: "Fully — async-friendly across time zones." },
  { q: "Early-stage budgets?", a: "Selective but flexible. If your project is interesting, let's talk." },
];

function Alley() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative border-t-2 border-[var(--divider)] px-5 py-28 md:px-10 md:py-40">
      <FloatShapes variant={1} />
      <div className="relative mx-auto grid max-w-[1300px] gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Fade>
            <SectionTag chip="Press" label="04 — The paper" />
          </Fade>
          <PowerOn delay={0.15}>
            <SignHover>
              <div className="neon-border mt-8 bg-black p-8 md:p-10">
                <div className="flicker-slow neon-red serif-display text-4xl md:text-5xl">The Pixel Post</div>
                <p className="mt-5 text-sm leading-relaxed text-[var(--ink-soft)]">
                  AI × Design, weekly. 1,500+ designers read it on LinkedIn.
                </p>
                <a
                  href="https://www.linkedin.com/in/vanshmandrawadker2004/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-block bg-[var(--neon)] px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-black transition hover:shadow-[0_0_20px_rgba(255,42,60,0.5)]"
                >
                  Subscribe →
                </a>
              </div>
            </SignHover>
          </PowerOn>
        </div>
        <div className="md:col-span-7">
          <Fade>
            <SectionTag chip="FAQ" label="05 — Questions" invert />
          </Fade>
          <div className="mt-8 border-t-2 border-[var(--divider)]">
            {faqs.map((f, idx) => {
              const isOpen = open === idx;
              return (
                <div key={f.q} className="border-b border-[var(--divider)]">
                  <button onClick={() => setOpen(isOpen ? null : idx)} className="flex w-full items-center justify-between gap-4 py-5 text-left">
                    <span className={`font-mono text-xs font-bold uppercase tracking-[0.12em] transition ${isOpen ? "neon-red" : "text-[var(--ink)]"}`}>{f.q}</span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="serif-display shrink-0 text-xl text-[var(--neon)]">+</motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className="overflow-hidden">
                        <p className="pb-5 text-sm leading-relaxed text-[var(--ink-soft)]">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */
function Contact() {
  return (
    <section className="relative overflow-hidden bg-black">
      <LEDTicker text="Contact ✦ Say hello ✦ vanshm.design@gmail.com ✦ +91 8806786802 ✦" reverse />
      <div className="relative px-5 py-32 text-center md:py-44">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="serif-display text-[46vw] leading-none text-[var(--neon)]/[0.04]">@</span>
        </div>
        <Fade>
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">06 — The part where you email me</span>
        </Fade>
        <a href="mailto:vanshm.design@gmail.com" data-cursor="Click!" className="group mt-10 block">
          <PowerOn>
            <div className="neon-red flicker-slow serif-display text-[16vw] leading-[0.95] transition-transform duration-500 group-hover:-translate-x-2 md:text-[11vw]">
              Let's
            </div>
            <div className="neon-white serif-display text-[16vw] leading-[0.95] transition-transform duration-500 group-hover:translate-x-2 md:text-[11vw]">
              Talk
            </div>
          </PowerOn>
          <Magnetic>
            <div className="mt-10 inline-block border-2 border-[var(--neon)] bg-black px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--neon)] shadow-[0_0_12px_rgba(255,42,60,0.3)] transition group-hover:bg-[var(--neon)] group-hover:text-black">
              vanshm.design@gmail.com
            </div>
          </Magnetic>
        </a>
        <div className="mt-12 flex justify-center gap-8">
          <a className="nav-link font-mono text-[10px] uppercase tracking-[0.2em] text-white/60" href="https://www.linkedin.com/in/vanshmandrawadker2004/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="nav-link font-mono text-[10px] uppercase tracking-[0.2em] text-white/60" href="https://www.behance.net/VanshMandrawadker" target="_blank" rel="noreferrer">Behance</a>
          <a className="nav-link font-mono text-[10px] uppercase tracking-[0.2em] text-white/60" href="https://marga.co.in" target="_blank" rel="noreferrer">marga.co.in</a>
        </div>
      </div>
      <div className="crosswalk" />
      <div className="flex flex-col items-center justify-between gap-3 px-5 py-6 font-mono text-[9px] uppercase tracking-[0.2em] text-white/35 md:flex-row md:px-10">
        <span>© 2026 Vansh Mandrawadker — all rights reserved</span>
        <span>Pune, India — 18°31'N 73°51'E</span>
        <span>Last train: never. Always open.</span>
      </div>
    </section>
  );
}

/* ---------- HOME ---------- */
function Home() {
  return (
    <div className="bg-[var(--background)] text-[var(--ink)]">
      <Cursor />
      <Navigation />
      <Loader />
      <Atmosphere />
      <SmoothScroll>
        <main>
          <Hero />
          <About />
          <Work />
          <Interlude />
          <Services />
          <Alley />
          <Contact />
        </main>
      </SmoothScroll>
    </div>
  );
}
