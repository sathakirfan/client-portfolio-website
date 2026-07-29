'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileCheck2,
  CalendarCheck,
  Loader2
} from 'lucide-react';
import { siteSettings } from '@/lib/data';
import { saveContactMessage } from '@/lib/firebase';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await saveContactMessage({
        ...formData,
        subject: 'Recruitment / Logistics Leadership Inquiry'
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (err: any) {
      console.error(err);
      setError('Failed to submit message. Please contact via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden bg-[#FFF8E8] dark:bg-[#10182E] border-t border-[#F2E6C9] dark:border-[#283454] transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-[#F5C242]/15 text-[#1A1A1A] dark:bg-[#3B82F6]/15 dark:text-[#3B82F6] border border-[#F5C242]/40 dark:border-[#3B82F6]/30 uppercase tracking-widest flex items-center justify-center gap-1.5 w-fit mx-auto">
            <Mail className="w-4 h-4 text-[#F5C242] dark:text-[#3B82F6]" />
            DIRECT UAE RECRUITMENT CONTACT
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] dark:text-[#F8FAFC] tracking-tight mt-4 mb-4">
            Connect With Mohamed Safthar <br />
            <span className="text-[#F5C242] dark:text-[#3B82F6]">
              Immediate UAE Availability
            </span>
          </h2>
          <p className="text-[#555555] dark:text-[#CBD5E1] text-base sm:text-lg">
            Looking for a Warehouse Operations Lead or In-Charge in Dubai/UAE? Send a direct message or connect instantly via WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Direct Contact Info & Fast Action Buttons */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="saas-card p-8 bg-white dark:bg-[#141D35] border-[#F2E6C9] dark:border-[#283454] space-y-6">
              <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-[#F8FAFC] flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#F5C242] dark:text-[#3B82F6]" />
                Recruiter Direct Channels
              </h3>

              {/* Direct Info List */}
              <div className="space-y-4 text-xs sm:text-sm">
                
                <a 
                  href={`https://wa.me/${siteSettings.whatsappNumber.replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-4 rounded-xl bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454] flex items-center gap-3.5 hover:border-[#22C55E] transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#22C55E]/15 text-[#22C55E] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono text-[#555555] dark:text-[#CBD5E1] uppercase font-bold">WHATSAPP DIRECT (UAE)</p>
                    <p className="text-sm font-bold text-[#1A1A1A] dark:text-[#F8FAFC] group-hover:text-[#22C55E]">{siteSettings.whatsappNumber}</p>
                  </div>
                </a>

                <a 
                  href={`mailto:${siteSettings.contactEmail}`}
                  className="p-4 rounded-xl bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454] flex items-center gap-3.5 hover:border-[#F5C242] dark:hover:border-[#3B82F6] transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F5C242]/15 dark:bg-[#3B82F6]/15 text-[#F5C242] dark:text-[#3B82F6] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono text-[#555555] dark:text-[#CBD5E1] uppercase font-bold">EMAIL ADDRESS</p>
                    <p className="text-xs sm:text-sm font-bold text-[#1A1A1A] dark:text-[#F8FAFC] group-hover:text-[#F5C242] dark:group-hover:text-[#3B82F6] truncate max-w-[210px]">{siteSettings.contactEmail}</p>
                  </div>
                </a>

                <div className="p-4 rounded-xl bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454] flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#22C55E]/15 text-[#22C55E] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono text-[#555555] dark:text-[#CBD5E1] uppercase font-bold">CURRENT RESIDENCE</p>
                    <p className="text-sm font-bold text-[#1A1A1A] dark:text-[#F8FAFC]">Dubai, United Arab Emirates</p>
                  </div>
                </div>

              </div>

              {/* Status Chips */}
              <div className="pt-4 border-t border-[#F2E6C9] dark:border-[#283454] space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#22C55E] font-semibold">
                  <FileCheck2 className="w-4 h-4" /> Valid UAE Resident Visa & Emirates ID
                </div>
                <div className="flex items-center gap-2 text-xs text-[#22C55E] font-semibold">
                  <CalendarCheck className="w-4 h-4" /> Immediate Joining Availability
                </div>
              </div>

              {/* Instant WhatsApp Call CTA */}
              <a
                href={`https://wa.me/${siteSettings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Mohamed%20Safthar,%20we%20reviewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20Warehouse%20Operations%20role.`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all min-h-[48px]"
              >
                <Phone className="w-4 h-4" />
                <span>Start WhatsApp Chat Now</span>
              </a>

            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="saas-card p-8 sm:p-10 bg-white dark:bg-[#141D35] border-[#F2E6C9] dark:border-[#283454]">
              
              <h3 className="text-2xl font-bold text-[#1A1A1A] dark:text-[#F8FAFC] mb-2">
                Send Direct Recruitment Message
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] dark:text-[#CBD5E1] mb-8">
                Fill out the form below. Messages are delivered directly to Mohamed Safthar's email and phone notification system.
              </p>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-2xl bg-[#22C55E]/15 border border-[#22C55E]/40 text-center space-y-3"
                >
                  <CheckCircle2 className="w-12 h-12 text-[#22C55E] mx-auto" />
                  <h4 className="text-lg font-bold text-[#1A1A1A] dark:text-white">Message Sent Successfully!</h4>
                  <p className="text-xs text-[#555555] dark:text-[#CBD5E1]">
                    Thank you for reaching out. Mohamed Safthar will respond to your inquiry shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="saas-button-secondary px-6 py-2 text-xs font-bold mt-2"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#555555] dark:text-[#CBD5E1] mb-1.5 uppercase">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Sarah Al-Maktoum"
                        className="w-full saas-input px-4 text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-[#555555] dark:text-[#CBD5E1] mb-1.5 uppercase">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="hr@company.ae"
                        className="w-full saas-input px-4 text-xs font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#555555] dark:text-[#CBD5E1] mb-1.5 uppercase">
                        PHONE / WHATSAPP
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+971 50 123 4567"
                        className="w-full saas-input px-4 text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-[#555555] dark:text-[#CBD5E1] mb-1.5 uppercase">
                        COMPANY / ORGANISATION
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Express Logistics LLC"
                        className="w-full saas-input px-4 text-xs font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#555555] dark:text-[#CBD5E1] mb-1.5 uppercase">
                      MESSAGE / JOB REQUIREMENT *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your recruitment details or job offer overview..."
                      className="w-full saas-input p-4 text-xs font-semibold resize-none"
                    />
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs flex items-center gap-2 font-semibold">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="saas-button-luxury w-full py-4 text-xs sm:text-sm font-bold min-h-[48px]"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Recruitment Inquiry</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
