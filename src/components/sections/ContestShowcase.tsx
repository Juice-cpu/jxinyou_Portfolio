"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Trophy,
  Medal,
  Award,
  ExternalLink,
  Calendar,
  User,
  ImageIcon,
} from "lucide-react";
import { cn, asset } from "@/lib/utils";
import { appleEase } from "@/lib/animations";
import type { Contest } from "@/types";
import { contests } from "@/data/projects";

// ============================================
// Award Level Config
// ============================================
const awardConfig: Record<
  Contest["awardLevel"],
  { icon: typeof Trophy; label: string; className: string }
> = {
  gold: {
    icon: Trophy,
    label: "Gold",
    className:
      "bg-amber-50 text-amber-700 border-amber-200",
  },
  silver: {
    icon: Medal,
    label: "Silver",
    className:
      "bg-slate-50 text-slate-700 border-slate-200",
  },
  bronze: {
    icon: Award,
    label: "Bronze",
    className:
      "bg-orange-50 text-orange-700 border-orange-200",
  },
  participation: {
    icon: Award,
    label: "",
    className:
      "bg-gray-50 text-gray-500 border-gray-200",
  },
};

// ============================================
// Type Label Config
// ============================================
const typeStyles: Record<Contest["type"], string> = {
  robomaster: "bg-red-50 text-red-700 border-red-200",
  "math-model": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "national-innovation":
    "bg-emerald-50 text-emerald-700 border-emerald-200",
  personal: "bg-gray-50 text-gray-600 border-gray-200",
};

// ============================================
// Placeholder Image — gradient with icon
// ============================================
function PlaceholderImage({
  type,
  title,
}: {
  type: Contest["type"];
  title: string;
}) {
  const gradients: Record<Contest["type"], string> = {
    robomaster: "from-red-100 via-orange-50 to-red-50",
    "math-model": "from-indigo-100 via-blue-50 to-indigo-50",
    "national-innovation":
      "from-emerald-100 via-teal-50 to-emerald-50",
    personal: "from-gray-100 via-slate-50 to-gray-50",
  };

  return (
    <div
      className={cn(
        "flex aspect-[16/10] w-full items-center justify-center rounded-xl bg-gradient-to-br",
        gradients[type],
      )}
    >
      <div className="flex flex-col items-center gap-2 text-muted-foreground/40">
        <ImageIcon className="h-10 w-10" />
        <span className="text-xs font-medium">{title}</span>
      </div>
    </div>
  );
}

