'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Boxes, 
  Globe2, 
  ShieldCheck, 
  Users, 
  FileSpreadsheet,
  GraduationCap,
  Languages
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: Boxes,
      title: 'Inbound/Outbound & Document Logistics',
      description: 'Handling 400+ daily shipments and 5,000+ confidential bank documents with 99% inventory accuracy and strict SLA compliance.'
    },
    {
      icon: Users,
      title: '100+ Driver Fleet Coordination',
      description: 'Supervising and scheduling 100+ delivery courier drivers, optimizing route allocation, manpower planning, and last-mile delivery TAT.'
    },
    {
      icon: FileSpreadsheet,
      title: 'Advanced MS Excel & MIS Analytics',
      description: 'Generating daily MIS dashboards, KPI tracking, and shipment performance analysis using Pivot Tables, XLOOKUP, VLOOKUP & WMS.'
    },
    {
      icon: ShieldCheck,
      title: 'Quality & Technical Engineering',
      description: 'Background in Mechanical Engineering, BS6 dynamometer emission testing (Royal Enfield), and certified NDT QA/QC inspections.'
    }
  ];

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden bg-[#FFF8E8] dark:bg-[#10182E] border-y border-[#F2E6C9] dark:border-[#283454] transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-[#F5C242]/15 text-[#1A1A1A] dark:bg-[#3B82F6]/15 dark:text-[#3B82F6] border border-[#F5C242]/40 dark:border-[#3B82F6]/30 uppercase tracking-widest">
            PROFESSIONAL SUMMARY
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] dark:text-[#F8FAFC] tracking-tight mt-4 mb-4">
            Warehouse Operations & Last-Mile <br />
            <span className="text-[#F5C242] dark:text-[#3B82F6]">
              Process Control Specialist
            </span>
          </h2>
          <p className="text-[#555555] dark:text-[#CBD5E1] text-base sm:text-lg leading-relaxed">
            Results-oriented Warehouse & Operations Professional with 2+ years of UAE experience at Eco Express Courier & Freight Services L.L.C, 
            managing high-security document logistics, inventory accuracy, and last-mile fleet dispatch.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          
          {/* Left Column: Summary Card */}
          <div className="lg:col-span-7">
            <div className="saas-card p-8 sm:p-10 relative overflow-hidden bg-white dark:bg-[#141D35] border-[#F2E6C9] dark:border-[#283454]">
              <h3 className="text-2xl font-bold text-[#1A1A1A] dark:text-[#F8FAFC] mb-4 flex items-center gap-2.5">
                <Globe2 className="w-6 h-6 text-[#F5C242] dark:text-[#3B82F6]" />
                Dubai, UAE Warehouse Leadership
              </h3>

              <p className="text-[#555555] dark:text-[#CBD5E1] leading-relaxed text-sm sm:text-base mb-6">
                Experienced in inventory control, FIFO management, dispatch planning, Return to Origin (RTO) handling, KPI monitoring, and TAT optimization. Supervised multi-functional teams of 100+ delivery drivers and improved operational delivery success rates through structured process control.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#F2E6C9] dark:border-[#283454]">
                <div className="p-4 rounded-xl bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454]">
                  <span className="text-[11px] font-mono text-[#F5C242] dark:text-[#3B82F6] uppercase font-bold flex items-center gap-1.5 mb-1">
                    <GraduationCap className="w-4 h-4" /> EDUCATION & DIPLOMA
                  </span>
                  <p className="text-xs font-bold text-[#1A1A1A] dark:text-[#F8FAFC]">Diploma in Mechanical Engineering</p>
                  <p className="text-[11px] text-[#555555] dark:text-[#CBD5E1]">Aalim Muhammed Salegh Polytechnic College (2019)</p>
                </div>

                <div className="p-4 rounded-xl bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454]">
                  <span className="text-[11px] font-mono text-[#22C55E] uppercase font-bold flex items-center gap-1.5 mb-1">
                    <Languages className="w-4 h-4" /> MULTILINGUAL FLUENCY
                  </span>
                  <p className="text-xs font-bold text-[#1A1A1A] dark:text-[#F8FAFC]">English, Tamil, Hindi, Malayalam</p>
                  <p className="text-[11px] text-[#555555] dark:text-[#CBD5E1]">Immediately Available in Dubai, UAE</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Metric Highlights */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="saas-card p-6 text-center bg-white dark:bg-[#141D35] border-[#F2E6C9] dark:border-[#283454]">
              <span className="text-4xl font-extrabold font-mono text-[#F5C242] dark:text-[#3B82F6]">400+</span>
              <p className="text-xs font-semibold text-[#555555] dark:text-[#CBD5E1] mt-2 uppercase tracking-wider">Daily Shipments</p>
            </div>
            <div className="saas-card p-6 text-center bg-white dark:bg-[#141D35] border-[#F2E6C9] dark:border-[#283454]">
              <span className="text-4xl font-extrabold font-mono text-[#22C55E]">5,000+</span>
              <p className="text-xs font-semibold text-[#555555] dark:text-[#CBD5E1] mt-2 uppercase tracking-wider">Bank Docs Handled</p>
            </div>
            <div className="saas-card p-6 text-center bg-white dark:bg-[#141D35] border-[#F2E6C9] dark:border-[#283454]">
              <span className="text-4xl font-extrabold font-mono text-[#22C55E]">99%</span>
              <p className="text-xs font-semibold text-[#555555] dark:text-[#CBD5E1] mt-2 uppercase tracking-wider">Inventory Precision</p>
            </div>
            <div className="saas-card p-6 text-center bg-white dark:bg-[#141D35] border-[#F2E6C9] dark:border-[#283454]">
              <span className="text-4xl font-extrabold font-mono text-[#F5C242] dark:text-[#3B82F6]">100+</span>
              <p className="text-xs font-semibold text-[#555555] dark:text-[#CBD5E1] mt-2 uppercase tracking-wider">Drivers Scheduled</p>
            </div>
          </div>

        </div>

        {/* 4 Pillars Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="saas-card p-6 sm:p-8 flex flex-col justify-between group bg-white dark:bg-[#141D35] border-[#F2E6C9] dark:border-[#283454]"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#F5C242]/15 dark:bg-[#3B82F6]/15 border border-[#F5C242]/40 dark:border-[#3B82F6]/30 flex items-center justify-center text-[#1A1A1A] dark:text-[#3B82F6] mb-5 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-[#1A1A1A] dark:text-[#F8FAFC] mb-2">{pillar.title}</h4>
                  <p className="text-xs text-[#555555] dark:text-[#CBD5E1] leading-relaxed">{pillar.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

