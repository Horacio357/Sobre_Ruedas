'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RadarData {
  label: string;
  value: number; // 0 to 100
}

interface RadarChartProps {
  data: RadarData[];
  size?: number;
  color?: string;
  className?: string;
}

export default function RadarChart({ 
  data, 
  size = 200, 
  color = '#D97230',
  className = '' 
}: RadarChartProps) {
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = (size / 2) * 0.7; // Leave space for labels
  const angleStep = (Math.PI * 2) / data.length;

  // Helper to get coordinates
  const getCoords = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2; // Start from top
    const r = (value / 100) * radius;
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
    };
  };

  // Generate axes lines
  const axes = data.map((_, i) => {
    const end = getCoords(100, i);
    return (
      <line
        key={`axis-${i}`}
        x1={centerX}
        y1={centerY}
        x2={end.x}
        y2={end.y}
        stroke="#EAE3D9"
        strokeWidth="1"
      />
    );
  });

  // Generate background circles/polygons
  const backgroundLevels = [25, 50, 75, 100].map((level) => {
    const points = data.map((_, i) => {
      const p = getCoords(level, i);
      return `${p.x},${p.y}`;
    }).join(' ');
    return (
      <polygon
        key={`bg-${level}`}
        points={points}
        fill="none"
        stroke="#EAE3D9"
        strokeWidth="0.5"
        strokeDasharray={level === 100 ? "0" : "2,2"}
      />
    );
  });

  // Generate data path
  const dataPoints = data.map((d, i) => {
    const p = getCoords(d.value, i);
    return `${p.x},${p.y}`;
  }).join(' ');

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Background */}
        {backgroundLevels}
        {axes}

        {/* Data Area */}
        <motion.polygon
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          points={dataPoints}
          fill={color}
          style={{ transformOrigin: `${centerX}px ${centerY}px` }}
        />

        {/* Data Outline */}
        <motion.polygon
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          points={dataPoints}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Data Points (Dots) */}
        {data.map((d, i) => {
          const p = getCoords(d.value, i);
          return (
            <motion.circle
              key={`dot-${i}`}
              initial={{ r: 0 }}
              animate={{ r: 3 }}
              transition={{ delay: 1 + i * 0.1 }}
              cx={p.x}
              cy={p.y}
              fill={color}
              stroke="white"
              strokeWidth="1"
            />
          );
        })}

        {/* Labels */}
        {data.map((d, i) => {
          const p = getCoords(115, i); // Place labels outside
          return (
            <text
              key={`label-${i}`}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[8px] md:text-[9px] font-black uppercase tracking-widest fill-sr-gray-400"
            >
              {d.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
