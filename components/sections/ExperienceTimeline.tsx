'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Calendar, MapPin, TrendingUp, CheckCircle2 } from 'lucide-react';
import { getExperiences } from '@/lib/portfolioData';
import { Experience } from '@/types/portfolio';

export const ExperienceTimeline: React.FC = () => {
  const [items, setItems] = useState<Experience[]>([]);

  useEffect(() => {
    const load = () => setItems(getExperiences());
    load();
    window.addEventListener('safthar_portfolio_data_changed', load);
    return () => window.removeEventListener('safthar_portfolio_data_changed', load);
  }, []);

  return (
    <section id="experience" className="py-24 lg:py-32 relative overflow-hidden bg-[#FFFFFF] dark:bg-[#050816] transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 uppercase tracking-widest">
            PROVEN TRACK RECORD
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] dark:text-[#F8FAFC] tracking-tight mt-4 mb-4">
            Professional Experience & <br />
            <span className="text-[#F5C242] dark:text-[#3B82F6]">
              Logistics Leadership
            </span>
          </h2>
          <p className="text-[#555555] dark:text-[#CBD5E1] text-base sm:text-lg">
            Chronological progression across UAE courier freight operations, automotive emission testing, and industrial QA/QC NDT inspection.
          </p>
        </div>

        {/* Illuminated Vertical Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Glowing Line (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#F5C242] via-[#22C55E] to-transparent dark:from-[#3B82F6] dark:via-[#22C55E]" />

          <div className="space-y-12">
            {items.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div key={exp.id} className="relative flex flex-col lg:flex-row items-center">
                  
                  {/* Timeline Node Point (Desktop) */}
                  <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-9 h-9 rounded-full bg-white dark:bg-[#141D35] border-2 border-[#F5C242] dark:border-[#3B82F6] text-[#1A1A1A] dark:text-white items-center justify-center font-mono font-bold text-xs shadow-md z-20">
                    0{idx + 1}
                  </div>

                  {/* Left or Right Content Box */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className={`w-full lg:w-1/2 ${isEven ? 'lg:pr-12' : 'lg:pl-12 lg:ml-auto'}`}
                  >
                    <div className="saas-card p-8 sm:p-10 relative overflow-hidden group bg-white dark:bg-[#141D35] border-[#F2E6C9] dark:border-[#283454]">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="px-3.5 py-1 rounded-lg bg-[#F5C242]/15 dark:bg-[#3B82F6]/15 text-[#1A1A1A] dark:text-[#3B82F6] border border-[#F5C242]/40 dark:border-[#3B82F6]/30 font-mono text-xs font-bold flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.period}
                        </span>
                        <span className="text-xs font-mono text-[#555555] dark:text-[#CBD5E1] flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#22C55E]" />
                          {exp.location}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] dark:text-[#F8FAFC] mb-1 group-hover:text-[#F5C242] dark:group-hover:text-[#3B82F6] transition-colors">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-bold text-[#22C55E] flex items-center gap-2 mb-6">
                        <Building2 className="w-4 h-4" />
                        {exp.company}
                      </div>

                      {/* Responsibilities List */}
                      <ul className="space-y-2.5 mb-6">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i} className="text-xs sm:text-sm text-[#555555] dark:text-[#CBD5E1] flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F5C242] dark:bg-[#3B82F6] mt-2 shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Key Outcomes */}
                      <div className="pt-4 border-t border-[#F2E6C9] dark:border-[#283454] space-y-2">
                        <span className="text-[11px] font-mono text-[#555555] dark:text-[#CBD5E1] uppercase tracking-widest flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5 text-[#F5C242] dark:text-[#3B82F6]" />
                          KEY OUTCOMES ACHIEVED
                        </span>
                        <div className="space-y-1.5">
                          {exp.metrics.map((metric, mIdx) => (
                            <div key={mIdx} className="px-3.5 py-2.5 rounded-xl bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454] text-xs font-semibold text-[#1A1A1A] dark:text-white flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                              <span>{metric}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

