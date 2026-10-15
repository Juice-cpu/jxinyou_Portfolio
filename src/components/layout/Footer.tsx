"use client";

import { motion } from "framer-motion";
import { ArrowUp, Mail, FileText } from "lucide-react";
import { contactInfo } from "@/data/social";
import { appleEase } from "@/lib/animations";
import { asset } from "@/lib/utils";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border/40 bg-muted/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:justify-between sm:py-8">
        {/* Left — Copyright */}
        <div className="text-center sm:text-left">
          <p className="text-sm font-medium text-foreground">
            Jiang Xinyou · 江心悠
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Vehicle Engineering · Guangzhou Maritime University
          </p>
        </div>

        {/* Center — Quick links */}
        <div className="flex items-center gap-1">
          <a
            href={`mailto:${contactInfo.email}`}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Email</span>
          </a>
          <a
            href={asset("/resume.pdf")}
            download
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Resume</span>
          </a>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: appleEase }}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Back to top"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span>Top</span>
          </motion.button>
        </div>

        {/* Right — Copyright year */}
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Jiang Xinyou. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
