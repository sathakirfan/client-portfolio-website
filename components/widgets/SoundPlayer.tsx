'use client';

import React, { useEffect, useRef } from 'react';

interface SoundPlayerProps {
  isPlaying: boolean;
}

export const SoundPlayer: React.FC<SoundPlayerProps> = ({ isPlaying }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (isPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Subtly calm low ambient frequencies (Deep sci-fi drone)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 note

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(110, ctx.currentTime); // A2 harmonic

        gain.gain.setValueAtTime(0.015, ctx.currentTime); // Soft volume

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        osc1Ref.current = osc1;
        osc2Ref.current = osc2;
        gainRef.current = gain;
      } catch (err) {
        console.warn('AudioContext notice:', err);
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    }

    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [isPlaying]);

  return null;
};
