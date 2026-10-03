import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowLeft, 
  Sparkles, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  CheckCircle2,
  KeyRound
} from 'lucide-react';
import { 
  DEMO_ADMIN_EMAIL, 
  DEMO_ADMIN_PASSWORD, 
  validateAdminCredentials, 
  setStoredAdminSession 
} from '../../utils/adminAuth';
import type { AdminSession } from '../../types/admin';

interface AdminLoginProps {
  onLoginSuccess: (session: AdminSession) => void;
  onReturnToStorefront: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onReturnToStorefront,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDemoFilled, setIsDemoFilled] = useState(false);

  // 1-Click Demo Fill handler
  const handleDemoFill = () => {
    setEmail(DEMO_ADMIN_EMAIL);
    setPassword(DEMO_ADMIN_PASSWORD);
    setErrorMessage(null);
    setIsDemoFilled(true);
    setTimeout(() => setIsDemoFilled(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    // Realistic brief auth verification delay
    setTimeout(() => {
      const validation = validateAdminCredentials(email, password);

      if (validation.success && validation.session) {
        setStoredAdminSession(validation.session);
        onLoginSuccess(validation.session);
      } else {
        setErrorMessage(validation.error || 'Authentication failed. Please verify credentials.');
        setIsSubmitting(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden select-none font-sans">
      
      {/* Background Subtle Gradient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial from-emerald-600/15 via-transparent to-transparent pointer-events-none blur-3xl" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[350px] bg-radial from-teal-500/10 via-transparent to-transparent pointer-events-none blur-3xl" />

      {/* Top Left Return to Storefront Link */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={onReturnToStorefront}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 px-3.5 py-2 rounded-xl transition-all cursor-pointer backdrop-blur-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Storefront</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 border border-emerald-500/30 text-white shadow-xl shadow-emerald-950/40 mb-4">
            <ShieldCheck className="w-8 h-8 stroke-[2.2]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Nutri<span className="text-emerald-400">Trust</span>
          </h1>
          <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400/90">
            Internal Operations & Compliance Gate
          </p>
          <p className="mt-2 text-xs text-slate-400 max-w-xs mx-auto">
            Authorized supply chain management, revenue analytics, and NABL batch certification registry.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-950/50 border border-slate-100">
          
          {/* Quick Demo Fill Pill */}
          <div className="mb-6 p-3 bg-emerald-50/90 border border-emerald-200/90 rounded-2xl flex items-center justify-between gap-3">
            <div className="flex items-center space-x-2 text-xs">
              <KeyRound className="w-4 h-4 text-emerald-700 shrink-0" />
              <div>
                <span className="font-bold text-emerald-950">Demo Credentials</span>
                <p className="text-[11px] text-emerald-800 font-mono">admin@hyuga-demo.com</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDemoFill}
              className={`inline-flex items-center space-x-1.5 text-xs font-extrabold px-3 py-1.5 rounded-xl transition-all shadow-xs cursor-pointer ${
                isDemoFilled 
                  ? 'bg-emerald-700 text-white' 
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'
              }`}
            >
              {isDemoFilled ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Filled!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>1-Click Demo Fill</span>
                </>
              )}
            </button>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start space-x-2.5 text-rose-800 text-xs animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Authentication failed:</span>
                <p className="text-rose-700 mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Staff Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@hyuga-demo.com"
                  required
                  autoFocus
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Access Password
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  admin2026
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 bg-emerald-800 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-black text-xs sm:text-sm py-3.5 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Staff Credentials...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  <span>Authenticate & Enter Admin Hub</span>
                </>
              )}
            </button>
          </form>

          {/* Secure Environment Notice */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center space-x-2 text-slate-400 text-[11px]">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>256-Bit Encrypted Session • ISO-IEC 17025 Compliance Registry</span>
          </div>

        </div>

        {/* Bottom Return Button */}
        <div className="text-center mt-6">
          <button
            onClick={onReturnToStorefront}
            className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer inline-flex items-center space-x-1"
          >
            <span>Need to order supplements?</span>
            <span className="text-emerald-400 font-bold hover:underline">Go to Customer Storefront →</span>
          </button>
        </div>

      </div>

    </div>
  );
};
