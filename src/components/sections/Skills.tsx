"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Code2,
  Sigma,
  FlaskConical,
  Cog,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionTitle from "@/components/ui/SectionTitle";
import SkillBar from "@/components/ui/SkillBar";
import { skillCategories } from "@/data/skills";
import type { SkillCategoryId } from "@/types";
import { cn } from "@/lib/utils";
import { appleEase } from "@/lib/animations";

const categoryIconMap: Record<SkillCategoryId, LucideIcon> = {
  robotics: Cog,
  software: Code2,
  engineering: Car,
  modeling: Sigma,
  lab: FlaskConical,
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategoryId | null>(
    null,
  );

  const displayedCategories =
    activeCategory
      ? skillCategories.filter((c) => c.id === activeCategory)
      : skillCategories;

  return (
    <section id="skills" className="bg-background py-24 md:py-32">
      <Container>
        <ScrollReveal>
          <SectionTitle
            title="Skills & Technologies"
            titleZh="技能与工具"
            subtitle="跨学科技术栈 — 从机器人导航到底层控制，从深度学习到嵌入式部署。"
          />
        </ScrollReveal>

        {/* Category Filter Chips */}
        <ScrollReveal delay={0.1}>
          <div className="mb-10 flex flex-wrap justify-center gap-2.5">
            <motion.button
              onClick={() => setActiveCategory(null)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
                activeCategory === null
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border/60 bg-card text-muted-foreground hover:border-border hover:text-foreground",
              )}
            >
              All / 全部
            </motion.button>
            {skillCategories.map((cat) => {
              const Icon = categoryIconMap[cat.id] || FlaskConical;
              return (
                <motion.button
                  key={cat.id}
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === cat.id ? null : cat.id,
                    )
                  }
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
                    activeCategory === cat.id
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border/60 bg-card text-muted-foreground hover:border-border hover:text-foreground",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {cat.titleZh}
                </motion.button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Skill Bars Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory ?? "all"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: appleEase }}
            className="mx-auto max-w-3xl space-y-8"
          >
            {displayedCategories.map((category) => (
              <div key={category.id}>
                <div className="mb-4 flex items-center gap-2">
                  {(() => {
                    const Icon = categoryIconMap[category.id] || FlaskConical;
                    return (
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    );
                  })()}
                  <h3 className="text-lg font-semibold text-foreground">
                    {category.title}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {category.titleZh}
                  </span>
                </div>
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      iconName={skill.icon}
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Additional Skills Cloud */}
        <ScrollReveal delay={0.3}>
          <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
            <h4 className="mb-3 text-center text-sm font-semibold text-foreground">
              More Tools & Platforms / 更多工具与平台
            </h4>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Gazebo",
                "RViz",
                "AMCL",
                "YOLO",
                "PyTorch",
                "vibe coding",
                "Linux (Ubuntu)",
                "Git",
                "OpenCV",
                "PCL 点云库",
                "SolidWorks",
                "MATLAB",
              ].map((tool) => (
                <span
                  key={tool}
                  className="rounded-lg border border-border/50 bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
