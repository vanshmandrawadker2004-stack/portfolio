import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell, Reveal, PowerOn, SectionTag, LEDTicker, FloatShapes, SignHover, NeonCTA, Tilt, Counter } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Vansh Mandrawadker" },
      { name: "description", content: "Product designer from Pune, India. Branding, UI/UX, and industrial design across BORN Group, Avishkaar, and Idiom." },
      { property: "og:title", content: "About — Vansh Mandrawadker" },
      { property: "og:description", content: "A multi-disciplinary product designer working across brand, product, and industrial design." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const skills = ["Figma", "Illustrator", "Photoshop", "Procreate", "Fusion 360", "Keyshot", "Miro", "Notion"];

const experience = [
  { y: "Nov–Dec 2025", c: "Idiom Circular Services Trust", r: "Design Intern" },
  { y: "Jul–Oct 2025", c: "Avishkaar", r: "Design Intern" },
  { y: "May–Jul 2025", c: "BORN Group", r: "Design Intern" },
  { y: "May–Jun 2024", c: "Knowzies Technology Solutions", r: "Graphic Design Intern" },
];

const certs = [
  "Google UX Design Specialization",
  "Google Prompting Essentials",
  "Figma UI UX (Essentials + Advanced)",
];

function About() {
  return (
    <PageShell>
      {/* HERO — resident file */}
      <section className="relative overflow-hidden px-5 pb-14 pt-28 md:px-10 md:pb-20 md:pt-36">
        <FloatShapes variant={0} />
        <div className="relative mx-auto max-w-[1300px]">
          <Reveal>
            <SectionTag chip="File" label="01 — Resident profile" />
          </Reveal>
          <PowerOn delay={0.15}>
            <h1 className="neon-white serif-display mt-10 text-[15vw] leading-[0.95] md:text-[9vw]">
              The <span className="neon-red flicker-slow">Resident</span>
            </h1>
          </PowerOn>
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-md font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink-soft)]">
              Vansh Mandrawadker — product designer · Pune, IN · on duty since 2024
            </p>
          </Reveal>
        </div>
      </section>
      <LEDTicker text="Product designer ✦ UID graduate ✦ Brand · UI/UX · Industrial ✦" />

      {/* BIO — ID card + statement */}
      <section className="relative px-5 py-20 md:px-10 md:py-32">
        <div className="relative mx-auto grid max-w-[1300px] gap-8 md:grid-cols-12">
          <PowerOn className="md:col-span-5">
            <Tilt max={5} className="h-full">
              <div className="group relative border-2 border-[var(--divider)] bg-black/70 p-4 transition-colors duration-500 hover:border-[var(--neon)]">
                <div className="relative overflow-hidden">
                  <img
                    src="/photo of myself.jpg"
                    alt="Vansh Mandrawadker"
                    className="aspect-[4/5] w-full object-cover transition-all duration-700 group-hover:[filter:grayscale(0)_contrast(1)_brightness(1)]"
                    style={{ filter: "grayscale(1) contrast(1.1) brightness(0.85)" }}
                  />
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

          <Reveal className="md:col-span-7">
            <div className="neon-border-white flex h-full flex-col justify-between bg-black/60 p-8 md:p-12">
              <div>
                <p className="serif-display text-2xl leading-snug md:text-4xl">
                  I'm Vansh — a product designer from Pune, India, and a graduate of Unitedworld Institute of Design.
                </p>
                <p className="mt-6 text-sm leading-relaxed text-[var(--ink-soft)] md:text-base">
                  I work at the intersection of <span className="text-[var(--neon)]">branding</span>, digital product
                  design, and industrial design — which means I can take a product from concept to complete identity
                  to digital experience.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)] md:text-base">
                  I've interned at BORN Group, Avishkaar, and Idiom Circular Services Trust, and I run{" "}
                  <a className="nav-link text-[var(--ink)]" href="https://www.linkedin.com/in/vanshmandrawadker2004/" target="_blank" rel="noreferrer">The Pixel Post</a>,
                  a weekly design × AI newsletter. When I'm not designing, I'm probably obsessing over typography or
                  hunting the next AI tool that makes my workflow 3× faster.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/contact" data-cursor="Go" className="bg-[var(--neon)] px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-black transition hover:shadow-[0_0_20px_rgba(255,42,60,0.5)]">
                  Start a project →
                </Link>
                <a href="#" data-cursor="CV" className="neon-border-white bg-black px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--neon)] hover:text-[var(--neon)]">
                  Download CV ↓
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* quick stats */}
        <div className="relative mx-auto mt-8 grid max-w-[1300px] grid-cols-2 gap-5 md:grid-cols-4">
          {[
            [4, "+", "Internships"],
            [10, "+", "Projects"],
            [1500, "+", "Newsletter subs"],
            [100, "+", "Users researched"],
          ].map(([n, s, l], i) => (
            <PowerOn key={l as string} delay={i * 0.1}>
              <SignHover>
                <div className={`flex items-center justify-between gap-3 px-5 py-4 ${i % 2 ? "bg-white text-black" : "neon-border bg-black"}`}>
                  <span className={`serif-display text-3xl md:text-4xl ${i % 2 ? "text-black" : "neon-red"}`}>
                    <Counter to={n as number} suffix={s as string} />
                  </span>
                  <span className={`text-right font-mono text-[9px] uppercase tracking-[0.18em] ${i % 2 ? "text-black/60" : "text-[var(--ink-soft)]"}`}>{l}</span>
                </div>
              </SignHover>
            </PowerOn>
          ))}
        </div>
      </section>

      {/* TOOLKIT — a wall of small signs */}
      <section className="relative border-t-2 border-[var(--divider)] px-5 py-20 md:px-10 md:py-32">
        <FloatShapes variant={1} />
        <div className="relative mx-auto max-w-[1300px]">
          <Reveal>
            <SectionTag chip="Kit" label="02 — The toolkit" />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
            {skills.map((s, i) => (
              <PowerOn key={s} delay={i * 0.07}>
                <SignHover className={i % 3 === 1 ? "rotate-1" : i % 3 === 2 ? "-rotate-1" : ""}>
                  <div className={`flex items-center justify-center px-4 py-6 text-center ${i % 3 === 0 ? "neon-border bg-black" : i % 3 === 1 ? "bg-white text-black" : "neon-border-white bg-black"}`}>
                    <span className={`serif-display text-2xl md:text-3xl ${i % 3 === 0 ? "neon-red" : i % 3 === 1 ? "text-black" : "neon-white"}`}>{s}</span>
                  </div>
                </SignHover>
              </PowerOn>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE — employment records */}
      <section className="relative border-t-2 border-[var(--divider)] px-5 py-20 md:px-10 md:py-32">
        <div className="relative mx-auto max-w-[1300px]">
          <Reveal>
            <div className="flex items-center justify-between">
              <SectionTag chip="Log" label="03 — Employment records" />
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-soft)] md:inline">Most recent first</span>
            </div>
          </Reveal>
          <div className="mt-12 border-t-2 border-[var(--divider)]">
            {experience.map((e, i) => (
              <PowerOn key={e.c} delay={i * 0.07}>
                <div className="group grid items-baseline gap-2 border-b border-[var(--divider)] py-7 transition-all duration-300 hover:pl-4 md:grid-cols-12 md:gap-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-soft)] md:col-span-3">{e.y}</div>
                  <div className="serif-display text-2xl transition-colors duration-300 group-hover:neon-red md:col-span-6 md:text-4xl">{e.c}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-soft)] md:col-span-3 md:text-right">
                    <span className="border border-[var(--divider)] px-2 py-1 transition-colors duration-300 group-hover:border-[var(--neon)] group-hover:text-[var(--neon)]">{e.r}</span>
                  </div>
                </div>
              </PowerOn>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION + CERTS */}
      <section className="relative border-t-2 border-[var(--divider)] px-5 py-20 md:px-10 md:py-32">
        <FloatShapes variant={0} />
        <div className="relative mx-auto grid max-w-[1300px] gap-8 md:grid-cols-2">
          <PowerOn>
            <div className="neon-border-white h-full bg-black/60 p-8 md:p-10">
              <SectionTag chip="Edu" label="04 — Education" invert />
              <div className="serif-display mt-8 text-3xl md:text-4xl">Unitedworld Institute of Design</div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">BDes Product Design · Graduated 2026</div>
            </div>
          </PowerOn>
          <PowerOn delay={0.15}>
            <div className="neon-border h-full bg-black p-8 md:p-10">
              <SectionTag chip="Cert" label="05 — Certifications" />
              <ul className="mt-8 space-y-4">
                {certs.map((c) => (
                  <li key={c} className="flex items-baseline gap-3">
                    <span className="text-[var(--neon)]">●</span>
                    <span className="serif-display text-xl md:text-2xl">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </PowerOn>
        </div>
      </section>

      <NeonCTA />
    </PageShell>
  );
}
