// ============================================
// Interactive Project Map — Node & Edge Data
// Based on actual resume (江心悠)
// ============================================

export type NodeType = "center" | "category" | "skill" | "project";

export interface MapNode {
  id: string;
  label: string;
  labelZh: string;
  type: NodeType;
  x: number;
  y: number;
  radius: number;
  color: string;
  glowColor: string;
}

export interface MapEdge {
  id: string;
  source: string;
  target: string;
}

// ============================================
// Nodes
// ============================================
export const mapNodes: MapNode[] = [
  // ── Center ──
  {
    id: "center",
    label: "Jiang Xinyou",
    labelZh: "江心悠 · 机器人工程师",
    type: "center",
    x: 500, y: 375,
    radius: 28,
    color: "#0071E3",
    glowColor: "rgba(0,113,227,0.45)",
  },

  // ── Categories (3) ──
  {
    id: "robotics",
    label: "Robotics & Control",
    labelZh: "机器人控制",
    type: "category",
    x: 500, y: 155,
    radius: 20,
    color: "#10B981",
    glowColor: "rgba(16,185,129,0.35)",
  },
  {
    id: "coding",
    label: "Programming & Algorithms",
    labelZh: "编程与算法",
    type: "category",
    x: 285, y: 530,
    radius: 20,
    color: "#EF4444",
    glowColor: "rgba(239,68,68,0.35)",
  },
  {
    id: "simulation",
    label: "Engineering & Simulation",
    labelZh: "工程与仿真",
    type: "category",
    x: 715, y: 530,
    radius: 20,
    color: "#8B5CF6",
    glowColor: "rgba(139,92,246,0.35)",
  },

  // ── Robotics Skills ──
  { id: "ros", label: "ROS", labelZh: "ROS", type: "skill", x: 400, y: 78, radius: 10, color: "#34D399", glowColor: "rgba(52,211,153,0.4)" },
  { id: "amcl", label: "AMCL", labelZh: "AMCL 定位", type: "skill", x: 530, y: 55, radius: 9, color: "#34D399", glowColor: "rgba(52,211,153,0.4)" },
  { id: "gazebo", label: "Gazebo/RViz", labelZh: "Gazebo 仿真", type: "skill", x: 580, y: 105, radius: 9, color: "#34D399", glowColor: "rgba(52,211,153,0.4)" },
  { id: "camera-calib", label: "Camera Calib.", labelZh: "相机标定", type: "skill", x: 440, y: 125, radius: 8, color: "#34D399", glowColor: "rgba(52,211,153,0.4)" },
  { id: "path-plan", label: "Path Planning", labelZh: "路径规划", type: "skill", x: 350, y: 135, radius: 9, color: "#34D399", glowColor: "rgba(52,211,153,0.4)" },
  { id: "lidar", label: "LiDAR", labelZh: "激光雷达", type: "skill", x: 460, y: 60, radius: 8, color: "#34D399", glowColor: "rgba(52,211,153,0.4)" },

  // ── Coding Skills ──
  { id: "python", label: "Python", labelZh: "Python", type: "skill", x: 175, y: 460, radius: 10, color: "#F87171", glowColor: "rgba(248,113,113,0.4)" },
  { id: "cpp", label: "C / C++", labelZh: "C/C++", type: "skill", x: 235, y: 590, radius: 9, color: "#F87171", glowColor: "rgba(248,113,113,0.4)" },
  { id: "pytorch", label: "PyTorch", labelZh: "PyTorch", type: "skill", x: 160, y: 550, radius: 9, color: "#F87171", glowColor: "rgba(248,113,113,0.4)" },
  { id: "yolo", label: "YOLO", labelZh: "YOLO", type: "skill", x: 300, y: 620, radius: 8, color: "#F87171", glowColor: "rgba(248,113,113,0.4)" },
  { id: "opencv", label: "OpenCV", labelZh: "OpenCV", type: "skill", x: 250, y: 660, radius: 9, color: "#F87171", glowColor: "rgba(248,113,113,0.4)" },
  { id: "linux", label: "Linux", labelZh: "Linux", type: "skill", x: 140, y: 650, radius: 8, color: "#F87171", glowColor: "rgba(248,113,113,0.4)" },

  // ── Engineering / Simulation Skills ──
  { id: "matlab", label: "MATLAB", labelZh: "MATLAB", type: "skill", x: 650, y: 465, radius: 10, color: "#A78BFA", glowColor: "rgba(167,139,250,0.4)" },
  { id: "solidworks", label: "SolidWorks", labelZh: "SolidWorks", type: "skill", x: 800, y: 460, radius: 9, color: "#A78BFA", glowColor: "rgba(167,139,250,0.4)" },
  { id: "fea", label: "FEA", labelZh: "有限元分析", type: "skill", x: 830, y: 545, radius: 8, color: "#A78BFA", glowColor: "rgba(167,139,250,0.4)" },
  { id: "vehicle-dyn", label: "Vehicle Dynamics", labelZh: "车辆动力学", type: "skill", x: 745, y: 600, radius: 9, color: "#A78BFA", glowColor: "rgba(167,139,250,0.4)" },
  { id: "pcl", label: "Point Cloud", labelZh: "点云处理", type: "skill", x: 700, y: 630, radius: 8, color: "#A78BFA", glowColor: "rgba(167,139,250,0.4)" },
  { id: "ballistic", label: "Ballistic Calc.", labelZh: "弹道解算", type: "skill", x: 610, y: 590, radius: 8, color: "#A78BFA", glowColor: "rgba(167,139,250,0.4)" },

  // ── Project Nodes ──
  {
    id: "proj-auto-nav",
    label: "Auto Navigation",
    labelZh: "自主导航",
    type: "project",
    x: 100, y: 340,
    radius: 12, color: "#F59E0B", glowColor: "rgba(245,158,11,0.45)",
  },
  {
    id: "proj-ballistic",
    label: "Ballistic + Radar",
    labelZh: "弹道解算",
    type: "project",
    x: 500, y: 730,
    radius: 12, color: "#F59E0B", glowColor: "rgba(245,158,11,0.45)",
  },
  {
    id: "proj-vision",
    label: "Robot Vision",
    labelZh: "机器人视觉",
    type: "project",
    x: 920, y: 360,
    radius: 12, color: "#F59E0B", glowColor: "rgba(245,158,11,0.45)",
  },
  {
    id: "proj-usv",
    label: "Hydrogen USV",
    labelZh: "氢能无人船",
    type: "project",
    x: 840, y: 690,
    radius: 12, color: "#F59E0B", glowColor: "rgba(245,158,11,0.45)",
  },
  {
    id: "proj-mech-arm",
    label: "Mech. Arm Sim",
    labelZh: "机械臂仿真",
    type: "project",
    x: 200, y: 730,
    radius: 12, color: "#F59E0B", glowColor: "rgba(245,158,11,0.45)",
  },
  {
    id: "proj-radar",
    label: "Radar Station",
    labelZh: "雷达站",
    type: "project",
    x: 60, y: 690,
    radius: 12, color: "#F59E0B", glowColor: "rgba(245,158,11,0.45)",
  },
];

