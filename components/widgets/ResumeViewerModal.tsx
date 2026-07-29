'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, FileText, ExternalLink, ShieldCheck } from 'lucide-react';
import { trackDownload } from '@/lib/firebase';

interface ResumeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeViewerModal: React.FC<ResumeViewerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const pdfUrl = '/Mohamed_Safthar_Hussain_Operation_Team_Leader.pdf';

  const handleDownload = () => {
    trackDownload('PDF-Resume-Downloaded');
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Mohamed_Safthar_Hussain_Operation_Team_Leader.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-6xl h-[92vh] saas-card overflow-hidden flex flex-col bg-white dark:bg-[#141D35] border-[#F2E6C9] dark:border-[#283454] shadow-2xl"
        >
          {/* Header */}
          <div className="p-3.5 sm:p-5 bg-[#FFFDF7] dark:bg-[#0A1025] border-b border-[#F2E6C9] dark:border-[#283454] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5C242] dark:bg-[#3B82F6] text-[#1A1A1A] dark:text-white flex items-center justify-center font-bold shadow-md">
                <FileText className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#1A1A1A] dark:text-[#F8FAFC] flex items-center gap-2">
                  Official CV & Credentials
                  <span className="px-2 py-0.5 rounded-md bg-[#22C55E]/15 text-[#22C55E] text-[10px] font-mono font-bold">VERIFIED</span>
                </h3>
                <p className="text-xs text-[#555555] dark:text-[#CBD5E1]">Mohamed Safthar Hussain K • Warehouse Operations Team Leader</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 h-10 px-3.5 rounded-xl bg-[#FFF8E8] dark:bg-[#10182E] border border-[#F2E6C9] dark:border-[#283454] text-[#1A1A1A] dark:text-[#F8FAFC] text-xs font-semibold hover:border-[#F5C242] dark:hover:border-[#3B82F6] transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#F5C242] dark:text-[#3B82F6]" />
                <span>Open Full Window</span>
              </a>

              <button
                onClick={handleDownload}
                className="saas-button-luxury h-10 px-4 text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>Download PDF</span>
              </button>
              
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl bg-[#FFF8E8] dark:bg-[#10182E] border border-[#F2E6C9] dark:border-[#283454] text-[#555555] hover:text-[#1A1A1A] dark:text-[#CBD5E1] dark:hover:text-white transition-colors"
                title="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Full Screen PDF iFrame Viewer */}
          <div className="flex-1 w-full h-full bg-[#FFFFFF] dark:bg-[#050816] p-2 relative overflow-hidden">
            <iframe
              src={`${pdfUrl}#view=FitH&toolbar=1&navpanes=0`}
              className="w-full h-full rounded-xl border border-[#F2E6C9] dark:border-[#283454] min-h-[500px]"
              title="Mohamed Safthar Resume PDF Document"
            />
          </div>

          {/* Footer Bar */}
          <div className="p-3.5 bg-[#FFFDF7] dark:bg-[#0A1025] border-t border-[#F2E6C9] dark:border-[#283454] flex flex-wrap items-center justify-between text-xs gap-3 shrink-0">
            <div className="flex items-center gap-3 text-[#555555] dark:text-[#CBD5E1] font-mono text-[11px]">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" /> Immediate Dubai Availability</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Passport: U5712783</span>
            </div>
            
            <div className="flex items-center gap-2">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden text-xs text-[#3B82F6] underline font-mono"
              >
                Open Full Screen ↗
              </a>
              <button
                onClick={handleDownload}
                className="saas-button-luxury h-9 px-4 text-xs font-bold flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save PDF File</span>
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
