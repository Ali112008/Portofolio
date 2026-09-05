/* ─────────────────────────────────────────────
   Portfolio content — edit everything here
   ───────────────────────────────────────────── */

export type ProjectCategory = "All" | "Business" | "Full-Stack" | "AI" | "Platform";

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certificates", href: "#certifications" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const SKILLS = {
  Frontend: [
    "React.js",
    "Next.js 16",
    "TypeScript",
    "JavaScript (ES6+)",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Shadcn/ui",
    "Framer Motion",
    "GSAP",
  ],
  "Backend & DB": [
    "Node.js",
    "Prisma ORM",
    "PostgreSQL",
    "REST APIs",
    "JWT Auth",
    "Next.js API Routes",
    "Context API",
    "Redux",
  ],
  "AI & Tools": [
    "Google Gemini AI",
    "Git/GitHub",
    "Vercel",
    "Figma (UI/UX)",
    "Axios",
    "Bun",
    "pnpm",
    "VS Code",
  ],
};

/* Scrolling marquee — core technologies */
export const TECH_MARQUEE = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS 4",
  "Framer Motion",
  "GSAP",
  "Node.js",
  "Prisma ORM",
  "PostgreSQL",
  "REST APIs",
  "AI Integration",
  "RTL / Arabic",
  "Vercel",
  "Figma",
  "Shadcn/ui",
  "Zod",
  "React Hook Form",
  "Lighthouse 100",
];

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  results: string;
  tech: string[];
  live: string;
  image: string;
  year: string;
  type: string;
  featured: boolean;
  category: ProjectCategory;
};

export const PROJECTS: Project[] = [
  {
    title: "ROUQY",
    subtitle: "Luxury Interior Design Studio",
    description:
      "A premium luxury interior design studio website showcasing elegant projects with immersive 3D-like animations, smooth transitions, and a refined visual experience that drives client engagement.",
    results: "40% increase in client inquiries after launch",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
    live: "https://rouqy.com",
    image: "/projects/rouqy.jpg",
    year: "2025",
    type: "Freelance — Design & Engineering",
    featured: true,
    category: "Business",
  },
  {
    title: "CleanDays",
    subtitle: "Professional Cleaning Services Platform",
    description:
      "A full-service cleaning company website for the Riyadh market — featuring service booking, price calculator, bilingual RTL/LTR support, and WhatsApp integration for instant customer communication.",
    results: "Live business platform serving Riyadh region",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "RTL/Arabic"],
    live: "https://cleandays.com.sa",
    image: "/projects/cleandays.jpg",
    year: "2025",
    type: "Freelance — Business & Engineering",
    featured: true,
    category: "Business",
  },
  {
    title: "Shifa",
    subtitle: "Intelligent Medical Platform",
    description:
      "AI-powered medical platform for preliminary diagnosis and health guidance with multi-language support. Serving thousands of users across the MENA region.",
    results: "Multi-language AI platform serving MENA region",
    tech: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS", "AI/ML"],
    live: "https://shifa-five.vercel.app",
    image: "/projects/shifa.jpg",
    year: "2025",
    type: "Full-Stack Application",
    featured: true,
    category: "AI",
  },
  {
    title: "UniStation",
    subtitle: "Educational Platform",
    description:
      "A comprehensive educational platform built with Next.js and Webflow CMS integration, providing students with access to courses, resources, and interactive learning tools.",
    results: "Seamless CMS-powered learning experience",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Webflow CMS"],
    live: "https://unistation.org",
    image: "/projects/unistation.jpg",
    year: "2025",
    type: "Web Application",
    featured: true,
    category: "Full-Stack",
  },
  {
    title: "Mind Mate",
    subtitle: "AI Mental Wellness Companion",
    description:
      "An AI-powered mental wellness companion application providing personalized mindfulness exercises, mood tracking, and conversational support.",
    results: "AI-driven wellness with personalized insights",
    tech: ["Next.js", "TypeScript", "AI", "Tailwind CSS"],
    live: "https://mind-mate-kappa-eight.vercel.app",
    image: "/projects/mind-mate.jpg",
    year: "2025",
    type: "AI-Powered Application",
    featured: false,
    category: "AI",
  },
  {
    title: "Algora",
    subtitle: "Open Source Bounty Platform",
    description:
      "A platform connecting open-source contributors with bounty-funded issues, streamlining the process of finding, claiming, and completing open-source work.",
    results: "Streamlined open-source contribution flow",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    live: "https://algora-io.vercel.app",
    image: "/projects/algora.jpg",
    year: "2025",
    type: "Platform",
    featured: false,
    category: "Platform",
  },
];

