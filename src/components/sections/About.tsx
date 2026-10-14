"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Trophy,
  FlaskConical,
  Users,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { aboutData } from "@/data/about";
import { appleEase } from "@/lib/animations";
import { asset } from "@/lib/utils";

// Icons for highlights
const iconMap: Record<string, LucideIcon> = {
  "graduation-cap": GraduationCap,
  trophy: Trophy,
  "flask-conical": FlaskConical,
  users: Users,
};

export default function About() {
  return (
    <section id="about" className="bg-muted py-24 md:py-32">
      <Container>
        <ScrollReveal>
          <SectionTitle
            title="About Me"
            titleZh="关于我"
            subtitle="车辆工程专业本科生，专注于机器人自主导航、环境感知与系统控制方向的跨学科研究。"
          />
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Avatar + Name (left column) */}
          <ScrollReveal className="lg:col-span-2" delay={0.1}>
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              {/* Avatar */}
              <div className="mb-6 h-32 w-32 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm ring-1 ring-border/50">
                <img
                  src={asset(aboutData.avatarPath)}
                  alt={aboutData.nameZh}
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                {aboutData.name}
              </h3>
              <p className="mt-1 text-lg text-foreground/70">
                {aboutData.nameZh}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {aboutData.titleZh}
              </p>

              {/* Highlights */}
              <div className="mt-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {aboutData.highlights.map((h, i) => {
                  const Icon = iconMap[h.icon] || Trophy;
                  return (
                    <motion.div
                      key={h.label}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: 0.15 + i * 0.08,
                        ease: appleEase,
                      }}
                      className="flex items-start gap-3 rounded-xl border border-border/50 bg-card p-4 shadow-sm"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-muted-foreground">
                          {h.labelZh}
                        </p>
                        <p className="mt-0.5 text-sm font-medium text-foreground">
                          {h.value}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Bio text (right column) */}
          <ScrollReveal
            className="lg:col-span-3"
            direction="right"
            delay={0.2}
          >
            <div className="space-y-5">
              {aboutData.bioParagraphs.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + i * 0.1,
                    ease: appleEase,
                  }}
                  className="text-base leading-relaxed text-foreground/80"
                >
                  {paragraph}
                </motion.p>
              ))}

              {/* Language & Certificates */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5, ease: appleEase }}
                className="mt-6 rounded-xl border border-border/50 bg-card p-5 shadow-sm"
              >
                <h4 className="mb-3 text-sm font-semibold text-foreground">
                  Language & Honors / 语言与荣誉
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "CET-6",
                    "普通话流利",
                    "实用新型专利 ×4",
                    "发明专利 ×2",
                    "综测排名 1/34",
                  ].map((cert) => (
                    <span
                      key={cert}
                      className="rounded-full border border-border/60 bg-muted px-3 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
