import React, { useState, useEffect } from 'react';
import { X, Sparkles, Calculator, Check } from 'lucide-react';

interface MetricExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MetricExplainerModal: React.FC<MetricExplainerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.classList.add('overflow-hidden');
      const timer = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimatingIn(true);
        });
      });
      return () => cancelAnimationFrame(timer);
    } else {
      setIsAnimatingIn(false);
      const timeout = setTimeout(() => {
        setIsRendered(false);
      }, 250);
      document.body.classList.remove('overflow-hidden');
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isRendered) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop: GPU-accelerated opacity transition (200ms ease-out) */}
      <div
        className={`fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-200 ease-out cursor-pointer ${
          isAnimatingIn ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Dialog Box: Spring/Scale transition (250ms ease-out) */}
      <div
        className={`relative bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 transform transition-all duration-250 ease-out ${
          isAnimatingIn
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-2'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 sm:p-6 flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Why "₹ / g Protein" Matters</h3>
              <p className="text-xs text-emerald-200 mt-0.5">
                The smart way to compare real supplement cost
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-sm text-slate-700">
          
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <h4 className="font-bold text-emerald-950 flex items-center space-x-2 text-xs uppercase tracking-wider mb-2">
              <Calculator className="w-4 h-4 text-emerald-700" />
              <span>Standardized Mathematical Formula</span>
            </h4>
            <div className="space-y-1 font-mono text-xs text-slate-800 bg-white p-3 rounded-lg border border-emerald-100">
              <div>1. Total Protein (g) = Servings Per Pack × Protein Per Serving (g)</div>
              <div className="text-emerald-700 font-bold pt-1">
                2. Price / g Protein = Discounted Price ÷ Total Protein (g)
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900">
              How Big Brands Often Mislead Consumers:
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start space-x-2">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>
                  <strong>Sticker price trap:</strong> A 1kg jar selling for ₹1,800 might only have 65% protein content, while a ₹2,200 jar has 82% purity.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>
                  <strong>Scoop size variations:</strong> Some brands use 36g scoops with 10g of maltodextrin/fillers to deliver 24g of protein.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>
                  <strong>True value comparison:</strong> By looking at <em>₹ per gram of pure protein</em>, you compare apples to apples regardless of brand marketing.
                </span>
              </li>
            </ul>
          </div>

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 rounded-xl transition-colors text-sm cursor-pointer"
            >
              Got it, let me browse supplements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
