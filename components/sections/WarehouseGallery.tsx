'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, Maximize2, X } from 'lucide-react';
import { getGalleryItems } from '@/lib/portfolioData';
import { GalleryItem } from '@/types/portfolio';

export const WarehouseGallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const load = () => setItems(getGalleryItems());
    load();
    window.addEventListener('safthar_portfolio_data_changed', load);
    return () => window.removeEventListener('safthar_portfolio_data_changed', load);
  }, []);

  const categories = ['ALL', ...Array.from(new Set(items.map(i => i.category)))];

  const filteredItems = selectedFilter === 'ALL'
    ? items
    : items.filter(item => item.category === selectedFilter);

  return (
    <section id="gallery" className="py-24 lg:py-32 relative overflow-hidden bg-[#FFF8E8] dark:bg-[#10182E] border-y border-[#F2E6C9] dark:border-[#283454] transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-[#F5C242]/15 text-[#1A1A1A] dark:bg-[#3B82F6]/15 dark:text-[#3B82F6] border border-[#F5C242]/40 dark:border-[#3B82F6]/30 uppercase tracking-widest flex items-center justify-center gap-1.5 w-fit mx-auto">
            <Camera className="w-4 h-4" />
            OPERATIONAL FACILITY GALLERY
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] dark:text-[#F8FAFC] tracking-tight mt-4 mb-4">
            Operations, Fleet & Technical <br />
            <span className="text-[#F5C242] dark:text-[#3B82F6]">
              Facility Visuals
            </span>
          </h2>
          <p className="text-[#555555] dark:text-[#CBD5E1] text-base sm:text-lg">
            High-resolution visual documentation of express courier document sorting, 100+ driver fleet dispatch, engine dynamometer testing, and QA/QC NDT inspections.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
                selectedFilter === cat
                  ? 'bg-[#F5C242] dark:bg-[#3B82F6] text-[#1A1A1A] dark:text-white shadow-md scale-105'
                  : 'bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454] text-[#555555] dark:text-[#CBD5E1] hover:text-[#1A1A1A] dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveModalItem(item)}
              className="saas-card overflow-hidden group cursor-pointer hover:border-[#F5C242] dark:hover:border-[#3B82F6] flex flex-col bg-white dark:bg-[#141D35] border-[#F2E6C9] dark:border-[#283454]"
            >
              <div className="relative h-60 w-full overflow-hidden bg-[#FFFDF7] dark:bg-[#0A1025]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                <div className="absolute top-3 right-3 p-2 rounded-xl bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F5C242]/30 text-yellow-200 text-[10px] font-mono font-bold border border-[#F5C242]/50 mb-1 inline-block backdrop-blur-md">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold text-white leading-snug">{item.title}</h3>
                </div>
              </div>
              <div className="p-4 bg-[#FFFDF7] dark:bg-[#0A1025] text-[11px] font-mono font-bold text-[#555555] dark:text-[#CBD5E1] flex items-center gap-1.5 border-t border-[#F2E6C9] dark:border-[#283454]">
                <MapPin className="w-3.5 h-3.5 text-[#22C55E]" />
                {item.location}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl w-full saas-card overflow-hidden relative border-[#F5C242]/40 dark:border-[#3B82F6]/40 bg-white dark:bg-[#141D35]"
            >
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/80 text-white hover:text-[#F5C242] z-20 border border-zinc-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-80 sm:h-[420px] w-full bg-black">
                <img
                  src={activeModalItem.imageUrl}
                  alt={activeModalItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 bg-[#FFFDF7] dark:bg-[#0A1025] text-[#1A1A1A] dark:text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-lg bg-[#F5C242]/20 text-[#1A1A1A] dark:text-yellow-300 text-xs font-mono font-bold border border-[#F5C242]/40">
                    {activeModalItem.category}
                  </span>
                  <span className="text-xs font-mono text-[#555555] dark:text-zinc-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#22C55E]" />
                    {activeModalItem.location}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mb-2">{activeModalItem.title}</h3>
                <p className="text-sm text-[#555555] dark:text-zinc-300 leading-relaxed">{activeModalItem.description}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

