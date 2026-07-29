'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, ShieldCheck } from 'lucide-react';
import { getCertificates } from '@/lib/portfolioData';
import { Certificate } from '@/types/portfolio';

export const AchievementsSection: React.FC = () => {
  const [items, setItems] = useState<Certificate[]>([]);

  useEffect(() => {
    const load = () => setItems(getCertificates());
    load();
    window.addEventListener('safthar_portfolio_data_changed', load);
    return () => window.removeEventListener('safthar_portfolio_data_changed', load);
  }, []);

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-[#FFF8E8] dark:bg-[#10182E] border-y border-[#F2E6C9] dark:border-[#283454] transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-[#F5C242]/15 text-[#1A1A1A] dark:bg-[#3B82F6]/15 dark:text-[#3B82F6] border border-[#F5C242]/40 dark:border-[#3B82F6]/30 uppercase tracking-widest flex items-center justify-center gap-1.5 w-fit mx-auto">
            <Trophy className="w-4 h-4 text-[#F5C242] dark:text-[#3B82F6]" />
            RECOGNITIONS & ACCREDITATIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] dark:text-[#F8FAFC] tracking-tight mt-4 mb-4">
            Professional Certifications & <br />
            <span className="text-[#F5C242] dark:text-[#3B82F6]">
              Quality Assurance Honors
            </span>
          </h2>
          <p className="text-[#555555] dark:text-[#CBD5E1] text-base sm:text-lg">
            Certified technical credentials spanning NDT quality testing, automotive BS6 emission engineering, and logistics operational honors.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="saas-card p-6 sm:p-8 flex flex-col justify-between group bg-white dark:bg-[#141D35] border-[#F2E6C9] dark:border-[#283454]"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F5C242]/15 dark:bg-[#3B82F6]/15 text-[#1A1A1A] dark:text-[#3B82F6] border border-[#F5C242]/40 dark:border-[#3B82F6]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>

                <span className="text-[10px] font-mono font-bold text-[#22C55E] uppercase tracking-wider block mb-1">
                  {item.issuer} • {item.issueDate}
                </span>

                <h3 className="text-lg font-bold text-[#1A1A1A] dark:text-[#F8FAFC] mb-3 group-hover:text-[#F5C242] dark:group-hover:text-[#3B82F6] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs font-mono font-bold text-[#555555] dark:text-[#CBD5E1] leading-relaxed mb-6">
                  ID: {item.credentialId}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F2E6C9] dark:border-[#283454] flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#22C55E]">
                <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED ACCREDITATION
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
