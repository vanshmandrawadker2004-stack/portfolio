import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useVelocity,
  useAnimationFrame,
  useMotionTemplate,
  animate,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------------- Reveal ---------------- */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- StaggerWords ---------------- */
export function StaggerWords({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.8, delay: delay + i * 0.07, ease: EASE }}
            className="inline-block"
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ---------------- Letters — per-character reveal + hover repel ---------------- */
export function Letters({
  text,
  className = "",
  delay = 0,
  hoverClass = "",
}: {
  text: string;
  className?: string;
  delay?: number;
  hoverClass?: string;
}) {
  return (
    <span className={`inline-flex ${className}`}>
      {text.split("").map((c, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.7, delay: delay + i * 0.04, ease: EASE }}
            className="inline-block"
          >
            <motion.span
              whileHover={{ y: -16, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
              className={`inline-block cursor-default ${hoverClass}`}
            >
              {c}
            </motion.span>
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ---------------- ScrambleText — decodes on hover ---------------- */
const SCRAMBLE_CHARS = "AKXZRVWM#@$%&/\\<>*";
export function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const running = useRef(false);
  const scramble = () => {
    if (running.current) return;
    running.current = true;
    let frame = 0;
    const total = 12;
    const tick = () => {
      frame++;
      setDisplay(
        text
          .split("")
          .map((c, idx) => {
            if (c === " ") return " ";
            if (idx < (frame / total) * text.length) return c;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join(""),
      );
      if (frame < total) setTimeout(tick, 28);
      else {
        setDisplay(text);
        running.current = false;
      }
    };
    tick();
  };
  return (
    <span className={className} onMouseEnter={scramble}>
      {display}
    </span>
  );
}

/* ---------------- ScrollWords ---------------- */
export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: ReactNode;
  progress: any;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <span className="relative mr-[0.28em] inline-block">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

/* ---------------- GlitchTitle — RGB split reacts to scroll velocity ---------------- */
export function GlitchTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { scrollY } = useScroll();
  const v = useVelocity(scrollY);
  const sv = useSpring(v, { stiffness: 300, damping: 40 });
  const off = useTransform(sv, [-2500, 0, 2500], [-8, 0, 8]);
  const neg = useTransform(off, (o) => -o);
  const skew = useTransform(sv, [-2500, 2500], [-4, 4]);
  const textShadow = useMotionTemplate`${off}px 0 rgba(255,43,43,0.85), ${neg}px 0 rgba(34,211,238,0.6)`;
  return (
    <motion.span style={{ textShadow, skewX: skew }} className={`inline-block ${className}`}>
      {children}
    </motion.span>
  );
}

/* ---------------- ScrollProgress ---------------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[95] h-[3px] origin-left bg-[var(--neon)]"
    />
  );
}

/* ---------------- VelocityMarquee — speed & skew react to scroll velocity ---------------- */
const wrapRange = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

export function VelocityMarquee({
  children,
  baseVelocity = 3,
  className = "",
}: {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const skewX = useTransform(smoothVelocity, [-1200, 1200], [-8, 8]);
  const directionFactor = useRef(1);
  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) directionFactor.current = -1;
    else if (vf > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * Math.abs(vf);
    baseX.set(wrapRange(-25, 0, baseX.get() + moveBy));
  });
  const x = useTransform(baseX, (v) => `${v}%`);
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div style={{ x, skewX }} className="flex w-max">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="flex shrink-0 items-center">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------------- ImageTrail — images spawn behind the mouse ---------------- */
type TrailItem = { id: number; x: number; y: number; src: string; rot: number };
export function ImageTrail({
  images,
  children,
  className = "",
}: {
  images: string[];
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const last = useRef({ x: -999, y: -999 });
  const idRef = useRef(0);
  const imgIdx = useRef(0);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    if (Math.hypot(x - last.current.x, y - last.current.y) < 110) return;
    last.current = { x, y };
    const id = idRef.current++;
    const src = images[imgIdx.current++ % images.length];
    const rot = (Math.random() - 0.5) * 18;
    setTrail((t) => [...t.slice(-5), { id, x, y, src, rot }]);
    setTimeout(() => setTrail((t) => t.filter((i) => i.id !== id)), 850);
  };

  return (
    <div ref={ref} onMouseMove={onMove} className={`relative ${className}`}>
      {children}
      <div className="pointer-events-none absolute inset-0 z-20 hidden overflow-hidden md:block">
        <AnimatePresence>
          {trail.map((t) => (
            <motion.img
              key={t.id}
              src={t.src}
              initial={{ scale: 0.3, opacity: 0, rotate: t.rot - 10 }}
              animate={{ scale: 1, opacity: 1, rotate: t.rot }}
              exit={{ scale: 0.4, opacity: 0, y: 40 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="absolute h-36 w-48 -translate-x-1/2 -translate-y-1/2 object-cover shadow-2xl"
              style={{ left: t.x, top: t.y }}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------------- Tilt — 3D card tilt on mouse ---------------- */
export function Tilt({
  children,
  max = 10,
  className = "",
}: {
  children: ReactNode;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });
  return (
    <motion.div
      ref={ref}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 800 }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
        ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- SectionLabel ---------------- */
export function SectionLabel({ number, label }: { number: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE }}
      className="section-label flex items-center gap-3"
    >
      <span className="inline-block h-px w-8 bg-[var(--neon)]" />
      <span className="text-[var(--neon)]">{number}</span>
      <span>/ {label}</span>
    </motion.div>
  );
}

/* ---------------- Counter ---------------- */
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: EASE,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------------- PlaceholderImage ---------------- */
export function PlaceholderImage({
  label,
  ratio = "aspect-[4/5]",
  className = "",
}: {
  label?: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div className={`relative ${ratio} w-full overflow-hidden bg-[#1e1e20] ${className}`}>
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.04) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.04) 75%, transparent 75%)",
          backgroundSize: "24px 24px",
        }}
      />
      {label && <div className="absolute bottom-3 left-3 section-label">{label}</div>}
    </div>
  );
}

/* ---------------- Magnetic ---------------- */
export function Magnetic({
  children,
  strength = 0.35,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

/* ---------------- CTAButton ---------------- */
export function CTAButton({
  to,
  href,
  children,
  variant = "dark",
  className = "",
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: "dark" | "ghost" | "invert";
  className?: string;
}) {
  const base =
    "btn-fill inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors duration-500";
  const variants = {
    dark: "bg-[var(--ink)] text-[#0c0c0d] border border-[var(--ink)] hover:border-[var(--neon)]",
    ghost:
      "border border-[var(--ink)]/30 text-[var(--ink)] hover:border-[var(--neon)] hover:text-[#0c0c0d]",
    invert:
      "bg-[var(--neon)] text-[#0c0c0d] border border-[var(--neon)] btn-fill-invert hover:text-white",
  };
  const cls = `${base} ${variants[variant]} ${className}`;
  return (
    <Magnetic>
      {to ? (
        <Link to={to} className={cls}>
          {children}
        </Link>
      ) : (
        <a
          href={href}
          target={href?.startsWith("http") || href?.startsWith("mailto") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className={cls}
        >
          {children}
        </a>
      )}
    </Magnetic>
  );
}

/* ---------------- Preloader ---------------- */
const FLASH_WORDS = ["Brand", "UI/UX", "Industrial", "Systems", "Motion", "Detail"];

export function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [wi, setWi] = useState(0);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const flash = setInterval(() => setWi((w) => w + 1), 220);
    const controls = animate(0, 100, {
      duration: 2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        clearInterval(flash);
        setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
        }, 350);
      },
    });
    return () => {
      controls.stop();
      clearInterval(flash);
      document.body.style.overflow = "";
    };
  }, []);
  const word = count >= 100 ? "Vansh." : FLASH_WORDS[wi % FLASH_WORDS.length];
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-[#0c0c0d] px-6 py-8 md:px-12"
        >
          <div className="flex items-center justify-between">
            <span className="section-label !text-white/50">Portfolio © 2026</span>
            <span className="section-label !text-[var(--neon)]">Pune, IN</span>
          </div>
          <div className="flex items-end justify-between gap-6">
            <h1
              className={`serif-display text-[15vw] leading-none md:text-[9vw] ${count >= 100 ? "text-[var(--neon)] neon-glow" : "text-[var(--ink)]"}`}
            >
              {word}
            </h1>
            <div className="serif-display text-[10vw] leading-none text-outline-neon md:text-[6vw]">
              {count}%
            </div>
          </div>
          <motion.div className="h-[2px] w-full bg-white/10">
            <motion.div className="h-full bg-[var(--neon)]" style={{ width: `${count}%` }} />
          </motion.div>
          <motion.div
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
            className="pointer-events-none absolute inset-0 z-[-1] translate-y-full bg-[var(--neon)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- LiveClock ---------------- */
function LiveClock({ className = "" }: { className?: string }) {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const update = () => {
      const d = new Date();
      const t = d.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      });
      setTime(`PUNE ${t} IST`);
    };
    update();
    const id = setInterval(update, 1000 * 30);
    return () => clearInterval(id);
  }, []);
  return <span className={`section-label ${className}`}>{time || "PUNE — IST"}</span>;
}

