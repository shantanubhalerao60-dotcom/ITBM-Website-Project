import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  ShoppingCart, 
  X, 
  FlaskConical,
  ChevronDown
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { ProductCategory } from '../types/product';
import { CustomerAccountDropdown } from './CustomerAccountDropdown';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  categoryCounts: Record<ProductCategory, number>;
  onOpenMetricExplainer: () => void;
  onOpenBatchVerification: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  categoryCounts,
  onOpenMetricExplainer,
  onOpenBatchVerification,
}) => {
  const { totalItemsCount, toggleCart } = useCart();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          
          {/* Brand Logo - Inspired by HyugaLife & Tata 1mg */}
          <div className="flex items-center space-x-3 shrink-0">
            <a href="#" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center shadow-md shadow-emerald-900/10 text-white transition-transform group-hover:scale-105">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="font-black text-xl sm:text-2xl tracking-tight text-slate-950 font-sans">
                    Nutri<span className="text-emerald-700">Trust</span>
                  </span>
                  <span className="text-[10px] uppercase font-extrabold tracking-wider bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200/80">
                    Clinical
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium hidden sm:block">
                  Lab-Certified Wellness & Sports Nutrition
                </span>
              </div>
            </a>
          </div>

          {/* Search Bar with Integrated Category Selector */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-2">
            <div className="relative flex items-center w-full bg-slate-50/90 hover:bg-slate-50 focus-within:bg-white border border-slate-200 rounded-2xl shadow-2xs focus-within:ring-4 focus-within:ring-emerald-500/10 focus-within:border-emerald-600 transition-all">
              
              {/* Category Filter embedded inside search bar */}
              <div className="relative flex items-center shrink-0 border-r border-slate-200/90 bg-slate-100/50 rounded-l-2xl">
                <select
                  value={selectedCategory}
                  onChange={(e) => onSelectCategory(e.target.value as ProductCategory)}
                  className="appearance-none bg-transparent pl-3 pr-7 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-950 focus:outline-none cursor-pointer"
                  title="Filter by category"
                >
                  <option value="All">All Categories ({categoryCounts['All'] ?? 0})</option>
                  <option value="Whey Protein">Whey Protein ({categoryCounts['Whey Protein'] ?? 0})</option>
                  <option value="Plant Protein">Plant Protein ({categoryCounts['Plant Protein'] ?? 0})</option>
                  <option value="Performance & Creatine">Performance & Creatine ({categoryCounts['Performance & Creatine'] ?? 0})</option>
                  <option value="Daily Wellness">Daily Wellness ({categoryCounts['Daily Wellness'] ?? 0})</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 pointer-events-none" />
              </div>

              {/* Search Icon & Input */}
              <div className="pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={
                  selectedCategory === 'All'
                    ? "Search supplements, brands (e.g. MuscleBlaze, Whey, Creapure)..."
                    : `Search within ${selectedCategory}...`
                }
                className="w-full pl-2.5 pr-9 py-2.5 bg-transparent text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right Actions: Authenticity Lookup, Account Dropdown (includes ₹/g Guide), Cart */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Dedicated "Verify Authenticity" Pill */}
            <button
              onClick={onOpenBatchVerification}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-900 bg-emerald-50/80 hover:bg-emerald-100/90 border border-emerald-200/90 px-3.5 py-2.5 rounded-xl transition-all shadow-2xs active:scale-95 cursor-pointer"
              title="Verify supplement batch authenticity against NABL lab records"
            >
              <FlaskConical className="w-3.5 h-3.5 text-emerald-700 stroke-[2.2]" />
              <span className="hidden sm:inline">Verify Batch</span>
              <span className="sm:hidden">Verify</span>
            </button>

            {/* Customer Login & Account Dropdown (Contains ₹/g Value Calculator, Orders, Buy Again, Refer, Offers) */}
            <CustomerAccountDropdown onOpenMetricExplainer={onOpenMetricExplainer} />

            {/* Shorter Cart Button (Zero '₹0' symbol) */}
            <button
              onClick={toggleCart}
              className="relative inline-flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3 py-2 rounded-xl transition-all shadow-2xs active:scale-95 cursor-pointer"
              aria-label="Open Cart"
              title="View Cart"
            >
              <div className="relative flex items-center">
                <ShoppingCart className="w-4 h-4 text-emerald-400" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-emerald-500 text-slate-950 font-black text-[10px] min-w-[1.125rem] h-4.5 px-1 rounded-full flex items-center justify-center ring-2 ring-slate-900 animate-in zoom-50">
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-bold text-slate-100">
                Cart
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search & Filter Dropdown Expansion */}
        {showMobileSearch && (
          <div className="md:hidden pb-3 pt-1 border-t border-slate-100 space-y-2">
            <div className="relative flex items-center w-full bg-slate-50 border border-slate-200 rounded-xl">
              <div className="pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search supplements, brands..."
                autoFocus
                className="w-full pl-2.5 pr-8 py-2 bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 p-1 text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => onSelectCategory(e.target.value as ProductCategory)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none"
              >
                <option value="All">All Categories ({categoryCounts['All'] ?? 0})</option>
                <option value="Whey Protein">Whey Protein ({categoryCounts['Whey Protein'] ?? 0})</option>
                <option value="Plant Protein">Plant Protein ({categoryCounts['Plant Protein'] ?? 0})</option>
                <option value="Performance & Creatine">Performance & Creatine ({categoryCounts['Performance & Creatine'] ?? 0})</option>
                <option value="Daily Wellness">Daily Wellness ({categoryCounts['Daily Wellness'] ?? 0})</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
