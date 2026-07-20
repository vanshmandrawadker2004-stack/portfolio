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
  | { type: "user-journey"; title: string; steps: { phase: string; action: string; pain?: string }[] }
  | { type: "evidence-cards"; intro: string; cards: { headline: string; body: string; date: string }[] }
  | { type: "comparison"; leftName: string; rightName: string; rows: { label: string; left: string; right: string }[] }
  | { type: "demographic-bars"; groups: { title: string; bars: { label: string; value: number; max: number }[] }[] }
  | { type: "area-chart"; charts: { title: string; bottomLabels: string[]; xLabels: string[]; peakX: number; peakLabel: string; valleyX?: number }[] }
  | { type: "journey-map-full"; phases: { num: string; name: string; tasks: string[]; emotionY: number; opportunities: string[] }[] }
  | { type: "platform-colorcode"; description: string; platforms: { num: number; color: string }[] }
  | { type: "places-visited"; description: string; places: { name: string; x: number; y: number }[] }
  | { type: "ticket-redesign" }
  | { type: "symptom-wheel"; heading: string; body: string; symptoms: string[] }
  | { type: "concentric-impact"; rings: { label: string; value: string; color: string }[] }
  | { type: "solution-timeline" }
  | { type: "symptom-solution"; heading: string; body?: string; symptoms: string[]; solution: string }
  | { type: "ideation-grid" }
  | { type: "hand-positions" };

