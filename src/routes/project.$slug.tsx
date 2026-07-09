import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
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

/* ─────────────────────── Section renderers ─────────────────────── */

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 py-8 md:py-12">
      <div className="h-px flex-1 bg-[var(--divider)]" />
      <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--ink-soft)]">{text}</span>
      <div className="h-px flex-1 bg-[var(--divider)]" />
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
    <div className="py-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {colors.map(c => (
          <div key={c.hex} className="group flex flex-col gap-3">
            <div
              className="h-24 w-full border border-white/5 md:h-32"
              style={{ background: c.hex }}
            />
            <div>
              <div className="font-mono text-xs font-medium text-[var(--foreground)]">{c.name}</div>
              <div className="font-mono text-[10px] text-[var(--ink-soft)]">{c.hex}</div>
              <div className="mt-1 font-mono text-[10px] text-[var(--ink-soft)] opacity-70">{c.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionTypography({ name, weights, description }: { name: string; weights: string[]; description: string }) {
  return (
    <div className="py-4">
      <div className="border border-[var(--divider)] p-6 md:p-10">
        {/* specimen */}
        <div className="mb-6 border-b border-[var(--divider)] pb-6">
          <div style={{ fontFamily: name }} className="text-5xl font-light leading-none text-[var(--foreground)] md:text-7xl">
            Aa
          </div>
          <div style={{ fontFamily: name }} className="mt-2 text-base text-[var(--ink-soft)]">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
            abcdefghijklmnopqrstuvwxyz<br />
            0123456789
          </div>
        </div>
        {/* meta */}
        <div className="flex flex-col gap-4 md:flex-row md:gap-12">
          <div>
            <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.35em] text-[var(--ink-soft)]">Typeface</div>
            <div className="text-xl font-semibold" style={{ fontFamily: name }}>{name}</div>
          </div>
          <div>
            <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.35em] text-[var(--ink-soft)]">Weights</div>
            <div className="flex flex-col gap-1">
              {weights.map(w => (
                <div key={w} className="font-mono text-xs text-[var(--foreground)]">{w}</div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.35em] text-[var(--ink-soft)]">Rationale</div>
            <p className="text-sm leading-relaxed text-[var(--ink-soft)]">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionPersonas({ persona }: { persona: { name: string; role: string; painPoints: string[]; goals: string[] } }) {
  return (
    <div className="py-4">
      <div className="border border-[var(--divider)]">
        {/* persona header */}
        <div className="flex items-center gap-5 border-b border-[var(--divider)] p-6">
          <div className="flex h-12 w-12 items-center justify-center border border-[var(--neon)] font-mono text-sm font-bold text-[var(--neon)]">
            {persona.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <div className="font-semibold text-[var(--foreground)]">{persona.name}</div>
            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">{persona.role}</div>
          </div>
        </div>
        {/* two columns */}
        <div className="grid md:grid-cols-2">
          <div className="border-b border-[var(--divider)] p-6 md:border-b-0 md:border-r">
            <div className="mb-4 font-mono text-[9px] uppercase tracking-[0.35em] text-[var(--ink-soft)]">Pain Points</div>
            <ul className="flex flex-col gap-3">
              {persona.painPoints.map((p, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-[var(--foreground)]">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500/70" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6">
            <div className="mb-4 font-mono text-[9px] uppercase tracking-[0.35em] text-[var(--ink-soft)]">Goals</div>
            <ul className="flex flex-col gap-3">
              {persona.goals.map((g, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-[var(--foreground)]">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--neon)]" />
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionImage({ src, caption }: { src: string; caption?: string }) {
  return (
    <div className="py-4">
      <div className="overflow-hidden border border-[var(--divider)]">
        <img src={src} alt={caption ?? ""} className="w-full object-cover" loading="lazy" />
      </div>
      {caption && (
        <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink-soft)]">
          {caption}
        </div>
      )}
    </div>
  );
}

function SectionScreens({ images }: { images: { src: string; caption: string }[] }) {
  return (
    <div className="py-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {images.map((img, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="overflow-hidden border border-[var(--divider)]">
              <img src={img.src} alt={img.caption} className="w-full object-cover" loading="lazy" />
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">{img.caption}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderSection(section: ProjectSection, i: number) {
  return (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
    >
      {section.type === "label" && <SectionLabel text={section.text} />}
      {section.type === "text" && <SectionText heading={section.heading} body={section.body} />}
      {section.type === "palette" && <SectionPalette colors={section.colors} />}
      {section.type === "typography" && (
        <SectionTypography name={section.name} weights={section.weights} description={section.description} />
      )}
      {section.type === "personas" && <SectionPersonas persona={section.persona} />}
      {section.type === "image" && <SectionImage src={section.src} caption={section.caption} />}
      {section.type === "screens" && <SectionScreens images={section.images} />}
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
      {/* atmosphere */}
      <div className="rain pointer-events-none fixed inset-0 z-[5] opacity-50" />
      <div className="scanlines pointer-events-none fixed inset-0 z-[6] opacity-20" />

      {/* NAV */}
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

      {/* HERO */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-black pb-12 pt-24">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${project.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(1) contrast(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

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
      <section className="mx-auto max-w-[1300px] px-5 py-16 md:px-10 md:py-24">
        {hasSections ? (
          <div className="flex flex-col">
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
    </div>
  );
}