// ============================================
// Edges
// ============================================
export const mapEdges: MapEdge[] = [
  // Center → Categories
  { id: "e-c-rob", source: "center", target: "robotics" },
  { id: "e-c-cod", source: "center", target: "coding" },
  { id: "e-c-sim", source: "center", target: "simulation" },

  // Robotics → Skills
  { id: "e-r-ros", source: "robotics", target: "ros" },
  { id: "e-r-amcl", source: "robotics", target: "amcl" },
  { id: "e-r-gazebo", source: "robotics", target: "gazebo" },
  { id: "e-r-cam", source: "robotics", target: "camera-calib" },
  { id: "e-r-path", source: "robotics", target: "path-plan" },
  { id: "e-r-lidar", source: "robotics", target: "lidar" },

  // Coding → Skills
  { id: "e-c-py", source: "coding", target: "python" },
  { id: "e-c-cpp", source: "coding", target: "cpp" },
  { id: "e-c-torch", source: "coding", target: "pytorch" },
  { id: "e-c-yolo", source: "coding", target: "yolo" },
  { id: "e-c-cv", source: "coding", target: "opencv" },
  { id: "e-c-linux", source: "coding", target: "linux" },

  // Simulation → Skills
  { id: "e-s-mat", source: "simulation", target: "matlab" },
  { id: "e-s-sw", source: "simulation", target: "solidworks" },
  { id: "e-s-fea", source: "simulation", target: "fea" },
  { id: "e-s-vd", source: "simulation", target: "vehicle-dyn" },
  { id: "e-s-pcl", source: "simulation", target: "pcl" },
  { id: "e-s-bal", source: "simulation", target: "ballistic" },

  // Cross connections
  { id: "x-ros-py", source: "ros", target: "python" },
  { id: "x-ros-cpp", source: "ros", target: "cpp" },
  { id: "x-matlab-bal", source: "matlab", target: "ballistic" },
  { id: "x-py-torch", source: "python", target: "pytorch" },
  { id: "x-cv-yolo", source: "opencv", target: "yolo" },

  // Skills → Projects: Auto Navigation
  { id: "p-nav-ros", source: "ros", target: "proj-auto-nav" },
  { id: "p-nav-amcl", source: "amcl", target: "proj-auto-nav" },
  { id: "p-nav-path", source: "path-plan", target: "proj-auto-nav" },
  { id: "p-nav-lidar", source: "lidar", target: "proj-auto-nav" },
  { id: "p-nav-cpp", source: "cpp", target: "proj-auto-nav" },
  { id: "p-nav-gazebo", source: "gazebo", target: "proj-auto-nav" },

  // Skills → Projects: Ballistic + Radar
  { id: "p-bal-cpp", source: "cpp", target: "proj-ballistic" },
  { id: "p-bal-ros", source: "ros", target: "proj-ballistic" },
  { id: "p-bal-bal", source: "ballistic", target: "proj-ballistic" },
  { id: "p-bal-mat", source: "matlab", target: "proj-ballistic" },
  { id: "p-bal-lidar", source: "lidar", target: "proj-ballistic" },

  // Skills → Projects: Robot Vision
  { id: "p-vis-py", source: "python", target: "proj-vision" },
  { id: "p-vis-cv", source: "opencv", target: "proj-vision" },
  { id: "p-vis-pcl", source: "pcl", target: "proj-vision" },
  { id: "p-vis-cam", source: "camera-calib", target: "proj-vision" },
  { id: "p-vis-ros", source: "ros", target: "proj-vision" },

  // Skills → Projects: Hydrogen USV
  { id: "p-usv-ros", source: "ros", target: "proj-usv" },
  { id: "p-usv-sw", source: "solidworks", target: "proj-usv" },
  { id: "p-usv-py", source: "python", target: "proj-usv" },
  { id: "p-usv-lidar", source: "lidar", target: "proj-usv" },
  { id: "p-usv-vd", source: "vehicle-dyn", target: "proj-usv" },

  // Skills → Projects: Mechanical Arm
  { id: "p-arm-ros", source: "ros", target: "proj-mech-arm" },
  { id: "p-arm-gazebo", source: "gazebo", target: "proj-mech-arm" },
  { id: "p-arm-py", source: "python", target: "proj-mech-arm" },

  // Skills → Projects: Radar Station
  { id: "p-rad-cpp", source: "cpp", target: "proj-radar" },
  { id: "p-rad-cv", source: "opencv", target: "proj-radar" },
  { id: "p-rad-yolo", source: "yolo", target: "proj-radar" },
  { id: "p-rad-ros", source: "ros", target: "proj-radar" },
  { id: "p-rad-linux", source: "linux", target: "proj-radar" },
];

