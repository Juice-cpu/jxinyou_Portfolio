import { BentoItem } from "@/types";

export const bentoItems: BentoItem[] = [
  {
    id: "core-projects",
    title: "Core Projects",
    titleZh: "核心项目",
    description:
      "From autonomous robot navigation to radar tracking systems — explore my hands-on engineering work.",
    icon: "folder-git-2",
    size: "large",
    color: "blue",
    linkTo: "projects",
  },
  {
    id: "competitions",
    title: "Competitions",
    titleZh: "竞赛经历",
    description:
      "APMCM · RoboMaster · National Innovation · RAICOM — awards and lessons learned.",
    icon: "trophy",
    size: "wide",
    color: "purple",
    linkTo: "projects",
  },
  {
    id: "skills",
    title: "Skills Radar",
    titleZh: "技能雷达",
    description:
      "Robot navigation & control, software development, engineering simulation, and project management.",
    icon: "radar",
    size: "medium",
    color: "green",
    linkTo: "skills",
  },
  {
    id: "about",
    title: "About Me",
    titleZh: "关于我",
    description:
      "Vehicle Engineering junior passionate about building autonomous systems that perceive, navigate, and act.",
    icon: "user",
    size: "medium",
    color: "orange",
    linkTo: "about",
  },
  {
    id: "contact",
    title: "Get in Touch",
    titleZh: "联系我",
    description:
      "Let's collaborate — whether it's a robotics competition, research project, or internship opportunity.",
    icon: "send",
    size: "medium",
    color: "gray",
    linkTo: "contact",
  },
];
