# Portfolio Website — Full Handoff Document

## Project Overview

This is **Vansh Mandrawadker's** personal portfolio website built with **React + Vite + TailwindCSS + Framer Motion + TanStack Router**. It is a freelance portfolio targeting clients who need **branding, UI/UX, and industrial design** work.

**Live dev server:** `npm run dev` → `http://localhost:8080`
**Project folder:** `~/Desktop/portfolio website`
**GitHub repo:** `https://github.com/vanshmandrawadker2004-stack/vansh-design-studio.git`

---

## Tech Stack

- **React** (with TanStack Router for file-based routing)
- **Vite** (v8) as bundler
- **Tailwind CSS v4** (via `@import "tailwindcss"`)
- **Framer Motion** for all animations
- **TypeScript**
- **Bun** lockfile (but use `npm` to run commands)

---

## Designer Info

- **Name:** Vansh Mandrawadker
- **Role:** Product Designer (UI/UX, Industrial Design, Brand Identity)
- **Email:** vanshm.design@gmail.com
- **Phone:** +91 8806786802
- **Location:** Pune, Maharashtra, India
- **LinkedIn:** https://www.linkedin.com/in/vanshmandrawadker2004/
- **Behance:** https://www.behance.net/VanshMandrawadker
- **marga project:** https://marga.co.in
- **Newsletter (The Pixel Post):** https://www.linkedin.com/in/vanshmandrawadker2004/

---

## Design Direction

- **Reference site:** https://kanso.framer.media (80% inspiration, not a copy)
- **Background:** `#FAFAF8` (warm off-white)
- **Text:** `#0D0D0D` (near-black)
- **Font:** `"Helvetica Neue", Helvetica, Arial, sans-serif` for headings (`--font-serif` variable)
- **Body font:** `Inter` (`--font-sans` variable)
- **Heading weight:** 300 (light), letter-spacing: -0.04em
- **Section labels:** uppercase, 0.7rem, letter-spacing 0.15em, styled as `section-label` utility class
- **Animations:** Framer Motion throughout — staggered text reveal on load, scroll reveals (Intersection Observer), project card hover zoom (1.03x), accordion expand/collapse

---

## File Structure (important files only)

```
src/
  styles.css              ← All CSS variables, fonts, utilities
  routes/
    __root.tsx            ← HTML shell, font imports, nav, meta tags
    index.tsx             ← Homepage (all sections)
    about.tsx             ← About page
    work.tsx              ← Full work grid page
    blog.tsx              ← Blog page
    contact.tsx           ← Contact form page
  components/
    site.tsx              ← Shared components: Reveal, StaggerWords, SectionLabel, Counter, PlaceholderImage, CTAButton, CTABanner, PageShell, Navbar, Footer
  lib/
    projects.ts           ← All project data (title, image, href, category, span, contain)
public/
  IMG_1820 2.JPG          ← Hero image (desk/workspace photo)
  photo of myself.jpg     ← Portrait photo (Vansh standing near sculpture)
  marga 2.png             ← Screenshot of marga.co.in (dark theme)
```

---

## Homepage Sections (in order)

| #   | Section       | Component        | Notes                                                                                   |
| --- | ------------- | ---------------- | --------------------------------------------------------------------------------------- |
| —   | Navbar        | in `site.tsx`    | Logo left, nav center, "Start a Project" CTA right, live clock                          |
| —   | Hero          | `Hero()`         | "Vansh" + "Mandrawadker" in large Helvetica Neue light, tagline right, hero image below |
| —   | Marquee       | `Marquee()`      | Scrolling tool names strip                                                              |
| 01  | About         | `AboutSnippet()` | Headline + bio text left, 4 stat counters right in bordered grid                        |
| 02  | Selected Work | `SelectedWork()` | Project cards grid from `projects.ts`                                                   |
| 03  | Why Me        | `WhyMe()`        | Portrait left + quote, numbered differentiators list right                              |
| 04  | Services      | `Services()`     | Accordion — Brand Identity, UI/UX Design, Industrial Design, Consultation & Audit       |
| 05  | Process       | `Process()`      | 4-step horizontal: Discover → Define → Design → Deliver                                 |
| 06  | Newsletter    | `Newsletter()`   | The Pixel Post CTA card                                                                 |
| 07  | FAQ           | `FAQ()`          | Accordion Q&A                                                                           |
| —   | CTA Banner    | `CTABanner()`    | Dark full-width CTA before footer                                                       |
| —   | Footer        | in `site.tsx`    | Nav links, socials, email, newsletter blurb                                             |

**Note:** Testimonials section was REMOVED (fake quotes). Section numbers updated accordingly (FAQ is now 07, not 08).

