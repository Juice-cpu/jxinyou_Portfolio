import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with conflict resolution.
 * Combines clsx (conditional classes) with tailwind-merge (deduplication).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * GitHub Pages base path for asset URLs.
 * Set to repo name for project sites, empty for username.github.io or custom domains.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefix a path with the base path for correct resolution on GitHub Pages.
 */
export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
