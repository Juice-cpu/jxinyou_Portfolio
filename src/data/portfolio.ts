import type { PortfolioProfile, PortfolioProject, PortfolioHonor, PortfolioNews, PortfolioPatent } from "@/types";

export const profile: PortfolioProfile = {
  name: "江心悠", nameEn: "Xinyou Jiang", email: "jxinyou@outlook.com",
  photo: "/images/profile-2026.jpg", resume: "/resume.docx", codeUrl: "https://gitee.com/juice2582",
  githubUrl: "https://github.com/Juice-cpu",
};

export const news: PortfolioNews[] = [
  { date: "2026.07", text: "在大湾区大学担任访问学生，开展轮足机器人零样本多楼层物体导航与动态避障研究。", href: "#object-nav" },
  { date: "2026", text: "RoboMaster 超级对抗赛全国赛三等奖，南部赛区二等奖；雷达机器人获优秀奖。", href: "#honors" },
  { date: "2026", text: "RoboMaster 高校联盟赛华南站：步兵对抗赛一等奖（亚军）、3v3 对抗赛一等奖（殿军）。", href: "#honors" },
  { date: "2026", text: "《基于多模态的无人船自主导航关键技术研究》获大学生创新创业训练计划省级立项。" },
  { date: "2025", text: "智能氢能无人船项目获中国创新创业大赛海洋科技与装备赛道青年创客赛二等奖。", href: "#usv" },
];

// 替换 media.src 即可添加 GIF 或视频，路径对应 public 目录。type 支持 image / gif / video。
// 未提供媒体时显示导航示意图，不会在页面上显示开发占位提示。
export const projects: PortfolioProject[] = [
  {
    id: "object-nav", title: "轮足机器人的零样本多楼层物体导航", titleEn: "Zero-shot Multi-floor Object Navigation",
    category: "具身智能", date: "2026.07 — 至今", role: "大湾区大学 · 访问学生",
    description: "面向 TITA 轮足机器人，研究不依赖平台特定训练策略的物体目标导航。结合语义地图、多楼层规划与视觉语言模型，让机器人在复杂空间中寻找目标并应对动态行人。",
    result: "静态仿真：SR 63% · SPL 28.5%", tags: ["ObjectNav", "VLM", "语义地图", "动态避障"],
    details: "构建物体、语义与可通行三层地图；由启发式多楼层规划器负责单层探索与跨楼层转换，多视点 VLM 验证模块负责目标确认，动态行人避障流水线负责前瞻性避让。跨地形能力仍在研究中，下一阶段将探索利用强化学习实现上下楼时的抬腿与收腿动作。",
    media: { src: "/images/projects/object-navigation.gif", type: "gif", alt: "轮足机器人零样本多楼层物体导航演示", poster: "/images/projects/object-navigation-poster.jpg" },
  },
  {
    id: "sentry", title: "RoboMaster 全向哨兵自主导航", titleEn: "Omnidirectional Sentry Navigation · Sim2Real",
    category: "自主导航", date: "2024.09 — 2026.06", role: "ICBK 破冰船战队 · 导航组组长",
    description: "基于 ROS2 Humble 与 Nav2，构建从激光雷达感知、定位建图、路径规划到实车底盘控制的完整导航系统，支持战术巡逻、动态目标追击与实时避障。",
    result: "Gazebo 仿真 → 真实机器人部署", tags: ["ROS2", "Nav2", "Livox Mid360", "Fast-LIO / Point-LIO"],
    media: { src: "/images/projects/sentry-navigation.gif", type: "gif", alt: "RoboMaster 全向哨兵自主导航演示", poster: "/images/projects/sentry-navigation-poster.jpg" },
    details: "融合 Livox Mid360、IMU、Fast-LIO / Point-LIO、点云地面分割与裁判系统，形成感知、决策、规划、执行的 Sim2Real 闭环。由组员成长为导航组组长，负责自主导航与路径规划代码开发、系统联调及技术文档编写。",
  },
  {
    id: "usv", title: "智能氢能无人船导航控制", titleEn: "Navigation & Control for Hydrogen-powered USV",
    category: "自主导航", date: "2024.12 — 至今", role: "国家级大创项目 · 导航算法开发",
    description: "针对氢燃料电池系统 1–3 秒输入时滞，设计基于辅助系统的路径跟踪控制方案。融合 GPS、毫米波雷达与视觉传感器，开展水域自主避障与路径规划验证。",
    result: "导航算法三次迭代 · 响应时间缩短 30%", tags: ["SLAM", "多传感器融合", "路径跟踪", "自适应模糊控制"],
    details: "导航算法由 PID 迭代至自适应模糊控制，再整合多传感器融合避障。完成真实水域数据采集与模型验证。相关《水面深度测绘氢能智能无人船关键技术研究》获国家级大创立项，智能氢能无人船项目获大学生国际创新创业大赛省级铜奖。",
    links: [{ label: "获奖证书", href: "/images/certificates/innovation-bronze.jpg" }],
  },
  {
    id: "ballistics", title: "雷达定位与远距离弹道解算", titleEn: "Radar Localization & Ballistic Compensation",
    category: "感知与控制", date: "2025.01 — 2026.03", role: "ICBK 破冰船战队 · 导航组组长",
    description: "开发固定目标点云台解算节点，根据 map 坐标系中的目标点和实时 TF，求解 yaw / pitch，并通过串口发送至下位机，实现带空气阻力补偿的远距离吊射。",
    result: "实时目标定位 · 云台角度解算 · 串口控制", tags: ["ROS", "TF", "弹道补偿", "C++"],
    media: { src: "/images/projects/ballistic-01.jpg", type: "image", alt: "RoboMaster 英雄机器人弹道解算系统" },
    details: "负责环境数据采集与处理、目标识别及实时位置信息输出，结合空气阻力模型进行弹道补偿，完成雷达定位到云台控制的工程联调，并整理可复用的代码与技术文档。",
  },
  {
    id: "openharmony", title: "OpenHarmony 机器人自主作业", titleEn: "Autonomous Robot Tasks with OpenHarmony",
    category: "感知与控制", date: "2025.04 — 2025.07", role: "睿抗机器人开发者大赛 · 团队队长",
    description: "基于 OpenHarmony 开发板进行软硬件协同开发，通过移动端 App 学习场地与路径点，实现货物视觉识别、抓取、分类与投放的自动化任务。",
    result: "2025 RAICOM 夺宝奇兵 · 三等奖", tags: ["OpenHarmony", "视觉识别", "底层控制", "软硬件协同"],
    details: "负责团队任务拆解、机器人底层控制及交互反馈，实现从路径学习到自动作业的完整比赛任务，并获得 2025 年睿抗机器人开发者大赛夺宝奇兵三等奖。",
    links: [{ label: "获奖证书", href: "/images/certificates/raicom.jpg" }],
  },
  {
    id: "onero", title: "卧安 onero A1 机械臂开发", titleEn: "SwitchBot onero A1 · Physical AI Development",
    category: "具身智能", date: "2026.08", role: "Hong Kong 2026 Physical AI Hackthon",
    description: "围绕卧安 onero A1 开源轻量级机械臂与 K3 CoM 260 AI 计算平台开展开发，结合 ROS2 Humble、网络控制与 MoveIt2，探索从多模态目标理解到机械臂动作规划的应用。",
    result: "多模态感知 · 零样本目标理解 · 运动规划", tags: ["onero A1", "ROS2 Humble", "MoveIt2", "Physical AI"],
    details: "开发平台将 onero A1 机械臂与 K3 CoM 260 计算平台连接，通过网络控制机械臂，并使用 MoveIt2 进行运动规划，探索摄像头多模态感知、零样本目标理解与自主抓取规划。",
    media: { src: "/images/projects/onero-arm.gif", type: "gif", alt: "卧安 onero A1 机械臂抓取演示", poster: "/images/projects/onero-arm-poster.jpg" },
    links: [{ label: "开发演示 · 小红书", href: "https://xhslink.cn/o/7Yq9GY2WNJU" }],
  },
];

