"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { cn, asset } from "@/lib/utils";
import { appleEase } from "@/lib/animations";

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section id="demo-video" className="bg-background py-24 md:py-32">
      <Container>
        <ScrollReveal>
          <SectionTitle
            title="Demo Reel"
            titleZh="演示视频"
            subtitle="RoboMaster 竞赛实拍与机器人系统演示。"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mx-auto max-w-4xl">
            {/* Video Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: appleEase }}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg"
            >
              {/* Video */}
              <video
                ref={videoRef}
                src={asset("/videos/demo.mp4")}
                poster={asset("/images/projects/ballistic-01.jpg")}
                muted
                loop
                playsInline
                className="aspect-video w-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              />

              {/* Overlay controls — visible on hover */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/10">
                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  className={cn(
                    "pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-foreground shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:scale-105",
                    isPlaying
                      ? "opacity-0 group-hover:opacity-100"
                      : "opacity-100",
                  )}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6 translate-x-0.5" />
                  )}
                </button>
              </div>

              {/* Bottom control bar */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-end gap-2 bg-gradient-to-t from-black/40 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {/* Mute toggle */}
                <button
                  onClick={toggleMute}
                  className="pointer-events-auto rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/35"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Caption */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mt-4 text-center text-sm text-muted-foreground"
            >
              RoboMaster 对抗赛实拍 · 雷达站运行演示 · 机械臂仿真联动
            </motion.p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
