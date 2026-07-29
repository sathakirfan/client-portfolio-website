'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Send, 
  Sparkles, 
  CheckCircle2,
  PackageCheck,
  RotateCw,
  User,
  Calendar,
  Globe,
  Languages,
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';
import { SubtleLogisticsBackground } from './SubtleLogisticsBackground';
import { heroStats } from '@/lib/data';
import { getSiteSettings } from '@/lib/portfolioData';
import { downloadResumePDF } from '@/lib/utils';
import { SiteSettings } from '@/types/portfolio';

interface HeroSectionProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());

  useEffect(() => {
    const load = () => setSettings(getSiteSettings());
    load();
    window.addEventListener('safthar_portfolio_data_changed', load);
    return () => window.removeEventListener('safthar_portfolio_data_changed', load);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-28 flex flex-col justify-center overflow-hidden bg-[#FFFFFF] dark:bg-[#050816] transition-colors duration-500">
      {/* Container Shipping Ocean Logistics Telemetry Background */}
      <SubtleLogisticsBackground />

      {/* Hero Content Container (Max width 1400px) */}
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 z-10 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 lg:mb-20">
          
          {/* Left Column: Core Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Availability Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5C242]/15 dark:bg-[#3B82F6]/15 border border-[#F5C242]/40 dark:border-[#3B82F6]/30 backdrop-blur-md shadow-xs"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22C55E]"></span>
              </span>
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wide text-[#1A1A1A] dark:text-[#CBD5E1] uppercase">
                AVAILABLE FOR UAE RECRUITMENT • DUBAI
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#F5C242] dark:text-[#3B82F6]" />
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1A1A1A] dark:text-[#F8FAFC] leading-[1.1] mb-5">
                WAREHOUSE IN-CHARGE & <br />
                <span className="text-[#F5C242] dark:text-[#3B82F6] font-black">
                  OPERATIONS LEADER
                </span>
              </h1>
              
              <p className="text-base sm:text-xl text-[#555555] dark:text-[#CBD5E1] font-normal leading-relaxed max-w-2xl">
                Supervising 400+ daily shipments, 5,000+ confidential bank documents, 100+ delivery driver scheduling, 
                99% inventory accuracy, and last-mile dispatch at Eco Express Courier & Freight UAE.
              </p>
            </motion.div>

            {/* CTA Button Group */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
            >
              <button
                onClick={() => {
                  downloadResumePDF();
                  onOpenResume();
                }}
                className="saas-button-luxury px-8 py-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 min-h-[48px]"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>Download Resume (PDF)</span>
              </button>

              <a
                href="#contact"
                className="saas-button-secondary px-8 py-4 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 min-h-[48px]"
              >
                <Send className="w-4 h-4 text-[#F5C242] dark:text-[#3B82F6]" />
                <span>Contact Mohamed Safthar</span>
              </a>
            </motion.div>

          </div>

          {/* Right Column: 3D Flip Card Photo & Credentials */}
          <div className="lg:col-span-5 flex justify-center">
            
            <div 
              className="relative w-full max-w-sm h-[440px] sm:h-[460px] cursor-pointer"
              style={{ perspective: '1200px' }}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <motion.div
                className="w-full h-full relative"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                
                {/* FRONT SIDE: Candidate Photo */}
                <div 
                  className="absolute inset-0 w-full h-full saas-card p-4 flex flex-col justify-between shadow-2xl bg-white dark:bg-[#141D35] border-[#F2E6C9] dark:border-[#283454]"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                  {/* Photo Frame Container */}
                  <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454]">
                    <img
                      src="/safthar-pic.jpeg"
                      alt="Mohamed Safthar Hussain K"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-3 py-1.5 rounded-lg bg-black/80 text-white text-xs font-mono font-bold border border-zinc-700 backdrop-blur-md">
                        MOHAMED SAFTHAR HUSSAIN K
                      </span>
                    </div>
                  </div>

                  {/* Interactive Bottom Bar */}
                  <div className="p-3 rounded-xl bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#22C55E] font-bold">
                      <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
                      Dubai • Available Now
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFlipped(true);
                      }}
                      className="text-[11px] font-mono font-bold text-[#1A1A1A] dark:text-[#3B82F6] flex items-center gap-1.5 bg-[#F5C242]/15 dark:bg-[#3B82F6]/15 px-3 py-1.5 rounded-lg border border-[#F5C242]/40 dark:border-[#3B82F6]/30 transition-all hover:scale-105"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Flip Card</span>
                    </button>
                  </div>

                </div>

                {/* BACK SIDE: Personal & Credentials Details */}
                <div 
                  className="absolute inset-0 w-full h-full saas-card p-6 flex flex-col justify-between shadow-2xl bg-[#FFFDF7] dark:bg-[#0A1025] text-[#1A1A1A] dark:text-[#F8FAFC] border-[#F2E6C9] dark:border-[#283454]"
                  style={{ 
                    backfaceVisibility: 'hidden', 
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)' 
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[#F2E6C9] dark:border-[#283454] mb-4">
                      <span className="text-xs font-mono font-bold text-[#F5C242] dark:text-[#3B82F6] flex items-center gap-1.5">
                        <User className="w-4 h-4 text-[#F5C242] dark:text-[#3B82F6]" />
                        PERSONAL CREDENTIALS
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsFlipped(false);
                        }}
                        className="text-[10px] font-mono text-[#555555] dark:text-zinc-300 hover:text-[#1A1A1A] dark:hover:text-white flex items-center gap-1 bg-[#FFF8E8] dark:bg-[#1B2542] px-2.5 py-1 rounded-lg border border-[#F2E6C9] dark:border-[#283454] transition-colors"
                      >
                        <RotateCw className="w-3 h-3 text-[#F5C242] dark:text-[#3B82F6]" /> Flip Back
                      </button>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#555555] dark:text-zinc-400 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#F5C242] dark:text-[#3B82F6]" /> Date of Birth:</span>
                        <span className="font-bold text-[#1A1A1A] dark:text-white">05 Apr 1999</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[#555555] dark:text-zinc-400 flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-[#22C55E]" /> Nationality:</span>
                        <span className="font-bold text-[#1A1A1A] dark:text-white">Indian (Passport: U5712783)</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[#555555] dark:text-zinc-400 flex items-center gap-1.5"><Languages className="w-3.5 h-3.5 text-[#F5C242] dark:text-[#3B82F6]" /> Languages:</span>
                        <span className="font-bold text-[#22C55E]">English, Tamil, Hindi, Malayalam</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[#555555] dark:text-zinc-400 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#22C55E]" /> Location:</span>
                        <span className="font-bold text-[#1A1A1A] dark:text-white">Dubai, UAE</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[#555555] dark:text-zinc-400 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#F5C242] dark:text-[#3B82F6]" /> Phone/WA:</span>
                        <span className="font-bold text-[#F5C242] dark:text-[#3B82F6]">{settings.whatsappNumber}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[#555555] dark:text-zinc-400 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#22C55E]" /> Email:</span>
                        <span className="font-semibold text-xs text-[#1A1A1A] dark:text-white truncate max-w-[170px]">{settings.contactEmail}</span>
                      </div>

                      <div className="pt-2 border-t border-[#F2E6C9] dark:border-[#283454] space-y-1">
                        <div className="text-[11px] font-mono text-[#F5C242] dark:text-[#3B82F6] flex items-center gap-1">
                          <GraduationCap className="w-3.5 h-3.5" /> Diploma in Mechanical Engineering (2019)
                        </div>
                        <div className="text-[11px] font-mono text-[#22C55E] flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> NDT (UT, MT, PT, VT, LT) | QA/QC Certified
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#F5C242]/15 dark:bg-[#3B82F6]/15 border border-[#F5C242]/40 dark:border-[#3B82F6]/30 text-center">
                    <span className="text-[10px] font-mono text-[#1A1A1A] dark:text-[#3B82F6] font-bold">
                      ⚡ Immediately Available for UAE Joining
                    </span>
                  </div>

                </div>

              </motion.div>
            </div>

          </div>

        </div>

        {/* Minimal Animated KPI Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4"
        >
          {heroStats.map((stat, idx) => (
            <div
              key={idx}
              className="saas-card p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden bg-white dark:bg-[#141D35] border-[#F2E6C9] dark:border-[#283454]"
            >
              <div className="absolute top-0 right-0 p-3 opacity-15">
                <PackageCheck className="w-7 h-7 text-[#F5C242] dark:text-[#3B82F6]" />
              </div>
              <span className="text-2xl sm:text-4xl font-extrabold font-mono text-[#1A1A1A] dark:text-[#F8FAFC] tracking-tight">
                {stat.value}{stat.suffix}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-[#555555] dark:text-[#CBD5E1] mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