export type Project = {
  slug: string;
  title: string;
  year: string;
  category: "Brand Identity" | "UI/UX" | "Industrial Design" | "Web / Brand";
  meta?: string;
  href: string;
  externalHref?: string;
  externalLabel?: string;
  image: string;
  featured?: boolean;
  span?: "full" | "half";
  contain?: boolean;
  hideHeroImage?: boolean;
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
    slug: "presto",
    title: "Presto",
    year: "2025",
    category: "Industrial Design",
    href: "/project/presto",
    image: "/projects/hero.png",
    span: "half",
    description: "A wearable device helping presenters overcome glossophobia — combining cold distraction for physical symptoms and a hand-mounted prompter screen for confidence under pressure.",
    sections: [
      {
        type: "tagline",
        attributes: ["Confidence", "Clarity", "Performance"],
        headline: "Seamless cues for confidence, clarity, and peak performance.",
        body: "This project seeks to empower presenters to overcome anxiety and deliver impactful presentations by enhancing flow, communication, and composure, with a focus on mitigating glossophobia.",
        meta: "Group Project · 4 Weeks",
      },
      { type: "label", text: "The Problem" },
      {
        type: "symptom-wheel",
        heading: "What is Glossophobia?",
        body: "The fear of public speaking is called Glossophobia. It's a common anxiety disorder that can cause physical symptoms like sweating, trembling, and rapid heart rate. People with glossophobia often experience intense anxiety and discomfort when they have to speak in front of an audience.",
        symptoms: ["Hyperventilation", "Dizziness", "Anxiety Attack", "Rapid Heartbeat", "Trembling", "Sweating"],
      },
      { type: "label", text: "Primary Research" },
      {
        type: "text",
        heading: "Research Study",
        body: "A primary research study was conducted on a sample size of 30 participants to investigate the primary reasons behind public speaking anxiety. The findings revealed six primary factors contributing to this fear: fear of judgment, lack of experience, negative past experiences, lack of preparation, fear of the unknown, and perfectionism.",
      },
      {
        type: "bar-chart",
        title: "Factors Contributing to Public Speaking Anxiety",
        bars: [
          { label: "Perfectionism", value: 73, color: "#C62828" },
          { label: "Fear of Judgement", value: 70, color: "#C62828" },
          { label: "Lack of Experience", value: 50, color: "#C62828" },
          { label: "Lack of Preparation", value: 43, color: "#C62828" },
          { label: "Fear of Unknown", value: 23, color: "#C62828" },
          { label: "Past Experiences", value: 23, color: "#C62828" },
        ],
      },
      { type: "label", text: "Our Solution" },
      { type: "solution-timeline" },
      { type: "label", text: "Design" },
      {
        type: "symptom-solution",
        heading: "Physical Symptoms — Cold Distraction",
        body: "To mitigate the physical symptoms of stage fright, we chose distraction for its effectiveness and ease of use. Specifically, we selected cold as the method based on research and interviews. Cold sensations act as sudden stimuli, shifting focus from anxiety to physical sensation in the palm.",
        symptoms: ["Sweating", "Rapid Heartbeat", "Hyperventilation"],
        solution: "DISTRACTION",
      },
      {
        type: "symptom-solution",
        heading: "Psychological Symptoms — Hand Prompter",
        body: "To address the psychological symptoms associated with stage fright, we selected a prompter as the solution due to its proven effectiveness and ease of implementation. Our approach involves using a screen that fits on the user's hand, inspired by the common practice of using cue cards for speeches and presentations.",
        symptoms: ["Underprepared", "Forgetting Material"],
        solution: "PROMPTER",
      },
      { type: "label", text: "Design Challenges" },
      { type: "image", src: "/projects/1.png" },
      { type: "image", src: "/projects/2.png" },
      { type: "image", src: "/projects/3.png" },
      { type: "label", text: "Final Design" },
      { type: "image", src: "/projects/Hand position.png", caption: "Hand Position" },
      { type: "image", src: "/projects/presto with hand final PNG.24.png", caption: "Presto — Final Render" },
      { type: "image", src: "/projects/presto with hand final.16.png", caption: "Presto — Final Render" },
      { type: "image", src: "/projects/presto with hand final.8 1.png", caption: "Presto — Final Render" },
    ],
  },
  {
    slug: "batter-and-fire",
    title: "Batter & Fire",
    year: "2025",
    category: "Web / Brand",
    href: "/project/batter-and-fire",
    externalHref: "https://www.batterandfire.shop",
    externalLabel: "Visit Live Site",
    image: "/projects/batter-fire.png",
    span: "half",
    description: "A lightweight order website for a home kitchen South Indian breakfast business — built, hosted, and wired to WhatsApp and Excel so the owner can run it alone.",
    sections: [
      {
        type: "tagline",
        attributes: ["Web", "Automation", "Food"],
        headline: "A one-person home kitchen. A zero-friction ordering system.",
        body: "Batter & Fire is a K Town home kitchen serving authentic South Indian breakfast — dosas, idlis, and vadas made fresh every morning from batter ground the night before. The owner needed a simple, professional web presence that let customers browse the menu and place orders without friction, while keeping operations completely manageable solo.",
        meta: "Web Design & Development",
      },
      { type: "label", text: "Built From Scratch" },
      {
        type: "text",
        heading: "Design & Development",
        body: "The site was designed and coded entirely from scratch — no templates, no page builders. Built with clean HTML, CSS, and JavaScript, it loads fast, works on every device, and stays dead simple for customers to use. The interface walks a customer through today's menu, lets them build their order, and captures their delivery details — all in one smooth flow. I handled the domain, hosting, and deployment end-to-end.",
      },
      { type: "label", text: "Integrations" },
      {
        type: "text",
        heading: "WhatsApp Orders",
        body: "Once a customer finalises their order, a single tap sends the complete order summary — items, quantities, slot, name, and flat number — directly to the owner's WhatsApp as a formatted message. No third-party app, no monthly fee, no separate dashboard to manage. Orders arrive exactly where the owner already lives.",
      },
      {
        type: "text",
        heading: "Excel Logging",
        body: "Every order is also automatically logged to a Google Sheet (accessible as Excel) so the owner has a running record of orders, customer names, and totals without writing anything down. At the end of each day, the sheet gives a clear picture of what was ordered and what to prepare — the kitchen's entire operation managed in a tool the owner already knows.",
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
    slug: "railway-way-finding",
    title: "Railway Way Finding",
    year: "2025",
    category: "UI/UX",
    href: "/project/railway-way-finding",
    externalHref: "https://www.behance.net/gallery/239501841/Railway-Way-Finding",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/0d7157239501841.Y3JvcCw4MDcsNjMxLDE0NSwxNjM.png",
    span: "full",
    hideHeroImage: true,
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
        body: "Indian Railways carries 23 million passengers daily across 7,325 stations. Despite this scale, wayfinding signage varies wildly station to station — inconsistent typefaces, no colour coding, poor multilingual support, and signs placed too high or too far from decision points. The result: confusion, missed trains, and a deeply stressful commute.",
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
      { type: "label", text: "Evidence Mapping" },
      {
        type: "evidence-cards",
        intro: "Evidence Mapping is a visual way to organize research and highlight key patterns. In our project, we're using it to show how poor wayfinding in railway stations impacts people — from confusion and missed trains to accessibility failures. It helps us clearly present the evidence behind why better signage and navigation design truly matter.",
        cards: [
          {
            headline: "Confusion And Overcrowding At New Delhi Railway Station Triggers Stampede",
            body: "Stampede at New Delhi station due to rapid announcements of three trains on unclear platforms. Overcrowding and poor communication about departure platforms led to the tragedy — passengers rushed simultaneously toward multiple platforms, creating chaos and panic.",
            date: "February 17, 2025",
          },
          {
            headline: "Family Misses Train At Ghaziabad Station Due To Platform Mix-Up, Railways Ordered To Pay Up",
            body: "Family missed train at Ghaziabad due to wrong platform info and lack of announcements. Consumer Forum ruled Railways failed to provide accurate, visible information and ordered Rs 1,000 compensation.",
            date: "July 04, 2025",
          },
          {
            headline: "The First/Last Mile Challenge At Indian Railway Stations",
            body: "India's railway network serves 22 million daily passengers, but poor first/last mile connectivity persists — badly designed drop-off zones, encroached walking spaces, unclear signage, and unsafe crossings compound station navigation failures.",
            date: "23 March 2017",
          },
          {
            headline: "Central Railway Coach Overhaul Sparks Chaos: Passengers Face Berth Mismatch And Confusion",
            body: "Central Railway's coach layout overhaul caused widespread confusion with mismatched berth assignments. Passengers struggled to locate correct seats due to unclear information about new coach positions, resulting in significant chaos at stations.",
            date: "September 1, 2024",
          },
          {
            headline: "Delay In Two Trains Heading To Danapur Causes Commotion At Pune Railway Station",
            body: "Delayed arrival of two Danapur-bound trains during Diwali rush sparked panic due to inadequate communication. Passengers boarded wrong trains, forcing railway staff and RPF to intervene for nearly an hour.",
            date: "October 04, 2025",
          },
          {
            headline: "Destination Boards Leave Train Passengers Confused At Hubballi Station",
            body: "Passengers at Hubballi faced confusion and missed connections due to multi-destination boards displaying several train numbers on the same coach. Lack of clear announcements led travelers to board wrong trains.",
            date: "Oct 21, 2017",
          },
          {
            headline: "Stationed At Disadvantage: Tamil Nadu Railway Stations Fail Accessibility Standards Despite Upgrades",
            body: "Accessibility audit of nine redeveloped Tamil Nadu stations revealed critical gaps: locked accessible toilets, missing Braille signs, inadequate ramps, and poor wheelchair availability. Deficiencies persist despite legal mandates.",
            date: "01 Jun 2025",
          },
          {
            headline: "Pune: Non-Functional Information Display Board Leaves Passengers Confused",
            body: "Technical issues rendered Platform 6's information display board at Pune Railway Station inoperative for several days, leaving passengers unable to check arrivals and departures during peak hours.",
            date: "February 23, 2024",
          },
          {
            headline: "Act Against Officials For Wrong Train Data In Passenger Information Systems: Railway Board",
            body: "Railway Board directed zones to act against officials responsible for incorrect passenger information system data. Board ordered urgent replacement of outdated systems causing traveler confusion across the network.",
            date: "Oct 06, 2024",
          },
        ],
      },
      { type: "label", text: "Analysis" },
      {
        type: "text",
        heading: "Station Comparison",
        body: "Comparing CSMT (the gold standard) with Kalupur reveals critical gaps in wayfinding implementation across Indian railway stations. CSMT's success in navigation design serves as a benchmark to identify what's missing at Kalupur — highlighting specific failures in signage, accessibility, and passenger information systems that need urgent improvement.",
      },
      {
        type: "comparison",
        leftName: "Kalupur Station",
        rightName: "Chhatrapati Shivaji Maharaj Terminus",
        rows: [
          { label: "Traffic", left: "Large city junction, high regional traffic, but less than CSMT", right: "One of the busiest in India, >450,000 commuters/day" },
          { label: "Architecture", left: "Regional historic style, currently under refurbishment", right: "Iconic UNESCO site, Gothic architecture, heritage value" },
          { label: "Signage", left: "Inconsistent, ad clutter, weaker digital displays", right: "Model signage (large, bilingual, digital, clear maps)" },
          { label: "Accessibility", left: "Limited lifts/escalators, multimodal links improving", right: "Advanced (lifts, escalators, multiple clear connections)" },
          { label: "Platforms", left: "Main regional/express platforms, less complex layout", right: "Strict suburban vs express division (1—7, 8—18)" },
        ],
      },
      { type: "label", text: "Places Visited" },
      {
        type: "places-visited",
        description: "We visited Kalupur Station, Sabarmati Station, and Asarva Station in Ahmedabad for our research purposes. These key railway stations provided insights into station layout, passenger flow, wayfinding challenges, and infrastructural facilities essential for our study on the Indian railway system.",
        places: [
          { name: "Kalupur Railway Station", x: 62, y: 68 },
          { name: "Sabarmati Railway Station", x: 36, y: 50 },
          { name: "Asarva Railway Station", x: 64, y: 36 },
        ],
      },
      { type: "label", text: "Contextual Inquiry" },
      {
        type: "text",
        heading: "7. Contextual Inquiry",
        body: "Contextual Inquiry observes passengers navigating stations in real-time to understand actual wayfinding challenges. By studying how people interpret signage and move through spaces, we uncover genuine problems that surveys alone would miss — revealing true pain points and design opportunities.",
      },
      {
        type: "demographic-bars",
        groups: [
          {
            title: "7.1  User Demographics",
            bars: [
              { label: "Total Users", value: 20, max: 20 },
              { label: "Passengers", value: 10, max: 20 },
              { label: "Staff", value: 8, max: 20 },
              { label: "Coolies", value: 2, max: 20 },
            ],
          },
          {
            title: "7.1  Male to Female",
            bars: [
              { label: "Total Users", value: 20, max: 20 },
              { label: "Male", value: 12, max: 20 },
              { label: "Female", value: 8, max: 20 },
            ],
          },
        ],
      },
      { type: "label", text: "Time of Occurrence" },
      {
        type: "text",
        heading: "Peak Chaos Patterns",
        body: "Peak chaos occurs during morning time and holiday periods, especially Diwali, when Kalupur's footfall surges from 5,000 to 20–25,000 passengers. Migrant workers traveling to UP and Bihar overwhelm the station, causing mass confusion as inadequate wayfinding systems fail under crowd pressure when clear navigation is most critical.",
      },
      {
        type: "area-chart",
        charts: [
          {
            title: "Footfall by Time of Day",
            xLabels: ["Morning", "Afternoon", "Evening"],
            bottomLabels: ["Peak Passengers", "Low Passengers", "Moderate Passengers"],
            peakX: 0.12,
            peakLabel: "18,000",
          },
          {
            title: "Footfall by Month",
            xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            bottomLabels: ["Moderate Passengers", "Low Passengers", "Peak Passengers"],
            peakX: 0.78,
            peakLabel: "2,00,000",
          },
        ],
      },
      { type: "label", text: "User Research" },
      {
        type: "personas",
        persona: {
          name: "Priya Sharma",
          role: "24 · Software Intern · First-Time Commuter · Ahmedabad",
          painPoints: [
            "Cannot tell which platform goes to which destination — signs are too small and too high",
            "Multilingual boards switch languages every 3 seconds, causing missed information",
            "No clear directional cues at exits — ended up on the wrong side of the station twice",
          ],
          goals: [
            "Quickly identify the correct platform without asking anyone",
            "Understand signage in her preferred language (Hindi/Gujarati) at a glance",
            "Know exactly where to walk — no dead-ends or doubling back",
          ],
        },
      },
      {
        type: "personas",
        persona: {
          name: "Ramesh Pillai",
          role: "54 · Daily Commuter · 22 Years on the Kalupur–Sabarmati Line",
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
      { type: "label", text: "User Journey Map" },
      {
        type: "journey-map-full",
        phases: [
          {
            num: "01", name: "Planning",
            tasks: ["Search train timings online", "Book ticket (online/offline)", "Check platform information"],
            emotionY: 0.32,
            opportunities: ["Add station map to ticket", "Include platform location details", "Provide digital wayfinding link"],
          },
          {
            num: "02", name: "Arrival",
            tasks: ["Enter station premises", "Look for entry gate", "Navigate through security"],
            emotionY: 0.50,
            opportunities: ["Clear directional signage at entries", "Platform-wise entry guidance", "Visible station layout boards"],
          },
          {
            num: "03", name: "Navigation",
            tasks: ["Search for platform number", "Check information displays", "Ask station staff for help"],
            emotionY: 0.82,
            opportunities: ["Real-time digital displays", "Clear audio announcements", "Platform-specific color coding", "Mobile app integration"],
          },
          {
            num: "04", name: "Platform",
            tasks: ["Navigate stairs/lifts/ramps", "Cross to correct platform", "Locate waiting area"],
            emotionY: 0.70,
            opportunities: ["Multi-level wayfinding signage", "Crowd management systems", "Dedicated accessible routes", "Real-time crowd alerts"],
          },
          {
            num: "05", name: "Train Boarding",
            tasks: ["Find correct coach position", "Verify train number", "Locate berth/seat"],
            emotionY: 0.22,
            opportunities: ["Coach-specific platform markings", "Digital coach position indicators", "Mobile alerts for changes", "Clear train identification boards"],
          },
        ],
      },
      { type: "label", text: "Design Solution" },
      {
        type: "text",
        heading: "Platform Color Code",
        body: "Our solution involves redesigning railway tickets — both online and offline — to display clear, essential information including precise station location details and platform colour codes. This ensures passengers have reliable wayfinding guidance directly on their tickets, reducing confusion and improving navigation from the moment they plan their journey.",
      },
      {
        type: "platform-colorcode",
        description: "Each platform is assigned a distinct colour — visible on tickets, overhead signs, and digital displays — so passengers know exactly where to go before they even enter the station.",
        platforms: [
          { num: 1, color: "#E91E63" },
          { num: 2, color: "#9C27B0" },
          { num: 3, color: "#673AB7" },
          { num: 4, color: "#3F51B5" },
          { num: 5, color: "#2196F3" },
          { num: 6, color: "#03A9F4" },
          { num: 7, color: "#009688" },
          { num: 8, color: "#4CAF50" },
          { num: 9, color: "#8BC34A" },
          { num: 10, color: "#FFC107" },
          { num: 11, color: "#FF9800" },
          { num: 12, color: "#F44336" },
        ],
      },
      { type: "ticket-redesign" },
    ],
  },
];
