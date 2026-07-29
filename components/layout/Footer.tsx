'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Mail, 
  MapPin, 
  ArrowUp,
  Download
} from 'lucide-react';
import { siteSettings } from '@/lib/data';

interface FooterProps {
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FFFDF7] dark:bg-[#050816] border-t border-[#F2E6C9] dark:border-[#283454] text-[#1A1A1A] dark:text-[#F8FAFC] py-16 transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#F2E6C9] dark:border-[#283454]">
          
          {/* Brand & Overview */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5C242] dark:bg-[#3B82F6] flex items-center justify-center text-[#1A1A1A] dark:text-white font-bold shadow-md">
                <Building2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-lg text-[#1A1A1A] dark:text-[#F8FAFC]">
                MOHAMED SAFTHAR
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#555555] dark:text-[#CBD5E1] leading-relaxed max-w-md">
              Warehouse In-Charge & Operations Lead specializing in 400+ daily courier freight shipments, confidential bank document handling, 100+ driver fleet dispatch, and 99% inventory accuracy in Dubai, UAE.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#555555] dark:text-[#CBD5E1]">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#22C55E]" /> Dubai, UAE</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#F5C242] dark:text-[#3B82F6]" /> {siteSettings.contactEmail}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-mono font-bold text-[#F5C242] dark:text-[#3B82F6] uppercase tracking-wider mb-3">
                NAVIGATION
              </h4>
              <ul className="space-y-2 text-xs font-semibold text-[#555555] dark:text-[#CBD5E1]">
                <li><a href="#hero" className="hover:text-[#1A1A1A] dark:hover:text-white transition-colors">Overview</a></li>
                <li><a href="#about" className="hover:text-[#1A1A1A] dark:hover:text-white transition-colors">Summary</a></li>
                <li><a href="#experience" className="hover:text-[#1A1A1A] dark:hover:text-white transition-colors">Experience</a></li>
                <li><a href="#skills" className="hover:text-[#1A1A1A] dark:hover:text-white transition-colors">Capabilities</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold text-[#F5C242] dark:text-[#3B82F6] uppercase tracking-wider mb-3">
                PORTFOLIO HUBS
              </h4>
              <ul className="space-y-2 text-xs font-semibold text-[#555555] dark:text-[#CBD5E1]">
                <li><a href="#projects" className="hover:text-[#1A1A1A] dark:hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#gallery" className="hover:text-[#1A1A1A] dark:hover:text-white transition-colors">Facility Gallery</a></li>
                <li><a href="#contact" className="hover:text-[#1A1A1A] dark:hover:text-white transition-colors">Direct Contact</a></li>
                <li><Link href="/admin" className="hover:text-[#1A1A1A] dark:hover:text-white transition-colors">Admin Portal</Link></li>
              </ul>
            </div>
          </div>

          {/* Download & Scroll Actions */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end gap-4">
            <button
              onClick={onOpenResume}
              className="saas-button-luxury w-full md:w-auto text-xs px-6 py-3"
            >
              <Download className="w-4 h-4" />
              <span>Download CV (PDF)</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-3 rounded-xl bg-[#FFF8E8] dark:bg-[#10182E] border border-[#F2E6C9] dark:border-[#283454] text-[#1A1A1A] dark:text-white hover:border-[#F5C242] dark:hover:border-[#3B82F6] flex items-center gap-2 text-xs font-bold transition-all"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4 text-[#F5C242] dark:text-[#3B82F6]" />
              <span>Back to Top</span>
            </button>
          </div>

        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#555555] dark:text-[#CBD5E1] gap-4">
          <p>© {new Date().getFullYear()} Mohamed Safthar Hussain K. All rights reserved.</p>
          <p className="font-mono text-[11px]">Designed & Engineered for Enterprise UAE Operations</p>
        </div>

      </div>
    </footer>
  );
};
