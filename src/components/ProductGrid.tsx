import React from 'react';
import type { Product } from '../types/product';
import { ProductCard } from './ProductCard';
import { SearchX } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onVerifyBatch: (product: Product) => void;
  onOpenMetricExplainer: () => void;
  onResetFilters: () => void;
  onSelectProduct?: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onVerifyBatch,
  onOpenMetricExplainer,
  onResetFilters,
  onSelectProduct,
}) => {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-8 shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">
          No matching supplements found
        </h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
          We couldn't find any certified supplements matching your current search or category filters.
        </p>
        <button
          onClick={onResetFilters}
          className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition-colors"
        >
          <span>Clear All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onVerifyBatch={onVerifyBatch}
            onOpenMetricExplainer={onOpenMetricExplainer}
            onSelectProduct={onSelectProduct}
          />
        ))}
      </div>
    </div>
  );
};
