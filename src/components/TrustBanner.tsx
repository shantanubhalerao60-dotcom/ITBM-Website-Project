import React from 'react';
import { ShieldCheck, Zap } from 'lucide-react';

export const TrustBanner: React.FC = () => {
  return (
    <div className="bg-emerald-900 text-emerald-50 text-xs py-2 px-4 border-b border-emerald-950/40 tracking-tight">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center space-x-2 sm:space-x-4">
        <div className="flex items-center space-x-1.5 font-medium">
          <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300 shrink-0" />
          <span>
            <strong>Free Next-Day Delivery</strong> on orders over ₹999
          </span>
        </div>

        <span className="text-emerald-400/60 hidden sm:inline">•</span>

        <div className="hidden sm:flex items-center space-x-1.5 text-emerald-100/90 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
          <span>100% NABL Lab Verified Direct Sourcing</span>
        </div>

        <span className="text-emerald-400/60 hidden md:inline">•</span>

        <div className="hidden md:inline text-emerald-200/80">
          Temperature-Controlled Cold Hubs
        </div>
      </div>
    </div>
  );
};
