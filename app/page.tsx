'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/hero/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline';
import { SkillsGrid } from '@/components/sections/SkillsGrid';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { WarehouseGallery } from '@/components/sections/WarehouseGallery';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { AIAssistantBot } from '@/components/widgets/AIAssistantBot';
import { ResumeViewerModal } from '@/components/widgets/ResumeViewerModal';
import { SoundPlayer } from '@/components/widgets/SoundPlayer';
import { CommandPalette } from '@/components/layout/CommandPalette';

export default function Home() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const toggleAudio = () => {
    setAudioPlaying(!audioPlaying);
  };

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-400 selection:bg-[#F4B400] dark:selection:bg-[#3B82F6] selection:text-slate-950 dark:selection:text-white">
      {/* Background Sound Synthesizer */}
      <SoundPlayer isPlaying={audioPlaying} />

      {/* Glassmorphic Navbar */}
      <Navbar
        onOpenCommand={() => setCommandPaletteOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
        audioPlaying={audioPlaying}
        toggleAudio={toggleAudio}
      />

      {/* Hero Section */}
      <HeroSection
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenContact={() => {
          window.location.hash = 'contact';
        }}
      />

      {/* Executive About Profile */}
      <AboutSection />

      {/* Experience Timeline */}
      <ExperienceTimeline />

      {/* Systems & Technical Skills */}
      <SkillsGrid />

      {/* Case Studies & Projects */}
      <ProjectsSection />

      {/* Facility Gallery */}
      <WarehouseGallery />

      {/* Recruiter Testimonials */}
      <TestimonialsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer onOpenResume={() => setResumeModalOpen(true)} />

      {/* Interactive AI Assistant Widget */}
      <AIAssistantBot />

      {/* Resume PDF Previewer Modal */}
      <ResumeViewerModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* Keyboard Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenResume={() => setResumeModalOpen(true)}
      />
    </main>
  );
}