export const EXPERIENCE = [
  {
    role: "Front-End Developer",
    company: "Freelance — Khamsat",
    period: "Feb 2026 — Present",
    description:
      "Architecting and deploying responsive landing pages and web applications that consistently achieve 90+ PageSpeed scores. Managing complete project lifecycle from technical planning to final deployment.",
    highlights: [
      "5+ projects with 100% client satisfaction rate",
      "90+ Google PageSpeed scores consistently",
      "SEO & Accessibility as standard, not extra",
      "E-commerce storefront optimization & conversion",
    ],
  },
  {
    role: "Front-End React Developer Trainee",
    company: "Instant Software Solutions",
    period: "Jan 2026 — Jul 2026",
    description:
      "Intensive career-focused Front-End Diploma (130 hours). Mastered modern web technologies and real-world application architecture with a focus on scalable SPAs and e-commerce development.",
    highlights: [
      "Built full E-Commerce platform as capstone project",
      "Redux Toolkit & Context API state management",
      "Pixel-perfect UI from Adobe XD wireframes",
      "RESTful API integration & async data handling",
    ],
  },
];

/* value: string prefix/suffix is parsed by the CountUp component */
export const STATS = [
  { value: 800, suffix: "+", label: "Hours of Training", icon: "Briefcase" },
  { value: 15, suffix: "+", label: "Happy Clients", icon: "Layers" },
  { value: 100, suffix: "%", label: "Completion Rate", icon: "Zap" },
  { value: 8, suffix: "", label: "Certifications", icon: "Award" },
];

export const PROCESS_STEPS = [
  {
    icon: "MessageSquare",
    title: "Discovery",
    description:
      "We start with a detailed conversation about your vision, goals, and requirements. I dig deep to understand your business and your users.",
  },
  {
    icon: "Palette",
    title: "Design & Plan",
    description:
      "I create a comprehensive plan and design direction tailored to your brand. Every decision is intentional and conversion-focused.",
  },
  {
    icon: "Code2",
    title: "Develop",
    description:
      "Clean, scalable code built with modern technologies. Every pixel matters. Every interaction is crafted. Performance is baked in, not bolted on.",
  },
  {
    icon: "Rocket",
    title: "Launch & Support",
    description:
      "Rigorous testing, deployment to production, and post-launch support. Your project doesn't end at launch — it begins.",
  },
];

/* ── Services section (NEW) ── */
export type Service = {
  icon: string;
  title: string;
  description: string;
  features: string[];
  popular?: boolean;
};

export const SERVICES: Service[] = [
  {
    icon: "Zap",
    title: "Landing Pages",
    description:
      "High-converting, lightning-fast landing pages engineered to turn ad traffic into paying customers — complete with analytics-ready structure.",
    features: [
      "Pixel-perfect responsive design",
      "90+ PageSpeed score guaranteed",
      "SEO & Open Graph setup",
      "WhatsApp / contact forms",
      "Deployed in 3–5 days",
    ],
  },
  {
    icon: "Globe",
    title: "Business Websites",
    description:
      "Full business websites with multiple pages, bilingual Arabic/English RTL support, and a polished presence that makes your brand impossible to ignore.",
    popular: true,
    features: [
      "Up to 8 custom pages",
      "Arabic RTL + English LTR",
      "Dark / light-ready theming",
      "CMS-friendly architecture",
      "Performance & accessibility audit",
    ],
  },
  {
    icon: "ShoppingCart",
    title: "E-Commerce Storefronts",
    description:
      "Conversion-focused online stores with product catalogs, filtering, cart, and checkout flows tuned for sales — built to scale on Black Friday traffic.",
    features: [
      "Product catalog & dynamic filtering",
      "Cart & checkout flows",
      "Payment gateway integration",
      "Inventory-ready data models",
      "Mobile-first shopping UX",
    ],
  },
  {
    icon: "Layers",
    title: "Next.js Full-Stack Apps",
    description:
      "End-to-end web applications with databases, authentication, APIs, and admin dashboards — production architecture, not tutorial code.",
    features: [
      "Prisma + PostgreSQL data layer",
      "JWT / NextAuth authentication",
      "REST API routes & validation",
      "Admin dashboard & role management",
      "Deployed on Vercel",
    ],
  },
  {
    icon: "Sparkles",
    title: "AI Integration",
    description:
      "Add intelligent features to your product — chat assistants, content generation, smart search — powered by Google Gemini and modern LLM APIs.",
    features: [
      "AI chat & assistants",
      "Content generation workflows",
      "Streaming responses",
      "Prompt engineering & guardrails",
      "Multi-language support",
    ],
  },
  {
    icon: "Gauge",
    title: "Performance & SEO Audits",
    description:
      "Already have a website? I'll audit Core Web Vitals, accessibility, and SEO — then fix what's costing you rankings and conversions.",
    features: [
      "Lighthouse / Core Web Vitals audit",
      "Image & bundle optimization",
      "Technical SEO fixes",
      "Accessibility (WCAG) pass",
      "Before/after report",
    ],
  },
];

