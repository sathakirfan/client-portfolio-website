'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const SubtleLogisticsBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-30">
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(rgba(245, 194, 66, 0.15) 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />

      {/* SVG Container Shipping & Air Freight Telemetry Routes */}
      <svg className="w-full h-full min-w-[1000px] absolute inset-0" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5C242" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#22C55E" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#F5C242" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="darkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#4F8CFF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#6EA8FE" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Animated Telemetry Path 1 (Jebel Ali Port -> Dubai Airport -> DXB Hub) */}
        <motion.path
          d="M 50,200 Q 350,80 750,220 T 1350,150"
          fill="none"
          stroke="url(#lightGradient)"
          strokeWidth="2"
          strokeDasharray="8 8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="dark:hidden"
        />
        <motion.path
          d="M 50,200 Q 350,80 750,220 T 1350,150"
          fill="none"
          stroke="url(#darkGradient)"
          strokeWidth="2"
          strokeDasharray="8 8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="hidden dark:block"
        />

        {/* Animated Telemetry Path 2 (Abu Dhabi -> Sharjah -> Al Maktoum Intl) */}
        <motion.path
          d="M 100,450 Q 500,300 900,480 T 1400,380"
          fill="none"
          stroke="#F5C242"
          strokeWidth="1.5"
          strokeOpacity="0.25"
          strokeDasharray="6 6"
          className="dark:hidden"
        />
        <motion.path
          d="M 100,450 Q 500,300 900,480 T 1400,380"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="1.5"
          strokeOpacity="0.3"
          strokeDasharray="6 6"
          className="hidden dark:block"
        />
      </svg>

      {/* Floating Animated Radar Nodes */}
      <motion.div 
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-[#F5C242] dark:bg-[#3B82F6] shadow-[0_0_12px_rgba(245,194,66,0.8)] dark:shadow-[0_0_12px_rgba(59,130,246,0.8)]"
      />
      <motion.div 
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="absolute top-2/3 right-1/4 w-3 h-3 rounded-full bg-[#22C55E] shadow-[0_0_12px_rgba(34,197,94,0.8)]"
      />

    </div>
  );
};
