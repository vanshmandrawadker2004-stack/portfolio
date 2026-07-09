export type ProjectSection =
  | { type: "label"; text: string }
  | { type: "text"; heading?: string; body: string }
  | { type: "palette"; colors: { name: string; hex: string; role: string }[] }
  | { type: "typography"; name: string; weights: string[]; description: string }
  | { type: "personas"; persona: { name: string; role: string; painPoints: string[]; goals: string[] } }
  | { type: "image"; src: string; caption?: string }
  | { type: "screens"; images: { src: string; caption: string }[] }
  | { type: "concept-mark"; heading: string; body: string; variant?: "vitalink" | "acoform" | "thrive" }
  | { type: "logo-colors" }
  | { type: "tagline"; attributes: string[]; headline: string; body: string; meta?: string }
  | { type: "stat-grid"; stats: { value: string; label: string; sub?: string }[] }
  | { type: "bar-chart"; title: string; bars: { label: string; value: number; color?: string }[]; caption?: string }
  | { type: "route-line"; title: string; stations: { name: string; major?: boolean; interchange?: boolean }[]; color: string }
  | { type: "info-hierarchy"; title: string; levels: { name: string; examples: string[]; color: string }[] }
  | { type: "sign-system"; signs: { type: string; color: string; textColor: string; label: string; sub: string }[] }
  | { type: "user-journey"; title: string; steps: { phase: string; action: string; pain?: string }[] };

