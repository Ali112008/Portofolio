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

export const metadata: Metadata = {
  title: "Ali Mahmoud | Software Engineer Portfolio",
  description:
    "Ali Mahmoud is a Software Engineer specializing in React, Next.js, and TypeScript. Building production-grade web applications with a focus on performance, accessibility, and seamless user experiences.",
  keywords: [
    "Ali Mahmoud",
    "Software Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Frontend Developer",
    "Portfolio",
    "Web Development",
    "Suez",
    "Egypt",
  ],
  authors: [{ name: "Ali Mahmoud" }],
  creator: "Ali Mahmoud",
  openGraph: {
    title: "Ali Mahmoud | Software Engineer Portfolio",
    description:
      "Software Engineer specializing in React, Next.js, and TypeScript. Building production-grade web applications.",
    url: "https://alimahmoud-dev.vercel.app",
    siteName: "Ali Mahmoud Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Mahmoud | Software Engineer Portfolio",
    description:
      "Software Engineer specializing in React, Next.js, and TypeScript.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[#0a0a0b] text-white selection:bg-primary/20 selection:text-primary`}
      >
        {children}
      </body>
    </html>
  );
}
