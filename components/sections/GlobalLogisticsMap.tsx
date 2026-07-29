'use client';

import React, { useState } from 'react';
import { Globe2, Navigation } from 'lucide-react';
import { uaeLogisticsHubs } from '@/lib/data';

export const GlobalLogisticsMap: React.FC = () => {
  const [activeHub, setActiveHub] = useState(uaeLogisticsHubs[0]);

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-[#FFFFFF] dark:bg-[#050816] transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-[#F5C242]/15 text-[#1A1A1A] dark:bg-[#3B82F6]/15 dark:text-[#3B82F6] border border-[#F5C242]/40 dark:border-[#3B82F6]/30 uppercase tracking-widest flex items-center justify-center gap-1.5 w-fit mx-auto">
            <Globe2 className="w-4 h-4 text-[#F5C242] dark:text-[#3B82F6]" />
            UAE COURIER & FREIGHT NETWORK
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] dark:text-[#F8FAFC] tracking-tight mt-4 mb-4">
            Emirates Logistics Hubs & <br />
            <span className="text-[#F5C242] dark:text-[#3B82F6]">
              Dispatch Coverage Map
            </span>
          </h2>
          <p className="text-[#555555] dark:text-[#CBD5E1] text-base sm:text-lg">
            Operational footprint across Dubai Al Quoz 3 Central Hub, Jebel Ali Free Zone (JAFZA), Abu Dhabi Industrial Hub, and Sharjah Gateway.
          </p>
        </div>

        {/* Map & Hub Explorer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Interactive Map Visual */}
          <div className="lg:col-span-7">
            <div className="saas-card p-6 sm:p-8 relative overflow-hidden bg-[#FFFDF7] dark:bg-[#0A1025] border-[#F2E6C9] dark:border-[#283454] h-[400px] sm:h-[460px] flex flex-col justify-between">
              
              {/* Map Title Bar */}
              <div className="flex items-center justify-between border-b border-[#F2E6C9] dark:border-[#283454] pb-4 z-10">
                <span className="text-xs font-mono font-bold text-[#1A1A1A] dark:text-[#F8FAFC] flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#F5C242] dark:text-[#3B82F6]" />
                  UAE EMIRATES TELEMETRY RADAR
                </span>
                <span className="text-[11px] font-mono text-[#22C55E] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
                  Live GPS Route Tracking
                </span>
              </div>

              {/* UAE SVG Vector Graphic with Hub Pins */}
              <div className="relative flex-1 flex items-center justify-center my-4">
                <svg className="w-full h-full max-h-[300px]" viewBox="0 0 800 500">
                  
                  {/* Outer Radar Concentric Circles */}
                  <circle cx="400" cy="250" r="180" fill="none" stroke="#F5C242" strokeOpacity="0.15" strokeDasharray="4 4" className="dark:hidden" />
                  <circle cx="400" cy="250" r="180" fill="none" stroke="#3B82F6" strokeOpacity="0.2" strokeDasharray="4 4" className="hidden dark:block" />

                  {/* Animated Connecting Supply Chain Routes */}
                  <path d="M 220 300 L 400 220 L 580 180 L 680 140" fill="none" stroke="#F5C242" strokeWidth="2" strokeDasharray="6 6" className="dark:hidden" />
                  <path d="M 220 300 L 400 220 L 580 180 L 680 140" fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="6 6" className="hidden dark:block" />

                  {/* Dynamic Hub Markers */}
                  {uaeLogisticsHubs.map((hub) => {
                    const isSelected = activeHub.id === hub.id;
                    return (
                      <g 
                        key={hub.id} 
                        className="cursor-pointer transition-transform duration-300 hover:scale-125"
                        onClick={() => setActiveHub(hub)}
                      >
                        <circle 
                          cx={hub.coordinates.x * 8} 
                          cy={hub.coordinates.y * 5} 
                          r={isSelected ? "14" : "9"} 
                          className={isSelected ? "fill-[#F5C242] dark:fill-[#3B82F6]" : "fill-[#22C55E]"} 
                        />
                        <circle 
                          cx={hub.coordinates.x * 8} 
                          cy={hub.coordinates.y * 5} 
                          r={isSelected ? "22" : "14"} 
                          fill="none" 
                          stroke={isSelected ? "#F5C242" : "#22C55E"} 
                          strokeOpacity="0.5" 
                          strokeWidth="2" 
                        />
                        <text 
                          x={hub.coordinates.x * 8} 
                          y={hub.coordinates.y * 5 - 18} 
                          textAnchor="middle" 
                          className="text-[11px] font-mono font-bold fill-[#1A1A1A] dark:fill-white"
                        >
                          {hub.name.split(' ')[0]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Bottom Telemetry Legend */}
              <div className="pt-3 border-t border-[#F2E6C9] dark:border-[#283454] flex items-center justify-between text-xs font-mono text-[#555555] dark:text-[#CBD5E1]">
                <span>Hub Selected: <strong className="text-[#1A1A1A] dark:text-white">{activeHub.name}</strong></span>
                <span className="text-[#22C55E] font-bold">100+ Courier Fleet Connected</span>
              </div>

            </div>
          </div>

          {/* Hub Explorer Info Box */}
          <div className="lg:col-span-5">
            <div className="saas-card p-8 bg-white dark:bg-[#141D35] border-[#F2E6C9] dark:border-[#283454]">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-lg bg-[#F5C242]/15 text-[#1A1A1A] dark:bg-[#3B82F6]/15 dark:text-[#3B82F6] border border-[#F5C242]/40 dark:border-[#3B82F6]/30 text-xs font-mono font-bold">
                  {activeHub.emirate} EMIRATE HUB
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#1A1A1A] dark:text-[#F8FAFC] mb-4">{activeHub.name}</h3>
              <p className="text-xs sm:text-sm text-[#555555] dark:text-[#CBD5E1] leading-relaxed mb-6">
                {activeHub.description}
              </p>

              <div className="space-y-3 pt-4 border-t border-[#F2E6C9] dark:border-[#283454]">
                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454]">
                  <span className="text-[#555555] dark:text-[#CBD5E1] font-mono">FACILITY TYPE:</span>
                  <span className="font-bold text-[#1A1A1A] dark:text-white">{activeHub.type}</span>
                </div>

                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454]">
                  <span className="text-[#555555] dark:text-[#CBD5E1] font-mono">DAILY SHIPMENT VOLUME:</span>
                  <span className="font-bold text-[#F5C242] dark:text-[#3B82F6] font-mono">{activeHub.volume}</span>
                </div>

                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454]">
                  <span className="text-[#555555] dark:text-[#CBD5E1] font-mono">DISPATCH SLA TAT:</span>
                  <span className="font-bold text-[#22C55E] font-mono">{activeHub.tat}</span>
                </div>
              </div>

              {/* Hub Selection Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-6">
                {uaeLogisticsHubs.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setActiveHub(h)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold text-center transition-all ${
                      activeHub.id === h.id
                        ? 'bg-[#F5C242] dark:bg-[#3B82F6] text-[#1A1A1A] dark:text-white shadow-md'
                        : 'bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454] text-[#555555] dark:text-[#CBD5E1] hover:text-[#1A1A1A] dark:hover:text-white'
                    }`}
                  >
                    {h.name.split(' ')[0]}
                  </button>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