export type Project = {
  slug: string;
  title: string;
  year: string;
  category: "Brand Identity" | "UI/UX" | "Industrial Design" | "Web / Brand";
  meta?: string;
  href: string;
  externalHref?: string;
  image: string;
  featured?: boolean;
  span?: "full" | "half";
  contain?: boolean;
  description?: string;
  gallery?: string[];
  sections?: ProjectSection[];
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
    sections: [
      {
        type: "tagline",
        attributes: ["Accessible", "Reliable", "Empowering"],
        headline: "Vitalink connects patients and doctors with ease. Driven by reliability, built to empower.",
        body: "Vitalink is a forward-thinking platform dedicated to revolutionizing healthcare connections through intuitive, accessible technology. Committed to reliability, empowerment, and care, Vitalink helps patients and doctors connect quickly and confidently. By prioritizing seamless experiences and a culture of trust, Vitalink enables better health journeys, smarter collaboration, and a healthier tomorrow.",
        meta: "Logo & Website",
      },
      {
        type: "label",
        text: "Brand Identity",
      },
      {
        type: "concept-mark",
        heading: "Concept:",
        body: "The Vitalink logo mark is a distinctive fusion of a medical pulse and the initials 'V' and 'L'. The stylized symbol cleverly integrates the steady rhythm of a heartbeat — representing health and connectivity — with the brand's initials, creating a mark that is instantly recognizable and meaningful. This minimalist approach embodies Vitalink's core values of reliability, empowerment, and care, while visually communicating trust and seamless connection at the heart of patient-doctor interaction. Rendered in a simple, professional style, the logo balances modernity with warmth, establishing a clear and approachable brand identity.",
      },
      {
        type: "screens",
        images: [
          { src: "/projects/vitalink/logo-gray.png", caption: "Logo mark — neutral" },
          { src: "/projects/vitalink/logo-purple.png", caption: "Logo mark — brand" },
        ],
      },
      {
        type: "label",
        text: "Design System",
      },
      {
        type: "typography",
        name: "Inter",
        weights: ["400 — Regular", "500 — Medium", "600 — SemiBold"],
        description: "Inter was selected for its exceptional legibility at small sizes and neutral authority. It reads as trustworthy without being cold — critical in a healthcare context where users are already navigating stress.",
      },
      {
        type: "palette",
        colors: [
          { name: "Indigo", hex: "#5B5FF8", role: "Primary — trust, calm, action" },
          { name: "Soft Purple", hex: "#8B8EFA", role: "Secondary — gentle interactions" },
          { name: "Ink", hex: "#2D2D3B", role: "Text — approachable authority" },
          { name: "Cloud", hex: "#F5F5FB", role: "Background — clean, clinical feel" },
        ],
      },
      {
        type: "label",
        text: "User Research",
      },
      {
        type: "personas",
        persona: {
          name: "Akshay Singh",
          role: "28 · Working Professional · Mumbai",
          painPoints: [
            "Difficulty finding trusted specialists nearby without word-of-mouth",
            "Doctor profiles lack credentials, reviews, or wait-time info",
            "Appointment booking is phone-based — long holds, uncertain availability",
          ],
          goals: [
            "Discover verified doctors quickly with confidence",
            "Read transparent profiles before committing to a visit",
            "Book, reschedule, and track appointments entirely in-app",
          ],
        },
      },
      {
        type: "label",
        text: "UI Design",
      },
      {
        type: "text",
        heading: "Screens",
        body: "The product flows through four core interactions: discovery (search and filter by specialty and location), browse (a doctor listing with key trust signals surfaced at a glance), profile (deep-dive on a specific doctor with credentials, reviews, and next available slots), and booking (a streamlined 3-step appointment confirmation). Every screen was built to reduce cognitive load — fewer decisions per screen, clearer hierarchy, and instant feedback on actions.",
      },
      {
        type: "image",
        src: "/projects/vitalink/screen-hero.png",
        caption: "Landing — Find Your Trusted Doctor with Vitalink",
      },
      {
        type: "image",
        src: "/projects/vitalink/screen-listing.png",
        caption: "Doctor search & listing with filters and map",
      },
      {
        type: "image",
        src: "/projects/vitalink/screen-profile.png",
        caption: "Dr. Rohini Kulkarni — profile, patient stories & scheduling",
      },
      {
        type: "image",
        src: "/projects/vitalink/screen-booking.png",
        caption: "Appointment checkout — in clinic, 22nd June 15:30",
      },
    ],
  },
  {
    slug: "acoform",
    title: "Acoform",
    year: "2025",
    category: "Brand Identity",
    href: "/project/acoform",
    image: "/projects/acoform/logo-amber.png",
    span: "half",
    description: "Brand identity for a next-generation aluminum formwork company — built on strength, structure, and precision engineering.",
    sections: [
      {
        type: "tagline",
        attributes: ["Engineering", "Construction", "Excellence"],
        headline: "Acoform delivers next-generation formwork for modern infrastructure. Built for efficiency, designed for the future.",
        body: "Acoform is a forward-thinking brand committed to revolutionizing the construction industry through precision, efficiency, and sustainable formwork solutions. With a focus on innovation and structural integrity, they enable builders and developers to create faster, safer, and more reliable infrastructure. Their cutting-edge aluminum formwork systems empower the construction ecosystem to break traditional limits, build smarter, and shape the skylines of tomorrow.",
        meta: "Logo & Brochure",
      },
      { type: "label", text: "Brand Identity" },
      {
        type: "concept-mark",
        heading: "Concept:",
        body: "The Acoform logo mark is a thoughtful fusion of the letters A and F, representing the brand name itself. The angular, structured design echoes the shape of aluminum formwork panels, subtly referencing the product's modularity and precision. By blending typography with architectural geometry, the mark captures the essence of Acoform — a company built on strength, structure, and smart construction solutions.",
        variant: "acoform",
      },
      {
        type: "screens",
        images: [
          { src: "/projects/acoform/logo-amber.png", caption: "Logo mark — Amber Blaze" },
          { src: "/projects/acoform/logo-mark.png", caption: "Logo mark — Steel" },
        ],
      },
      { type: "label", text: "Design System" },
      {
        type: "palette",
        colors: [
          { name: "Urban Grey", hex: "#898989", role: "Structure — concrete, strength" },
          { name: "Amber Blaze", hex: "#EF9921", role: "Primary — energy, action" },
          { name: "Frost Veil", hex: "#FCFCFC", role: "Background — clarity, space" },
        ],
      },
      { type: "label", text: "Brand Applications" },
      {
        type: "image",
        src: "/projects/acoform/mockup-helmet.png",
        caption: "Hard hat — branded PPE on site",
      },
      {
        type: "screens",
        images: [
          { src: "/projects/acoform/mockup-card.png", caption: "Business card — minimal, black" },
          { src: "/projects/acoform/mockup-billboard.png", caption: "Fence billboard — site presence" },
        ],
      },
    ],
  },
  {
    slug: "thrive",
    title: "Thrive",
    year: "2024",
    category: "Brand Identity",
    href: "/project/thrive",
    externalHref: "https://www.behance.net/gallery/222992479/Thrive",
    image: "/projects/thrive/mockup-sign.png",
    span: "half",
    description: "Brand identity for a growth-focused startup — rooted in sustainability, innovation, and a forward-thinking design language.",
    sections: [
      {
        type: "tagline",
        attributes: ["Growth", "Innovation", "Impact"],
        headline: "Thrive delivers smart solutions for sustainable growth. Powered by innovation, built for impact.",
        body: "Thrive is a forward-thinking brand built around the belief that sustainable growth and bold innovation go hand in hand. Designed to inspire confidence and clarity, the identity reflects a company that moves with purpose — empowering people, businesses, and communities to reach their full potential. Every element of the brand communicates momentum, resilience, and a commitment to making meaningful impact.",
        meta: "Logo & Brand Identity",
      },
      { type: "label", text: "Brand Identity" },
      {
        type: "concept-mark",
        heading: "Concept:",
        body: "The Thrive logo mark is a dynamic fusion of the letter T and a sprouting leaf, representing the brand's dual commitment to structured growth and natural sustainability. The bold geometric T provides a foundation of strength and reliability, while the leaf element introduces organic vitality and forward momentum. Together, they create a mark that is instantly recognizable — communicating that Thrive is where ambition meets purpose.",
        variant: "thrive",
      },
      {
        type: "screens",
        images: [
          { src: "/projects/thrive/logo-light.png", caption: "Logo mark — light" },
          { src: "/projects/thrive/logo-dark.png", caption: "Logo mark — dark" },
        ],
      },
      { type: "label", text: "Design System" },
      {
        type: "palette",
        colors: [
          { name: "Thrive Lime", hex: "#A7C955", role: "Primary — growth, vitality" },
          { name: "Leafy Jade", hex: "#317E3D", role: "Secondary — depth, balance" },
          { name: "Urban Charcoal", hex: "#212121", role: "Text — strength, grounding" },
        ],
      },
      { type: "label", text: "Brand Applications" },
      {
        type: "image",
        src: "/projects/thrive/mockup-sign.png",
        caption: "Outdoor signage — brand at scale",
      },
      {
        type: "screens",
        images: [
          { src: "/projects/thrive/mockup-citylight.png", caption: "Citylight poster — street presence" },
          { src: "/projects/thrive/mockup-billboard.png", caption: "Billboard — brand in the wild" },
        ],
      },
      {
        type: "screens",
        images: [
          { src: "/projects/thrive/mockup-tote.png", caption: "Tote bag — everyday touchpoint" },
          { src: "/projects/thrive/mockup-app.png", caption: "App icon — digital presence" },
        ],
      },
    ],
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
    sections: [
      {
        type: "tagline",
        attributes: ["Systems", "Navigation", "Clarity"],
        headline: "Railway Wayfinding transforms overwhelming station environments into intuitive, human-centred journeys.",
        body: "Indian Railways is one of the world's largest railway networks — a lifeblood for over a billion people. Yet for the average commuter, navigating a busy station feels chaotic and stressful. This project is a comprehensive wayfinding system redesign: replacing unclear, inconsistent signage with a rigorous information hierarchy, a clear typographic system, and bold visual language that works across languages, literacy levels, and peak-hour crowds.",
        meta: "Wayfinding System",
      },
      { type: "label", text: "The Problem" },
      {
        type: "text",
        heading: "Research Context",
        body: "Indian Railways carries 23 million passengers daily across 7,325 stations. Despite this scale, wayfinding signage varies wildly station to station — inconsistent typefaces, no colour coding, poor multilingual support, and signs placed too high or too far from decision points. The result: confusion, missed trains, and a deeply stressful commute for first-time and regular users alike.",
      },
      {
        type: "stat-grid",
        stats: [
          { value: "23M+", label: "Daily Passengers", sub: "World's largest railway by ridership" },
          { value: "7,325", label: "Stations", sub: "Across the network" },
          { value: "68,103", label: "Route KM", sub: "Total track length" },
          { value: "13,452", label: "Trains Daily", sub: "Passenger + freight" },
        ],
      },
      {
        type: "bar-chart",
        title: "Commuter Pain Points — Survey of 240 Respondents",
        bars: [
          { label: "Platform ID", value: 78, color: "#ff2a3c" },
          { label: "Exit Finding", value: 65, color: "#ff2a3c" },
          { label: "Multilingual", value: 61, color: "#ff5a3c" },
          { label: "Train Timings", value: 57, color: "#ff7a3c" },
          { label: "Emergency Exit", value: 44, color: "#8d8a80" },
          { label: "Overcrowding", value: 38, color: "#8d8a80" },
        ],
        caption: "Primary research — field interviews + online survey across Mumbai, Delhi, Chennai",
      },
      { type: "label", text: "User Research" },
      {
        type: "personas",
        persona: {
          name: "Priya Sharma",
          role: "24 · Software Intern · First-Time Commuter · Mumbai",
          painPoints: [
            "Cannot tell which platform goes to which destination — signs are too small and too high",
            "Multilingual boards switch languages every 3 seconds, causing missed information",
            "No clear directional cues at exits — ended up on the wrong side of the station twice",
          ],
          goals: [
            "Quickly identify the correct platform without asking anyone",
            "Understand signage in her preferred language (Hindi/English) at a glance",
            "Know exactly where to walk — no dead-ends or doubling back",
          ],
        },
      },
      {
        type: "personas",
        persona: {
          name: "Ramesh Pillai",
          role: "54 · Daily Commuter · 22 Years Experience · Churchgate–Virar Line",
          painPoints: [
            "Peak hour crowds make it impossible to read overhead signs from a distance",
            "Emergency evacuation routes are unmarked — relies on memory after an incident last year",
            "New digital boards show too much information at once; prefers simple colour-coded cues",
          ],
          goals: [
            "Navigate peak-hour platforms in under 90 seconds",
            "Rely on colour and shape cues rather than reading full sign text",
            "Find the emergency exit closest to his usual boarding point quickly",
          ],
        },
      },
      {
        type: "user-journey",
        title: "Commuter Journey — Station Entry to Platform",
        steps: [
          {
            phase: "Arrival",
            action: "Enters through main station gate — looks for orientation map or station overview",
            pain: "No master map visible at entry. Commuter scans around, wastes 30–60 seconds",
          },
          {
            phase: "Orientation",
            action: "Searches for platform number for intended destination",
            pain: "Platform boards only visible at one end of concourse; blocked by crowds at peak",
          },
          {
            phase: "Wayfinding",
            action: "Follows directional signs to correct platform staircase",
            pain: "Signs end mid-journey — no confirmation signs near staircase entry",
          },
          {
            phase: "Platform",
            action: "Identifies correct boarding zone (AC / General / Ladies coach positions)",
            pain: "Coach position indicators are inconsistent; some platforms have none",
          },
          {
            phase: "Departure",
            action: "Boards train and confirms destination from display inside coach",
          },
        ],
      },
      { type: "label", text: "Design Solution" },
      {
        type: "text",
        heading: "Design System Principles",
        body: "The wayfinding system is built on four principles: Clarity (one piece of information per sign), Consistency (same colour, typeface, and icon set across all 7,325 stations), Proximity (signs placed at every decision point, not just at ends of corridors), and Legibility (minimum 72pt type for primary information, high-contrast colour pairings tested for colour-blindness). The typeface is Noto Sans — chosen for full Devanagari, Tamil, Bengali, and Latin coverage in a single font family.",
      },
      {
        type: "typography",
        name: "Noto Sans",
        weights: ["400 — Regular", "600 — SemiBold", "700 — Bold"],
        description: "Noto Sans was selected for its exceptional multilingual coverage — supporting all 22 scheduled languages of India in a single, consistent type family. At 72pt+ with high contrast, it remains legible at 15 metres — the critical distance for overhead platform signs.",
      },
      {
        type: "sign-system",
        signs: [
          { type: "Platform Signs", color: "#C62828", textColor: "#ffffff", label: "Platform 4", sub: "Borivali · Fast" },
          { type: "Exit / Entry", color: "#1A237E", textColor: "#ffffff", label: "← Main Exit", sub: "Road Bridge · Taxis" },
          { type: "Amenities", color: "#00695C", textColor: "#ffffff", label: "Ticket Counter", sub: "General · Season" },
          { type: "Caution", color: "#E65100", textColor: "#ffffff", label: "Mind The Gap", sub: "Platform Edge" },
          { type: "Emergency", color: "#F9A825", textColor: "#000000", label: "Emergency Exit", sub: "↑ Foot Over Bridge" },
          { type: "Informational", color: "#212121", textColor: "#f2efe6", label: "Next Train 11:42", sub: "Virar · Slow · 3 min" },
        ],
      },
      { type: "label", text: "Information Hierarchy" },
      {
        type: "info-hierarchy",
        title: "5-Level Sign Hierarchy",
        levels: [
          { name: "Station Identity", color: "#C62828", examples: ["Station Name", "Station Code", "Zone"] },
          { name: "Platform Routing", color: "#1565C0", examples: ["Platform Numbers", "Direction", "Line Color"] },
          { name: "Amenity Routing", color: "#2E7D32", examples: ["Ticketing", "Toilets", "Exit Gates"] },
          { name: "Safety & Caution", color: "#E65100", examples: ["Gap Warning", "Platform Edge", "Restricted Zone"] },
          { name: "Operational Info", color: "#37474F", examples: ["Train Timings", "Coach Positions", "Live Updates"] },
        ],
      },
      { type: "label", text: "Network Map" },
      {
        type: "text",
        heading: "Mumbai Western Line",
        body: "The Western Line is Mumbai's busiest suburban corridor — 24 stations, 60 km, carrying 3.5 million passengers daily. It was used as the primary pilot corridor for the wayfinding redesign, with all sign placements, colour applications, and typographic treatments tested in-situ at Churchgate, Dadar, Bandra, and Borivali.",
      },
      {
        type: "route-line",
        title: "Mumbai Western Line — Churchgate to Dahanu Road",
        color: "#C62828",
        stations: [
          { name: "Churchgate", major: true },
          { name: "Marine Lines", major: false },
          { name: "Charni Road", major: false },
          { name: "Grant Road", major: false },
          { name: "Mumbai Central", major: true, interchange: true },
          { name: "Mahalaxmi", major: false },
          { name: "Lower Parel", major: false },
          { name: "Prabhadevi", major: false },
          { name: "Dadar", major: true, interchange: true },
          { name: "Matunga Road", major: false },
          { name: "Mahim Jn.", major: false, interchange: true },
          { name: "Bandra", major: true, interchange: true },
          { name: "Khar Road", major: false },
          { name: "Santacruz", major: false },
          { name: "Vile Parle", major: false },
          { name: "Andheri", major: true, interchange: true },
          { name: "Jogeshwari", major: false },
          { name: "Goregaon", major: false },
          { name: "Malad", major: false },
          { name: "Kandivali", major: false },
          { name: "Borivali", major: true },
        ],
      },
      { type: "label", text: "Design Outcomes" },
      {
        type: "text",
        heading: "Impact & Learnings",
        body: "A prototype-tested pilot at Dadar station showed a 62% reduction in wayfinding errors (measured by time-to-platform and incorrect-turn rate) over the existing system. Signage comprehension improved significantly for first-time users and non-native Hindi speakers when the multilingual static display replaced rotating digital text. The system was also designed to be retrofittable — signs use standard metal extrusion profiles found across all existing Indian Railways infrastructure, minimising installation cost.",
      },
      {
        type: "palette",
        colors: [
          { name: "Signal Red", hex: "#C62828", role: "Platform — primary routing, most critical" },
          { name: "Navy Blue", hex: "#1A237E", role: "Exits & Entry — direction of travel" },
          { name: "Teal", hex: "#00695C", role: "Amenities — facilities, comfort, services" },
          { name: "Charcoal", hex: "#212121", role: "Informational — live train data, timetables" },
        ],
      },
    ],
  },
];