export const honors: PortfolioHonor[] = [
  {
    "id": "rm-national",
    "year": "2026",
    "title": "第二十五届全国大学生机器人大赛 RoboMaster 2026 机甲大师超级对抗赛 · 全国赛",
    "award": "三等奖"
  },
  {
    "id": "rm-south",
    "year": "2026",
    "title": "第二十五届全国大学生机器人大赛 RoboMaster 2026 机甲大师超级对抗赛 · 区域赛（南部赛区）",
    "award": "二等奖",
    "certificate": "/images/certificates/rm-south.jpg"
  },
  {
    "id": "rm-infantry",
    "year": "2026",
    "title": "第二十五届全国大学生机器人大赛 RoboMaster 2026 机甲大师高校联盟赛（华南站）· 步兵对抗赛",
    "award": "一等奖 · 亚军",
    "certificate": "/images/certificates/rm-infantry.jpg"
  },
  {
    "id": "rm-3v3",
    "year": "2026",
    "title": "第二十五届全国大学生机器人大赛 RoboMaster 2026 机甲大师高校联盟赛（华南站）· 3v3 对抗赛 · 非甲级队伍",
    "award": "一等奖 · 殿军",
    "certificate": "/images/certificates/rm-3v3.jpg"
  },
  {
    "id": "rm-sentry",
    "year": "2026",
    "title": "第二十五届全国大学生机器人大赛 RoboMaster 2026 机甲大师高校联盟赛 · 3v3 对抗赛 · 哨兵机器人组",
    "award": "机器人竞技奖 · 二等奖",
    "certificate": "/images/certificates/rm-sentry.jpg"
  },
  {
    "id": "rm-infantry-technical",
    "year": "2026",
    "title": "第二十五届全国大学生机器人大赛 RoboMaster 2026 机甲大师高校联盟赛 · 步兵对抗赛",
    "award": "机器人竞技奖 · 二等奖",
    "certificate": "/images/certificates/rm-infantry-technical.jpg"
  },
  {
    "id": "rm-sentry-super",
    "year": "2026",
    "title": "第二十五届全国大学生机器人大赛 RoboMaster 2026 机甲大师超级对抗赛 · 哨兵机器人组",
    "award": "机器人竞技奖 · 三等奖",
    "certificate": "/images/certificates/rm-sentry-super.jpg"
  },
  {
    "id": "rm-radar",
    "year": "2026",
    "title": "第二十五届全国大学生机器人大赛 RoboMaster 2026 机甲大师超级对抗赛 · 雷达组",
    "award": "机器人竞技奖 · 优秀奖",
    "certificate": "/images/certificates/rm-radar.jpg"
  },
  {
    "id": "innovation",
    "year": "2025",
    "title": "第十四届中国创新创业大赛（广东·广州赛区）暨2025年广州科技创新创业大赛行业赛 · 海洋科技与装备赛道 · 青年创客赛",
    "award": "二等奖 · 亚军",
    "detail": "海洋创新实践组｜氢舟智航——开启无人船氢能驱动的新航界",
    "certificate": "/images/certificates/innovation-silver.jpg"
  },
  {
    "id": "innovation-bronze",
    "year": "2025",
    "title": "“建行杯”中国国际大学生创新大赛（2025）· 广东省分赛",
    "award": "铜奖",
    "detail": "智能氢能无人船——开启无人船氢能驱动新航界",
    "certificate": "/images/certificates/innovation-bronze.jpg"
  },
  {
    "id": "raicom",
    "year": "2025",
    "title": "2025年睿抗机器人开发者大赛（RAICOM）· 广东赛区 · 夺宝奇兵—OpenHarmony应用赛",
    "award": "三等奖",
    "certificate": "/images/certificates/raicom.jpg"
  },
  {
    "id": "rm-guangxi",
    "year": "2025",
    "title": "第二十四届全国大学生机器人大赛 RoboMaster 2025 机甲大师高校联盟赛（广西站）· 步兵对抗赛",
    "award": "二等奖",
    "certificate": "/images/certificates/rm-guangxi.jpg"
  },
  {
    "id": "rm-infantry-2025",
    "year": "2025",
    "title": "第二十四届全国大学生机器人大赛 RoboMaster 2025 机甲大师高校联盟赛 · 步兵对抗赛",
    "award": "机器人竞技奖 · 三等奖",
    "certificate": "/images/certificates/rm-infantry-2025.jpg"
  },
  {
    "id": "marine",
    "year": "2025",
    "title": "第十四届全国海洋航行器设计与制作大赛 · 华南赛区",
    "award": "三等奖",
    "detail": "A1 新概念创意设计｜绿色智能氢动力无人船",
    "certificate": "/images/certificates/marine.jpg"
  },
  {
    "id": "apmcm",
    "year": "2024",
    "title": "2024 Asia and Pacific Mathematical Contest in Modeling（APMCM）· 亚太地区大学生数学建模竞赛",
    "award": "三等奖",
    "detail": "Undergraduate Group · 本科生组",
    "certificate": "/images/certificates/apmcm.jpg"
  },
  {
    "id": "rm-season-plan",
    "year": "2025",
    "title": "RoboMaster 2025 机甲大师高校联盟赛",
    "award": "赛季规划奖"
  }
];

