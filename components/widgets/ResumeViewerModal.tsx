'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, FileText, ShieldCheck } from 'lucide-react';
import { trackDownload } from '@/lib/firebase';

interface ResumeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeViewerModal: React.FC<ResumeViewerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    trackDownload('PDF-Resume-Downloaded');
    const link = document.createElement('a');
    link.href = '/Mohamed_Safthar_Warehouse_Lead_Resume.pdf';
    link.download = 'Mohamed_Safthar_Warehouse_Lead_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-4xl max-h-[90vh] saas-card overflow-hidden flex flex-col bg-white dark:bg-[#141D35] border-[#F2E6C9] dark:border-[#283454] shadow-2xl"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 bg-[#FFFDF7] dark:bg-[#0A1025] border-b border-[#F2E6C9] dark:border-[#283454] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5C242] dark:bg-[#3B82F6] text-[#1A1A1A] dark:text-white flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#1A1A1A] dark:text-[#F8FAFC] flex items-center gap-2">
                  Official CV Preview
                  <span className="px-2 py-0.5 rounded-md bg-[#22C55E]/15 text-[#22C55E] text-[10px] font-mono font-bold">VERIFIED</span>
                </h3>
                <p className="text-xs text-[#555555] dark:text-[#CBD5E1]">Mohamed Safthar • Warehouse Operations Lead</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="saas-button-luxury h-10 px-4 text-xs"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download PDF</span>
              </button>
              
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454] text-[#555555] hover:text-[#1A1A1A] dark:text-[#CBD5E1] dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* PDF Embed iFrame Container */}
          <div className="flex-1 min-h-[450px] sm:min-h-[550px] bg-[#FFFFFF] dark:bg-[#050816] p-2">
            <iframe
              src="/Mohamed_Safthar_Warehouse_Lead_Resume.pdf#toolbar=0&navpanes=0&scrollbar=1"
              className="w-full h-full rounded-xl border border-[#F2E6C9] dark:border-[#283454]"
              title="Mohamed Safthar Resume PDF"
            />
          </div>

          {/* Footer Bar */}
          <div className="p-4 bg-[#FFFDF7] dark:bg-[#0A1025] border-t border-[#F2E6C9] dark:border-[#283454] flex flex-wrap items-center justify-between text-xs gap-3">
            <div className="flex items-center gap-3 text-[#555555] dark:text-[#CBD5E1] font-mono text-[11px]">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" /> Immediate Dubai Joining</span>
              <span>•</span>
              <span>Passport: U5712783</span>
            </div>
            
            <button
              onClick={handleDownload}
              className="saas-button-luxury h-9 px-4 text-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Get Official PDF Copy</span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