/* ---------------- Navigation ---------------- */
const navItems = [
  { to: "/", label: "Home", n: "01" },
  { to: "/about", label: "About", n: "02" },
  { to: "/work", label: "Work", n: "03" },
  { to: "/blog", label: "Blog", n: "04" },
  { to: "/contact", label: "Contact", n: "05" },
] as const;

export function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[90] mix-blend-difference">
        <div className="flex items-center justify-between px-6 py-5 md:px-10">
          <Link to="/" className="serif-display text-2xl text-white">
            V<span className="text-[#ff2b2b]">M</span>
            <sup className="ml-0.5 text-[10px]">®</sup>
          </Link>
          <LiveClock className="hidden !text-white/70 md:inline" />
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="group flex items-center gap-3 text-white"
          >
            <span className="section-label !text-white">{open ? "Close" : "Menu"}</span>
            <div className="space-y-1.5">
              <span
                className={`block h-[2px] w-7 bg-white transition duration-300 ${open ? "translate-y-[8px] rotate-45" : "group-hover:w-5"}`}
              />
              <span
                className={`block h-[2px] w-7 bg-white transition duration-300 ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-[2px] w-7 bg-white transition duration-300 ${open ? "-translate-y-[8px] -rotate-45" : "group-hover:w-4"}`}
              />
            </div>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[80] flex flex-col justify-between overflow-hidden bg-[#0c0c0d] px-6 pb-10 pt-28 md:px-12"
          >
            {/* ghost background text */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
              <span className="serif-display whitespace-nowrap text-[28vw] text-white/[0.03]">
                Menu
              </span>
            </div>
            <nav className="relative flex flex-col">
              {navItems.map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease: EASE }}
                  className="group border-b border-white/10"
                >
                  <Link
                    to={n.to}
                    activeOptions={{ exact: n.to === "/" }}
                    className="flex items-baseline gap-5 py-3 transition-transform duration-500 group-hover:translate-x-4 md:py-4"
                  >
                    <span className="section-label !text-[var(--neon)]">({n.n})</span>
                    <span className="serif-display text-5xl text-[var(--ink)] transition-colors duration-300 group-hover:text-[var(--neon)] md:text-7xl">
                      <ScrambleText text={n.label} />
                    </span>
                    <span className="serif-display ml-auto text-3xl text-[var(--neon)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
            >
              <div>
                <div className="section-label mb-2">Get in touch</div>
                <a
                  href="mailto:vanshm.design@gmail.com"
                  className="nav-link font-medium text-[var(--ink)]"
                >
                  vanshm.design@gmail.com
                </a>
              </div>
              <div className="flex gap-6 text-sm">
                <a
                  className="nav-link"
                  href="https://www.linkedin.com/in/vanshmandrawadker2004/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </a>
                <a
                  className="nav-link"
                  href="https://www.behance.net/VanshMandrawadker"
                  target="_blank"
                  rel="noreferrer"
                >
                  Behance ↗
                </a>
                <a className="nav-link" href="https://marga.co.in" target="_blank" rel="noreferrer">
                  marga.co.in ↗
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const wx = useTransform(scrollYProgress, [0, 1], ["2%", "-2%"]);
  return (
    <footer
      ref={ref}
      className="relative overflow-hidden border-t border-[var(--divider)] bg-[var(--dark-section)]"
    >
      <div className="mx-auto max-w-[1400px] px-6 pb-10 pt-20 md:px-10">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="serif-display text-3xl">
              V<span className="text-[var(--neon)]">M</span>
              <sup className="text-xs">®</sup>
            </div>
            <p className="mt-2 text-sm text-[var(--ink-soft)]">Product Designer · Pune, India</p>
            <p className="mt-6 text-sm">Stay in the loop — subscribe to The Pixel Post.</p>
            <form className="mt-3 flex max-w-sm border-b border-[var(--ink)]/30 focus-within:border-[var(--neon)]">
              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-[var(--ink-soft)]"
              />
              <a
                href="https://www.linkedin.com/in/vanshmandrawadker2004/"
                target="_blank"
                rel="noreferrer"
                className="py-2 text-sm font-medium text-[var(--neon)]"
              >
                Subscribe →
              </a>
            </form>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="section-label mb-4">Navigate</div>
              <ul className="space-y-2 text-sm">
                {navItems.map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} className="nav-link">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="section-label mb-4">Elsewhere</div>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    className="nav-link"
                    href="https://www.linkedin.com/in/vanshmandrawadker2004/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn ↗
                  </a>
                </li>
                <li>
                  <a
                    className="nav-link"
                    href="https://www.behance.net/VanshMandrawadker"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Behance ↗
                  </a>
                </li>
                <li>
                  <a
                    className="nav-link"
                    href="https://marga.co.in"
                    target="_blank"
                    rel="noreferrer"
                  >
                    marga.co.in ↗
                  </a>
                </li>
                <li>
                  <a
                    className="nav-link"
                    href="https://www.linkedin.com/in/vanshmandrawadker2004/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    The Pixel Post ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="section-label mb-4">Contact</div>
            <a href="mailto:vanshm.design@gmail.com" className="nav-link font-medium text-lg">
              vanshm.design@gmail.com
            </a>
            <p className="mt-3 text-sm text-[var(--ink-soft)]">+91 8806786802</p>
            <div className="mt-6 flex items-center gap-2 text-sm">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[var(--neon)]" />
              <span>Available for freelance</span>
            </div>
          </div>
        </div>

        {/* Giant watermark — drifts with scroll */}
        <div className="pointer-events-none mt-16 select-none overflow-hidden">
          <motion.div
            style={{ x: wx }}
            className="serif-display whitespace-nowrap text-center text-[7.8vw] leading-none text-outline opacity-25"
          >
            Vansh Mandrawadker
          </motion.div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-[var(--divider)] pt-6 text-xs text-[var(--ink-soft)] md:flex-row md:items-center">
          <div>© 2026 Vansh Mandrawadker · All rights reserved</div>
          <div className="flex gap-5">
            <a href="#" className="nav-link">
              Privacy Policy
            </a>
            <a href="mailto:vanshm.design@gmail.com" className="nav-link">
              vanshm.design@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- District design system (shared with homepage) ---------------- */
export function Atmosphere() {
  return (
    <>
      <div className="rain pointer-events-none fixed inset-0 z-[55] opacity-70" />
      <div className="scanlines pointer-events-none fixed inset-0 z-[56] opacity-30" />
      <div
        className="pointer-events-none fixed -left-40 top-[20%] z-[5] h-[480px] w-[480px] rounded-full opacity-[0.1] blur-3xl"
        style={{
          background: "radial-gradient(circle, #ff2a3c, transparent 65%)",
          animation: "drift-a 16s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none fixed -right-48 top-[58%] z-[5] h-[560px] w-[560px] rounded-full opacity-[0.07] blur-3xl"
        style={{
          background: "radial-gradient(circle, #f2efe6, transparent 65%)",
          animation: "drift-b 21s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-[54]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 120%, rgba(255,42,60,0.1), transparent 55%), radial-gradient(ellipse at center, transparent 62%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    </>
  );
}

export function PowerOn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
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

export function SignHover({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 14 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionTag({
  chip,
  label,
  invert = false,
}: {
  chip: string;
  label: string;
  invert?: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <span
        className={`px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-[0.15em] ${invert ? "bg-white text-black" : "bg-[var(--neon)] text-black"}`}
      >
        {chip}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-soft)]">
        {label}
      </span>
    </div>
  );
}

export function LEDTicker({
  text,
  reverse = false,
  className = "",
}: {
  text: string;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`marquee overflow-hidden border-y-2 border-[var(--divider)] bg-black py-2.5 ${className}`}
    >
      <div
        className={reverse ? "marquee-track-reverse" : "marquee-track"}
        style={{ animationDuration: "26s" }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="neon-red whitespace-nowrap px-4 font-mono text-xs uppercase tracking-[0.35em]"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

export function FloatShapes({ variant = 0 }: { variant?: number }) {
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

export function NeonCTA() {
  return (
    <section className="relative overflow-hidden bg-black">
      <LEDTicker text="Say hello ✦ vanshm.design@gmail.com ✦ +91 8806786802 ✦" reverse />
      <div className="relative px-5 py-24 text-center md:py-32">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="serif-display text-[36vw] leading-none text-[var(--neon)]/[0.04]">
            @
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
          The part where you email me
        </span>
        <a
          href="mailto:vanshm.design@gmail.com"
          data-cursor="Click!"
          className="group relative mt-8 block"
        >
          <PowerOn>
            <div className="neon-red flicker-slow serif-display text-[14vw] leading-[0.95] md:text-[8vw]">
              Let's Talk
            </div>
          </PowerOn>
          <div className="mt-8 inline-block border-2 border-[var(--neon)] bg-black px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--neon)] shadow-[0_0_12px_rgba(255,42,60,0.3)] transition group-hover:bg-[var(--neon)] group-hover:text-black">
            vanshm.design@gmail.com
          </div>
        </a>
      </div>
      <div className="crosswalk" />
    </section>
  );
}

/* ---------------- PageShell ---------------- */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--ink)]">
      <ScrollProgress />
      <Cursor />
      <Navigation />
      <Atmosphere />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  );
}

/* ---------------- Cursor — contextual labels via data-cursor ---------------- */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const rx = useSpring(x, { stiffness: 150, damping: 20 });
  const ry = useSpring(y, { stiffness: 150, damping: 20 });
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const labelled = t.closest("[data-cursor]") as HTMLElement | null;
      setLabel(labelled?.dataset.cursor ?? null);
      setHover(!!t.closest("a,button,[role=button]"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);
  return (
    <>
      <motion.div
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      >
        <motion.div
          animate={{ scale: label ? 0 : hover ? 0.5 : 1 }}
          transition={{ duration: 0.25 }}
          className="-ml-1 -mt-1 h-2 w-2 rounded-full bg-[var(--neon)]"
        />
      </motion.div>
      <motion.div
        style={{ x: rx, y: ry }}
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden md:block"
      >
        <motion.div
          animate={{
            width: label ? 84 : 32,
            height: label ? 84 : 32,
            backgroundColor: label ? "#ff2b2b" : "rgba(255,43,43,0)",
            scale: !label && hover ? 2 : 1,
            opacity: label ? 1 : hover ? 0.9 : 0.5,
          }}
          transition={{ duration: 0.3 }}
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--neon)]"
        >
          <AnimatePresence>
            {label && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-xs font-bold uppercase tracking-wider text-black"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}

/* ---------------- CTABanner ---------------- */
export function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-[var(--neon)] text-[#0c0c0d]">
      <VelocityMarquee baseVelocity={4} className="border-b border-black/15 py-4">
        <span className="serif-display px-6 text-4xl md:text-6xl">
          Let's Talk <span className="px-6">✦</span> Available for freelance{" "}
          <span className="px-6">✦</span>
        </span>
      </VelocityMarquee>
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <div className="section-label mb-6 !text-black/60">/ Let's Talk</div>
        </Reveal>
        <Reveal delay={0.1}>
          <a href="mailto:vanshm.design@gmail.com" data-cursor="Email" className="group block">
            <h2 className="serif-display text-[13vw] leading-[0.9] md:text-[9vw]">
              Let's build
              <br />
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-6">
                something
              </span>
              <br />
              <span
                style={{ WebkitTextStroke: "2px #0c0c0d", color: "transparent" }}
                className="transition-all duration-500 group-hover:[color:#0c0c0d]"
              >
                unforgettable
              </span>
            </h2>
          </a>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <CTAButton
              href="mailto:vanshm.design@gmail.com"
              variant="invert"
              className="!bg-[#0c0c0d] !text-white !border-[#0c0c0d]"
            >
              Send me an email →
            </CTAButton>
            <a
              href="https://calendly.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-black/40 px-6 py-3 text-sm font-semibold uppercase tracking-wider transition hover:bg-black hover:text-white"
            >
              Book a call →
            </a>
            <p className="max-w-xs text-sm text-black/70">
              Branding, UI/UX, and industrial design — for founders who care about the details.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