/* ── FAQ section (NEW) — also used for FAQ schema ── */
export const FAQS = [
  {
    question: "How long does a typical project take?",
    answer:
      "A landing page usually ships in 3–5 days. Business websites take 1–2 weeks depending on the number of pages and content, while full-stack or e-commerce projects range from 2–6 weeks. You'll get a clear timeline with milestones before we start — and I've never missed a deadline.",
  },
  {
    question: "How much does a website cost?",
    answer:
      "Every project is different, so I price each one after a short free discovery call where I understand exactly what you need. You'll always get a clear, fixed-scope quote with a timeline before we start — no hidden fees, no surprise invoices, and no obligation.",
  },
  {
    question: "Do you build bilingual Arabic/English websites?",
    answer:
      "Yes. Full RTL (right-to-left) Arabic support alongside English LTR is one of my specialties — including font pairing, mirrored layouts, and culturally appropriate design. CleanDays and Shifa are live examples.",
  },
  {
    question: "Will my website be fast and SEO-friendly?",
    answer:
      "Always. Every project ships with 90+ Google PageSpeed scores, semantic HTML, structured data (JSON-LD), optimized images, and proper meta tags. Performance and SEO aren't add-ons — they're the standard.",
  },
  {
    question: "What happens after the website launches?",
    answer:
      "You get post-launch support, a walkthrough of your site, and deployment to Vercel or your host. I also offer optional maintenance packages for updates, new features, and monitoring.",
  },
  {
    question: "Which technologies do you work with?",
    answer:
      "I specialize in React, Next.js 16, TypeScript, Tailwind CSS, Framer Motion, and GSAP on the frontend — with Node.js, Prisma ORM, PostgreSQL, and REST APIs on the backend. I also integrate AI features via Google Gemini.",
  },
  {
    question: "How do payments work?",
    answer:
      "Projects are split into milestones — typically 50% to begin and 50% on launch, with secure payment through the Khamsat platform which protects both sides. For larger projects we can agree on smaller milestone splits.",
  },
  {
    question: "Can you redesign an existing website?",
    answer:
      "Absolutely. I can modernize your current site's design, rebuild it on a modern stack for speed, or run a focused performance & SEO audit first so you know exactly what needs fixing.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Alaa M.",
    role: "Website Client — Khamsat",
    text: "I thank Mr. Ali for the effort put into developing the website. The project was completed professionally, with excellent communication throughout. Feedback was implemented quickly and flexibly, with clear attention to detail and execution quality. The final result matched expectations in design and performance. I highly recommend him for anyone seeking a committed and professional developer.",
    rating: 5,
  },
  {
    name: "Bin Mohammed A.",
    role: "Landing Page Client — Khamsat",
    text: "I worked with several developers before — none were at the required level. Ali understood exactly what I needed, was patient and flexible despite my constant changes, and delivered a result I can confidently run ad campaigns on. I recommend him for: speed, cooperation & flexibility, and dedication until the project is complete.",
    rating: 5,
  },
  {
    name: "Basel A.",
    role: "Landing Page Client — Khamsat",
    text: "Very grateful for the result I got from working with Ali. Professional and meticulous work, delivered on time, with great patience for revisions. This definitely won't be our last collaboration.",
    rating: 5,
  },
  {
    name: "Bawabat A.",
    role: "Automation Client — Khamsat",
    text: "I recommend working with him with full confidence, especially for anyone looking for someone knowledgeable in Google systems, automation, and data organization. This won't be our last collaboration.",
    rating: 5,
  },
  {
    name: "Quraish H.",
    role: "Landing Page Client — Khamsat",
    text: "Ali is absolutely outstanding — fast in his work, incredibly responsive, and executes revisions with full professionalism. The landing page turned out beautiful and well-organized. Highly recommended!",
    rating: 5,
  },
  {
    name: "Falih A.",
    role: "Website Client — Khamsat",
    text: "I didn't expect to find someone this exceptionally professional on Khamsat. I recommend everyone to work with him — the design is pure imagination.",
    rating: 5,
  },
  {
    name: "Kaiss N.",
    role: "Website Client — Khamsat",
    text: "Excellent work. I highly recommend.",
    rating: 5,
  },
  {
    name: "Abdulaziz S.",
    role: "Landing Page Client — Khamsat",
    text: "Excellent work and a service worth having. Very cooperative with revisions and I highly recommend working with him.",
    rating: 5,
  },
  {
    name: "Mishaal A.",
    role: "Landing Page Client — Khamsat",
    text: "Honestly, a hardworking person who understands his work and is truly professional. Anyone who wants professional work should go to him directly.",
    rating: 5,
  },
  {
    name: "Nihal",
    role: "Landing Page Client — Khamsat",
    text: "A diligent and distinguished programmer capable of improving his performance on his own according to client requirements. I recommend him for quick turnaround and flexible collaboration.",
    rating: 5,
  },
  {
    name: "Adel A.",
    role: "Repeat Client — Khamsat",
    text: "This is not the first deal, nor the last. Impressive speed in response and work completion with zero errors. Thank you and much appreciated.",
    rating: 5,
  },
  {
    name: "Ahmed G.",
    role: "Landing Page Client — Khamsat",
    text: "A very professional man who knows exactly what he's doing and how to benefit clients.",
    rating: 5,
  },
];

