'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Clock, 
  Terminal, 
  Download, 
  ShieldCheck, 
  Menu, 
  X 
} from 'lucide-react';
import { useTheme } from '@/components/context/ThemeContext';
import { trackDownload } from '@/lib/firebase';

interface NavbarProps {
  onOpenCommand: () => void;
  onOpenResume: () => void;
  audioPlaying: boolean;
  toggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommand,
  onOpenResume,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [uaeTime, setUaeTime] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 90) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Dubai Clock (GST UTC+4)
    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dubai',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setUaeTime(formatter.format(new Date()) + ' GST');
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, [lastScrollY]);

  const navItems = [
    { label: 'Overview', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Systems', href: '#skills' },
    { label: 'Case Studies', href: '#projects' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-40 py-3 sm:py-4 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-[1400px] mx-auto saas-nav px-4 py-2.5 rounded-2xl flex items-center justify-between gap-3 shadow-xl">
        
        {/* Brand & Dubai Clock */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#F5C242] dark:bg-[#3B82F6] flex items-center justify-center text-[#1A1A1A] dark:text-white font-bold shadow-md group-hover:scale-105 transition-transform duration-300">
              <Building2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-extrabold tracking-tight text-xs sm:text-sm text-[#1A1A1A] dark:text-[#F8FAFC] flex items-center gap-2">
                MOHAMED SAFTHAR
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-ping mr-1" />
                  LOGISTICS LEAD
                </span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-[#555555] dark:text-[#CBD5E1] flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#F5C242] dark:text-[#3B82F6] shrink-0" />
                DUBAI {uaeTime || '18:00 GST'}
              </span>
            </div>
          </Link>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454]">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#555555] dark:text-[#CBD5E1] hover:text-[#1A1A1A] dark:hover:text-white hover:bg-[#FFF8E8] dark:hover:bg-[#1B2542] rounded-lg transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Desktop Actions */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          
          {/* Command Palette Button */}
          <button
            onClick={onOpenCommand}
            className="h-10 px-3.5 rounded-xl bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454] text-[#555555] dark:text-[#CBD5E1] hover:text-[#1A1A1A] hover:border-[#F5C242] dark:hover:border-[#3B82F6] text-xs font-mono flex items-center gap-1.5 transition-all"
            title="Open Command Palette (Ctrl+K)"
          >
            <Terminal className="w-3.5 h-3.5 text-[#F5C242] dark:text-[#3B82F6]" />
            <span>⌘K</span>
          </button>

          {/* Resume Viewer CTA */}
          <button
            onClick={() => {
              trackDownload('Resume-Click');
              onOpenResume();
            }}
            className="saas-button-luxury h-10 px-4 text-xs"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Resume</span>
          </button>

          {/* Admin Link */}
          <Link
            href="/admin"
            className="h-10 px-3.5 rounded-xl bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454] text-[#1A1A1A] dark:text-[#F8FAFC] text-xs font-semibold flex items-center gap-1.5 transition-all hover:border-[#F5C242] dark:hover:border-[#3B82F6]"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#F5C242] dark:text-[#3B82F6]" />
            <span>Admin</span>
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2 shrink-0">
          <button
            onClick={() => {
              trackDownload('Resume-Click-Mobile');
              onOpenResume();
            }}
            className="saas-button-luxury h-10 px-3.5 text-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CV</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-10 w-10 rounded-xl bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454] text-[#1A1A1A] dark:text-white flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#F5C242] dark:text-[#3B82F6]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden max-w-[1400px] mx-auto mt-2 saas-nav p-4 rounded-2xl border border-[#F2E6C9] dark:border-[#283454] shadow-2xl space-y-3"
          >
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-xs font-bold text-[#1A1A1A] dark:text-[#F8FAFC] bg-[#FFFDF7] dark:bg-[#0A1025] hover:bg-[#FFF8E8] dark:hover:bg-[#1B2542] rounded-xl border border-[#F2E6C9] dark:border-[#283454] text-center transition-colors min-h-[48px] flex items-center justify-center"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2 border-t border-[#F2E6C9] dark:border-[#283454]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="saas-button-luxury w-full py-3.5 text-xs min-h-[48px]"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Resume PDF</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCommand();
                  }}
                  className="flex-1 py-3 rounded-xl bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454] text-[#1A1A1A] dark:text-[#F8FAFC] text-xs font-bold flex items-center justify-center gap-2 min-h-[48px]"
                >
                  <Terminal className="w-4 h-4 text-[#F5C242] dark:text-[#3B82F6]" />
                  <span>Command Palette</span>
                </button>

                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454] text-[#1A1A1A] dark:text-[#F8FAFC] text-xs font-bold flex items-center justify-center gap-1.5 min-h-[48px]"
                >
                  <ShieldCheck className="w-4 h-4 text-[#F5C242] dark:text-[#3B82F6]" />
                  <span>Admin</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

