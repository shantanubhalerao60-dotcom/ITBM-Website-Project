import React from 'react';
import { ShieldCheck, Award, FlaskConical, HeartHandshake, PhoneCall, Mail } from 'lucide-react';

interface FooterProps {
  onNavigateToAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToAdmin }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-16">
      {/* Trust Badges Bar */}
      <div className="border-b border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">NABL Lab Tested</h4>
              <p className="text-slate-400 text-xs mt-0.5">
                Every batch independently assayed for protein & heavy metals.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Direct Brand Sourcing</h4>
              <p className="text-slate-400 text-xs mt-0.5">
                100% genuine inventory sourced straight from primary manufacturers.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Standardized Metrics</h4>
              <p className="text-slate-400 text-xs mt-0.5">
                Transparent price per gram of protein calculations.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Tamper-Proof Seal</h4>
              <p className="text-slate-400 text-xs mt-0.5">
                RFID-tracked temperature-stable delivery within 2 hours.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white font-bold text-base">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Nutri<span className="text-emerald-400">Trust</span></span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Indias premier clinical-grade sports nutrition and wellness supplement delivery platform. Built with scientific transparency and calculated value metrics.
            </p>
            <div className="text-xs text-slate-500">
              FSSAI Lic. No: 10022022001942
            </div>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-3">Categories</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Whey Protein Isolates & Blends</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Fermented Plant Protein</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Creapure Micronized Creatine</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Chelated Multivitamins</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Molecularly Distilled Fish Oil</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-3">Verification & Testing</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Look Up Batch Certificate</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Understanding Amino Spiking</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Heavy Metal Safety Standards</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">NABL Partner Laboratories</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Informed-Choice Certification</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-3">Customer Support</h5>
            <p className="text-slate-400 text-xs mb-3">
              Need assistance selecting the right protein or interpreting lab reports? Speak with our sports nutritionists.
            </p>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>1800-419-TRUST (Toll Free)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>lab-reports@nutritrust.internal</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Staff Portal Muted Link */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-slate-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© 2026 NutriTrust Inc. All rights reserved. Healthcare & wellness supplement delivery scaffold.</span>
          <div className="flex items-center space-x-3 text-slate-400">
            <span>Disclaimer: Dietary supplements are not intended to diagnose, treat, or cure any disease.</span>
            <span className="text-slate-700">•</span>
            {onNavigateToAdmin ? (
              <button
                type="button"
                onClick={onNavigateToAdmin}
                className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer text-[11px] font-medium underline underline-offset-4 decoration-slate-700 hover:decoration-slate-400"
                title="Internal Staff & Compliance Access"
              >
                Staff Portal
              </button>
            ) : (
              <a
                href="/admin"
                className="text-slate-500 hover:text-slate-300 transition-colors text-[11px] font-medium underline underline-offset-4 decoration-slate-700 hover:decoration-slate-400"
              >
                Staff Portal
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