export const WHY_ME = [
  {
    icon: "Zap",
    title: "Performance Obsessed",
    desc: "95%+ Lighthouse scores for SEO, performance & accessibility. Every site I ship is fast by default.",
  },
  {
    icon: "Target",
    title: "15+ Projects Delivered",
    desc: "From landing pages to full E-commerce platforms with real-time state management and dynamic filtering.",
  },
  {
    icon: "Clock",
    title: "800+ Hours Trained",
    desc: "Harvard CS50, 84hr React bootcamp, 42hr Node.js bootcamp, 130hr Front-End Diploma — and counting.",
  },
  {
    icon: "Shield",
    title: "AI & Bilingual",
    desc: "Google Gemini AI integration + Arabic/English RTL UIs with Dark/Light mode and full accessibility.",
  },
];

export const CERTIFICATIONS = [
  {
    title: "CS50x — Introduction to Computer Science",
    issuer: "Harvard University",
    date: "2025",
    image: "/certs/cs50x.png",
    highlight: "10 problem sets + final project",
  },
  {
    title: "The Ultimate React Course 2025",
    issuer: "Udemy — Jonas Schmedtmann",
    date: "Jul 2025",
    image: "/certs/react-ultimate.jpg",
    highlight: "84 hours",
  },
  {
    title: "Node.js, Express, MongoDB Bootcamp",
    issuer: "Udemy — Jonas Schmedtmann",
    date: "Jul 2025",
    image: "/certs/nodejs-bootcamp.jpg",
    highlight: "42 hours",
  },
  {
    title: "Front-End Diploma",
    issuer: "Instant Software Solutions",
    date: "May 2026",
    image: "/certs/instant-frontend.jpg",
    highlight: "130 hours",
  },
  {
    title: "Responsive Web Design Certification",
    issuer: "freeCodeCamp",
    date: "May 2025",
    image: "/certs/freecodecamp-rwd.jpg",
    highlight: "~300 hours",
  },
  {
    title: "Introduction to Modern AI",
    issuer: "Cisco Networking Academy",
    date: "Feb 2026",
    image: "/certs/cisco-ai.jpg",
    highlight: "AI & Machine Learning",
  },
  {
    title: "CSS, Bootstrap, JS, PHP Full Stack",
    issuer: "Udemy — PROPER DOT INSTITUTE",
    date: "Jul 2025",
    image: "/certs/html-css-js-php.jpg",
    highlight: "Full Stack Crash Course",
  },
  {
    title: "JavaScript Practicals Crash Course",
    issuer: "Udemy — PROPER DOT INSTITUTE",
    date: "Jul 2025",
    image: "/certs/js-practicals.jpg",
    highlight: "Hands-on JS Training",
  },
];

export const SOCIALS = {
  email: "ali.mahmoud.developer@gmail.com",
  linkedin: "https://linkedin.com/in/alimahmoud-dev",
  github: "https://github.com/Ali112008",
  khamsat: "https://khamsat.com/user/ali_mahmmoud",
};
