import React, { useState, useEffect } from 'react';
import type { Product, ProductBatch } from '../../types/product';
import { 
  X, 
  FlaskConical, 
  Plus
} from 'lucide-react';

interface AddBatchModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveBatch: (productId: string, batch: ProductBatch) => void;
}

export const AddBatchModal: React.FC<AddBatchModalProps> = ({
  product,
  isOpen,
  onClose,
  onSaveBatch,
}) => {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  useEffect(() => {
    if (isOpen && product) {
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
  }, [isOpen, product]);

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

  const [batchNumber, setBatchNumber] = useState(`BATCH-${Date.now().toString().slice(-4)}`);
  const [mfgDate, setMfgDate] = useState('2025-01-10');
  const [expiryDate, setExpiryDate] = useState('2027-01-09');
  const [testDate, setTestDate] = useState('2025-01-14');
  const [labName, setLabName] = useState('Eurofins Analytical Services India Pvt Ltd');
  const [reportId, setReportId] = useState(`EUR-IN-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`);
  const accreditationId = 'NABL TC-88912 / ISO-IEC 17025';
  const [proteinFoundPercent, setProteinFoundPercent] = useState<number>(84.0);
  const [proteinTestedGrams, setProteinTestedGrams] = useState<number>(
    product?.proteinPerServingGrams ? product.proteinPerServingGrams + 0.3 : 0
  );
  const [heavyMetalsPass, setHeavyMetalsPass] = useState(true);
  const [microbiologicalPass, setMicrobiologicalPass] = useState(true);

  const handleAutofill = () => {
    if (!product) return;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    setBatchNumber(`${product.brand.substring(0, 2).toUpperCase()}-TEST-2025-${randomSuffix}`);
    setMfgDate('2025-02-01');
    setExpiryDate('2027-01-31');
    setTestDate('2025-02-05');
    setProteinFoundPercent(84.5);
    if (product.proteinPerServingGrams) {
      setProteinTestedGrams(product.proteinPerServingGrams + 0.4);
    }
    setHeavyMetalsPass(true);
    setMicrobiologicalPass(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    if (!batchNumber.trim()) {
      alert('Batch Number is required');
      return;
    }

    const newBatch: ProductBatch = {
      batchNumber: batchNumber.trim().toUpperCase(),
      manufacturingDate: mfgDate,
      expiryDate,
      testDate,
      labReportUrl: `https://reports.nutritrust.internal/${batchNumber.trim()}.pdf`,
      reportId,
      labName,
      accreditationId,
      testedParameters: {
        proteinFoundPercent,
        proteinClaimedGrams: product.proteinPerServingGrams ?? undefined,
        proteinTestedGrams: product.proteinPerServingGrams ? proteinTestedGrams : undefined,
        heavyMetalsPass,
        heavyMetalsDetail: {
          leadPpm: 0.010,
          cadmiumPpm: 0.003,
          arsenicPpm: 0.006,
          mercuryPpm: 0.001,
        },
        microbiologicalPass,
        microbiologyDetail: {
          eColiPass: true,
          salmonellaPass: true,
          yeastMoldPass: true,
        },
      },
    };

    onSaveBatch(product.id, newBatch);
    onClose();
  };

  if (!isRendered || !product) return null;

  return (
    <div className="fixed inset-0 z-70 overflow-y-auto flex items-center justify-center p-3 sm:p-5">
      {/* Backdrop: GPU-accelerated opacity transition (200ms ease-out) */}
      <div 
        className={`fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity duration-200 ease-out cursor-pointer ${
          isAnimatingIn ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Dialog Box: Spring/Scale transition (250ms ease-out) */}
      <div 
        className={`relative bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] z-10 transform transition-all duration-250 ease-out ${
          isAnimatingIn 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-2'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <FlaskConical className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Register New Production Batch
              </h2>
              <span className="text-xs text-slate-400">
                Direct entry into NABL analytical registry
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Context Banner */}
        <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center space-x-2.5">
            <img src={product.image} alt={product.name} className="w-8 h-8 object-contain shrink-0" />
            <div>
              <span className="font-extrabold text-slate-900 block truncate max-w-xs">{product.name}</span>
              <span className="text-[11px] text-slate-500">{product.brand} • SKU: {product.id}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAutofill}
            className="text-[11px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 font-bold px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors shrink-0"
          >
            ⚡ Autofill Batch
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                Batch Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                placeholder="e.g. MB-BZ-2025-9921"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-mono font-bold text-slate-900 uppercase focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                COA Report ID <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={reportId}
                onChange={(e) => setReportId(e.target.value)}
                placeholder="e.g. EUR-IN-2025-88124"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-mono text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Manufacturing Date
              </label>
              <input
                type="date"
                value={mfgDate}
                onChange={(e) => setMfgDate(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Lab Test Date
              </label>
              <input
                type="date"
                value={testDate}
                onChange={(e) => setTestDate(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
              Accredited Laboratory
            </label>
            <select
              value={labName}
              onChange={(e) => setLabName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 font-medium"
            >
              <option value="Eurofins Analytical Services India Pvt Ltd">
                Eurofins Analytical Services India Pvt Ltd (NABL TC-88912)
              </option>
              <option value="SGS India Testing Laboratories Pvt Ltd">
                SGS India Testing Laboratories Pvt Ltd (NABL TC-55102)
              </option>
              <option value="TUV SUD South Asia Pvt Ltd">
                TUV SUD South Asia Pvt Ltd (NABL TC-44190)
              </option>
              <option value="Intertek Food Services India Pvt Ltd">
                Intertek Food Services India Pvt Ltd (NABL TC-61922)
              </option>
            </select>
          </div>

          {/* Chemical & Microbiological Parameters */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block border-b border-slate-200 pb-1">
              Analytical Parameters & Compliance
            </span>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Protein Found (% w/w)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={proteinFoundPercent}
                  onChange={(e) => setProteinFoundPercent(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-900"
                />
              </div>

              {product.proteinPerServingGrams && (
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Tested per Scoop (g)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={proteinTestedGrams}
                    onChange={(e) => setProteinTestedGrams(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-900"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <label className="flex items-center space-x-2 text-xs font-medium text-slate-800 bg-white p-2.5 rounded-xl border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={heavyMetalsPass}
                  onChange={(e) => setHeavyMetalsPass(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>Heavy Metals: PASS (ND)</span>
              </label>

              <label className="flex items-center space-x-2 text-xs font-medium text-slate-800 bg-white p-2.5 rounded-xl border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={microbiologicalPass}
                  onChange={(e) => setMicrobiologicalPass(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>Microbiology: PASS</span>
              </label>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end space-x-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Register & Certify Batch</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
