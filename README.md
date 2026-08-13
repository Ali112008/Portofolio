# 🚀 Next.js Portfolio Starter

A production-ready, professionally architected portfolio starter template built with the latest modern web technologies. Designed to be cloned and customized in minutes — not hours.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-black)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-13-FF0055?logo=framer)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)

## ✨ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 (Strict) |
| **Styling** | Tailwind CSS 4 + shadcn/ui |
| **Animation** | Framer Motion + GSAP |
| **Database** | Prisma ORM (SQLite dev / PostgreSQL prod) |
| **State** | Zustand + TanStack Query |
| **Forms** | React Hook Form + Zod |
| **Auth** | NextAuth.js v4 |
| **i18n** | next-intl |
| **Theme** | next-themes (Light/Dark) |
| **Charts** | Recharts |
| **Icons** | Lucide React |

## 🚀 Quick Start

```bash
# Clone this template (click "Use this template" on GitHub)
git clone https://github.com/Ali112008/Portofolio.git my-portfolio
cd my-portfolio

# Install dependencies
bun install

# Set up environment
cp .env.example .env.local

# Run development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── prisma/              # Database schema & migrations
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── api/         # API routes
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Home page
│   ├── components/
│   │   └── ui/          # shadcn/ui components
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utilities & configurations
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

## 🎨 Customization

### Theme & Colors
Edit `tailwind.config.ts` and `src/app/globals.css` to customize colors, fonts, and design tokens.

### Content
Update the content in `src/app/page.tsx` and component files with your own information.

### Database
Modify `prisma/schema.prisma` for your data models, then run:
```bash
bun db:push
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Start development server |
| `bun build` | Build for production |
| `bun start` | Start production server |
| `bun lint` | Run ESLint |
| `bun db:push` | Push Prisma schema to database |
| `bun db:generate` | Generate Prisma client |
| `bun db:migrate` | Run database migrations |

## 🌐 Deployment

This template is optimized for **Vercel** deployment:

1. Push your code to GitHub
2. Connect your repo on [vercel.com](https://vercel.com)
3. Set environment variables in Vercel dashboard
4. Deploy — done!

## 📄 License

MIT License — feel free to use this template for your own portfolio.

---

Built with ❤️ by [Ali](https://github.com/Ali112008)
