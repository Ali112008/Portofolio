"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowDown,
  Code2,
  Palette,
  Zap,
  Terminal,
  Briefcase,
  ChevronRight,
  Star,
  Layers,
  Rocket,
  Shield,
  Clock,
  Target,
  MessageSquare,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Quote,
  Globe,
} from "lucide-react";

/* ───────── Data ───────── */

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const SKILLS = {
  "Frontend": ["React.js", "Next.js 16", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Shadcn/ui", "Framer Motion", "GSAP"],
  "Backend & DB": ["Node.js", "Prisma ORM", "PostgreSQL", "REST APIs", "JWT Auth", "Next.js API Routes", "Context API", "Redux"],
  "AI & Tools": ["Google Gemini AI", "Git/GitHub", "Vercel", "Figma (UI/UX)", "Axios", "Bun", "pnpm", "VS Code"],
};

const PROJECTS = [
  {
    title: "ROUQY",
    subtitle: "Luxury Interior Design Studio",
    description: "A premium luxury interior design studio website showcasing elegant projects with immersive 3D-like animations, smooth transitions, and a refined visual experience that drives client engagement.",
    results: "40% increase in client inquiries after launch",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
    live: "https://rouqy.vercel.app",
    github: "https://github.com/AliMahmoudDev/rouqy",
    year: "2025",
    type: "Freelance — Design & Engineering",
    featured: true,
  },
  {
    title: "Shifa",
    subtitle: "Intelligent Medical Platform",
    description: "AI-powered medical platform for preliminary diagnosis and health guidance with multi-language support. Serving thousands of users across the MENA region.",
    results: "Multi-language AI platform serving MENA region",
    tech: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS", "AI/ML"],
    live: "https://shifa-five.vercel.app",
    github: "https://github.com/AliMahmoudDev/shifa",
    year: "2025",
    type: "Full-Stack Application",
    featured: true,
  },
  {
    title: "UniStation",
    subtitle: "Educational Platform",
    description: "A comprehensive educational platform built with Next.js and Webflow CMS integration, providing students with access to courses, resources, and interactive learning tools.",
    results: "Seamless CMS-powered learning experience",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Webflow CMS"],
    live: "https://unistation-website.vercel.app",
    github: "https://github.com/AliMahmoudDev/unistation-website",
    year: "2025",
    type: "Web Application",
    featured: true,
  },
  {
    title: "CineTrack",
    subtitle: "Movie Discovery App",
    description: "A sleek movie discovery and tracking application powered by the TMDB API. Features personalized watchlists, trending movies, and cinematic UI.",
    results: "Intuitive discovery with zero-load transitions",
    tech: ["Next.js", "TypeScript", "TMDB API", "Tailwind CSS"],
    live: "https://watch-to-end.vercel.app",
    github: "https://github.com/AliMahmoudDev/watch-to-end",
    year: "2025",
    type: "API-Driven Application",
    featured: false,
  },
  {
    title: "Mind Mate",
    subtitle: "AI Mental Wellness Companion",
    description: "An AI-powered mental wellness companion application providing personalized mindfulness exercises, mood tracking, and conversational support.",
    results: "AI-driven wellness with personalized insights",
    tech: ["Next.js", "TypeScript", "AI", "Tailwind CSS"],
    live: "https://mind-mate-kappa-eight.vercel.app",
    github: "https://github.com/AliMahmoudDev/mind-mate",
    year: "2025",
    type: "AI-Powered Application",
    featured: false,
  },
  {
    title: "Algora",
    subtitle: "Open Source Bounty Platform",
    description: "A platform connecting open-source contributors with bounty-funded issues, streamlining the process of finding, claiming, and completing open-source work.",
    results: "Streamlined open-source contribution flow",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    live: "https://algora-io.vercel.app",
    github: "https://github.com/AliMahmoudDev/algora",
    year: "2025",
    type: "Platform",
    featured: false,
  },
];

const EXPERIENCE = [
  {
    role: "Frontend Developer",
    company: "Freelance — Khamsat",
    period: "Mar 2023 — Present",
    description: "Building production-grade web applications for clients across the MENA region and beyond. Verified seller with 100% completion rate, 17-minute avg response time, and a track record of repeat clients.",
    highlights: ["15+ verified client reviews (all 5-star)", "100% order completion rate", "17-minute average response time", "Repeat clients across multiple projects"],
  },
  {
    role: "Frontend Developer",
    company: "WA TheQ Clinic",
    period: "2025",
    description: "Designed and developed a professional landing page for a hair transplant clinic with smooth animations, responsive design, and optimized conversion flows.",
    highlights: ["Conversion-optimized landing page", "Performance-first architecture", "Responsive across all devices"],
  },
];

const STATS = [
  { value: "2+", label: "Years Experience", icon: Briefcase },
  { value: "15+", label: "Happy Clients", icon: Layers },
  { value: "100%", label: "Completion Rate", icon: Zap },
  { value: "17m", label: "Avg Response Time", icon: Clock },
];

const PROCESS_STEPS = [
  {
    icon: MessageSquare,
    title: "Discovery",
    description: "We start with a detailed conversation about your vision, goals, and requirements. I dig deep to understand your business and your users.",
  },
  {
    icon: Palette,
    title: "Design & Plan",
    description: "I create a comprehensive plan and design direction tailored to your brand. Every decision is intentional and conversion-focused.",
  },
  {
    icon: Code2,
    title: "Develop",
    description: "Clean, scalable code built with modern technologies. Every pixel matters. Every interaction is crafted. Performance is baked in, not bolted on.",
  },
  {
    icon: Rocket,
    title: "Launch & Support",
    description: "Rigorous testing, deployment to production, and post-launch support. Your project doesn't end at launch — it begins.",
  },
];

const TESTIMONIALS = [
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
    name: "Hertzfe Z.",
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

const WHY_ME = [
  { icon: Zap, title: "Performance Obsessed", desc: "Every site scores 95+ on PageSpeed with Next.js 16 + Tailwind CSS. Because slow sites lose clients." },
  { icon: Target, title: "AI Integration", desc: "Exceptional skill in integrating AI (Google Gemini) inside web apps for smart, modern experiences." },
  { icon: Clock, title: "Deadline Driven", desc: "100% completion rate. 17-min avg response time. When I say Friday, I mean Friday." },
  { icon: Shield, title: "RTL & Accessibility", desc: "Specialized in Arabic/English bilingual UIs with Dark/Light mode and full accessibility compliance." },
];

/* ───────── Animation Variants ───────── */

const CUSTOM_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: CUSTOM_EASE },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ───────── Components ───────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-mono text-lg font-bold tracking-tight">
          <span className="text-primary">&lt;</span>
          Ali
          <span className="text-primary">/&gt;</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-sm px-5 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary-light transition-all duration-200 shadow-lg shadow-primary/20"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-muted hover:text-white p-2"
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0b]/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-muted hover:text-white py-2 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="text-sm px-5 py-2.5 rounded-lg bg-primary text-white font-medium text-center mt-2"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center grid-pattern overflow-hidden">
      {/* Ambient gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(34,211,238,0.06)_0%,transparent_70%)]" />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="mb-5">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-sm text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for new projects
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-5"
            >
              I Build Sites That{" "}
              <span className="gradient-text">Win Clients</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-base sm:text-lg text-muted max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Frontend developer with 2+ years of experience crafting{" "}
              <span className="text-white font-medium">pixel-perfect</span>,{" "}
              <span className="text-white font-medium">blazing-fast</span> websites
              that turn visitors into customers. Every project ships with
              <span className="text-white font-medium"> PageSpeed 100</span> — not as a feature, as a standard.
            </motion.p>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#contact"
                className="group px-7 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-light transition-all duration-200 flex items-center gap-2 shadow-xl shadow-primary/25"
              >
                <Sparkles className="w-4 h-4" />
                Let&apos;s Build Yours
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#projects"
                className="px-7 py-3.5 rounded-xl border border-border text-white font-medium text-sm hover:bg-surface-light hover:border-muted-foreground transition-all duration-200"
              >
                See My Work
              </a>
            </motion.div>
          </div>

          {/* Profile image + floating stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="relative flex-shrink-0"
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72">
              {/* Glow behind image */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 blur-2xl scale-110" />
              {/* Border ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
              <div className="absolute inset-1 rounded-full border border-border" />
              {/* Image */}
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/profile.jpg"
                  alt="Ali Mahmoud - Frontend Developer"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-3 -right-3 px-4 py-2 rounded-xl bg-surface border border-border shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-semibold">100<span className="text-muted-foreground font-normal">/100</span></span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="w-5 h-5 text-muted-foreground" />
      </motion.div>
    </section>
  );
}

