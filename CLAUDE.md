# CLAUDE.md

## Project: Vehicle Engineering Student Portfolio

A single-page portfolio website for a Vehicle Engineering sophomore, showcasing competition works (RoboMaster, Asia-Pacific Cup Mathematical Modeling, National Innovation Project) and personal projects. Apple-inspired clean minimal design.

---

## Documentation Map

| File | Description |
|------|-------------|
| [docs/requirements.md](docs/requirements.md) | 需求文档 — functional + non-functional requirements |
| [docs/tech-stack.md](docs/tech-stack.md) | 技术栈文档 — dependencies, versions, architecture decisions |
| [docs/design-spec.md](docs/design-spec.md) | 设计规范 — colors, typography, spacing, animation tokens |
| [docs/dev-plan.md](docs/dev-plan.md) | 开发计划 — 5 phases, milestones, risk register |
| [docs/component-tree.md](docs/component-tree.md) | 组件树 — hierarchy, props, data flow |

---

## Development Logs

Record progress after each phase in `dev-logs/phase-N.md`. Template in [docs/dev-plan.md](docs/dev-plan.md).

---

## Folder Conventions

```
src/
├── app/           # Next.js App Router (routes, layouts, API)
├── components/
│   ├── layout/    # Navbar, Footer, Container
│   ├── sections/  # Hero, About, Skills, ProjectMap, ProjectShowcase, Contact
│   ├── ui/        # Reusable primitives: Button, Card, Badge, ScrollReveal, etc.
│   ├── project/   # Project-specific: ProjectCard, ProjectMapNode, ProjectFilter
│   └── contact/   # ContactForm, ContactInfo
├── data/          # Typed content data (projects, skills, about, navigation)
├── hooks/         # Custom React hooks (useScrollSpy, useReducedMotion, useContactForm)
├── lib/           # Utilities (cn, animations, constants, validation)
└── types/         # TypeScript interfaces and types
```

---

## Key Coding Rules

### 1. Server Components by Default

All components are Server Components unless they need state, effects, event handlers, or browser APIs. Add `"use client"` directive only when necessary.

### 2. Class Merging

Always use `cn()` from `@/lib/utils` for conditional/merged class names. Never use template literals for Tailwind classes.

```tsx
import { cn } from "@/lib/utils";
// ✓ Good
<button className={cn("base-class", variant === "primary" && "primary-class", className)} />
// ✗ Bad
<button className={`base-class ${variant === "primary" ? "primary-class" : ""}`} />
```

### 3. Animation Presets

Import shared Framer Motion presets from `@/lib/animations`. Wrap animated sections in `<ScrollReveal>` from `@/components/ui/ScrollReveal`.

### 4. Import Alias

Use `@/` for all internal imports from `src/`. Example: `import { cn } from "@/lib/utils"`.

### 5. Types

Import shared types from `@/types`. Define new shared types in `src/types/index.ts`.

### 6. Icons

Import icons from `lucide-react` with PascalCase names:
```tsx
import { User, Code2, Send } from "lucide-react";
```

### 7. Data Flow

`page.tsx` (Server Component) imports data from `@/data/` and passes as props to section components. Interactive children receive data via props — never import data directly in Client Components.

---

## Commands

```bash
npm run dev      # Start dev server → http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Tech Stack Summary

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 (CSS-based `@theme` config)
- **Animation:** Framer Motion 11
- **Icons:** Lucide React
- **Validation:** Zod
- **Deployment:** Vercel
