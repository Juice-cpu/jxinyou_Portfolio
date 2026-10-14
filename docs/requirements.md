# Portfolio Website — Requirements Document

# 作品集网站 — 需求文档

---

## Project Overview / 项目概述

| Field | Value |
|-------|-------|
| **Purpose** | Personal portfolio for a Vehicle Engineering sophomore |
| **Target Audience** | Competition judges, internship recruiters, academic peers, fellow engineers |
| **Design Style** | Apple-inspired minimalism: generous whitespace, clean typography, subtle motion |
| **Structure** | Single-page, scroll-based navigation (单页滚动) |
| **Color Scheme** | Light (浅色) |

---

## Functional Requirements / 功能需求

### FR-1: Quick Navigation / 快速导航

- Sticky top navigation bar, always visible
- Smooth scroll to section on nav link click
- Active section highlighting based on current scroll position (scroll spy)
- Mobile: hamburger menu with slide-out or dropdown
- Glass/blur effect on scroll (backdrop filter)

### FR-2: Hero Section / 首页开场

- Full-viewport introductory section
- Display: name, title/role, tagline
- Call-to-action button: "Download Resume / 下载简历"
- Resume PDF download triggered on button click
- Staggered entrance animation (name → title → tagline → button)

### FR-3: About Section / 关于我

- Personal photo/avatar
- Bio text (2-3 paragraphs)
- Highlight cards: education, major, competition count, interests
- Two-column layout on desktop, stacked on mobile

### FR-4: Skills Section / 技能展示

- Skills grouped into 4 categories:
  1. Vehicle Engineering / 车辆工程 (CAD, FEA, fabrication, control systems)
  2. Software & Programming / 软件开发 (C/C++, Python, MATLAB, web)
  3. Math & Modeling / 数学建模 (optimization, statistics, numerical methods, LaTeX)
  4. Project Management / 项目管理 (leadership, agile, technical writing, strategy)
- Animated skill bars (width fills on scroll into view)
- Category filter tabs

### FR-5: Project Map / 项目地图

- Visual overview showing all projects as interactive nodes
- Nodes positioned in a constellation/network layout
- Hover tooltip: project name + type
- Click: scroll to detailed project card in Project Showcase

### FR-6: Project Showcase / 竞赛作品展示

- Filter chips by project type (RoboMaster, Math Modeling, National Innovation, Personal)
- Responsive card grid (1 col mobile, 2 col tablet, 3 col desktop)
- Each card shows: image, title, type badge, tagline
- Expandable card: full description, role, duration, tech stack badges, achievements list, image gallery
- Tech stack displayed as badge/tag components
- Lightbox-style image gallery for project photos

### FR-7: Contact Section / 联系方式

- Two-column layout: form (left) + contact info (right)
- Contact form fields: name, email, subject, message
- Client-side validation with user-friendly error messages
- Server-side validation + submission handling (API route)
- Contact info: email, phone, location, social links

### FR-8: Footer / 页脚

- Social media icon links
- Copyright line
- Simple, minimal design

---

## Non-Functional Requirements / 非功能需求

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-1 | Performance | Lighthouse score ≥ 90 |
| NFR-2 | Responsive Design | Mobile (375px), Tablet (768px), Desktop (1280px+) |
| NFR-3 | Accessibility | WCAG AA color contrast, keyboard navigation, semantic HTML |
| NFR-4 | Reduced Motion | Respect `prefers-reduced-motion` OS setting |
| NFR-5 | SEO | Meta tags, Open Graph images, JSON-LD structured data |
| NFR-6 | Browser Support | Latest 2 versions of Chrome, Firefox, Safari, Edge |

---

## Content Inventory / 内容清单

### Projects (5 projects)

1. **RoboMaster Infantry Robot** — Mechanical Lead & Vision Developer
2. **Asia-Pacific Cup Mathematical Modeling** — Team Leader & Algorithm Designer
3. **National Innovation Project (国创)** — Project Lead
4. **Personal Project 1** — TBD
5. **Personal Project 2** — TBD

### Skills (16 skills across 4 categories)

See `src/data/skills.ts` for full skill definitions.

---

*Last updated: 2026-06-13*
