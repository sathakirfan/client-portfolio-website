'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device supports fine cursor (desktop)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const clickable = target.closest('button, a, input, textarea, [role="button"], .cursor-pointer');
      setIsPointer(!!clickable);
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Outer Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-[#F5C242] dark:border-[#3B82F6]"
        animate={{
          x: position.x - (isPointer ? 20 : 12),
          y: position.y - (isPointer ? 20 : 12),
          width: isPointer ? 40 : 24,
          height: isPointer ? 40 : 24,
          backgroundColor: isPointer ? 'rgba(245, 194, 66, 0.15)' : 'transparent'
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350, mass: 0.3 }}
      />

      {/* Inner Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 w-2 h-2 rounded-full bg-[#F5C242] dark:bg-[#3B82F6]"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isPointer ? 1.5 : 1
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 500 }}
      />
    </>
  );
};
