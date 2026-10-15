"use client";

import { motion } from "framer-motion";
import { Download, ChevronDown, MapPin, Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import { appleEase } from "@/lib/animations";
import { asset } from "@/lib/utils";

export default function Hero() {
  const scrollToMap = () => {
    document.getElementById("project-map")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-20"
    >
      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,113,227,0.06)_0%,transparent_70%)]" />

      <Container className="relative z-10 text-center">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="mb-8 h-28 w-28 overflow-hidden rounded-full ring-2 ring-border/50 shadow-lg md:h-32 md:w-32"
        >
          <img
            src={asset("/images/hero/hero-portrait.jpg")}
            alt="江心悠"
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: appleEase }}
          className="mb-4 text-sm font-medium tracking-widest text-primary uppercase"
        >
          Vehicle Engineering · Junior
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: appleEase }}
          className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl"
        >
          Jiang Xinyou
        </motion.h1>

        {/* Chinese name */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3, ease: appleEase }}
          className="mt-2 text-2xl font-medium tracking-wide text-foreground/70"
        >
          江心悠
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.4, ease: appleEase }}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          车辆工程 · 机器人导航与控制
          <br />
          自主导航 × 弹道解算 × 环境感知
        </motion.p>

        {/* Quick info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: appleEase }}
          className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground"
        >
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            广州航海学院
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5" />
            j189289382281@outlook.com
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.6, ease: appleEase }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            href={asset("/resume.pdf")}
            download
            icon={Download}
          >
            下载简历
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={scrollToMap}
          >
            探索技能地图
          </Button>
        </motion.div>
      </Container>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground/50"
        >
          <span className="text-xs">Scroll to explore</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
