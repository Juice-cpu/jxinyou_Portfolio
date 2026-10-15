// ============================================
// Shared TypeScript Interfaces
// ============================================

// --- Navigation ---
export interface NavSection {
  id: string;
  label: string;
  labelZh: string;
  icon: string; // Lucide icon name (kebab-case)
}

// --- Bento Grid ---
export type BentoSize = "large" | "wide" | "medium" | "small";
export type BentoColor = "blue" | "purple" | "green" | "orange" | "gray";

export interface BentoItem {
  id: string;
  title: string;
  titleZh: string;
  description: string;
  icon: string; // Lucide icon name
  size: BentoSize;
  color: BentoColor;
  linkTo: string; // section ID to scroll to
}

// --- About ---
export interface Highlight {
  icon: string;
  label: string;
  labelZh: string;
  value: string;
}

export interface AboutData {
  name: string;
  nameZh: string;
  title: string;
  titleZh: string;
  avatarPath: string;
  bioParagraphs: string[];
  highlights: Highlight[];
}

// --- Skills ---
export interface Skill {
  name: string;
  level: number; // 0-100
  category: SkillCategoryId;
  icon: string;
}

export type SkillCategoryId =
  | "robotics"
  | "software"
  | "engineering"
  | "modeling"
  | "lab";

export interface SkillCategory {
  id: SkillCategoryId;
  title: string;
  titleZh: string;
  icon: string;
  skills: Skill[];
}

// --- Projects & Contests ---
export type ProjectType =
  | "robomaster"
  | "math-model"
  | "national-innovation"
  | "personal";

export interface Contest {
  id: string;
  title: string;
  titleZh: string;
  type: ProjectType;
  typeLabel: string;
  typeLabelZh: string;
  award: string; // e.g., "全国一等奖"
  awardLevel: "gold" | "silver" | "bronze" | "participation";
  tagline: string; // one-line pitch
  description: string; // full description
  role: string;
  duration: string;
  techStack: string[];
  achievements: string[];
  image?: string; // path relative to /public (single)
  images?: string[]; // multiple images for gallery
  links?: { label: string; url: string }[];
  featured: boolean;
  order: number;
}

// --- Contact ---
export interface SocialLink {
  platform: string;
  icon: string;
  url: string;
  label: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  socialLinks: SocialLink[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface PortfolioProfile {
  name: string;
  nameEn: string;
  email: string;
  photo: string;
  resume: string;
  codeUrl: string;
  githubUrl: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  titleEn: string;
  category: "具身智能" | "自主导航" | "感知与控制";
  date: string;
  role: string;
  description: string;
  result: string;
  tags: string[];
  media?: { src: string; type: "image" | "gif" | "video"; alt: string; poster?: string };
  links?: { label: string; href: string }[];
  details: string;
}

export interface PortfolioHonor {
  id: string;
  year: string;
  title: string;
  award: string;
  certificate?: string;
  detail?: string;
}

export interface PortfolioPatent {
  id: string;
  title: string;
  type: "实用新型" | "发明专利";
  applicationNumber: string;
  status: "已授权" | "申请已受理";
  documentDate: string;
  publicationNumber?: string;
  inventorRank: number;
  inventorCount: number;
  certificate: string;
}

export interface PortfolioNews {
  date: string;
  text: string;
  href?: string;
}
