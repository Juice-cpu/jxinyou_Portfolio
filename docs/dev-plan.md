# Development Plan / 开发计划

---

## Strategy / 策略

**稳中求进 (Steady Progress):** Each phase is small, achievable within 2-3 days, and produces a visible, testable increment. No phase depends on unbuilt work from later phases.

---

## Phase Overview

### Phase 1: Foundation ✅ *(Current)*

| Step | Task | Status |
|------|------|--------|
| 1.1 | Initialize Next.js project | ✅ |
| 1.2 | Install dependencies | ✅ |
| 1.3 | Create folder structure | ✅ |
| 1.4 | Configure Tailwind theme | ✅ |
| 1.5 | Write documentation files | ✅ |
| 1.6 | Write CLAUDE.md | ✅ |
| 1.7 | Root layout + globals.css | ✅ |
| 1.8 | Container component | ✅ |
| 1.9 | Verify dev server | ✅ |

**Deliverable:** Project builds, dev server runs, docs exist.

---

### Phase 2: Navigation & Layout Shell (Next)

| Step | Task |
|------|------|
| 2.1 | Create `NavSection` types in `src/types/index.ts` |
| 2.2 | Create navigation data in `src/data/navigation.ts` |
| 2.3 | Build `useScrollSpy` hook |
| 2.4 | Build `Navbar` component (glass effect, smooth scroll, mobile menu) |
| 2.5 | Build `Footer` component |
| 2.6 | Update `page.tsx` — compose Navbar + section placeholders + Footer |
| 2.7 | Mobile responsiveness check |

**Deliverable:** Visible sticky navbar with scroll spy, smooth section navigation, responsive hamburger menu.

---

### Phase 3: Hero & About

| Step | Task |
|------|------|
| 3.1 | Create `AboutData` type + about data file |
| 3.2 | Create shared animation presets in `src/lib/animations.ts` |
| 3.3 | Build `ScrollReveal` wrapper component |
| 3.4 | Build `Button` UI component (variants: primary, secondary, ghost; sizes: sm, md, lg) |
| 3.5 | Build `SectionTitle` UI component |
| 3.6 | Build `Hero` section (name, tagline, resume CTA) |
| 3.7 | Build `About` section (two-column: avatar + bio + highlights) |
| 3.8 | Wire Hero + About into `page.tsx` |

**Deliverable:** Animated hero entrance, about section with personal info, resume download works.

---

### Phase 4: Skills & Projects

| Step | Task |
|------|------|
| 4.1 | Create `SkillCategory` type + skills data |
| 4.2 | Build `SkillBar` component + `Skills` section |
| 4.3 | Create `Project` type + projects data (all 5 projects) |
| 4.4 | Build `Badge` UI component |
| 4.5 | Build `Card` UI component |
| 4.6 | Build `ProjectCard` + `ProjectFilter` components |
| 4.7 | Build `ProjectShowcase` section |
| 4.8 | Build `ProjectMap` + `ProjectMapNode` components |
| 4.9 | Wire Skills + ProjectMap + ProjectShowcase into `page.tsx` |

**Deliverable:** Skills animate on scroll, project cards filter and expand, project map is interactive.

---

### Phase 5: Contact, Polish & Deploy

| Step | Task |
|------|------|
| 5.1 | Create `ContactFormData` type + contact data + Zod schema |
| 5.2 | Build `useContactForm` hook |
| 5.3 | Build `TextInput` UI component |
| 5.4 | Build `ContactForm` + `ContactInfo` + `Contact` section |
| 5.5 | Create `/api/contact` POST route handler |
| 5.6 | Create `not-found.tsx` custom 404 page |
| 5.7 | Animation audit (reduce motion, `once: true`) |
| 5.8 | Responsive audit (all breakpoints) |
| 5.9 | Performance audit (Lighthouse ≥ 90) |
| 5.10 | SEO: Open Graph, Twitter Cards, JSON-LD |
| 5.11 | Deploy to Vercel |

**Deliverable:** Fully functional portfolio, deployed and accessible.

---

## Milestones

- [x] **M1:** Project scaffolding and dev server running
- [ ] **M2:** Navigation and layout shell
- [ ] **M3:** Hero and About sections
- [ ] **M4:** Skills and Projects interactive
- [ ] **M5:** Contact form, polished, deployed

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Framer Motion hydration mismatches | Medium | Low | Keep `"use client"` only on animated leaf components |
| Tailwind v4 breaking changes | Low | Medium | Version pinning; v4 config is CSS-based |
| Image performance | Low | Medium | Use `next/image` with proper sizing |
| Mobile layout breakage | Medium | Medium | Test each phase at 375px / 768px / 1280px |
| Content not yet available | Medium | High | Use placeholder content; fill in real content later |

---

## Dev Log Convention / 开发日志规范

After each phase, create `dev-logs/phase-N.md` containing:

```markdown
# Phase N Log — [Phase Name]

**Date:** YYYY-MM-DD
**Duration:** X hours

## Accomplished
- What was done

## Problems Encountered
- Issue → Solution

## Screenshots
- (optional)

## Next Phase
- What's coming up
```

---

*Last updated: 2026-06-13*
