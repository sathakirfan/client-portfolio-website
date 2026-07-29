'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2 } from 'lucide-react';

export const PageLoader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFFFFF] dark:bg-[#050816] transition-colors duration-500 pointer-events-none"
        >
          <div className="relative flex flex-col items-center gap-6">
            
            {/* Animated Brand Logo Icon */}
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="w-20 h-20 rounded-2xl border-2 border-dashed border-[#F5C242] dark:border-[#3B82F6]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-xl bg-[#F5C242] dark:bg-[#3B82F6] text-[#1A1A1A] dark:text-white flex items-center justify-center shadow-lg">
                  <Building2 className="w-6 h-6 stroke-[2.5]" />
                </div>
              </div>
            </div>

            {/* Text Loader */}
            <div className="text-center space-y-1.5">
              <h3 className="text-sm font-extrabold tracking-wider text-[#1A1A1A] dark:text-[#F8FAFC]">
                MOHAMED SAFTHAR
              </h3>
              <p className="text-[11px] font-mono text-[#555555] dark:text-[#CBD5E1] tracking-widest uppercase">
                INITIALIZING WAREHOUSE CONTROL CENTER...
              </p>
            </div>

            {/* Loading Progress Line */}
            <div className="w-48 h-1 rounded-full bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="h-full bg-[#F5C242] dark:bg-[#3B82F6]"
              />
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
