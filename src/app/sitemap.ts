import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://alimahmoud-dev.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const sections = [
    "",
    "#about",
    "#services",
    "#projects",
    "#process",
    "#testimonials",
    "#experience",
    "#faq",
    "#certifications",
    "#contact",
  ];

  return sections.map((section) => ({
    url: `${SITE_URL}/${section}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: section === "" ? 1 : 0.7,
  }));
}
