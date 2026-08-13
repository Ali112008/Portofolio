"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowDown,
  Code2,
  Palette,
  Zap,
  Globe,
  Terminal,
  Briefcase,
  GraduationCap,
  ChevronRight,
  Star,
  Coffee,
  Gamepad2,
  BookOpen,
  Heart,
  MapPin,
  Calendar,
  Layers,
} from "lucide-react";

/* ───────── Data ───────── */

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const SKILLS = {
  "Frontend": ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion", "GSAP"],
  "Backend": ["Node.js", "Prisma", "REST APIs", "Next.js API Routes"],
  "Tools & Others": ["Git", "GitHub", "Vercel", "Figma", "VS Code", "Bun", "pnpm"],
};

const PROJECTS = [
  {
    title: "ROUQY",
    subtitle: "Luxury Interior Design Studio",
    description:
      "A premium luxury interior design studio website showcasing elegant projects with immersive 3D-like animations, smooth transitions, and a refined visual experience.",
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
    description:
      "منصة طبية ذكية للتشخيص المبدئي والإرشاد الصحي باللغة العربية. AI-powered medical platform for preliminary diagnosis and health guidance with multi-language support.",
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
    description:
      "A comprehensive educational platform built with Next.js and Webflow CMS integration, providing students with access to courses, resources, and interactive learning tools.",
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
    description:
      "A sleek movie discovery and tracking application powered by the TMDB API. Features personalized watchlists, trending movies, and detailed movie information with a cinematic UI.",
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
    description:
      "An AI-powered mental wellness companion application providing personalized mindfulness exercises, mood tracking, and conversational support for emotional well-being.",
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
    description:
      "A platform connecting open-source contributors with bounty-funded issues, streamlining the process of finding, claiming, and completing open-source work.",
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
    company: "Freelance",
    period: "2024 — Present",
    description:
      "Building production-grade web applications for clients using Next.js, TypeScript, and modern design systems. Focused on performance optimization, SEO, and delivering pixel-perfect responsive interfaces.",
    highlights: ["Delivered 8+ client projects", "100/100 PageSpeed scores", "SEO & Accessibility optimization"],
  },
  {
    role: "Frontend Developer",
    company: "WA TheQ Clinic",
    period: "2025",
    description:
      "Designed and developed a professional landing page for a hair transplant clinic with smooth animations, responsive design, and optimized conversion flows.",
    highlights: ["Landing page development", "Performance optimization", "Responsive design"],
  },
];

const STATS = [
  { value: "2+", label: "Years Experience", icon: Briefcase },
  { value: "8+", label: "Projects Delivered", icon: Layers },
  { value: "100", label: "PageSpeed Score", icon: Zap },
  { value: "∞", label: "Cups of Coffee", icon: Coffee },
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
            className="text-sm px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all duration-200"
          >
            Get in Touch
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
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0a0b]/95 backdrop-blur-xl border-b border-border">
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
          </div>
        </div>
      )}
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
      {/* Radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)]" />

      <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface text-sm text-muted">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for new projects
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          Hi, I&apos;m{" "}
          <span className="gradient-text">Ali Mahmoud</span>
          <br />
          <span className="text-muted font-normal text-2xl sm:text-3xl md:text-4xl">
            Software Engineer
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-base sm:text-lg text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Crafting seamless digital experiences with{" "}
          <span className="text-white font-medium">React</span>,{" "}
          <span className="text-white font-medium">Next.js</span>, and{" "}
          <span className="text-white font-medium">TypeScript</span>.
          Building production-grade web applications with a focus on performance and accessibility.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="group px-6 py-3 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-light transition-all duration-200 flex items-center gap-2"
          >
            View My Work
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-xl border border-border text-white font-medium text-sm hover:bg-surface-light hover:border-muted-foreground transition-all duration-200"
          >
            Contact Me
          </a>
        </motion.div>
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

function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="About Me" title="Crafting Digital Experiences" />

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-12 items-start"
        >
          <motion.div variants={fadeUp} className="space-y-5 text-muted leading-relaxed">
            <p>
              I&apos;m a passionate <span className="text-white font-medium">Frontend Developer</span> dedicated
              to building beautiful and functional web applications. Based in{" "}
              <span className="text-white font-medium">Suez, Egypt</span>, I specialize in creating
              modern, performant, and accessible user interfaces.
            </p>
            <p>
              My approach combines clean code architecture with pixel-perfect design implementation,
              ensuring every project delivers an exceptional user experience while maintaining
              top-tier performance metrics.
            </p>
            <p>
              When I&apos;m not coding, I love learning new tech, exploring new web trends,
              and sometimes playing online games!
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                { icon: MapPin, text: "Suez, Egypt" },
                { icon: Github, text: "AliMahmoudDev" },
                { icon: Linkedin, text: "alimahmoud-dev" },
              ].map((item) => (
                <span key={item.text} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-surface border border-border rounded-lg px-3 py-1.5">
                  <item.icon className="w-3.5 h-3.5" />
                  {item.text}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="p-5 rounded-xl bg-surface border border-border hover:border-primary/30 transition-all duration-300 group"
              >
                <stat.icon className="w-5 h-5 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
                <div className="text-xs text-muted mt-1">{stat.label}</div>
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
        <SectionHeading label="Skills" title="Technologies & Tools" subtitle="The modern tech stack I use to build production-grade applications." />

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
                {category === "Backend" && <Terminal className="w-4 h-4 text-primary" />}
                {category === "Tools & Others" && <Palette className="w-4 h-4 text-primary" />}
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
      className={`group rounded-xl border border-border bg-surface overflow-hidden hover:border-primary/30 transition-all duration-300 ${
        project.featured ? "md:col-span-2 lg:col-span-1" : ""
      }`}
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
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-base group-hover:text-primary transition-colors">{project.title}</h3>
            <p className="text-xs text-muted-foreground">{project.type}</p>
          </div>
          <span className="text-xs text-muted-foreground font-mono flex items-center gap-1 shrink-0">
            <Calendar className="w-3 h-3" /> {project.year}
          </span>
        </div>

        <p className="text-sm text-muted leading-relaxed line-clamp-3">{project.description}</p>

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
          label="Projects"
          title="Selected Work"
          subtitle="A curated selection of projects showcasing my expertise in building modern web applications."
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

function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding bg-surface/50">
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

function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="Contact" title="Let's Connect" subtitle="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision." />

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
            { icon: Github, label: "GitHub", value: "AliMahmoudDev", href: "https://github.com/AliMahmoudDev" },
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
          Designed & Built by <span className="text-muted">Ali Mahmoud</span>
        </p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/AliMahmoudDev" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://linkedin.com/in/alimahmoud-dev" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
            <Linkedin className="w-4 h-4" />
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
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