// ============================================
// ContestCard — Individual card
// ============================================
function ContestCard({
  contest,
  index,
}: {
  contest: Contest;
  index: number;
}) {
  const award = awardConfig[contest.awardLevel];
  const AwardIcon = award.icon;

  // Gather all images (images[] array or single image fallback)
  const allImages: string[] = (contest.images && contest.images.length > 0
    ? contest.images
    : contest.image
      ? [contest.image]
      : []
  ).map((path) => asset(path));
  const hasGallery = allImages.length > 1;

  const [imgIndex, setImgIndex] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    if (!hasGallery) return;
    const timer = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % allImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [hasGallery, allImages.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: appleEase,
      }}
      className={cn(
        "group flex w-[340px] shrink-0 flex-col rounded-2xl border border-border/60 bg-card p-5 shadow-sm",
        "transition-all duration-300 hover:shadow-md hover:-translate-y-1",
        "md:w-[380px]",
      )}
    >
      {/* --- Image / Gallery --- */}
      <div className="relative mb-4 overflow-hidden rounded-xl">
        {allImages.length > 0 ? (
          <>
            <AnimatePresence mode="popLayout">
              <motion.img
                key={imgIndex}
                src={allImages[imgIndex]}
                alt={`${contest.title} ${imgIndex + 1}`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="aspect-[16/10] w-full object-cover"
              />
            </AnimatePresence>

            {/* Dot indicators (only when multiple images) */}
            {hasGallery && (
              <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1.5">
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setImgIndex(i);
                    }}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === imgIndex
                        ? "w-5 bg-white shadow-sm"
                        : "w-1.5 bg-white/50 hover:bg-white/80",
                    )}
                    aria-label={`View image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <PlaceholderImage type={contest.type} title={contest.titleZh} />
        )}
      </div>

      {/* --- Header: Type Badge + Date --- */}
      <div className="mb-3 flex items-center justify-between">
        <span
          className={cn(
            "inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium",
            typeStyles[contest.type],
          )}
        >
          {contest.typeLabelZh}
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {contest.duration}
        </span>
      </div>

      {/* --- Title --- */}
      <h3 className="mb-1 text-lg font-semibold tracking-tight text-foreground">
        {contest.titleZh}
      </h3>
      <p className="mb-1 text-sm text-muted-foreground">{contest.title}</p>

      {/* --- Award Badge --- */}
      {contest.award && (
        <div
          className={cn(
            "mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
            award.className,
          )}
        >
          <AwardIcon className="h-3.5 w-3.5" />
          {contest.award}
        </div>
      )}

      {/* --- Tagline --- */}
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        {contest.tagline}
      </p>

      {/* --- Role --- */}
      <div className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <User className="h-3 w-3" />
        <span>{contest.role}</span>
      </div>

      {/* --- Tech Stack Tags --- */}
      <div className="mt-auto flex flex-wrap gap-1.5">
        {contest.techStack.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
          >
            {tech}
          </span>
        ))}
        {contest.techStack.length > 5 && (
          <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
            +{contest.techStack.length - 5}
          </span>
        )}
      </div>

      {/* --- Links --- */}
      {contest.links && contest.links.length > 0 && (
        <div className="mt-3 flex gap-3 border-t border-border/60 pt-3">
          {contest.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-hover transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              {link.label}
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ============================================
// ContestShowcase — Section Wrapper
// ============================================
export default function ContestShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  // Check scroll position to toggle arrow visibility
  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 400;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden bg-muted py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* --- Section Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Competition Works
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">竞赛作品展示</p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Selected projects from robotics competitions, mathematical modeling
            contests, national innovation programs, and personal explorations.
            Scroll horizontally to browse.
          </p>
        </motion.div>

        {/* --- Horizontal Scroll Container --- */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Left Arrow */}
          <motion.button
            onClick={() => scroll("left")}
            initial={{ opacity: 0 }}
            animate={{
              opacity: canScrollLeft && isHovering ? 1 : 0,
              x: canScrollLeft && isHovering ? 0 : -10,
            }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute -left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-border/60 bg-white/90 p-2.5 shadow-md backdrop-blur-sm transition-colors hover:bg-white md:block",
              !canScrollLeft && "pointer-events-none",
            )}
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </motion.button>

          {/* Right Arrow */}
          <motion.button
            onClick={() => scroll("right")}
            initial={{ opacity: 0 }}
            animate={{
              opacity: canScrollRight && isHovering ? 1 : 0,
              x: canScrollRight && isHovering ? 0 : 10,
            }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute -right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-border/60 bg-white/90 p-2.5 shadow-md backdrop-blur-sm transition-colors hover:bg-white md:block",
              !canScrollRight && "pointer-events-none",
            )}
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </motion.button>

          {/* Cards Row */}
          <div
            ref={scrollRef}
            className={cn(
              "flex gap-5 overflow-x-auto pb-8",
              "snap-x snap-mandatory",
              "scrollbar-none",
              // Mask fade edges
              "[mask-image:linear-gradient(to_right,transparent_0%,black_2%,black_98%,transparent_100%)]",
              "md:[mask-image:linear-gradient(to_right,transparent_0%,black_4%,black_96%,transparent_100%)]",
            )}
            style={{ scrollbarWidth: "none" as const }}
          >
            {/* Left spacer for masking */}
            <div className="w-2 shrink-0 md:w-8" />

            {contests
              .sort((a, b) => a.order - b.order)
              .map((contest, index) => (
                <div
                  key={contest.id}
                  className="snap-start"
                >
                  <ContestCard contest={contest} index={index} />
                </div>
              ))}

            {/* Right spacer for masking */}
            <div className="w-2 shrink-0 md:w-8" />
          </div>
        </div>

        {/* --- Scroll Hint (mobile) --- */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-6 text-center text-xs text-muted-foreground md:hidden"
        >
          ← Swipe to browse more →
        </motion.p>
      </div>
    </section>
  );
}
