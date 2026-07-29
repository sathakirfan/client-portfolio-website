'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Package, 
  Users, 
  Clock, 
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { liveMetrics } from '@/lib/data';

export const LiveAnalyticsDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState(liveMetrics);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        todayShipments: prev.todayShipments + Math.floor(Math.random() * 2),
        activeDrivers: 100 + Math.floor(Math.random() * 5),
        bankDocumentsHandled: prev.bankDocumentsHandled + Math.floor(Math.random() * 3)
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-[#FFF8E8] dark:bg-[#10182E] border-y border-[#F2E6C9] dark:border-[#283454] transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-[#F5C242]/15 text-[#1A1A1A] dark:bg-[#3B82F6]/15 dark:text-[#3B82F6] border border-[#F5C242]/40 dark:border-[#3B82F6]/30 uppercase tracking-widest flex items-center justify-center gap-1.5 w-fit mx-auto">
            <BarChart3 className="w-4 h-4 text-[#F5C242] dark:text-[#3B82F6]" />
            EXECUTIVE OPERATIONS CONTROL
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] dark:text-[#F8FAFC] tracking-tight mt-4 mb-4">
            Live Warehouse Telemetry & <br />
            <span className="text-[#F5C242] dark:text-[#3B82F6]">
              MIS Performance Dashboard
            </span>
          </h2>
          <p className="text-[#555555] dark:text-[#CBD5E1] text-base sm:text-lg">
            Real-time operational tracking of daily courier freight shipments, confidential bank document dispatch, driver fleet allocation, and inventory precision.
          </p>
        </div>

        {/* Dashboard Grid Container */}
        <div className="saas-card p-6 sm:p-10 bg-white dark:bg-[#141D35] border-[#F2E6C9] dark:border-[#283454] shadow-2xl">
          
          {/* Dashboard Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#F2E6C9] dark:border-[#283454]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5C242] dark:bg-[#3B82F6] text-[#1A1A1A] dark:text-white flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1A1A1A] dark:text-[#F8FAFC]">ECO EXPRESS UAE • CONTROL CENTER</h3>
                <p className="text-xs font-mono text-[#555555] dark:text-[#CBD5E1]">Dubai Central Dispatch & Warehouse Facility</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-lg bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 text-xs font-mono font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
                SYSTEM STATUS: 99.8% OPERATIONAL
              </span>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            
            <div className="p-6 rounded-2xl bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454] space-y-2">
              <div className="flex items-center justify-between text-[#555555] dark:text-[#CBD5E1]">
                <span className="text-xs font-mono font-bold uppercase">TODAY SHIPMENTS</span>
                <Package className="w-4 h-4 text-[#F5C242] dark:text-[#3B82F6]" />
              </div>
              <p className="text-3xl font-extrabold font-mono text-[#1A1A1A] dark:text-[#F8FAFC]">
                {metrics.todayShipments}
              </p>
              <span className="text-[11px] font-mono text-[#22C55E] font-bold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +12.4% vs Yesterday
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454] space-y-2">
              <div className="flex items-center justify-between text-[#555555] dark:text-[#CBD5E1]">
                <span className="text-xs font-mono font-bold uppercase">BANK DOCS HANDLED</span>
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
              </div>
              <p className="text-3xl font-extrabold font-mono text-[#22C55E]">
                {metrics.bankDocumentsHandled.toLocaleString()}
              </p>
              <span className="text-[11px] font-mono text-[#22C55E] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% SLA Compliance
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454] space-y-2">
              <div className="flex items-center justify-between text-[#555555] dark:text-[#CBD5E1]">
                <span className="text-xs font-mono font-bold uppercase">ACTIVE FLEET DRIVERS</span>
                <Users className="w-4 h-4 text-[#F5C242] dark:text-[#3B82F6]" />
              </div>
              <p className="text-3xl font-extrabold font-mono text-[#1A1A1A] dark:text-[#F8FAFC]">
                {metrics.activeDrivers}
              </p>
              <span className="text-[11px] font-mono text-[#555555] dark:text-[#CBD5E1]">
                Full UAE Coverage Scheduled
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454] space-y-2">
              <div className="flex items-center justify-between text-[#555555] dark:text-[#CBD5E1]">
                <span className="text-xs font-mono font-bold uppercase">INVENTORY ACCURACY</span>
                <Clock className="w-4 h-4 text-[#22C55E]" />
              </div>
              <p className="text-3xl font-extrabold font-mono text-[#22C55E]">
                {metrics.inventoryAccuracy}
              </p>
              <span className="text-[11px] font-mono text-[#22C55E] font-bold">
                Zero Stock Discrepancy
              </span>
            </div>

          </div>

          {/* Bar Chart Visualization Placeholder */}
          <div className="p-6 rounded-2xl bg-[#FFFDF7] dark:bg-[#0A1025] border border-[#F2E6C9] dark:border-[#283454] space-y-4">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-[#1A1A1A] dark:text-[#F8FAFC]">
              <span>HOURLY SHIPMENT DISPATCH DISTRIBUTION (DUBAI CENTRAL WAREHOUSE)</span>
              <span className="text-[#F5C242] dark:text-[#3B82F6]">PEAK DISPATCH: 09:00 - 14:00 GST</span>
            </div>

            <div className="h-40 flex items-end justify-between gap-2 pt-4 px-2">
              {[45, 68, 92, 120, 110, 85, 95, 115, 78, 60, 40, 25].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(val / 120) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                    className="w-full rounded-t-lg bg-[#F5C242] dark:bg-[#3B82F6] hover:bg-[#FFD65A] dark:hover:bg-[#4F8CFF] transition-colors"
                  />
                  <span className="text-[9px] font-mono text-[#555555] dark:text-[#CBD5E1]">
                    {i + 8}:00
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
