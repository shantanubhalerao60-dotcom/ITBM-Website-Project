import React from 'react';
import type { ProductCategory } from '../types/product';
import { 
  Sparkles, 
  Dumbbell, 
  Leaf, 
  Flame, 
  HeartPulse 
} from 'lucide-react';

interface CategoryPillsProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  categoryCounts: Record<ProductCategory, number>;
}

const CATEGORY_CONFIG: {
  category: ProductCategory;
  label: string;
  icon: React.ElementType;
}[] = [
  { category: 'All', label: 'All Supplements', icon: Sparkles },
  { category: 'Whey Protein', label: 'Whey Protein', icon: Dumbbell },
  { category: 'Plant Protein', label: 'Plant Protein', icon: Leaf },
  { category: 'Performance & Creatine', label: 'Performance & Creatine', icon: Flame },
  { category: 'Daily Wellness', label: 'Daily Wellness', icon: HeartPulse },
];

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-none py-2">
      <div className="flex items-center space-x-2 min-w-max">
        {CATEGORY_CONFIG.map(({ category, label, icon: Icon }) => {
          const isSelected = selectedCategory === category;
          const count = categoryCounts[category] ?? 0;

          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 border cursor-pointer ${
                isSelected
                  ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 hover:text-slate-900 shadow-2xs'
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  isSelected ? 'text-emerald-200' : 'text-slate-500'
                }`}
              />
              <span>{label}</span>
              <span
                className={`ml-1 text-[11px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                  isSelected
                    ? 'bg-emerald-950/60 text-emerald-100'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
