import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { projects } from "@/lib/projects";

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

function ProjectPage() {
  const project = Route.useLoaderData();
  const all = projects.filter(p => p.href.startsWith("/project/"));
  const idx = all.findIndex(p => p.slug === project.slug);
  const prev = all[idx - 1];
  const next = all[idx + 1];

  const gallery = project.gallery ?? [];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* rain + scanlines atmosphere */}
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
            <div className="flex items-center gap-4 mb-6">
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

      {/* GALLERY */}
      <section className="mx-auto max-w-[1300px] px-5 py-16 md:px-10 md:py-24">
        {gallery.length > 0 ? (
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
