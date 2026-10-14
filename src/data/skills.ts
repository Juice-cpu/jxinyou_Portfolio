import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "robotics",
    title: "Robotics & Control",
    titleZh: "机器人 & 控制",
    icon: "cog",
    skills: [
      { name: "ROS", level: 85, category: "robotics", icon: "cog" },
      { name: "AMCL 定位", level: 80, category: "robotics", icon: "crosshair" },
      { name: "路径规划", level: 80, category: "robotics", icon: "map" },
      { name: "Gazebo / RViz 仿真", level: 75, category: "robotics", icon: "box" },
      { name: "相机标定", level: 75, category: "robotics", icon: "camera" },
      { name: "弹道解算", level: 70, category: "robotics", icon: "target" },
    ],
  },
  {
    id: "software",
    title: "Programming & Algorithms",
    titleZh: "编程 & 算法",
    icon: "code-2",
    skills: [
      { name: "Python", level: 85, category: "software", icon: "terminal" },
      { name: "C / C++", level: 80, category: "software", icon: "cpu" },
      { name: "Linux (Ubuntu)", level: 80, category: "software", icon: "server" },
      { name: "PyTorch", level: 75, category: "software", icon: "flame" },
      { name: "YOLO", level: 75, category: "software", icon: "eye" },
      { name: "OpenCV", level: 75, category: "software", icon: "aperture" },
    ],
  },
  {
    id: "engineering",
    title: "Engineering & Design",
    titleZh: "工程 & 设计",
    icon: "wrench",
    skills: [
      { name: "MATLAB", level: 80, category: "engineering", icon: "trending-up" },
      { name: "SolidWorks", level: 70, category: "engineering", icon: "box" },
      { name: "车辆动力学", level: 70, category: "engineering", icon: "car" },
      { name: "有限元分析", level: 65, category: "engineering", icon: "grid-3x3" },
    ],
  },
  {
    id: "modeling",
    title: "Math & Data Analysis",
    titleZh: "数学 & 数据分析",
    icon: "sigma",
    skills: [
      { name: "数据分析", level: 80, category: "modeling", icon: "bar-chart-3" },
      { name: "概率统计", level: 75, category: "modeling", icon: "pie-chart" },
      { name: "数值计算", level: 75, category: "modeling", icon: "calculator" },
      { name: "点云处理", level: 70, category: "modeling", icon: "cloud" },
    ],
  },
  {
    id: "lab",
    title: "Tools & Practices",
    titleZh: "工具 & 实践",
    icon: "flask-conical",
    skills: [
      { name: "办公软件 (Word/Excel/PPT)", level: 85, category: "lab", icon: "file-text" },
      { name: "Git", level: 80, category: "lab", icon: "git-branch" },
      { name: "项目管理", level: 75, category: "lab", icon: "clipboard-list" },
      { name: "vibe coding", level: 70, category: "lab", icon: "sparkles" },
    ],
  },
];