// ============================================
// Build adjacency lookup
// ============================================
export function buildAdjacency(edges: MapEdge[]): Map<string, Set<string>> {
  const adj = new Map<string, Set<string>>();
  for (const e of edges) {
    if (!adj.has(e.source)) adj.set(e.source, new Set());
    if (!adj.has(e.target)) adj.set(e.target, new Set());
    adj.get(e.source)!.add(e.target);
    adj.get(e.target)!.add(e.source);
  }
  return adj;
}

// ============================================
// Get connected nodes & edges (BFS 1 level)
// ============================================
export function getConnected(
  nodeId: string | null,
  allEdges: MapEdge[],
  adjacency: Map<string, Set<string>>,
): { connectedNodes: Set<string>; connectedEdges: Set<string> } {
  if (!nodeId) return { connectedNodes: new Set(), connectedEdges: new Set() };

  const connectedNodes = new Set<string>([nodeId]);
  const connectedEdges = new Set<string>();

  const neighbors = adjacency.get(nodeId);
  if (neighbors) {
    for (const neighbor of neighbors) {
      connectedNodes.add(neighbor);
      const edge = allEdges.find(
        (e) =>
          (e.source === nodeId && e.target === neighbor) ||
          (e.source === neighbor && e.target === nodeId),
      );
      if (edge) connectedEdges.add(edge.id);
    }
  }

  return { connectedNodes, connectedEdges };
}
