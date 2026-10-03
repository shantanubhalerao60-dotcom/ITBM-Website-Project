import React from 'react';
import type { ProductSortOption } from '../types/product';
import { 
  ArrowUpDown, 
  CheckCircle2, 
  X 
} from 'lucide-react';

interface FilterSortBarProps {
  totalResults: number;
  sortOption: ProductSortOption;
  onSortChange: (option: ProductSortOption) => void;
  inStockOnly: boolean;
  onToggleInStock: (val: boolean) => void;
  activeCategory: string;
  searchQuery: string;
  onClearFilters: () => void;
}

export const FilterSortBar: React.FC<FilterSortBarProps> = ({
  totalResults,
  sortOption,
  onSortChange,
  inStockOnly,
  onToggleInStock,
  activeCategory,
  searchQuery,
  onClearFilters,
}) => {
  const hasActiveFilters = activeCategory !== 'All' || searchQuery !== '' || inStockOnly;

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Results Counter & Active Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-900 text-sm">
              Showing <span className="text-emerald-600 font-bold">{totalResults}</span> verified supplements
            </span>
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-1.5 ml-0 sm:ml-2">
              {activeCategory !== 'All' && (
                <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                  {activeCategory}
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                  "{searchQuery}"
                </span>
              )}
              {inStockOnly && (
                <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                  In-Stock Only
                </span>
              )}
              <button
                onClick={onClearFilters}
                className="text-xs text-rose-600 hover:text-rose-700 font-medium ml-1 flex items-center hover:underline"
              >
                <X className="w-3 h-3 mr-0.5" />
                Reset
              </button>
            </div>
          )}
        </div>

        {/* Sorting & Quick In-Stock Switch */}
        <div className="flex flex-wrap items-center gap-3">
          {/* In Stock Toggle */}
          <label className="flex items-center space-x-2 text-xs font-medium text-slate-700 cursor-pointer select-none bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded-xl border border-slate-200 transition-colors">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onToggleInStock(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded cursor-pointer"
            />
            <span className="flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
              In-Stock Only
            </span>
          </label>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1.5 text-xs text-slate-500">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline font-medium">Sort By:</span>
            </div>
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as ProductSortOption)}
              className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs sm:text-sm rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
            >
              <option value="featured">Featured & Best Value</option>
              <option value="protein_value">⚡ Price per g of Protein (Best Yield)</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating_desc">Highest Customer Rating</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
