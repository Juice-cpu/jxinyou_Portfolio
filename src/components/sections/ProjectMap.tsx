"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { appleEase } from "@/lib/animations";
import {
  mapNodes,
  mapEdges,
  buildAdjacency,
  getConnected,
  type MapNode,
  type MapEdge,
} from "@/data/projectMap";

// ============================================
// Constants
// ============================================
const VIEWBOX = "0 0 1000 800";

// Pre-compute adjacency once
const adjacency = buildAdjacency(mapEdges);

// Node lookup map
const nodeMap = new Map<string, MapNode>();
mapNodes.forEach((n) => nodeMap.set(n.id, n));

// ============================================
// SVG Filter Definitions
// ============================================
function MapDefs() {
  return (
    <defs>
      {/* Glow filters at different intensities */}
      <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="glow-medium" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="glow-subtle" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Radial gradient for the center node pulse */}
      <radialGradient id="center-grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0071E3" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#0071E3" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

// ============================================
// Background Stars — static decorative dots
// ============================================
function BackgroundStars() {
  // Generate a fixed set of "star" positions for the tech-constellation feel
  const stars = useMemo(() => {
    const result: { x: number; y: number; r: number; opacity: number }[] = [];
    const seed = 42; // deterministic
    let s = seed;
    const rng = () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
    for (let i = 0; i < 60; i++) {
      result.push({
        x: rng() * 1000,
        y: rng() * 800,
        r: rng() * 1.5 + 0.5,
        opacity: rng() * 0.25 + 0.05,
      });
    }
    return result;
  }, []);

  return (
    <g>
      {stars.map((star, i) => (
        <circle
          key={i}
          cx={star.x}
          cy={star.y}
          r={star.r}
          fill="#86868B"
          opacity={star.opacity}
        />
      ))}
    </g>
  );
}

// ============================================
// FlowEdge — Animated connection line
// ============================================
function FlowEdge({
  edge,
  sourceNode,
  targetNode,
  isHighlighted,
  isDimmed,
  highlightColor,
}: {
  edge: MapEdge;
  sourceNode: MapNode;
  targetNode: MapNode;
  isHighlighted: boolean;
  isDimmed: boolean;
  highlightColor: string;
}) {
  return (
    <motion.line
      x1={sourceNode.x}
      y1={sourceNode.y}
      x2={targetNode.x}
      y2={targetNode.y}
      className="map-edge-flow"
      animate={{
        opacity: isDimmed ? 0.08 : isHighlighted ? 1 : 0.35,
        stroke: isHighlighted ? highlightColor : "#C7C7CC",
        strokeWidth: isHighlighted ? 2.2 : 1,
      }}
      transition={{
        duration: 0.4,
        ease: appleEase,
      }}
      style={{
        strokeDasharray: "6 5",
      }}
    />
  );
}

// ============================================
// MapNodeDot — Individual node circle + label
// ============================================
function MapNodeDot({
  node,
  isHighlighted,
  isDimmed,
  onHoverIn,
  onHoverOut,
}: {
  node: MapNode;
  isHighlighted: boolean;
  isDimmed: boolean;
  onHoverIn: () => void;
  onHoverOut: () => void;
}) {
  // Determine glow filter based on node type
  const glowFilter =
    node.type === "center"
      ? "url(#glow-strong)"
      : node.type === "category"
        ? "url(#glow-medium)"
        : "url(#glow-subtle)";

  // Determine label position
  const getLabelProps = () => {
    const offset = node.radius + 10;
    const isLeft = node.x < 500;
    const anchor = isLeft ? "end" : "start";
    switch (node.type) {
      case "center":
        return {
          x: node.x,
          y: node.y + node.radius + 22,
          textAnchor: "middle" as const,
          dominantBaseline: "hanging" as const,
          fontSize: 13,
          fontWeight: 600,
        };
      case "category":
        return {
          x: node.x + (isLeft ? -offset : offset),
          y: node.y,
          textAnchor: anchor as "end" | "start",
          dominantBaseline: "central" as const,
          fontSize: 12,
          fontWeight: 600,
        };
      case "project":
        return {
          x: node.x + (isLeft ? -offset - 2 : offset + 2),
          y: node.y,
          textAnchor: anchor as "end" | "start",
          dominantBaseline: "central" as const,
          fontSize: 10,
          fontWeight: 500,
        };
      case "skill":
      default:
        return {
          x: node.x + (isLeft ? -offset : offset),
          y: node.y,
          textAnchor: anchor as "end" | "start",
          dominantBaseline: "central" as const,
          fontSize: 9,
          fontWeight: 400,
        };
    }
  };

  const label = getLabelProps();

  // Calculate scale animation
  const scale = isHighlighted ? (node.type === "center" ? 1.15 : 1.35) : 1;

  return (
    <motion.g
      animate={{
        opacity: isDimmed ? 0.2 : 1,
      }}
      transition={{ duration: 0.35, ease: appleEase }}
      style={{ cursor: "pointer" }}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {/* Glow ring (visible on highlight) */}
      <motion.circle
        cx={node.x}
        cy={node.y}
        r={node.radius + 10}
        fill="none"
        stroke={node.glowColor}
        strokeWidth={1.5}
        animate={{
          opacity: isHighlighted ? 0.7 : 0,
          scale: isHighlighted ? 1.3 : 0.8,
          r: node.radius + (isHighlighted ? 14 : 10),
        }}
        transition={{ duration: 0.4, ease: appleEase }}
      />

      {/* Main node circle */}
      <motion.circle
        cx={node.x}
        cy={node.y}
        r={node.radius}
        fill={node.color}
        filter={isHighlighted ? glowFilter : "none"}
        animate={{
          scale,
          fill: isHighlighted ? node.color : node.color,
        }}
        transition={{
          scale: { type: "spring", stiffness: 300, damping: 20 },
          fill: { duration: 0.3 },
        }}
      />

      {/* Inner highlight dot (center only) */}
      {node.type === "center" && (
        <motion.circle
          cx={node.x}
          cy={node.y}
          r={8}
          fill="white"
          animate={{
            opacity: isHighlighted ? 0.9 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Node label */}
      <motion.text
        x={label.x}
        y={label.y}
        textAnchor={label.textAnchor}
        dominantBaseline={label.dominantBaseline}
        fill="#1D1D1F"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize={label.fontSize}
        fontWeight={label.fontWeight}
        animate={{
          opacity: isDimmed ? 0.15 : isHighlighted ? 1 : 0.7,
        }}
        transition={{ duration: 0.3 }}
        style={{ userSelect: "none", pointerEvents: "none" }}
      >
        {node.label}
      </motion.text>

      {/* Chinese label (for category & center nodes) */}
      {(node.type === "center" || node.type === "category") && (
        <motion.text
          x={label.x}
          y={label.y + (node.type === "center" ? 16 : 14)}
          textAnchor={label.textAnchor}
          dominantBaseline={label.dominantBaseline}
          fill="#86868B"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize={node.type === "center" ? 10 : 9}
          fontWeight={400}
          animate={{
            opacity: isDimmed ? 0.1 : isHighlighted ? 0.9 : 0.55,
          }}
          transition={{ duration: 0.3 }}
          style={{ userSelect: "none", pointerEvents: "none" }}
        >
          {node.labelZh}
        </motion.text>
      )}
    </motion.g>
  );
}

// ============================================
// ProjectMap — Main Section Component
// ============================================
export default function ProjectMap() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const { connectedNodes, connectedEdges } = useMemo(
    () => getConnected(hoveredId, mapEdges, adjacency),
    [hoveredId],
  );

  // Get highlight color from the hovered node (or its category)
  const highlightColor = useMemo(() => {
    if (!hoveredId) return "#0071E3";
    const node = nodeMap.get(hoveredId);
    return node?.color ?? "#0071E3";
  }, [hoveredId]);

  const handleHoverIn = useCallback((nodeId: string) => {
    setHoveredId(nodeId);
  }, []);

  const handleHoverOut = useCallback(() => {
    setHoveredId(null);
  }, []);

  const hasHover = hoveredId !== null;

  return (
    <section
      id="project-map"
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* --- Section Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center md:mb-12"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Project & Skill Map
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            项目与技能地图
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Hover over any node to see its connections — drag to explore the
            constellation
          </p>
        </motion.div>

        {/* --- Interactive hint --- */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-6 text-center text-xs text-muted-foreground"
        >
          💡 Hover over a node to highlight connected skills &amp; projects
        </motion.p>

        {/* --- SVG Map --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: appleEase }}
          className="relative mx-auto w-full max-w-[1000px]"
        >
          <svg
            viewBox={VIEWBOX}
            className="h-auto w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <MapDefs />

            {/* Background stars */}
            <BackgroundStars />

            {/* ── Center pulse ring ── */}
            <motion.circle
              cx={500}
              cy={360}
              r={60}
              fill="url(#center-grad)"
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}
            />

            {/* ── Edges Layer ── */}
            <g>
              {mapEdges.map((edge) => {
                const sourceNode = nodeMap.get(edge.source);
                const targetNode = nodeMap.get(edge.target);
                if (!sourceNode || !targetNode) return null;

                return (
                  <FlowEdge
                    key={edge.id}
                    edge={edge}
                    sourceNode={sourceNode}
                    targetNode={targetNode}
                    isHighlighted={
                      hasHover && connectedEdges.has(edge.id)
                    }
                    isDimmed={hasHover && !connectedEdges.has(edge.id)}
                    highlightColor={highlightColor}
                  />
                );
              })}
            </g>

            {/* ── Nodes Layer ── */}
            <g>
              {/* Render in order: projects first (bottom), then skills, categories, center (top) */}
              {mapNodes
                .sort((a, b) => {
                  const order = {
                    center: 3,
                    category: 2,
                    skill: 1,
                    project: 0,
                  };
                  return order[a.type] - order[b.type];
                })
                .map((node) => (
                  <MapNodeDot
                    key={node.id}
                    node={node}
                    isHighlighted={
                      hasHover && connectedNodes.has(node.id)
                    }
                    isDimmed={hasHover && !connectedNodes.has(node.id)}
                    onHoverIn={() => handleHoverIn(node.id)}
                    onHoverOut={handleHoverOut}
                  />
                ))}
            </g>
          </svg>
        </motion.div>

        {/* --- Legend --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-5 text-xs text-muted-foreground"
        >
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-full bg-[#10B981]" />
            Mechanical / 3D
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-full bg-[#EF4444]" />
            Embedded / Hardware
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-full bg-[#8B5CF6]" />
            Software / Algorithms
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-full bg-[#F59E0B]" />
            Projects
          </span>
        </motion.div>
      </div>
    </section>
  );
}
