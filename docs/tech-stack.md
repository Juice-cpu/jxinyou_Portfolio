# Technology Stack / 技术栈文档

---

## Core Framework

### Next.js 15 (App Router)

| Aspect | Detail |
|--------|--------|
| **Version** | ^15.2 |
| **Routing** | App Router (file-based, `src/app/`) |
| **Rendering** | Server Components by default; Client Components where needed |
| **Styling** | Tailwind CSS v4 via PostCSS plugin |
| **Language** | TypeScript 5.7+ |

**Why Next.js:** Server Components for SEO-friendly static content, built-in image optimization via `next/image`, API routes for contact form, file-based routing simplicity.

---

## Styling

### Tailwind CSS v4

| Aspect | Detail |
|--------|--------|
| **Version** | ^4.1 |
| **Configuration** | CSS-based (`@theme` directive in `globals.css`) |
| **PostCSS** | `@tailwindcss/postcss` plugin |

**Design tokens** (colors, fonts, border-radius, animations) are defined as CSS custom properties in `src/app/globals.css` using Tailwind's `@theme` directive.

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | ^15.2 | React framework |
| `react` | ^19.0 | UI library |
| `react-dom` | ^19.0 | DOM rendering |
| `framer-motion` | ^11.18 | Declarative animations, scroll-triggered reveals |
| `lucide-react` | ^0.468 | Tree-shakeable SVG icons (24px grid) |
| `clsx` | ^2.1 | Conditional class name construction |
| `tailwind-merge` | ^2.6 | Tailwind class conflict resolution |
| `zod` | ^3.24 | Schema validation for contact form |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | ^5.7 | Type checking |
| `tailwindcss` | ^4.1 | Utility-first CSS framework |
| `@tailwindcss/postcss` | ^4.1 | Tailwind PostCSS plugin |
| `eslint` | ^9.16 | Linting |
| `eslint-config-next` | ^15.2 | Next.js ESLint rules |
| `@types/node` | ^22.10 | Node.js type definitions |
| `@types/react` | ^19.0 | React type definitions |
| `@types/react-dom` | ^19.0 | React DOM type definitions |

---

## Architecture Decisions

### 1. Server Components by Default

All components are Server Components unless they need:
- State (`useState`, `useReducer`)
- Effects (`useEffect`)
- Event handlers (`onClick`, `onChange`)
- Browser APIs (`IntersectionObserver`, `window`)

Client Components carry `"use client"` directive at the top.

### 2. Data Layer

Content lives in `src/data/` as typed TypeScript modules — no CMS, no database. This keeps the site fast, simple, and easy to update. If a CMS is needed later, the TypeScript interfaces remain the same.

### 3. Class Merging

All components use the `cn()` utility (`clsx` + `tailwind-merge`) for conditional and merged class names. Never use template literals for Tailwind classes.

### 4. Animation Architecture

Shared Framer Motion presets live in `src/lib/animations.ts`. Every animated section uses the `ScrollReveal` wrapper component. This ensures consistency and makes global animation changes trivial.

---

## Deployment

| Aspect | Detail |
|--------|--------|
| **Platform** | Vercel |
| **Build Command** | `npm run build` |
| **Output** | Static + serverless API routes |
| **Custom Domain** | Optional (TBD) |

---

## Development Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

*Last updated: 2026-06-13*
