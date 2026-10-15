import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "江心悠 · Xinyou Jiang | Robotics & Navigation",
  description: "江心悠的个人主页。广州航海学院车辆工程本科生，大湾区大学访问学生，关注具身智能、机器人自主导航与多传感器感知。",
  keywords: ["江心悠", "Xinyou Jiang", "Robotics", "ROS2", "ObjectNav", "RoboMaster", "机器人导航"],
  openGraph: {
    title: "江心悠 · Xinyou Jiang",
    description: "Robotics, Navigation & Embodied Intelligence",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
