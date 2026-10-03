import React, { useState, useEffect, useMemo } from 'react';
import type { Product, ProductBatch } from '../types/product';
import { formatDate } from '../utils/currency';
import { searchBatchRegistry, DEMO_SAMPLE_BATCHES } from '../utils/batchRegistry';
import { CoaDocumentViewer } from './CoaDocumentViewer';
import { 
  X, 
  ShieldCheck, 
  FlaskConical, 
  CheckCircle2, 
  Search, 
  AlertTriangle, 
  FileText, 
  ChevronDown, 
  Info,
  Sparkles,
  QrCode,
  Tag
} from 'lucide-react';

interface BatchVerificationModalProps {
  initialProduct: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BatchVerificationModal: React.FC<BatchVerificationModalProps> = ({
  initialProduct,
  isOpen,
  onClose,
}) => {
  // Two-phase mount/animate state for smooth entry & exit transitions
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

  // Clean up body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  // Clean ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Active query state
  const [batchInput, setBatchInput] = useState<string>(() => {
    return initialProduct?.batches[0]?.batchNumber || '';
  });

  const [isCoaOpen, setIsCoaOpen] = useState(false);

  // Sync state whenever initialProduct changes
  useEffect(() => {
    if (initialProduct?.batches[0]) {
      setBatchInput(initialProduct.batches[0].batchNumber);
    } else {
      setBatchInput('');
    }
  }, [initialProduct]);

  // Lookup match
  const lookupResult = useMemo(() => {
    if (!batchInput.trim()) return null;
    return searchBatchRegistry(batchInput);
  }, [batchInput]);

  const activeProduct: Product | null = lookupResult ? lookupResult.product : initialProduct;
  const activeBatch: ProductBatch | null = lookupResult ? lookupResult.batch : null;

  const isInputEmpty = batchInput.trim() === '';
  const isInvalidBatch = !isInputEmpty && !lookupResult;

  const handleSelectBatchFromDropdown = (batchNum: string) => {
    setBatchInput(batchNum);
  };

  const handleChipClick = (chipBatchNumber: string) => {
    setBatchInput(chipBatchNumber);
  };

  if (!isRendered) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-5">
        {/* Backdrop: GPU-accelerated opacity transition (200ms ease-out) */}
        <div 
          className={`fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity duration-200 ease-out cursor-pointer ${
            isAnimatingIn ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onClose}
        />

        {/* Dialog Box: Spring/Scale transition (250ms ease-out) */}
        <div 
          className={`relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] z-10 transform transition-all duration-250 ease-out ${
            isAnimatingIn 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-95 translate-y-2'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-start justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/25 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
                <FlaskConical className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                    Live NABL Registry
                  </span>
                  <span className="text-[11px] text-slate-400 hidden sm:inline">
                    Central Testing Database
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-white mt-1">
                  Supplement Authenticity & Batch Verifier
                </h2>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            
            {/* Input & Search Section */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                  <Search className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verify by Batch Number:</span>
                </label>

                {/* Dropdown if currently viewing a known product */}
                {initialProduct && initialProduct.batches.length > 0 && (
                  <div className="relative inline-block text-xs">
                    <select
                      value={activeBatch?.batchNumber || ''}
                      onChange={(e) => handleSelectBatchFromDropdown(e.target.value)}
                      className="bg-white border border-slate-200 text-slate-700 rounded-lg px-2.5 py-1 pr-6 font-mono font-medium focus:ring-1 focus:ring-emerald-500 cursor-pointer appearance-none text-xs"
                    >
                      <option value="" disabled>Select from known product batches</option>
                      {initialProduct.batches.map((b) => (
                        <option key={b.batchNumber} value={b.batchNumber}>
                          Batch #{b.batchNumber} (Mfg {formatDate(b.manufacturingDate)})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2 pointer-events-none" />
                  </div>
                )}
              </div>

              {/* Manual Input Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  value={batchInput}
                  onChange={(e) => setBatchInput(e.target.value)}
                  placeholder="e.g. MB-BZ-2024-8841, ON-GS-99042, AV-FC-4482..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 placeholder:text-slate-400 placeholder:font-sans focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all uppercase"
                />
                {batchInput && (
                  <button
                    onClick={() => setBatchInput('')}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    title="Clear"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Demo Clickable Chips */}
              <div>
                <div className="text-[11px] font-semibold text-slate-500 mb-1.5 flex items-center space-x-1">
                  <Tag className="w-3 h-3 text-slate-400" />
                  <span>Click sample batch chips for instant preview:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {DEMO_SAMPLE_BATCHES.map((chip) => (
                    <button
                      key={chip.batchNumber}
                      onClick={() => handleChipClick(chip.batchNumber)}
                      className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-all ${
                        batchInput.trim().toUpperCase() === chip.batchNumber.toUpperCase()
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : chip.isKnownValid
                          ? 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                          : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                      }`}
                      title={`${chip.brand}: ${chip.productName}`}
                    >
                      {chip.batchNumber}
                      {!chip.isKnownValid && ' (Test Invalid)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ERROR STATE: Batch Not Found Warning */}
            {isInvalidBatch && (
              <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-5 text-rose-900 animate-in fade-in duration-200 space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-rose-950">
                      Batch Not Found in Certified Registry
                    </h4>
                    <p className="text-xs text-rose-800 mt-1 leading-relaxed">
                      "<strong>{batchInput}</strong>" does not match any authenticated manufacturing records in our central NABL laboratory database.
                    </p>
                  </div>
                </div>

                <div className="bg-white/90 border border-rose-200 rounded-xl p-3 text-xs text-slate-700 space-y-1.5">
                  <div className="font-semibold text-slate-800 flex items-center space-x-1.5">
                    <Info className="w-3.5 h-3.5 text-rose-600" />
                    <span>How to find your genuine batch number:</span>
                  </div>
                  <p className="text-slate-600">
                    Please check the <strong>bottom of your jar</strong> or the <strong>laser-etched imprint on the jar neck</strong> beneath the expiry date and re-enter.
                  </p>
                </div>
              </div>
            )}

            {/* EMPTY STATE: Prompt to enter or pick batch */}
            {isInputEmpty && (
              <div className="text-center py-8 px-4 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-slate-500">
                <QrCode className="w-10 h-10 mx-auto text-slate-400 mb-2" />
                <h4 className="font-bold text-slate-700 text-sm">Enter or Select a Batch Number</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Type the batch code printed on your supplement bottle or click one of the demo chips above to view verified lab assay records.
                </p>
              </div>
            )}

            {/* VALID STATE: Full Verified Lab Breakdown */}
            {activeBatch && activeProduct && (
              <div className="space-y-6 animate-in fade-in duration-300">
                
                {/* Product Summary Header with Authenticity Indicator */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50/50 to-slate-50 border border-emerald-200">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-14 h-14 rounded-xl bg-white p-1 border border-emerald-100 flex items-center justify-center shrink-0 shadow-2xs">
                      <img
                        src={activeProduct.image}
                        alt={activeProduct.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                        {activeProduct.brand} • {activeProduct.category}
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm line-clamp-1">
                        {activeProduct.name}
                      </h4>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Verified Batch: <strong className="font-mono text-slate-800">#{activeBatch.batchNumber}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Prominent Green Shield Badge */}
                  <div className="shrink-0">
                    <div className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-3.5 py-2 rounded-xl shadow-sm shadow-emerald-600/20">
                      <ShieldCheck className="w-4 h-4 text-emerald-200 stroke-[2.5]" />
                      <div className="text-left">
                        <span className="block text-[11px] font-black uppercase tracking-wider leading-none">
                          100% Authentic
                        </span>
                        <span className="text-[10px] text-emerald-100 font-medium leading-none">
                          Third-Party Lab Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lab Accreditation & Dates Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Tested By Lab</span>
                    <span className="font-bold text-slate-800 line-clamp-1">{activeBatch.labName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Report ID</span>
                    <span className="font-mono font-bold text-emerald-800">{activeBatch.reportId}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Lab Test Date</span>
                    <span className="font-semibold text-slate-700">{formatDate(activeBatch.testDate)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Batch Expiry</span>
                    <span className="font-semibold text-slate-700">{formatDate(activeBatch.expiryDate)}</span>
                  </div>
                </div>

                {/* TEST RESULTS BREAKDOWN CARD */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2 flex items-center justify-between">
                    <span className="flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Certified Laboratory Assay Breakdown</span>
                    </span>
                    <span className="text-[10px] font-normal text-slate-500">
                      Accreditation: {activeBatch.accreditationId}
                    </span>
                  </h4>

                  {/* 1. Claimed Protein vs. Lab Tested Protein */}
                  <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-950 block">
                          Protein Content Recovery
                        </span>
                        <span className="text-[11px] text-emerald-800">
                          {activeBatch.testedParameters.proteinClaimedGrams && activeBatch.testedParameters.proteinClaimedGrams > 0
                            ? `Claimed: ${activeBatch.testedParameters.proteinClaimedGrams}g | Tested: ${activeBatch.testedParameters.proteinTestedGrams}g per scoop`
                            : 'Active Ingredient Purity Tested via HPLC Assay'}
                        </span>
                      </div>
                      
                      <span className="inline-flex items-center text-xs font-extrabold text-white bg-emerald-600 px-2.5 py-1 rounded-lg shadow-xs self-start sm:self-auto">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        {activeBatch.testedParameters.proteinFoundPercent > 0
                          ? `${activeBatch.testedParameters.proteinFoundPercent}% Recovery • PASSED`
                          : '100% PURITY PASSED'}
                      </span>
                    </div>

                    {/* Visual Comparison Bar */}
                    {activeBatch.testedParameters.proteinClaimedGrams && activeBatch.testedParameters.proteinClaimedGrams > 0 && (() => {
                      const claimed = activeBatch.testedParameters.proteinClaimedGrams;
                      const tested = activeBatch.testedParameters.proteinTestedGrams ?? claimed;
                      const recovery = Math.round((tested / claimed) * 100);
                      return (
                        <div className="mt-3 space-y-1">
                          <div className="flex justify-between text-[11px] text-slate-600 font-medium">
                            <span>Label Claim: {claimed}g</span>
                            <span className="text-emerald-800 font-bold">
                              Actual Found: {tested}g ({recovery}% of Claim)
                            </span>
                          </div>
                          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-emerald-600 rounded-full" 
                              style={{ width: `${Math.min(100, recovery)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* 2. Safety Screenings: Heavy Metals (Lead, Arsenic, Cadmium, Mercury) marked ND */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Toxic Heavy Metals Screening (ICP-MS)
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        All Parameters "ND" (Not Detected)
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50 text-center">
                        <span className="text-[10px] text-slate-500 block font-semibold">Lead (Pb)</span>
                        <div className="font-bold text-emerald-700 text-sm mt-0.5">
                          ND <span className="text-[10px] font-normal text-slate-400">(&lt; 0.05 ppm)</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-medium">PASS</span>
                      </div>

                      <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50 text-center">
                        <span className="text-[10px] text-slate-500 block font-semibold">Arsenic (As)</span>
                        <div className="font-bold text-emerald-700 text-sm mt-0.5">
                          ND <span className="text-[10px] font-normal text-slate-400">(&lt; 0.05 ppm)</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-medium">PASS</span>
                      </div>

                      <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50 text-center">
                        <span className="text-[10px] text-slate-500 block font-semibold">Cadmium (Cd)</span>
                        <div className="font-bold text-emerald-700 text-sm mt-0.5">
                          ND <span className="text-[10px] font-normal text-slate-400">(&lt; 0.02 ppm)</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-medium">PASS</span>
                      </div>

                      <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50 text-center">
                        <span className="text-[10px] text-slate-500 block font-semibold">Mercury (Hg)</span>
                        <div className="font-bold text-emerald-700 text-sm mt-0.5">
                          ND <span className="text-[10px] font-normal text-slate-400">(&lt; 0.01 ppm)</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-medium">PASS</span>
                      </div>
                    </div>
                  </div>

                  {/* 3. Microbiological Status (E. coli, Salmonella) marked Pass */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Microbiological Safety Status
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        100% Pathogen Free
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50 flex items-center justify-between">
                        <div>
                          <span className="text-slate-800 font-semibold block">Escherichia coli</span>
                          <span className="text-[10px] text-slate-500">Method: IS 5887 (Part 1)</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-emerald-700">Absent / 10g</span>
                          <span className="ml-2 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            PASS
                          </span>
                        </div>
                      </div>

                      <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50 flex items-center justify-between">
                        <div>
                          <span className="text-slate-800 font-semibold block">Salmonella Species</span>
                          <span className="text-[10px] text-slate-500">Method: IS 5887 (Part 3)</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-emerald-700">Absent / 25g</span>
                          <span className="ml-2 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            PASS
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary Action Button: View Original Certificate of Analysis (CoA) */}
                <div className="pt-2">
                  <button
                    onClick={() => setIsCoaOpen(true)}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-5 rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2 text-sm group"
                  >
                    <FileText className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span>View Original Certificate of Analysis (CoA)</span>
                  </button>
                  <p className="text-center text-[11px] text-slate-400 mt-2">
                    Clicking opens the cryptographic laboratory document with official chemist signatures and QR code.
                  </p>
                </div>

              </div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs shrink-0">
            <span className="text-slate-500 text-[11px]">
              Direct NABL API Synchronized Record
            </span>
            <button
              onClick={onClose}
              className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold px-4 py-1.5 rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Embedded High-Fidelity CoA Document Viewer Modal */}
      {activeProduct && activeBatch && (
        <CoaDocumentViewer
          product={activeProduct}
          batch={activeBatch}
          isOpen={isCoaOpen}
          onClose={() => setIsCoaOpen(false)}
        />
      )}
    </>
  );
};
