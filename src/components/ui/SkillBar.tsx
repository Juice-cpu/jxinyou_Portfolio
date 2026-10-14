"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { type LucideIcon, Wrench } from "lucide-react";
import { appleEase } from "@/lib/animations";

// Simple icon map for common Lucide icon names
function getIcon(iconName: string): LucideIcon {
  // Dynamically try to match — fallback to Wrench
  return Wrench;
}

interface SkillBarProps {
  name: string;
  level: number; // 0-100
  iconName: string;
}

export default function SkillBar({ name, level, iconName }: SkillBarProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className="group flex items-center gap-3"
      onViewportEnter={() => setHasAnimated(true)}
      viewport={{ once: true }}
    >
      {/* Label */}
      <div className="w-36 shrink-0 text-sm font-medium text-foreground">
        {name}
      </div>

      {/* Bar track */}
      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: hasAnimated ? `${level}%` : 0 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: appleEase,
          }}
        />
      </div>

      {/* Level label */}
      <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">
        {level}%
      </span>
    </motion.div>
  );
}
