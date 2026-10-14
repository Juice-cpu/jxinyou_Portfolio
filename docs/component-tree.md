# Component Tree / 组件树

---

## Hierarchy Diagram

```
RootLayout (src/app/layout.tsx) [Server]
└── HomePage (src/app/page.tsx) [Server]
    ├── Navbar (layout/) [Client] — sticky, scroll spy, smooth scroll
    ├── <main>
    │   ├── Hero (sections/) [Client] — animated entrance, resume CTA
    │   │   └── Button (ui/)
    │   │
    │   ├── About (sections/) [Client] — bio + highlights
    │   │   ├── ScrollReveal (ui/)
    │   │   └── SectionTitle (ui/)
    │   │
    │   ├── Skills (sections/) [Client] — category tabs, skill bars
    │   │   ├── ScrollReveal (ui/)
    │   │   ├── SectionTitle (ui/)
    │   │   └── SkillBar (ui/)
    │   │
    │   ├── ProjectMap (sections/) [Client] — interactive node network
    │   │   ├── ScrollReveal (ui/)
    │   │   ├── SectionTitle (ui/)
    │   │   └── ProjectMapNode (project/)
    │   │
    │   ├── ProjectShowcase (sections/) [Client] — filter + card grid
    │   │   ├── ScrollReveal (ui/)
    │   │   ├── SectionTitle (ui/)
    │   │   ├── ProjectFilter (project/)
    │   │   │   └── Badge (ui/)
    │   │   ├── ProjectCard (project/)
    │   │   │   ├── Card (ui/)
    │   │   │   ├── Badge (ui/)
    │   │   │   └── ProjectImageGallery (project/)
    │   │   └── Button (ui/)
    │   │
    │   └── Contact (sections/) [Client]
    │       ├── ScrollReveal (ui/)
    │       ├── SectionTitle (ui/)
    │       ├── ContactForm (contact/)
    │       │   └── TextInput (ui/)
    │       └── ContactInfo (contact/)
    │           └── IconButton (ui/)
    │
    └── Footer (layout/) [Server] — social links, copyright
```

---

## Component Inventory

### Layout Components

| Component | Path | Type | Responsibility |
|-----------|------|------|----------------|
| `RootLayout` | `src/app/layout.tsx` | Server | HTML shell, fonts, metadata |
| `Navbar` | `src/components/layout/Navbar.tsx` | Client | Sticky nav, scroll spy, mobile menu |
| `Footer` | `src/components/layout/Footer.tsx` | Server | Social links, copyright |
| `Container` | `src/components/layout/Container.tsx` | Server | Max-width responsive wrapper |

### Section Components

| Component | Path | Type | Responsibility |
|-----------|------|------|----------------|
| `Hero` | `src/components/sections/Hero.tsx` | Client | Intro, name, tagline, resume download |
| `About` | `src/components/sections/About.tsx` | Client | Bio, avatar, highlights grid |
| `Skills` | `src/components/sections/Skills.tsx` | Client | Category tabs, animated skill bars |
| `ProjectMap` | `src/components/sections/ProjectMap.tsx` | Client | Interactive node network visualization |
| `ProjectShowcase` | `src/components/sections/ProjectShowcase.tsx` | Client | Filterable project card grid |
| `Contact` | `src/components/sections/Contact.tsx` | Client | Contact form + info display |

### UI Primitives

| Component | Path | Props |
|-----------|------|-------|
| `Button` | `src/components/ui/Button.tsx` | `variant`, `size`, `href`, `download`, `disabled`, `className`, `children` |
| `Card` | `src/components/ui/Card.tsx` | `className`, `children`, `hover?` |
| `Badge` | `src/components/ui/Badge.tsx` | `variant`, `className`, `children` |
| `SectionTitle` | `src/components/ui/SectionTitle.tsx` | `title`, `titleZh`, `subtitle?`, `align?` |
| `ScrollReveal` | `src/components/ui/ScrollReveal.tsx` | `direction?`, `delay?`, `duration?`, `className?`, `children` |
| `SkillBar` | `src/components/ui/SkillBar.tsx` | `name`, `level`, `icon`, `animate?` |
| `TextInput` | `src/components/ui/TextInput.tsx` | `label`, `name`, `type?`, `placeholder?`, `error?`, `required?` |

### Project Components

| Component | Path | Props |
|-----------|------|-------|
| `ProjectCard` | `src/components/project/ProjectCard.tsx` | `project: Project`, `isExpanded`, `onToggle` |
| `ProjectMapNode` | `src/components/project/ProjectMapNode.tsx` | `project: Project`, `x`, `y`, `isActive`, `onClick` |
| `ProjectFilter` | `src/components/project/ProjectFilter.tsx` | `types`, `activeType`, `onChange` |
| `ProjectImageGallery` | `src/components/project/ProjectImageGallery.tsx` | `images`, `alt` |

### Contact Components

| Component | Path | Props |
|-----------|------|-------|
| `ContactForm` | `src/components/contact/ContactForm.tsx` | (none — uses `useContactForm` hook) |
| `ContactInfo` | `src/components/contact/ContactInfo.tsx` | `info: ContactInfo`, `className?` |

---

## Data Flow

```
src/data/                        src/app/page.tsx           Components
────────────                     ────────────────           ──────────
projects.ts    ──import──→       imports all data     ──props→  ProjectShowcase
skills.ts      ──import──→       passes as props      ──props→  Skills
about.ts       ──import──→       to section           ──props→  About
navigation.ts  ──import──→       components           ──props→  Navbar
social.ts      ──import──→                            ──props→  Footer
```

**Key rule:** `page.tsx` (Server Component) imports data and passes as props. Interactive child components (`"use client"`) receive data via props — they never import data directly. This keeps data loading on the server.

---

## Type Definitions

All shared TypeScript interfaces live in `src/types/index.ts`:

- `NavSection` — navigation item
- `AboutData`, `Highlight` — about section data
- `Skill`, `SkillCategory`, `SkillCategoryId` — skills data
- `Project`, `ProjectType` — project data
- `ContactInfo`, `SocialLink`, `ContactFormData` — contact data

---

*Last updated: 2026-06-13*
