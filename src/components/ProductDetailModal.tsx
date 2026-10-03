import React, { useState, useEffect } from 'react';
import type { Product } from '../types/product';
import { calculateProteinMetrics, calculateDiscountPercentage } from '../utils/metrics';
import { formatCurrency } from '../utils/currency';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Star, 
  ShieldCheck, 
  FlaskConical, 
  ShoppingCart, 
  Check, 
  Sparkles, 
  Plus, 
  Minus,
  ArrowRight
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onVerifyBatch: (product: Product) => void;
  onOpenMetricExplainer: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onVerifyBatch,
  onOpenMetricExplainer,
}) => {
  const { items, addToCart, updateQuantity } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  
  // Two-phase mount/animate state for smooth entry & exit transitions
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState<string>('');

  useEffect(() => {
    if (product) {
      setSelectedFlavor(product.flavor || product.flavors?.[0] || '');
    }
  }, [product]);

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
      }, 250); // Matches 250ms transition duration
      document.body.classList.remove('overflow-hidden');
      return () => clearTimeout(timeout);
    }
  }, [isOpen, product]);

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

  if (!isRendered || !product) return null;

  const availableFlavors = product.flavors && product.flavors.length > 0
    ? product.flavors
    : product.flavor
    ? [product.flavor]
    : [];

  const cartItem = items.find(
    (item) => item.product.id === product.id && (!selectedFlavor || item.selectedFlavor === selectedFlavor)
  );
  const cartQuantity = cartItem?.quantity ?? 0;
  const proteinMetric = calculateProteinMetrics(product);
  const discountPercent = calculateDiscountPercentage(product.mrp, product.discountedPrice);
  const latestBatch = product.batches[0];

  const handleAddToCart = () => {
    addToCart(product, 1, true, selectedFlavor || undefined);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-5">
      {/* Backdrop: GPU-accelerated opacity transition (200ms ease-out) */}
      <div 
        className={`fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity duration-200 ease-out cursor-pointer ${
          isAnimatingIn ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Dialog Box: Spring/Scale transition (250ms ease-out) 
          Starts at opacity-0 scale-95 translate-y-2 -> opacity-100 scale-100 translate-y-0 */}
      <div 
        className={`relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] z-10 transform transition-all duration-250 ease-out ${
          isAnimatingIn 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-2'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              {product.brand}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              {product.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Close product details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
            
            {/* Product Image Section with Foreground Discount Badge */}
            <div className="sm:col-span-5 bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col items-center justify-center relative">
              {discountPercent > 0 && (
                <span className="absolute top-3 left-3 z-20 bg-rose-600 text-white text-[11px] font-black px-2.5 py-1 rounded-lg shadow-md pointer-events-none">
                  {discountPercent}% OFF
                </span>
              )}
              <div className="w-full h-52 flex items-center justify-center p-3 pt-6 relative z-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain mix-blend-multiply drop-shadow-sm select-none"
                />
              </div>
              <div className="mt-3 w-full pt-3 border-t border-slate-200 text-center">
                <span className="text-xs font-semibold text-slate-600">
                  Net Weight:{' '}
                  <strong>
                    {product.netWeightGrams >= 1000
                      ? `${(product.netWeightGrams / 1000).toFixed(1)} kg`
                      : `${product.netWeightGrams} g`}
                  </strong>
                </span>
              </div>
            </div>

            {/* Product Meta */}
            <div className="sm:col-span-7 space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-slate-950 leading-tight">
                {product.name}
              </h2>

              {/* Star Rating & Review count */}
              <div className="flex items-center space-x-2 text-xs">
                <span className="inline-flex items-center bg-amber-50 text-amber-900 font-bold px-2 py-0.5 rounded border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 mr-1" />
                  {product.rating}
                </span>
                <span className="text-slate-500 font-medium">
                  {product.reviewsCount.toLocaleString()} verified customer reviews
                </span>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline space-x-2 pt-1">
                <span className="text-2xl sm:text-3xl font-black text-slate-950">
                  {formatCurrency(product.discountedPrice)}
                </span>
                <span className="text-sm text-slate-400 line-through">
                  {formatCurrency(product.mrp)}
                </span>
                {discountPercent > 0 && (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Save {formatCurrency(product.mrp - product.discountedPrice)}
                  </span>
                )}
              </div>

              {/* Stock condition */}
              <div className="flex items-center space-x-2 text-xs">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-bold ${
                  product.inStock 
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                    product.inStock ? 'bg-emerald-600' : 'bg-rose-600'
                  }`} />
                  {product.inStock ? 'Ready for Immediate Dispatch' : 'Currently Out of Stock'}
                </span>
              </div>

              {/* Interactive Flavor Selection Section */}
              {availableFlavors.length > 0 && (
                <div className="pt-2.5 space-y-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">
                      Select Flavor:{' '}
                      <span className="text-emerald-700 font-extrabold">{selectedFlavor}</span>
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {availableFlavors.length} options
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {availableFlavors.map((flv) => {
                      const isSelected = selectedFlavor === flv;
                      return (
                        <button
                          key={flv}
                          type="button"
                          onClick={() => setSelectedFlavor(flv)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer active:scale-95 ${
                            isSelected
                              ? 'bg-emerald-50 text-emerald-950 border-emerald-600 ring-2 ring-emerald-600/25 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-2xs'
                          }`}
                        >
                          {flv}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Calculated Protein Value Metric Breakdown */}
          {proteinMetric && (
            <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-emerald-200/60">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span className="font-extrabold text-xs uppercase tracking-wider text-emerald-950">
                    Standardized Cost per Gram of Protein
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onOpenMetricExplainer}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 hover:underline cursor-pointer"
                >
                  Metric Formula →
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Protein / Scoop
                  </span>
                  <span className="font-black text-slate-900 text-sm">
                    {product.proteinPerServingGrams}g
                  </span>
                </div>

                <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Total Protein
                  </span>
                  <span className="font-black text-slate-900 text-sm">
                    {proteinMetric.totalProteinGrams}g
                  </span>
                </div>

                <div className="bg-emerald-700 text-white p-2.5 rounded-xl shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-emerald-200 block">
                    True Value
                  </span>
                  <span className="font-black text-sm">
                    {proteinMetric.formattedMetric}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Third-Party Lab Verification Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FlaskConical className="w-4 h-4 text-emerald-700" />
                <span className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                  Independent NABL Lab Credentials
                </span>
              </div>
              <span className="text-[10px] font-mono bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-600">
                ISO/IEC 17025
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Heavy Metals (Pb/As/Cd/Hg):</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  ND (Pass)
                </span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200/80 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Pathogen Microbiological:</span>
                <span className="text-emerald-700 font-bold">Negative (Pass)</span>
              </div>
            </div>

            {latestBatch && (
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Current Batch: <strong className="font-mono text-slate-800">#{latestBatch.batchNumber}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setTimeout(() => onVerifyBatch(product), 150);
                  }}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>Inspect Certificate of Analysis (CoA)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-4 shrink-0">
          <div className="hidden sm:block">
            <span className="text-xs text-slate-500 block">Total Price:</span>
            <span className="text-lg font-black text-slate-950">
              {formatCurrency(product.discountedPrice)}
            </span>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            {cartQuantity > 0 ? (
              <div className="flex items-center space-x-2 bg-slate-200/80 rounded-xl p-1">
                <button
                  onClick={() => updateQuantity(product.id, -1, true, selectedFlavor || undefined)}
                  className="w-9 h-9 rounded-lg bg-white text-slate-800 flex items-center justify-center font-bold shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-sm px-2 text-slate-900">
                  {cartQuantity} in cart
                </span>
                <button
                  onClick={() => updateQuantity(product.id, 1, true, selectedFlavor || undefined)}
                  className="w-9 h-9 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold shadow-2xs hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`py-3 px-6 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95 cursor-pointer ${
                  justAdded
                    ? 'bg-emerald-700 text-white'
                    : product.inStock
                    ? 'bg-slate-900 hover:bg-slate-800 text-white'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={() => {
                onClose();
                setTimeout(() => onVerifyBatch(product), 150);
              }}
              className="py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-emerald-900 bg-white hover:bg-emerald-50 border border-emerald-300 transition-all cursor-pointer flex items-center space-x-1.5 shadow-2xs active:scale-95"
            >
              <FlaskConical className="w-4 h-4 text-emerald-700" />
              <span>Verify Lab Report</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
