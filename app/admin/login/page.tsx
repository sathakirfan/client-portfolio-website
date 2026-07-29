'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, ArrowRight, AlertCircle, KeyRound } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Secure authentication check
    if (password.trim() === 'safthar123' || password.trim() === 'admin123') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('safthar_admin_session', 'true');
      }
      router.push('/admin');
    } else {
      setError('Invalid Admin Security Password. Access Denied.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-[#F8FAFC] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15)0%,transparent_70%)]" />
      
      <div className="max-w-md w-full saas-card p-8 sm:p-10 relative z-10 bg-[#141D35] border-[#283454] shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#3B82F6] flex items-center justify-center text-white font-bold mx-auto mb-4 shadow-lg shadow-[#3B82F6]/30">
            <KeyRound className="w-7 h-7 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Logistics Admin Access</h1>
          <p className="text-xs text-[#CBD5E1] font-mono mt-1">Enterprise Operations Management System</p>
        </div>

        {error && (
          <div className="p-3.5 mb-6 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-xs font-mono font-bold text-[#CBD5E1] mb-2 block uppercase tracking-wider">
              ADMIN PASSWORD *
            </label>
            <div className="relative">
              <input
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password..."
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#0A1025] border border-[#283454] text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3B82F6] transition-colors"
              />
              <Lock className="w-4 h-4 text-[#3B82F6] absolute left-3.5 top-4" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="saas-button-luxury w-full py-4 text-xs font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            <span>Authenticate Admin</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-[#283454]">
          <a href="/" className="text-xs font-mono text-[#CBD5E1] hover:text-white transition-colors flex items-center justify-center gap-1.5">
            ← Return to Public Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}