function SectionHeading({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="mb-12">
      <span className="text-xs font-mono text-primary tracking-widest uppercase mb-2 block">{label}</span>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="text-muted mt-3 max-w-2xl">{subtitle}</p>}
    </motion.div>
  );
}

function SocialProofBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-12 border-y border-border/50 bg-surface/30">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <motion.div key={stat.label} variants={fadeUp} custom={i} className="text-center group">
              <stat.icon className="w-5 h-5 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-3xl sm:text-4xl font-bold tracking-tight">{stat.value}</div>
              <div className="text-xs text-muted mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="About Me" title="Why Work With Me" />

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-12 items-start"
        >
          <motion.div variants={fadeUp} className="space-y-5 text-muted leading-relaxed">
            <p>
              I&apos;m a <span className="text-white font-medium">Frontend Developer</span> based in{" "}
              <span className="text-white font-medium">Suez, Egypt</span> — and I don&apos;t just build websites.
              I build <span className="text-white font-medium">revenue-generating digital experiences</span> that
              make your business impossible to ignore.
            </p>
            <p>
              Every project I deliver comes with production-grade performance, pixel-perfect design implementation,
              and SEO that actually works. I treat your deadline as a promise, not a suggestion — and I&apos;ve{" "}
              <span className="text-white font-medium">never missed one</span>.
            </p>
            <p>
              When I&apos;m not shipping code, I&apos;m exploring new web technologies, studying design trends,
              and pushing the boundaries of what&apos;s possible on the web.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY_ME.map((item, i) => (
              <div
                key={item.title}
                className="p-5 rounded-xl bg-surface border border-border hover:border-primary/30 transition-all duration-300 group"
              >
                <item.icon className="w-5 h-5 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-sm font-semibold mb-1">{item.title}</div>
                <div className="text-xs text-muted leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding bg-surface/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="Tech Stack" title="Tools of the Trade" subtitle="The modern stack I use to build fast, scalable, and beautiful web applications." />

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {Object.entries(SKILLS).map(([category, skills], catIdx) => (
            <motion.div
              key={category}
              variants={fadeUp}
              custom={catIdx}
              className="p-6 rounded-xl bg-surface border border-border"
            >
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                {category === "Frontend" && <Code2 className="w-4 h-4 text-primary" />}
                {category === "Backend & DB" && <Terminal className="w-4 h-4 text-primary" />}
                {category === "AI & Tools" && <Palette className="w-4 h-4 text-primary" />}
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 rounded-lg bg-surface-light border border-border text-muted hover:text-white hover:border-primary/30 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={index}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="group rounded-xl border border-border bg-surface overflow-hidden hover:border-primary/30 transition-all duration-300"
    >
      {/* Project preview */}
      <div className="relative h-48 bg-gradient-to-br from-primary/5 to-accent/5 border-b border-border flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.1)_0%,transparent_50%)]" />
        <span className="text-4xl font-bold tracking-tighter text-primary/20 group-hover:text-primary/30 transition-colors">
          {project.title}
        </span>
        {project.featured && (
          <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
            <Star className="w-3 h-3" /> Featured
          </span>
        )}
      </div>

      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-semibold text-base group-hover:text-primary transition-colors">{project.title}</h3>
          <p className="text-xs text-muted-foreground">{project.type} · {project.year}</p>
        </div>

        <p className="text-sm text-muted leading-relaxed line-clamp-2">{project.description}</p>

        {/* Results highlight */}
        {project.results && (
          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 rounded-lg px-3 py-2">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{project.results}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.slice(0, 5).map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-surface-light border border-border text-muted-foreground">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-2">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary-light transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" /> Source
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Selected Work"
          title="Projects That Deliver Results"
          subtitle="Every project built with one goal: make it impossible for your visitors to leave."
        />
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="section-padding bg-surface/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="How I Work"
          title="From Idea to Launch"
          subtitle="A proven process that eliminates guesswork and delivers results every time."
        />

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              variants={fadeUp}
              custom={i}
              className="relative p-6 rounded-xl border border-border bg-surface hover:border-primary/30 transition-all duration-300 group"
            >
              {/* Step number */}
              <span className="absolute top-4 right-4 text-3xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                0{i + 1}
              </span>
              <step.icon className="w-6 h-6 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Testimonials"
          title="What Clients Say"
          subtitle="Don't take my word for it — here's what the people I've worked with have to say."
        />

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              custom={i}
              className="p-6 rounded-xl border border-border bg-surface hover:border-primary/30 transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <p className="text-sm text-muted leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
              <div className="flex gap-0.5 mt-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-surface/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="Experience" title="Where I've Worked" />

        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="space-y-6 max-w-3xl">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={exp.company}
              variants={fadeUp}
              custom={i}
              className="p-6 rounded-xl border border-border bg-surface hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                <h3 className="font-semibold">
                  {exp.role} <span className="text-primary">@ {exp.company}</span>
                </h3>
                <span className="text-xs text-muted-foreground font-mono">{exp.period}</span>
              </div>
              <p className="text-sm text-muted leading-relaxed mb-3">{exp.description}</p>
              <ul className="space-y-1.5">
                {exp.highlights.map((h) => (
                  <li key={h} className="text-xs text-muted flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 text-primary shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)]" />

      <motion.div
        ref={ref}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
          Ready to Build Something{" "}
          <span className="gradient-text">Remarkable</span>?
        </h2>
        <p className="text-muted text-base sm:text-lg mb-8 leading-relaxed">
          Let&apos;s turn your vision into a digital experience that wins clients, drives revenue,
          and makes your competition irrelevant.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="group px-8 py-4 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-light transition-all duration-200 flex items-center gap-2 shadow-xl shadow-primary/25"
          >
            <Sparkles className="w-4 h-4" />
            Start Your Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="mailto:ali.mahmoud.developer@gmail.com"
            className="px-8 py-4 rounded-xl border border-border text-white font-medium text-sm hover:bg-surface-light hover:border-muted-foreground transition-all duration-200"
          >
            Email Me Directly
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding bg-surface/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Contact"
          title="Let's Make It Happen"
          subtitle="Got a project in mind? Let's talk about how I can help you build something that delivers real results."
        />

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4"
        >
          {[
            { icon: Mail, label: "Email", value: "ali.mahmoud.developer@gmail.com", href: "mailto:ali.mahmoud.developer@gmail.com" },
            { icon: Linkedin, label: "LinkedIn", value: "alimahmoud-dev", href: "https://linkedin.com/in/alimahmoud-dev" },
            { icon: Github, label: "GitHub", value: "Ali112008", href: "https://github.com/Ali112008" },
            { icon: Globe, label: "Khamsat", value: "ali_mahmmoud", href: "https://khamsat.com/user/ali_mahmmoud" },
          ].map((item, i) => (
            <motion.a
              key={item.label}
              variants={fadeUp}
              custom={i}
              href={item.href}
              target={item.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3.5 rounded-xl border border-border bg-surface hover:border-primary/30 hover:bg-surface-light transition-all duration-300 group w-full sm:w-auto"
            >
              <item.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
                <div className="text-sm font-medium">{item.value}</div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          Designed & Built by <span className="text-muted">Ali Mahmoud</span> · {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/Ali112008" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://linkedin.com/in/alimahmoud-dev" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="https://khamsat.com/user/ali_mahmmoud" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
            <Globe className="w-4 h-4" />
          </a>
          <a href="mailto:ali.mahmoud.developer@gmail.com" className="text-muted-foreground hover:text-white transition-colors">
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ───────── Main Page ───────── */

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SocialProofBar />
        <About />
        <Skills />
        <Projects />
        <Process />
        <Testimonials />
        <Experience />
        <CTASection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
