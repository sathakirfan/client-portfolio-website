'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, Building2 } from 'lucide-react';
import { getTestimonials } from '@/lib/portfolioData';
import { Testimonial } from '@/types/portfolio';

export const TestimonialsSection: React.FC = () => {
  const [items, setItems] = useState<Testimonial[]>([]);

  useEffect(() => {
    const load = () => setItems(getTestimonials());
    load();
    window.addEventListener('safthar_portfolio_data_changed', load);
    return () => window.removeEventListener('safthar_portfolio_data_changed', load);
  }, []);
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-[#FFFFFF] dark:bg-[#050816] transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-[#F5C242]/15 text-[#1A1A1A] dark:bg-[#3B82F6]/15 dark:text-[#3B82F6] border border-[#F5C242]/40 dark:border-[#3B82F6]/30 uppercase tracking-widest">
            ENDORSEMENTS & RECOMENDATIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] dark:text-[#F8FAFC] tracking-tight mt-4 mb-4">
            Professional Testimonials & <br />
            <span className="text-[#F5C242] dark:text-[#3B82F6]">
              Executive Endorsements
            </span>
          </h2>
          <p className="text-[#555555] dark:text-[#CBD5E1] text-base sm:text-lg">
            Feedback from senior operations managers, logistics supervisors, and bank document dispatch leads.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="saas-card p-8 flex flex-col justify-between group bg-white dark:bg-[#141D35] border-[#F2E6C9] dark:border-[#283454]"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-[#F5C242]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#F5C242]/30 dark:text-[#3B82F6]/30" />
                </div>

                <p className="text-sm text-[#555555] dark:text-[#CBD5E1] leading-relaxed mb-6 italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F2E6C9] dark:border-[#283454] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454] flex items-center justify-center font-bold text-[#1A1A1A] dark:text-[#F8FAFC]">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1A1A1A] dark:text-[#F8FAFC]">{item.name}</h4>
                  <p className="text-xs text-[#555555] dark:text-[#CBD5E1] flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-[#F5C242] dark:text-[#3B82F6]" />
                    {item.position} • {item.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
