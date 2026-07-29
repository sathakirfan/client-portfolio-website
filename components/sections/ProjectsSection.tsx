'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { getProjects } from '@/lib/portfolioData';
import { Project } from '@/types/portfolio';

export const ProjectsSection: React.FC = () => {
  const [items, setItems] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  useEffect(() => {
    const load = () => setItems(getProjects());
    load();
    window.addEventListener('safthar_portfolio_data_changed', load);
    return () => window.removeEventListener('safthar_portfolio_data_changed', load);
  }, []);

  const categories = ['ALL', ...Array.from(new Set(items.map(p => p.category)))];

  const filteredProjects = activeFilter === 'ALL'
    ? items
    : items.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 lg:py-32 relative overflow-hidden bg-[#FFFFFF] dark:bg-[#050816] transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 uppercase tracking-widest">
            LOGISTICS CASE STUDIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] dark:text-[#F8FAFC] tracking-tight mt-4 mb-4">
            High-Impact Operations <br />
            <span className="text-[#F5C242] dark:text-[#3B82F6]">
              Optimization Projects
            </span>
          </h2>
          <p className="text-[#555555] dark:text-[#CBD5E1] text-base sm:text-lg">
            Real-world implementations delivered across UAE courier freight operations, fleet scheduling, and inventory control.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
                activeFilter === cat
                  ? 'bg-[#F5C242] dark:bg-[#3B82F6] text-[#1A1A1A] dark:text-white shadow-md scale-105'
                  : 'bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454] text-[#555555] dark:text-[#CBD5E1] hover:text-[#1A1A1A] dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Minimal Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((proj) => (
            <motion.div
              key={proj.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="saas-card overflow-hidden group flex flex-col justify-between bg-white dark:bg-[#141D35] border-[#F2E6C9] dark:border-[#283454]"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-64 w-full overflow-hidden bg-[#FFFDF7] dark:bg-[#0A1025]">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-85" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-lg bg-black/80 text-white text-xs font-mono font-bold border border-zinc-700 backdrop-blur-md">
                      {proj.category}
                    </span>
                  </div>

                  {proj.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-lg bg-[#22C55E]/20 text-[#22C55E] text-xs font-mono font-bold border border-[#22C55E]/40 backdrop-blur-md flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> FEATURED
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-[#F8FAFC] mb-3 group-hover:text-[#F5C242] dark:group-hover:text-[#3B82F6] transition-colors">
                    {proj.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-[#555555] dark:text-[#CBD5E1] mb-6 leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Impact Summary */}
                  <div className="p-4 rounded-xl bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454] mb-6">
                    <span className="text-[11px] font-mono font-bold text-[#F5C242] dark:text-[#3B82F6] uppercase tracking-wider block mb-1">
                      OPERATIONAL IMPACT
                    </span>
                    <p className="text-xs font-bold text-[#1A1A1A] dark:text-[#F8FAFC]">{proj.impact}</p>
                  </div>

                  {/* KPI Chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {proj.kpis.map((kpi, kIdx) => (
                      <span
                        key={kIdx}
                        className="px-3.5 py-1.5 rounded-lg bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454] text-xs font-mono font-bold text-[#22C55E] flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {kpi}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tags Footer */}
              <div className="p-6 sm:p-8 pt-0 border-t border-[#F2E6C9] dark:border-[#283454] flex flex-wrap items-center gap-2">
                {proj.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[11px] font-mono text-[#555555] dark:text-[#CBD5E1]">
                    #{tag}
                  </span>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

