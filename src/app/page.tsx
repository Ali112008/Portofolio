import { Navbar, ScrollProgress, BackToTop } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { StatsBar } from "@/components/portfolio/StatsBar";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Services } from "@/components/portfolio/Services";
import { Projects } from "@/components/portfolio/Projects";
import { Process } from "@/components/portfolio/Process";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { Experience } from "@/components/portfolio/Experience";
import { Faq } from "@/components/portfolio/Faq";
import { Certifications } from "@/components/portfolio/Certifications";
import { CtaSection } from "@/components/portfolio/CtaSection";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { FAQS, SOCIALS } from "@/data/portfolio";

export default function Home() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://alimahmoud-dev.vercel.app";

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ali Mahmoud",
    url: siteUrl,
    image: `${siteUrl}/og-image.png`,
    jobTitle: "Software Engineer & Front-End Developer",
    description:
      "Software Engineer & Front-End Developer specializing in React, Next.js & TypeScript. 15+ projects delivered with 100% client satisfaction.",
    email: SOCIALS.email,
    sameAs: [SOCIALS.github, SOCIALS.linkedin, SOCIALS.khamsat],
    knowsAbout: [
      "React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js",
      "Prisma ORM", "PostgreSQL", "Frontend Development", "Web Development",
      "Software Engineering", "UI/UX Development", "Framer Motion",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Freelance — Khamsat",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <ScrollProgress />
      <Navbar />

      {/* Skip link for keyboard & screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-white focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>

      <main id="main-content" className="flex-1">
        <Hero />
        <StatsBar />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Process />
        <Testimonials />
        <Experience />
        <Faq />
        <Certifications />
        <CtaSection />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
