export type Project = {
  slug: string;
  title: string;
  year: string;
  category: "Brand Identity" | "UI/UX" | "Industrial Design" | "Web / Brand";
  meta?: string;
  href: string;
  image: string;
  featured?: boolean;
  span?: "full" | "half";
  contain?: boolean;
};

export const projects: Project[] = [
  { slug: "marga", title: "marga", year: "2025", category: "Web / Brand", meta: "Featured", href: "https://marga.co.in", image: "/marga 2.png", featured: true, span: "full", contain: true },
  { slug: "portfolio", title: "Portfolio", year: "2025", category: "UI/UX", meta: "5.5K views", href: "https://www.behance.net/gallery/224137575/Portfolio", image: "https://mir-s3-cdn-cf.behance.net/projects/404/5056c5224137575.Y3JvcCw0MTIwLDMyMjMsODA1LDE3Mw.png", span: "half" },
  { slug: "logo-design", title: "Logo Design", year: "2025", category: "Brand Identity", href: "https://www.behance.net/gallery/231316289/Logo-Design", image: "https://mir-s3-cdn-cf.behance.net/projects/404/e1e027231316289.Y3JvcCwxMDczLDgzOSw0NDYsMTM1.png", span: "half" },
  { slug: "vitalink", title: "Vitalink", year: "2025", category: "UI/UX", href: "https://www.behance.net/gallery/237702741/Vitalink", image: "https://mir-s3-cdn-cf.behance.net/projects/404/f8e1ac237702741.Y3JvcCwyNTEwLDE5NjMsMTEzMCwyOTI.png", span: "half" },
  { slug: "thrive", title: "Thrive", year: "2024", category: "Brand Identity", href: "https://www.behance.net/gallery/222992479/Thrive", image: "https://mir-s3-cdn-cf.behance.net/projects/404/2402d7222992479.Y3JvcCwxMzU5LDEwNjMsMzIyLDA.jpg", span: "half" },
  { slug: "railway-way-finding", title: "Railway Way Finding", year: "2025", category: "UI/UX", href: "https://www.behance.net/gallery/239501841/Railway-Way-Finding", image: "https://mir-s3-cdn-cf.behance.net/projects/404/0d7157239501841.Y3JvcCw4MDcsNjMxLDE0NSwxNjM.png", span: "full" },
];
