"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import Link from "next/link";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { navSections } from "@/data/navigation";
import { cn, asset } from "@/lib/utils";
import { appleEase } from "@/lib/animations";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionIds = navSections.map((s) => s.id);
  const activeId = useScrollSpy(sectionIds);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Fixed navbar */}
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
        <motion.nav
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: appleEase }}
          className={cn(
            "flex w-full max-w-2xl items-center justify-between gap-4 rounded-2xl border border-border/40 px-5 py-2.5",
            "bg-white/72 backdrop-blur-xl shadow-sm",
            "transition-shadow duration-300",
          )}
        >
          {/* Logo / Name */}
          <button
            onClick={() => scrollTo("hero")}
            className="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight text-foreground transition-opacity hover:opacity-70"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-[11px] font-bold text-white">
              J
            </span>
            <span className="hidden sm:inline">Jiang Xinyou</span>
          </button>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-0.5 md:flex">
            {navSections.map((section) => {
              const isActive = activeId === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={cn(
                    "relative px-3 py-1.5 text-xs font-medium rounded-full transition-colors duration-200",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {/* Active pill background */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-primary/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{section.labelZh}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <a
            href={asset("/resume.pdf")}
            download
            className="hidden items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-medium text-white shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md sm:flex"
          >
            <Download className="h-3 w-3" />
            <span>简历</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </motion.nav>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.25, ease: appleEase }}
              className="fixed left-4 right-4 top-[4.5rem] z-50 rounded-2xl border border-border/40 bg-white/90 p-4 shadow-xl backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-0.5">
                {navSections.map((section, i) => {
                  const isActive = activeId === section.id;
                  return (
                    <motion.button
                      key={section.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                      onClick={() => scrollTo(section.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <span>{section.labelZh}</span>
                      <span className="text-xs text-muted-foreground/60 ml-auto">
                        {section.label}
                      </span>
                    </motion.button>
                  );
                })}

                {/* Mobile download button */}
                <motion.a
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navSections.length * 0.04, duration: 0.2 }}
                  href={asset("/resume.pdf")}
                  download
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white"
                >
                  <Download className="h-4 w-4" />
                  下载简历
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
