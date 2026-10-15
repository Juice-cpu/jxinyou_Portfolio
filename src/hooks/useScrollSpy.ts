"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section ID is currently most visible in the viewport.
 * Returns the active section id, or null if no section is prominent.
 */
export function useScrollSpy(
  sectionIds: string[],
  options?: { rootMargin?: string; threshold?: number },
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    // Track the intersection ratio of each section
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio);
        });

        // Pick the section with the highest intersection ratio
        let maxRatio = 0;
        let maxId: string | null = null;
        ratios.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            maxId = id;
          }
        });

        if (maxId) setActiveId(maxId);
      },
      {
        rootMargin: options?.rootMargin ?? "-80px 0px -60% 0px",
        threshold: [
          0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1,
        ],
      },
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds, options?.rootMargin]);

  return activeId;
}
