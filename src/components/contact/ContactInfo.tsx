"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { contactInfo } from "@/data/social";
import { appleEase } from "@/lib/animations";

const iconMap: Record<string, LucideIcon> = {
  mail: Mail,
  phone: Phone,
  "map-pin": MapPin,
  github: Github,
  linkedin: Linkedin,
};

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.1, ease: appleEase }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-semibold text-foreground">
          Get in Touch
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          期待与你交流 — 欢迎通过以下方式联系我。
        </p>
      </div>

      {/* Contact Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Email</p>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              {contactInfo.email}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Phone className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Phone</p>
            <p className="text-sm font-medium text-foreground">
              {contactInfo.phone}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Location</p>
            <p className="text-sm font-medium text-foreground">
              {contactInfo.location}
            </p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div>
        <p className="mb-3 text-sm font-medium text-foreground">
          Social / 社交链接
        </p>
        <div className="flex gap-3">
          {contactInfo.socialLinks.map((link) => {
            const Icon = iconMap[link.icon] || Github;
            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-card text-muted-foreground shadow-sm transition-all duration-200 hover:border-primary/30 hover:text-primary hover:shadow-md"
                title={link.label}
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