export const patents: PortfolioPatent[] = [
  {
    "id": "six-axis-arm",
    "title": "一种六轴吸附式机械臂及移动搬运机器人",
    "type": "实用新型",
    "applicationNumber": "202521934271.4",
    "status": "已授权",
    "documentDate": "2026-07-24",
    "publicationNumber": "CN224544573U",
    "inventorRank": 5,
    "inventorCount": 10,
    "certificate": "/images/patents/six-axis-arm.jpg"
  },
  {
    "id": "hydrogen-tank",
    "title": "一种带快拆快装结构的固态储氢罐",
    "type": "实用新型",
    "applicationNumber": "202520559337.X",
    "status": "已授权",
    "documentDate": "2025-12-19",
    "publicationNumber": "CN223690822U",
    "inventorRank": 6,
    "inventorCount": 7,
    "certificate": "/images/patents/hydrogen-tank.jpg"
  },
  {
    "id": "hydrogen-usv",
    "title": "一种智能氢能无人船",
    "type": "实用新型",
    "applicationNumber": "202522327220.1",
    "status": "申请已受理",
    "documentDate": "2025-11-03",
    "inventorRank": 5,
    "inventorCount": 8,
    "certificate": "/images/patents/hydrogen-usv.jpg"
  },
  {
    "id": "mobile-robot",
    "title": "一种移动搬运机器人",
    "type": "发明专利",
    "applicationNumber": "202511273586.3",
    "status": "申请已受理",
    "documentDate": "2025-09-08",
    "inventorRank": 2,
    "inventorCount": 9,
    "certificate": "/images/patents/mobile-robot.jpg"
  },
  {
    "id": "dual-feed-launcher",
    "title": "一种具有下供双链路的发射装置和机器人",
    "type": "发明专利",
    "applicationNumber": "202510903887.3",
    "status": "申请已受理",
    "documentDate": "2025-07-01",
    "inventorRank": 3,
    "inventorCount": 8,
    "certificate": "/images/patents/dual-feed-launcher.jpg"
  }
];
