import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://alimahmoud-dev.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ali Mahmoud — Software Engineer & Front-End Developer",
    template: "%s | Ali Mahmoud",
  },
  description:
    "Ali Mahmoud — Software Engineer & Front-End Developer specializing in React, Next.js, and TypeScript. 15+ projects delivered, 800+ hours trained, 100% client satisfaction. Building production-grade web applications with performance, accessibility & AI integration.",
  keywords: [
    "Software Engineer",
    "Front-End Developer",
    "Ali Mahmoud",
    "Ali Mahmoud Software Engineer",
    "Ali Mahmoud Front-End Developer",
    "Ali Mahmoud Developer",
    "Ali Mahmoud Portfolio",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Full Stack Developer",
    "Web Developer Egypt",
    "Freelance Software Engineer",
    "Freelance Front-End Developer",
    "Khamsat Developer",
    "React",
    "Next.js 16",
    "TypeScript",
    "Tailwind CSS",
    "Frontend Development",
    "Web Development",
    "UI/UX Development",
    "Suez",
    "Egypt",
  ],
  authors: [{ name: "Ali Mahmoud", url: SITE_URL }],
  creator: "Ali Mahmoud",
  publisher: "Ali Mahmoud",
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Ali Mahmoud — Software Engineer & Front-End Developer",
    description:
      "Software Engineer & Front-End Developer specializing in React, Next.js & TypeScript. 15+ projects delivered with 100% client satisfaction. Performance-obsessed, AI-ready, bilingual.",
    url: SITE_URL,
    siteName: "Ali Mahmoud Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ali Mahmoud — Software Engineer & Front-End Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Mahmoud — Software Engineer & Front-End Developer",
    description:
      "Software Engineer & Front-End Developer specializing in React, Next.js & TypeScript. 15+ projects, 100% satisfaction.",
    images: [
      {
        url: "/og-image.png",
        alt: "Ali Mahmoud — Software Engineer & Front-End Developer",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preload" href="/profile.jpg" as="image" type="image/jpeg" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[#0a0a0b] text-white selection:bg-primary/20 selection:text-primary`}
      >
        {children}
      </body>
    </html>
  );
}
