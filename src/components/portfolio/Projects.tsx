"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Star, CheckCircle2, Github, FolderGit2 } from "lucide-react";
import { PROJECTS, type Project, type ProjectCategory } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const FILTERS: { label: string; value: ProjectCategory }[] = [
  { label: "All Projects", value: "All" },
  { label: "Business Sites", value: "Business" },
  { label: "Full-Stack", value: "Full-Stack" },
  { label: "AI-Powered", value: "AI" },
  { label: "Platforms", value: "Platform" },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group rounded-xl border border-border bg-surface overflow-hidden hover:border-primary/30 transition-all duration-300 flex flex-col h-full">
      {/* Project preview */}
      <div className="relative h-48 bg-surface border-b border-border overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.subtitle}`}
          fill
          loading="lazy"
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        {project.featured && (
          <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
            <Star className="w-3 h-3" /> Featured
          </span>
        )}
      </div>

      <div className="p-5 space-y-3 flex flex-col flex-1">
        <div>
          <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {project.type} · {project.year}
          </p>
        </div>

        <p className="text-sm text-muted leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Results highlight */}
        <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 rounded-lg px-3 py-2">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>{project.results}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.slice(0, 5).map((t) => (
            <span
              key={t}
              className="text-[10px] px-2 py-0.5 rounded-md bg-surface-light border border-border text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-2 mt-auto">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary-light transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Live Demo
          </a>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>("All");
  const filtered =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Selected Work"
          title="Projects That Deliver Results"
          subtitle="Every project built with one goal: make it impossible for your visitors to leave."
        />

        {/* Filter tabs */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-10"
          role="tablist"
          aria-label="Filter projects"
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              role="tab"
              aria-selected={filter === f.value}
              onClick={() => setFilter(f.value)}
              className={`text-xs px-4 py-2 rounded-full border transition-all duration-200 ${
                filter === f.value
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/25"
                  : "bg-surface border-border text-muted-foreground hover:text-white hover:border-muted-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div
          key={filter}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project, i) => (
            <Reveal key={project.title} delay={(i % 3) * 90}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {/* GitHub CTA */}
        <Reveal className="mt-12 text-center">
          <a
            href="https://github.com/Ali112008"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-border bg-surface text-sm font-medium hover:border-primary/40 hover:bg-surface-light transition-all duration-200 group"
          >
            <Github className="w-4 h-4 text-primary" />
            See more code on GitHub
            <FolderGit2 className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
