import React, { useState } from 'react';
import type { Product } from '../types/product';
import { calculateProteinMetrics, calculateDiscountPercentage } from '../utils/metrics';
import { formatCurrency } from '../utils/currency';
import { useCart } from '../context/CartContext';
import { 
  Star, 
  FlaskConical, 
  ShoppingCart, 
  Check, 
  Plus, 
  Minus, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onVerifyBatch: (product: Product) => void;
  onOpenMetricExplainer: () => void;
  onSelectProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onVerifyBatch,
  onOpenMetricExplainer,
  onSelectProduct,
}) => {
  const { items, addToCart, updateQuantity } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const cartItem = items.find((item) => item.product.id === product.id);
  const cartQuantity = cartItem?.quantity ?? 0;

  const defaultFlavor = product.flavor || product.flavors?.[0];
  const proteinMetric = calculateProteinMetrics(product);
  const discountPercent = calculateDiscountPercentage(product.mrp, product.discountedPrice);
  const latestBatch = product.batches[0];

  const handleAddToCart = () => {
    addToCart(product, 1, true, defaultFlavor);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group">
      
      {/* Product Image Section (1:1 Aspect Ratio on #f8fafc with Ample Breathing Room) */}
      <div 
        onClick={() => onSelectProduct?.(product)}
        className="relative w-full aspect-square bg-[#f8fafc] flex items-center justify-center p-6 overflow-hidden cursor-pointer group/img border-b border-slate-100"
      >
        {/* Top-Left: Discount Badge */}
        {discountPercent > 0 && (
          <span className="absolute top-2.5 left-2.5 z-20 bg-rose-600 text-white text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-lg shadow-2xs pointer-events-none">
            {discountPercent}% OFF
          </span>
        )}

        {/* Top-Right: Small Elegant Floating "Batch Verified" Badge */}
        {latestBatch && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onVerifyBatch(product);
            }}
            className="absolute top-2.5 right-2.5 z-20 inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-800 bg-white/95 hover:bg-emerald-50 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-2xs transition-all cursor-pointer hover:border-emerald-300"
            title={`NABL Certified Batch #${latestBatch.batchNumber}. Click to inspect lab analysis.`}
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
            <span>Batch Verified</span>
          </button>
        )}

        {/* Centered Supplement Tub/Pouch Render with Subtle Hover Zoom */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="max-h-full max-w-full object-contain mix-blend-multiply drop-shadow-sm group-hover/img:scale-105 transition-transform duration-300 select-none"
        />
      </div>

      {/* Streamlined Card Body (Reduced Vertical Clutter) */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
        
        <div>
          {/* Brand Name & Stock Indicator */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-500">
              {product.brand}
            </span>
            {product.stockUnits > 0 && product.stockUnits < 10 && product.inStock && (
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                Only {product.stockUnits} left
              </span>
            )}
          </div>

          {/* Product Title (Clamped to 2 lines) */}
          <h3 
            onClick={() => onSelectProduct?.(product)}
            className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 hover:text-emerald-800 transition-colors cursor-pointer min-h-[2.5rem]"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Star Rating and Weight on Single Clean Line */}
          <div className="flex items-center justify-between text-xs text-slate-500 mt-1.5">
            <div className="flex items-center space-x-1">
              <span className="inline-flex items-center bg-amber-50 text-amber-900 font-bold px-1.5 py-0.5 rounded border border-amber-200/80 text-[11px]">
                <Star className="w-3 h-3 fill-amber-400 text-amber-500 mr-0.5" />
                {product.rating}
              </span>
              <span className="text-slate-400 text-[11px]">
                ({product.reviewsCount.toLocaleString()})
              </span>
            </div>

            <span className="text-slate-500 text-xs font-medium">
              {product.netWeightGrams >= 1000
                ? `${(product.netWeightGrams / 1000).toFixed(1)} kg`
                : `${product.netWeightGrams} g`}
              {product.servingsPerPack ? ` • ${product.servingsPerPack} serv` : ''}
            </span>
          </div>
        </div>

        {/* Streamlined Pricing Section with Compact Metric Chip */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <div className="flex flex-wrap items-baseline justify-between gap-1">
            <div className="flex items-baseline space-x-1.5">
              <span className="text-lg sm:text-xl font-extrabold text-slate-950">
                {formatCurrency(product.discountedPrice)}
              </span>
              <span className="text-xs text-slate-400 line-through">
                {formatCurrency(product.mrp)}
              </span>
            </div>

            {/* Compact "₹/g" value badge integrated into pricing row */}
            {proteinMetric ? (
              <span 
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenMetricExplainer();
                }}
                className="inline-flex items-center space-x-1 text-[10px] sm:text-[11px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-200 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                title="Calculated protein value: Discounted Price / Total Protein"
              >
                <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                <span>{proteinMetric.formattedMetric}</span>
              </span>
            ) : (
              <span className="text-[10px] font-medium text-slate-400 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">
                {product.dosageForm || 'Pure Grade'}
              </span>
            )}
          </div>

          {/* Clean Retail Add to Cart Button */}
          <div className="space-y-1.5">
            {cartQuantity > 0 ? (
              <div className="flex items-center justify-between bg-slate-100 rounded-xl p-1 border border-slate-200">
                <button
                  onClick={() => updateQuantity(product.id, -1, true, cartItem?.selectedFlavor)}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-slate-50 text-slate-800 flex items-center justify-center font-bold shadow-2xs transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <div className="flex items-center space-x-1 font-bold text-slate-900 text-xs">
                  <span>{cartQuantity}</span>
                  <span className="text-[11px] font-normal text-slate-500">in cart</span>
                </div>
                <button
                  onClick={() => updateQuantity(product.id, 1, true, cartItem?.selectedFlavor)}
                  className="w-8 h-8 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white flex items-center justify-center font-bold shadow-2xs transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-1.5 transition-all shadow-xs active:scale-[0.98] cursor-pointer ${
                  justAdded
                    ? 'bg-emerald-700 text-white'
                    : product.inStock
                    ? 'bg-slate-900 hover:bg-emerald-800 text-white'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                  </>
                )}
              </button>
            )}

            {/* Compact Secondary Triggers */}
            <div className="flex items-center justify-between pt-0.5 px-0.5">
              <button
                type="button"
                onClick={() => onVerifyBatch(product)}
                className="text-[11px] font-semibold text-slate-500 hover:text-emerald-800 transition-colors inline-flex items-center space-x-1 cursor-pointer"
              >
                <FlaskConical className="w-3 h-3 text-emerald-600" />
                <span>Lab Test Report</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectProduct?.(product)}
                className="text-[11px] font-medium text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                Quick View
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
