# Design Specification / 设计规范

---

## Design Philosophy / 设计理念

**Apple-inspired minimalism:**

- Generous whitespace as a design element
- Subtle shadows and smooth curves (no sharp corners)
- Restrained color palette — one accent color
- Typography-first visual hierarchy
- Smooth, short animations that feel natural, not sluggish
- Everything has a purpose; nothing is decorative

---

## Color Tokens / 颜色规范

### Base

| Token | CSS Variable | Hex | Usage |
|-------|-------------|-----|-------|
| Background | `--color-background` | `#FFFFFF` | Page background |
| Foreground | `--color-foreground` | `#1D1D1F` | Primary text (Apple near-black) |
| Muted | `--color-muted` | `#F5F5F7` | Section alternation background |
| Muted Foreground | `--color-muted-foreground` | `#86868B` | Secondary text, captions |
| Border | `--color-border` | `#D2D2D7` | Subtle separators |

### Accent

| Token | CSS Variable | Hex | Usage |
|-------|-------------|-----|-------|
| Primary | `--color-primary` | `#0071E3` | Links, buttons, focus rings (Apple blue) |
| Primary Hover | `--color-primary-hover` | `#0077ED` | Button hover state |
| Primary Foreground | `--color-primary-foreground` | `#FFFFFF` | Text on primary background |

### Surfaces

| Token | CSS Variable | Hex | Usage |
|-------|-------------|-----|-------|
| Card | `--color-card` | `#FFFFFF` | Card backgrounds |
| Card Foreground | `--color-card-foreground` | `#1D1D1F` | Card text |

### Glass (Navbar)

- Background: `rgba(255, 255, 255, 0.72)`
- Backdrop filter: `blur(20px) saturate(180%)`
- Border bottom: `1px solid rgba(0, 0, 0, 0.08)`

---

## Typography / 字体规范

### Font Families

| Role | Font Stack | CSS Variable |
|------|-----------|-------------|
| Headings & Body | Inter, system-ui, -apple-system, sans-serif | `--font-inter` |
| Code & Tech Labels | JetBrains Mono, SF Mono, monospace | `--font-jetbrains-mono` |

### Type Scale

| Level | Class | Size | Line Height | Weight | Usage |
|-------|-------|------|-------------|--------|-------|
| Display | `text-5xl md:text-6xl` | 3rem / 3.75rem | 1.1 (tight) | 700 (bold) | Hero name |
| H1 | `text-3xl md:text-4xl` | 1.875rem / 2.25rem | 1.2 (tight) | 600 (semibold) | Section titles |
| H2 | `text-2xl` | 1.5rem | 1.3 (snug) | 600 (semibold) | Card titles |
| H3 | `text-xl` | 1.25rem | 1.3 (snug) | 500 (medium) | Sub-headings |
| Body | `text-base` | 1rem | 1.625 (relaxed) | 400 (regular) | Paragraphs |
| Small | `text-sm` | 0.875rem | 1.5 (relaxed) | 400 (regular) | Secondary text, meta |
| Caption | `text-xs` | 0.75rem | 1.5 (normal) | 500 (medium) | Labels, badges |

---

## Spacing / 间距规范

| Context | Value | Tailwind Classes |
|---------|-------|-----------------|
| Section vertical padding | 6rem / 8rem | `py-24 md:py-32` |
| Container horizontal padding | 1rem / 1.5rem / 2rem | `px-4 sm:px-6 lg:px-8` |
| Max content width | 72rem (1152px) | `max-w-6xl` |
| Card internal padding | 1.5rem / 2rem | `p-6 md:p-8` |
| Grid gap (cards) | 1.5rem / 2rem | `gap-6 md:gap-8` |
| Element stack gap | 1rem → 2rem | `space-y-4` to `space-y-8` |
| Section title to content gap | 3rem | `mt-12` after title |

---

## Border Radius / 圆角规范

| Element | Radius | Class |
|---------|--------|-------|
| Cards | 16px | `rounded-2xl` |
| Buttons | Full | `rounded-full` |
| Badges | Full | `rounded-full` |
| Input fields | 12px | `rounded-xl` |
| Images | 12px | `rounded-xl` |

---

## Shadows / 阴影规范

| Context | Value | Class |
|---------|-------|-------|
| Card default | `0 1px 2px rgba(0,0,0,0.05)` | `shadow-sm` |
| Card hover | `0 4px 6px rgba(0,0,0,0.07)` | `shadow-md` |
| Card hover lift | `translateY(-2px)` | Custom motion |
| Navbar (scrolled) | `0 1px 3px rgba(0,0,0,0.05)` | `shadow-sm` |

---

## Animation Tokens / 动效参数

| Parameter | Value | Notes |
|-----------|-------|-------|
| Entrance duration | 500–600ms | Fade-up sections |
| Quick transition | 200–300ms | Hover states, button clicks |
| Easing | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Apple's default ease-out |
| Stagger delay | 100–150ms | Between staggered children |
| Viewport trigger | 20% visible | `amount: 0.2` |
| Viewport margin | -80px | Offset for fixed navbar |
| Replay | Never | `once: true` |

### Motion Presets (from `src/lib/animations.ts`)

```typescript
fadeUp:     { opacity: 0, y: 32 } → { opacity: 1, y: 0 }
fadeIn:     { opacity: 0 } → { opacity: 1 }
stagger:    { staggerChildren: 0.12, delayChildren: 0.1 }
```

---

## Breakpoints / 响应式断点

| Name | Min Width | Target Device |
|------|-----------|---------------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Laptop / Desktop |
| `xl` | 1280px | Wide desktop |

---

## Component States / 组件状态

| State | Style |
|-------|-------|
| **Hover** | `translateY(-2px)` + `shadow-md`, 200ms transition |
| **Focus** | `ring-2 ring-primary ring-offset-2` |
| **Active** | `scale-[0.98]` |
| **Disabled** | `opacity-50 pointer-events-none` |

---

## Accessibility / 可访问性

- **Touch targets:** Minimum 44×44px (Apple HIG)
- **Color contrast:** WCAG AA — 4.5:1 for normal text, 3:1 for large text
- **Keyboard:** All interactive elements focusable and operable via keyboard
- **Screen readers:** Semantic HTML, proper heading hierarchy, `aria-label` where needed
- **Reduced motion:** `prefers-reduced-motion` media query disables all animations
- **Focus indicators:** Visible focus rings on all interactive elements

---

*Last updated: 2026-06-13*
