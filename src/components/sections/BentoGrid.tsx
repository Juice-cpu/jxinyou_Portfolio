"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderGit2,
  Trophy,
  Radar,
  User,
  Send,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { BentoItem, BentoColor, BentoSize } from "@/types";
import { bentoItems } from "@/data/bento";

// ============================================
// Icon Map — Lucide icon name → component
// ============================================
const iconMap: Record<string, LucideIcon> = {
  "folder-git-2": FolderGit2,
  trophy: Trophy,
  radar: Radar,
  user: User,
  send: Send,
};

// ============================================
// Color Theme Map
// ============================================
const colorMap: Record<
  BentoColor,
  {
    bg: string;
    bgHover: string;
    glow: string;
    iconBg: string;
    iconText: string;
    badge: string;
  }
> = {
  blue: {
    bg: "bg-blue-50/70",
    bgHover: "group-hover:bg-blue-50/90",
    glow:
      "from-blue-400/50 via-cyan-400/30 to-blue-500/50",
    iconBg: "bg-blue-100",
    iconText: "text-blue-600",
    badge: "bg-blue-500/10 text-blue-700 border-blue-200/50",
  },
  purple: {
    bg: "bg-purple-50/70",
    bgHover: "group-hover:bg-purple-50/90",
    glow:
      "from-purple-400/50 via-pink-400/30 to-purple-500/50",
    iconBg: "bg-purple-100",
    iconText: "text-purple-600",
    badge: "bg-purple-500/10 text-purple-700 border-purple-200/50",
  },
  green: {
    bg: "bg-green-50/70",
    bgHover: "group-hover:bg-green-50/90",
    glow:
      "from-green-400/50 via-emerald-400/30 to-green-500/50",
    iconBg: "bg-green-100",
    iconText: "text-green-600",
    badge: "bg-green-500/10 text-green-700 border-green-200/50",
  },
  orange: {
    bg: "bg-orange-50/70",
    bgHover: "group-hover:bg-orange-50/90",
    glow:
      "from-orange-400/50 via-amber-400/30 to-orange-500/50",
    iconBg: "bg-orange-100",
    iconText: "text-orange-600",
    badge: "bg-orange-500/10 text-orange-700 border-orange-200/50",
  },
  gray: {
    bg: "bg-gray-50/70",
    bgHover: "group-hover:bg-gray-50/90",
    glow:
      "from-gray-400/50 via-slate-400/30 to-gray-500/50",
    iconBg: "bg-gray-100",
    iconText: "text-gray-600",
    badge: "bg-gray-500/10 text-gray-700 border-gray-200/50",
  },
};

// ============================================
// Size → Grid Span Map
// ============================================
const sizeClasses: Record<BentoSize, string> = {
  large: "md:col-span-2 md:row-span-2",
  wide: "md:col-span-4",
  medium: "md:col-span-2",
  small: "md:col-span-1",
};

// ============================================
// BentoCard — Individual tile with tilt + glow
// ============================================
function BentoCard({ item }: { item: BentoItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const Icon = iconMap[item.icon] || FolderGit2;
  const colors = colorMap[item.color];

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Tilt: ±8 degrees based on cursor offset from center
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      setRotateY(((x - centerX) / centerX) * 5);
      setRotateX(-((y - centerY) / centerY) * 5);

      // Glow position follows cursor (percentage)
      setGlowX((x / rect.width) * 100);
      setGlowY((y / rect.height) * 100);
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
    setGlowX(50);
    setGlowY(50);
    setIsHovered(false);
  }, []);

  const handleClick = () => {
    const el = document.getElementById(item.linkTo);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      // 3D tilt
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.5,
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-2xl border border-border/60 p-6 md:p-8",
        "transition-shadow duration-300",
        isHovered ? "shadow-lg" : "shadow-sm",
        colors.bg,
        sizeClasses[item.size],
        // min height varies by size
        item.size === "large" && "min-h-[320px] md:min-h-[400px]",
        item.size === "wide" && "min-h-[160px] md:min-h-[200px]",
        item.size === "medium" && "min-h-[180px]",
        item.size === "small" && "min-h-[140px]",
      )}
    >
      {/* ============ Glow Border Overlay ============ */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute inset-0 z-0 rounded-2xl"
            style={{
              background: `
                radial-gradient(
                  400px circle at ${glowX}% ${glowY}%,
                  rgba(0, 113, 227, 0.12),
                  transparent 50%
                )
              `,
            }}
          />
        )}
      </AnimatePresence>

      {/* ============ Gradient border glow on hover ============ */}
      <motion.div
        className={cn(
          "pointer-events-none absolute inset-0 z-0 rounded-2xl",
          "bg-gradient-to-br opacity-0 transition-opacity duration-500",
          colors.glow,
        )}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          padding: "1.5px",
          WebkitMaskComposite: "xor",
        }}
      />

      {/* ============ Content (z-10 above glows) ============ */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Icon */}
        <div
          className={cn(
            "mb-4 flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
            colors.iconBg,
            colors.iconText,
          )}
        >
          <Icon className="h-5 w-5" />
        </div>

        {/* Title Row */}
        <div className="mb-2 flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground">{item.titleZh}</p>
          </div>

          {/* Arrow indicator — slides in on hover */}
          <motion.div
            animate={{
              x: isHovered ? 0 : 8,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.25 }}
            className="mt-1 shrink-0"
          >
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </motion.div>
        </div>

        {/* Description */}
        <p
          className={cn(
            "text-sm leading-relaxed text-muted-foreground",
            item.size === "large" && "md:text-base",
          )}
        >
          {item.description}
        </p>

        {/* Spacer — pushes badge to bottom on larger cards */}
        {item.size === "large" && <div className="flex-1" />}

        {/* Subtle tag */}
        {item.size === "large" && (
          <span
            className={cn(
              "mt-4 inline-block w-fit rounded-full border px-3 py-1 text-xs font-medium",
              colors.badge,
            )}
          >
            Click to explore →
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ============================================
// BentoGrid — Section Wrapper
// ============================================
export default function BentoGrid() {
  return (
    <section
      id="bento-nav"
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* --- Section Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center md:mb-16"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Quick Navigation
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">快速导航</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Hover over each tile to explore — click to jump to that section
          </p>
        </motion.div>

        {/* --- Bento Grid --- */}
        <div className="grid auto-rows-[180px] grid-cols-1 gap-4 md:grid-cols-4 md:gap-5">
          {bentoItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className={cn(
                sizeClasses[item.size],
                // Mobile: all full-width, no row-span
                "md:row-span-1",
                item.size === "large" && "md:row-span-2",
              )}
            >
              <BentoCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
