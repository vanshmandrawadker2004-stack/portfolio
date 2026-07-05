import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, Reveal, PowerOn, SectionTag, LEDTicker, FloatShapes } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Vansh Mandrawadker" },
      { name: "description", content: "Start a freelance project — branding, UI/UX, or industrial design." },
      { property: "og:title", content: "Contact — Vansh Mandrawadker" },
      { property: "og:description", content: "Get in touch about a freelance design project." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", type: "Brand Identity", budget: "Let's discuss", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New project enquiry — ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nProject type: ${form.type}\nBudget: ${form.budget}\n\n${form.message}`
    );
    window.location.href = `mailto:vanshm.design@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field = "w-full border-b-2 border-[var(--divider)] bg-transparent py-3 text-base text-[var(--ink)] outline-none transition focus:border-[var(--neon)] placeholder:text-[var(--ink-soft)]";
  const label = "font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--ink-soft)]";

  return (
    <PageShell>
      {/* HERO */}
      <section className="relative overflow-hidden px-5 pb-14 pt-28 md:px-10 md:pb-20 md:pt-36">
        <FloatShapes variant={1} />
        <div className="relative mx-auto max-w-[1300px]">
          <Reveal>
            <SectionTag chip="Talk" label="05 — Transmission open" />
          </Reveal>
          <PowerOn delay={0.15}>
            <h1 className="serif-display mt-10 text-[16vw] leading-[0.95] md:text-[10vw]">
              <span className="neon-red flicker-slow">Let's</span> <span className="neon-white">Talk</span>
            </h1>
          </PowerOn>
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-md font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink-soft)]">
              Response within 48h · Pune, IN · works worldwide
            </p>
          </Reveal>
        </div>
      </section>
      <LEDTicker text="Transmission open ✦ Brand ✦ UI/UX ✦ Industrial ✦ Say hello ✦" />

      {/* FORM + INFO */}
      <section className="relative px-5 py-20 md:px-10 md:py-32">
        <div className="relative mx-auto grid max-w-[1300px] gap-8 md:grid-cols-12">
          {/* form panel */}
          <PowerOn className="md:col-span-7">
            <div className="neon-border-white bg-black/60 p-8 md:p-12">
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink-soft)]">Enquiry form — v2.6</span>
                <span className="flicker-fast font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--neon)]">● Rec</span>
              </div>
              <form onSubmit={submit} className="space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <label className="block">
                    <span className={label}>Name</span>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} placeholder="Your full name" />
                  </label>
                  <label className="block">
                    <span className={label}>Email</span>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} placeholder="you@email.com" />
                  </label>
                </div>
                <div className="grid gap-8 md:grid-cols-2">
                  <label className="block">
                    <span className={label}>Project type</span>
                    <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={field + " bg-black"}>
                      {["Brand Identity", "UI/UX Design", "Industrial Design", "Consultation", "Other"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className={label}>Budget</span>
                    <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className={field + " bg-black"}>
                      {["Under ₹10K", "₹10K–₹30K", "₹30K–₹60K", "₹60K+", "Let's discuss"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </label>
                </div>
                <label className="block">
                  <span className={label}>Tell me about the project</span>
                  <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={field + " resize-none"} placeholder="Goals, timeline, anything I should know…" />
                </label>
                <button
                  type="submit"
                  data-cursor="Send"
                  className="bg-[var(--neon)] px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.25em] text-black transition hover:shadow-[0_0_26px_rgba(255,42,60,0.5)]"
                >
                  Send transmission →
                </button>
                {sent && <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">Opening your mail client… if nothing happens, write to vanshm.design@gmail.com directly.</p>}
              </form>
            </div>
          </PowerOn>

          {/* info signs */}
          <div className="flex flex-col gap-5 md:col-span-5">
            <PowerOn delay={0.1}>
              <div className="neon-border flex items-center justify-between bg-black px-6 py-5">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--ink)]">Status</span>
                <span className="flicker-fast neon-red font-mono text-[10px] font-bold uppercase tracking-[0.2em]">● Open for projects</span>
              </div>
            </PowerOn>
            {[
              { l: "Email", v: "vanshm.design@gmail.com", h: "mailto:vanshm.design@gmail.com" },
              { l: "Phone", v: "+91 8806786802", h: "tel:+918806786802" },
              { l: "LinkedIn", v: "vanshmandrawadker2004", h: "https://www.linkedin.com/in/vanshmandrawadker2004/" },
              { l: "Behance", v: "VanshMandrawadker", h: "https://www.behance.net/VanshMandrawadker" },
              { l: "Live project", v: "marga.co.in", h: "https://marga.co.in" },
              { l: "Newsletter", v: "The Pixel Post", h: "https://www.linkedin.com/in/vanshmandrawadker2004/" },
            ].map((i, idx) => (
              <PowerOn key={i.l} delay={0.15 + idx * 0.06}>
                <a
                  href={i.h}
                  target={i.h.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  data-cursor="Go"
                  className="group flex items-center justify-between border-2 border-[var(--divider)] bg-black/60 px-6 py-4 transition-all duration-300 hover:border-[var(--neon)] hover:pl-8"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">{i.l}</span>
                  <span className="serif-display text-lg transition-colors duration-300 group-hover:neon-red md:text-xl">{i.v}</span>
                </a>
              </PowerOn>
            ))}
          </div>
        </div>
      </section>

      <div className="crosswalk" />
    </PageShell>
  );
}
