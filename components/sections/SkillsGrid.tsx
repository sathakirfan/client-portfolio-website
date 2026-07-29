'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Send, 
  Zap, 
  CheckCircle2, 
  Database, 
  Layers, 
  BarChart3, 
  FileSpreadsheet, 
  Users, 
  ShieldAlert, 
  Briefcase 
} from 'lucide-react';
import { getSkills } from '@/lib/portfolioData';
import { Skill } from '@/types/portfolio';

const iconMap: Record<string, React.ElementType> = {
  Truck,
  Send,
  Zap,
  CheckCircle2,
  Database,
  Layers,
  BarChart3,
  FileSpreadsheet,
  Users,
  ShieldAlert,
  Briefcase
};

export const SkillsGrid: React.FC = () => {
  const [items, setItems] = useState<Skill[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  React.useEffect(() => {
    const load = () => setItems(getSkills());
    load();
    window.addEventListener('safthar_portfolio_data_changed', load);
    return () => window.removeEventListener('safthar_portfolio_data_changed', load);
  }, []);

  const categories = ['ALL', ...Array.from(new Set(items.map(s => s.category)))];

  const filteredSkills = activeCategory === 'ALL'
    ? items
    : items.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 lg:py-32 relative overflow-hidden bg-[#FFF8E8] dark:bg-[#10182E] border-y border-[#F2E6C9] dark:border-[#283454] transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-[#F5C242]/15 text-[#1A1A1A] dark:bg-[#3B82F6]/15 dark:text-[#3B82F6] border border-[#F5C242]/40 dark:border-[#3B82F6]/30 uppercase tracking-widest">
            CORE COMPETENCIES & TECH STACK
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] dark:text-[#F8FAFC] tracking-tight mt-4 mb-4">
            Operations, Systems & <br />
            <span className="text-[#F5C242] dark:text-[#3B82F6]">
              Technical Capabilities
            </span>
          </h2>
          <p className="text-[#555555] dark:text-[#CBD5E1] text-base sm:text-lg">
            Expertise across warehouse management systems, advanced MS Excel analytics, fleet scheduling, and quality assurance.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
                activeCategory === cat
                  ? 'bg-[#F5C242] dark:bg-[#3B82F6] text-[#1A1A1A] dark:text-white shadow-md scale-105'
                  : 'bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454] text-[#555555] dark:text-[#CBD5E1] hover:text-[#1A1A1A] dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Minimal Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => {
            const IconComp = iconMap[skill.iconName] || Database;

            return (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="saas-card p-6 sm:p-8 flex flex-col justify-between group bg-white dark:bg-[#141D35] border-[#F2E6C9] dark:border-[#283454]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454] flex items-center justify-center text-[#F5C242] dark:text-[#3B82F6] group-hover:scale-110 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-md bg-[#F5C242]/15 text-[#1A1A1A] dark:bg-[#3B82F6]/15 dark:text-[#3B82F6] border border-[#F5C242]/40 dark:border-[#3B82F6]/30">
                      {skill.category}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A] dark:text-[#F8FAFC] mb-2">{skill.name}</h3>
                  <p className="text-xs sm:text-sm text-[#555555] dark:text-[#CBD5E1] leading-relaxed">{skill.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

