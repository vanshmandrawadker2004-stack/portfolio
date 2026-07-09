export type Project = {
  slug: string;
  title: string;
  year: string;
  category: "Brand Identity" | "UI/UX" | "Industrial Design" | "Web / Brand";
  meta?: string;
  href: string;
  externalHref?: string; // original Behance/external link
  image: string;
  featured?: boolean;
  span?: "full" | "half";
  contain?: boolean;
  description?: string;
  gallery?: string[];
};

export const projects: Project[] = [
  {
    slug: "marga",
    title: "marga",
    year: "2025",
    category: "Web / Brand",
    meta: "Featured",
    href: "https://marga.co.in",
    image: "/marga 2.png",
    featured: true,
    span: "full",
    contain: true,
    description: "A curated travel platform for discovering places tailored to every kind of ride. Full brand identity, web design, and product experience.",
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    year: "2025",
    category: "UI/UX",
    meta: "5.5K views",
    href: "/project/portfolio",
    externalHref: "https://www.behance.net/gallery/224137575/Portfolio",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/5056c5224137575.Y3JvcCw0MTIwLDMyMjMsODA1LDE3Mw.png",
    span: "half",
    description: "A UI/UX portfolio showcasing product design work across branding, interaction design, and research-driven product thinking.",
    gallery: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/7273b2224137575.6806307d64251.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/855450224137575.6806307d61495.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/e54a88224137575.6806307d64f44.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/792d8c224137575.6806307d60491.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/54d186224137575.6806307d63cca.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/3bdc69224137575.6806307d628bd.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/ef2485224137575.6806307d64a5d.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/bbfde0224137575.6806307d62e53.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/058f4d224137575.6806307d62130.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/c77814224137575.6806307d6339d.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/a669d3224137575.6806307d65791.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/8ecd83224137575.6806307d61c4d.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/74aac2224137575.6806307d60be7.png",
    ],
  },
  {
    slug: "logo-design",
    title: "Logo Design",
    year: "2025",
    category: "Brand Identity",
    href: "/project/logo-design",
    externalHref: "https://www.behance.net/gallery/231316289/Logo-Design",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/e1e027231316289.Y3JvcCwxMDczLDgzOSw0NDYsMTM1.png",
    span: "half",
    description: "A collection of logo marks and brand identity systems crafted for startups and independent businesses.",
    gallery: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/69acd6231316289.6887539fd8b70.png",
    ],
  },
  {
    slug: "vitalink",
    title: "Vitalink",
    year: "2025",
    category: "UI/UX",
    href: "/project/vitalink",
    externalHref: "https://www.behance.net/gallery/237702741/Vitalink",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/f8e1ac237702741.Y3JvcCwyNTEwLDE5NjMsMTEzMCwyOTI.png",
    span: "half",
    description: "A health-tech product connecting patients and caregivers through a seamless digital interface.",
    gallery: [],
  },
  {
    slug: "thrive",
    title: "Thrive",
    year: "2024",
    category: "Brand Identity",
    href: "/project/thrive",
    externalHref: "https://www.behance.net/gallery/222992479/Thrive",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/2402d7222992479.Y3JvcCwxMzU5LDEwNjMsMzIyLDA.jpg",
    span: "half",
    description: "Brand identity for a wellness startup — rooted in clarity, growth, and a human-first design language.",
    gallery: [],
  },
  {
    slug: "railway-way-finding",
    title: "Railway Way Finding",
    year: "2025",
    category: "UI/UX",
    href: "/project/railway-way-finding",
    externalHref: "https://www.behance.net/gallery/239501841/Railway-Way-Finding",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/0d7157239501841.Y3JvcCw4MDcsNjMxLDE0NSwxNjM.png",
    span: "full",
    description: "A wayfinding system redesign for Indian Railways — simplifying navigation for millions of daily commuters through better signage and digital interfaces.",
    gallery: [],
  },
];