---

## Stats (About section counters)

```
4+    Internships completed
10+   Projects delivered
1500+ Newsletter subs
100+  Users researched
```

---

## Projects Data (`src/lib/projects.ts`)

```ts
{ slug: "marga",              title: "marga",               year: "2025", category: "Web / Brand",       image: "/marga 2.png",         href: "https://marga.co.in",                                      span: "full", contain: true }
{ slug: "portfolio",          title: "Portfolio",            year: "2025", category: "UI/UX",             image: "[behance CDN url]",     href: "https://www.behance.net/gallery/224137575/Portfolio",       span: "half" }
{ slug: "logo-design",        title: "Logo Design",          year: "2025", category: "Brand Identity",    image: "[behance CDN url]",     href: "https://www.behance.net/gallery/231316289/Logo-Design",     span: "half" }
{ slug: "vitalink",           title: "Vitalink",             year: "2025", category: "UI/UX",             image: "[behance CDN url]",     href: "https://www.behance.net/gallery/237702741/Vitalink",        span: "half" }
{ slug: "thrive",             title: "Thrive",               year: "2024", category: "Brand Identity",    image: "[behance CDN url]",     href: "https://www.behance.net/gallery/222992479/Thrive",          span: "half" }
{ slug: "railway-way-finding",title: "Railway Way Finding",  year: "2025", category: "UI/UX",             image: "[behance CDN url]",     href: "https://www.behance.net/gallery/239501841/Railway-Way-Finding", span: "full" }
{ slug: "weave",              title: "Weave",                year: "2025", category: "UI/UX",             image: "[unsplash]",            href: "#",                                                         span: "half" }
{ slug: "acoform",            title: "ACOFORM",              year: "2024", category: "Brand Identity",    image: "[unsplash]",            href: "#",                                                         span: "half" }
{ slug: "presto",             title: "Presto",               year: "2024", category: "Industrial Design", image: "[unsplash]",            href: "#",                                                         span: "full" }
```

**Note:** `contain: true` on marga means it uses `object-contain` with black background instead of `object-cover`, so the screenshot isn't stretched.

---

## Images

| File                          | Used for                                                           |
| ----------------------------- | ------------------------------------------------------------------ |
| `/public/IMG_1820 2.JPG`      | Hero section (desk with sketchbook, laptop, LG monitor)            |
| `/public/photo of myself.jpg` | Portrait in "Why Me" section (Vansh standing near large sculpture) |
| `/public/marga 2.png`         | Marga project card (dark themed screenshot of marga.co.in)         |

**Still using Unsplash placeholders for:** Weave, ACOFORM, Presto projects — replace with real project images.

---

## Changes Made So Far

1. ✅ Removed `®` symbol from "Mandrawadker" in hero
2. ✅ Fixed hero text overflow — reduced font size so name doesn't bleed into right column
3. ✅ Changed font from Playfair Display → Space Grotesk → Cormorant Garamond → **Helvetica Neue** (final)
4. ✅ Updated stats (4+ internships, 10+ projects, 1500+ newsletter subs, 100+ users researched)
5. ✅ Fixed stats grid alignment — changed from 2x2 grid to bordered 4-column row
6. ✅ Removed fake testimonials section
7. ✅ Renumbered FAQ from 08 → 07
8. ✅ Added real images to all Behance projects
9. ✅ Replaced hero placeholder with actual desk photo
10. ✅ Replaced portrait placeholder with Vansh's photo
11. ✅ Added marga.co.in screenshot as project image (contain mode, black bg)
12. ✅ Increased services accordion row padding (py-8 → py-12)
13. ✅ Made service heading text smaller (text-xl md:text-3xl)
14. ✅ WhyMe section — portrait and list aligned properly with `items-stretch`

---

## Still To Do / Known Issues

- [ ] Weave, ACOFORM, Presto project images are still Unsplash placeholders — need real images
- [ ] marga image quality is lower than ideal (screenshot limitation) — consider replacing with a better image
- [ ] Hero image could be better composed — currently the desk photo
- [ ] Portrait image is a placeholder person — Vansh's actual photo is uploaded but cropping/positioning may need tweaking
- [ ] About, Work, Blog, Contact pages exist but may need content review
- [ ] Contact form needs EmailJS or similar wired up to actually send emails to vanshm.design@gmail.com
- [ ] Deploy to Vercel/Netlify once all content is finalized

---

## How to Run

```bash
cd "portfolio website"
npm run dev
# Open http://localhost:8080
```

## How to Push Changes to GitHub

```bash
cd "portfolio website"
git add .
git commit -m "your message"
git push
```
