'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Terminal, 
  Download, 
  User, 
  Briefcase, 
  Boxes, 
  Mail, 
  X,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands = [
    {
      id: 'download-resume',
      label: 'Download Official Resume PDF',
      category: 'Actions',
      icon: Download,
      action: () => {
        onOpenResume();
        onClose();
      }
    },
    {
      id: 'nav-about',
      label: 'Go to Professional Summary',
      category: 'Navigation',
      icon: User,
      action: () => {
        window.location.href = '#about';
        onClose();
      }
    },
    {
      id: 'nav-experience',
      label: 'Go to Professional Experience',
      category: 'Navigation',
      icon: Briefcase,
      action: () => {
        window.location.href = '#experience';
        onClose();
      }
    },
    {
      id: 'nav-skills',
      label: 'Go to Core Competencies & WMS Systems',
      category: 'Navigation',
      icon: Boxes,
      action: () => {
        window.location.href = '#skills';
        onClose();
      }
    },
    {
      id: 'nav-contact',
      label: 'Direct Contact Mohamed Safthar (WhatsApp/Email)',
      category: 'Recruitment',
      icon: Mail,
      action: () => {
        window.location.href = '#contact';
        onClose();
      }
    },
    {
      id: 'admin-portal',
      label: 'Access Admin Dashboard Portal',
      category: 'System',
      icon: ShieldCheck,
      action: () => {
        window.location.href = '/admin';
        onClose();
      }
    }
  ];

  const filteredCommands = query.trim() === ''
    ? commands
    : commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-xl saas-card overflow-hidden bg-white dark:bg-[#141D35] border-[#F2E6C9] dark:border-[#283454] shadow-2xl"
        >
          {/* Input Header */}
          <div className="p-4 bg-[#FFFDF7] dark:bg-[#0A1025] border-b border-[#F2E6C9] dark:border-[#283454] flex items-center gap-3">
            <Search className="w-5 h-5 text-[#F5C242] dark:text-[#3B82F6] shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search commands, experience, resume..."
              className="w-full bg-transparent text-sm font-semibold text-[#1A1A1A] dark:text-[#F8FAFC] focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#555555] hover:text-[#1A1A1A] dark:text-[#CBD5E1] dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="p-2 max-h-80 overflow-y-auto space-y-1 bg-[#FFFFFF] dark:bg-[#050816]">
            {filteredCommands.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#555555] dark:text-[#CBD5E1]">
                No matching commands found.
              </div>
            ) : (
              filteredCommands.map((cmd) => {
                const IconComp = cmd.icon;
                return (
                  <button
                    key={cmd.id}
                    onClick={cmd.action}
                    className="w-full p-3 rounded-xl flex items-center justify-between text-left hover:bg-[#FFFDF7] dark:hover:bg-[#1B2542] hover:border-[#F5C242] dark:hover:border-[#3B82F6] border border-transparent transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#F5C242]/15 dark:bg-[#3B82F6]/15 text-[#1A1A1A] dark:text-[#3B82F6] flex items-center justify-center">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#1A1A1A] dark:text-[#F8FAFC] group-hover:text-[#F5C242] dark:group-hover:text-[#3B82F6] block">
                          {cmd.label}
                        </span>
                        <span className="text-[10px] font-mono text-[#555555] dark:text-[#CBD5E1]">
                          {cmd.category}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#555555] dark:text-[#CBD5E1] group-hover:text-[#F5C242] dark:group-hover:text-[#3B82F6] group-hover:translate-x-1 transition-all" />
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="p-3 bg-[#FFFDF7] dark:bg-[#0A1025] border-t border-[#F2E6C9] dark:border-[#283454] flex items-center justify-between text-[11px] font-mono text-[#555555] dark:text-[#CBD5E1]">
            <span className="flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-[#F5C242] dark:text-[#3B82F6]" /> Navigation Shortcut Palette
            </span>
            <span>ESC to close</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
