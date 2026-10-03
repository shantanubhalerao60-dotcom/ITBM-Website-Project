import React, { useState, useMemo } from 'react';
import type { Product, ProductBatch } from '../../types/product';
import { 
  mockAdminKpis, 
  mock7DayRevenueTrend, 
  mockCategoryDistribution 
} from '../../data/adminMockData';
import { formatCurrency } from '../../utils/currency';
import { AddBatchModal } from './AddBatchModal';
import {
  TrendingUp,
  ShoppingBag,
  CreditCard,
  FlaskConical,
  ShieldCheck,
  AlertTriangle,
  Plus,
  Search,
  ArrowLeft,
  CheckCircle2,
  Package,
  Layers,
  Sparkles,
  Store,
  FileCheck,
  LogOut,
  UserCheck
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  onToggleProductStock: (productId: string) => void;
  onAddBatch: (productId: string, batch: ProductBatch) => void;
  onSwitchToStorefront: () => void;
  onSignOut: () => void;
  onVerifyBatchInModal?: (product: Product, batchNumber?: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  onToggleProductStock,
  onAddBatch,
  onSwitchToStorefront,
  onSignOut,
  onVerifyBatchInModal,
}) => {
  // State for inventory search and filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'out'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // State for Add Batch Modal
  const [selectedProductForBatch, setSelectedProductForBatch] = useState<Product | null>(null);
  const [isAddBatchOpen, setIsAddBatchOpen] = useState(false);
  
  // Interactive chart state (for hover tooltip on 7-day chart)
  const [hoveredTrendIndex, setHoveredTrendIndex] = useState<number | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  
  // Notification toast for admin actions
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Filter products for inventory table
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Search Query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        product.name.toLowerCase().includes(q) || 
        product.brand.toLowerCase().includes(q) || 
        product.id.toLowerCase().includes(q);

      // 2. Stock Filter
      let matchesStock = true;
      if (stockFilter === 'low') {
        matchesStock = product.stockUnits < 10 && product.inStock;
      } else if (stockFilter === 'out') {
        matchesStock = !product.inStock || product.stockUnits === 0;
      }

      // 3. Category Filter
      let matchesCategory = true;
      if (categoryFilter !== 'all') {
        matchesCategory = product.category === categoryFilter;
      }

      return matchesSearch && matchesStock && matchesCategory;
    });
  }, [products, searchQuery, stockFilter, categoryFilter]);

  // Low stock counter
  const lowStockCount = useMemo(() => {
    return products.filter((p) => p.stockUnits < 10 && p.inStock).length;
  }, [products]);

  const outOfStockCount = useMemo(() => {
    return products.filter((p) => !p.inStock || p.stockUnits === 0).length;
  }, [products]);

  // Handle open add batch
  const handleOpenAddBatch = (product: Product) => {
    setSelectedProductForBatch(product);
    setIsAddBatchOpen(true);
  };

  // Handle save batch
  const handleSaveBatch = (productId: string, newBatch: ProductBatch) => {
    onAddBatch(productId, newBatch);
    const prod = products.find((p) => p.id === productId);
    showToast(`✅ Batch ${newBatch.batchNumber} registered for ${prod?.name || 'product'} with 100% NABL certification!`);
  };

  // Handle stock toggle
  const handleToggleStock = (product: Product) => {
    onToggleProductStock(product.id);
    const newStatus = !product.inStock ? 'In Stock (Active)' : 'Out of Stock';
    showToast(`Status updated: ${product.name} is now ${newStatus}`);
  };

  // SVG Chart Calculations for 7-Day Revenue Trend
  const maxRevenue = Math.max(...mock7DayRevenueTrend.map((d) => d.revenue));
  const maxOrders = Math.max(...mock7DayRevenueTrend.map((d) => d.orders));
  const chartHeight = 160;
  const chartWidth = 520;
  const barWidth = 36;
  const gap = (chartWidth - barWidth * mock7DayRevenueTrend.length) / (mock7DayRevenueTrend.length + 1);

  // SVG Calculations for Doughnut Chart
  const doughnutTotal = mockCategoryDistribution.reduce((acc, c) => acc + c.sharePercent, 0);
  let cumulativeAngle = 0;
  const doughnutSegments = mockCategoryDistribution.map((item) => {
    const startAngle = cumulativeAngle;
    const sweepAngle = (item.sharePercent / doughnutTotal) * 360;
    cumulativeAngle += sweepAngle;
    return {
      ...item,
      startAngle,
      sweepAngle,
    };
  });

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 pb-16 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-2.5 animate-in slide-in-from-bottom-5 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Sub-Header / Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left Title & Status */}
            <div className="flex items-center space-x-3">
              <button
                onClick={onSwitchToStorefront}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-slate-950 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                title="Return to Customer Storefront"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Storefront</span>
              </button>
              <span className="text-slate-300">/</span>
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-950 flex items-center gap-1.5">
                  Admin Analytics & Compliance Hub
                </h1>
                <span className="hidden sm:inline text-[10px] uppercase font-bold tracking-wider bg-slate-900 text-emerald-300 px-2 py-0.5 rounded-md">
                  V2.4 Active
                </span>
              </div>
            </div>

            {/* Right Quick Controls */}
            <div className="flex items-center space-x-2.5">
              <div className="hidden lg:flex items-center space-x-1.5 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span className="font-bold text-slate-800">admin@hyuga-demo.com</span>
                <span className="text-slate-400 font-normal">• Staff Lead</span>
              </div>

              <button
                onClick={onSwitchToStorefront}
                className="inline-flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl transition-all shadow-2xs cursor-pointer active:scale-95"
                title="Preview Customer Storefront"
              >
                <Store className="w-3.5 h-3.5 text-emerald-700" />
                <span className="hidden sm:inline">Storefront</span>
              </button>

              <button
                onClick={onSignOut}
                className="inline-flex items-center space-x-1.5 bg-rose-50 hover:bg-rose-100/80 text-rose-700 border border-rose-200 text-xs font-bold px-3 py-2 rounded-xl transition-all shadow-2xs cursor-pointer active:scale-95"
                title="Sign out and return to consumer storefront"
              >
                <LogOut className="w-3.5 h-3.5 stroke-[2.2]" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* =========================================================================
            SECTION 1: KEY PERFORMANCE INDICATORS (KPI CARDS)
            ========================================================================= */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-black text-slate-950 tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-700" />
                Executive Summary & Trust Performance
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Key commerce metrics, volume throughput, and consumer transparency verification metrics.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
              Trailing 7 Days
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* KPI 1: Gross Revenue */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Gross Revenue
                </span>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100">
                  <CreditCard className="w-4.5 h-4.5 stroke-[2.2]" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <div className="text-2xl font-black text-slate-950 tracking-tight">
                  {formatCurrency(mockAdminKpis.grossRevenue)}
                </div>
              </div>
              <div className="mt-2.5 flex items-center text-xs font-semibold">
                <span className="inline-flex items-center text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{mockAdminKpis.revenueGrowthPercent}%
                </span>
                <span className="text-slate-400 ml-2">vs. last week</span>
              </div>
            </div>

            {/* KPI 2: Total Orders */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Total Orders Placed
                </span>
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center border border-slate-200">
                  <ShoppingBag className="w-4.5 h-4.5 stroke-[2.2]" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <div className="text-2xl font-black text-slate-950 tracking-tight">
                  {mockAdminKpis.totalOrders.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="mt-2.5 flex items-center text-xs font-semibold">
                <span className="inline-flex items-center text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{mockAdminKpis.ordersGrowthPercent}%
                </span>
                <span className="text-slate-400 ml-2">orders WoW</span>
              </div>
            </div>

            {/* KPI 3: Average Order Value (AOV) */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Average Order Value
                </span>
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center border border-teal-100">
                  <Package className="w-4.5 h-4.5 stroke-[2.2]" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <div className="text-2xl font-black text-slate-950 tracking-tight">
                  {formatCurrency(mockAdminKpis.aov)}
                </div>
              </div>
              <div className="mt-2.5 flex items-center text-xs font-semibold">
                <span className="inline-flex items-center text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{mockAdminKpis.aovGrowthPercent}%
                </span>
                <span className="text-slate-400 ml-2">high-basket sizes</span>
              </div>
            </div>

            {/* KPI 4: Lab Verification Scans */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all ring-1 ring-emerald-500/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Lab Verification Scans
                </span>
                <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center shadow-xs">
                  <FlaskConical className="w-4.5 h-4.5 stroke-[2.2]" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <div className="text-2xl font-black text-emerald-900 tracking-tight">
                  {mockAdminKpis.labScansCount.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="mt-2.5 flex items-center text-xs font-semibold">
                <span className="inline-flex items-center text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                  <ShieldCheck className="w-3 h-3 mr-1 text-emerald-700" />
                  {mockAdminKpis.scanConversionRate}% Scan-to-Cart
                </span>
                <span className="text-slate-400 ml-2">trust index</span>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 2: VISUAL ANALYTICS (SVG CHARTS)
            ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Chart 1: 7-Day Revenue & Orders Trend (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span>Revenue & Orders Velocity (7 Days)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Bar indicates daily gross turnover (₹), line plots individual checkout transactions.
                  </p>
                </div>
                {/* Legend */}
                <div className="flex items-center space-x-3 text-xs font-semibold">
                  <div className="flex items-center space-x-1.5 text-slate-600">
                    <span className="w-3 h-3 rounded bg-emerald-700 inline-block"></span>
                    <span>Revenue (₹)</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-slate-600">
                    <span className="w-3 h-1 bg-amber-500 inline-block rounded-full"></span>
                    <span>Orders</span>
                  </div>
                </div>
              </div>

              {/* Responsive SVG Chart */}
              <div className="mt-6 relative">
                <div className="w-full overflow-x-auto">
                  <svg 
                    viewBox={`0 0 ${chartWidth} ${chartHeight + 50}`} 
                    className="w-full h-56 select-none"
                  >
                    {/* Horizontal Grid lines */}
                    <line x1="0" y1="20" x2={chartWidth} y2="20" stroke="#f1f5f9" strokeDasharray="4 4" />
                    <line x1="0" y1="65" x2={chartWidth} y2="65" stroke="#f1f5f9" strokeDasharray="4 4" />
                    <line x1="0" y1="110" x2={chartWidth} y2="110" stroke="#f1f5f9" strokeDasharray="4 4" />
                    <line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="#e2e8f0" strokeWidth="1.5" />

                    {/* Bars for daily Revenue */}
                    {mock7DayRevenueTrend.map((d, idx) => {
                      const x = gap + idx * (barWidth + gap);
                      const barH = (d.revenue / maxRevenue) * (chartHeight - 30);
                      const y = chartHeight - barH;
                      const isHovered = hoveredTrendIndex === idx;

                      return (
                        <g 
                          key={d.day}
                          className="cursor-pointer transition-all duration-200"
                          onMouseEnter={() => setHoveredTrendIndex(idx)}
                          onMouseLeave={() => setHoveredTrendIndex(null)}
                        >
                          {/* Background highlight pill on hover */}
                          {isHovered && (
                            <rect
                              x={x - 4}
                              y="10"
                              width={barWidth + 8}
                              height={chartHeight - 10}
                              fill="#f8fafc"
                              rx="6"
                            />
                          )}

                          {/* Bar */}
                          <rect
                            x={x}
                            y={y}
                            width={barWidth}
                            height={barH}
                            rx="5"
                            className={`transition-all duration-300 ${
                              isHovered ? 'fill-emerald-800' : 'fill-emerald-700/85 hover:fill-emerald-800'
                            }`}
                          />

                          {/* Value on top of bar on hover */}
                          {isHovered && (
                            <text
                              x={x + barWidth / 2}
                              y={y - 8}
                              textAnchor="middle"
                              fill="#047857"
                              fontSize="11"
                              fontWeight="bold"
                            >
                              ₹{(d.revenue / 1000).toFixed(0)}k
                            </text>
                          )}

                          {/* Day Label */}
                          <text
                            x={x + barWidth / 2}
                            y={chartHeight + 20}
                            textAnchor="middle"
                            fill={isHovered ? '#0f172a' : '#64748b'}
                            fontSize="11"
                            fontWeight={isHovered ? 'bold' : '600'}
                          >
                            {d.day}
                          </text>

                          {/* Date Subtext */}
                          <text
                            x={x + barWidth / 2}
                            y={chartHeight + 35}
                            textAnchor="middle"
                            fill="#94a3b8"
                            fontSize="9"
                          >
                            {d.date.split(' ')[1]}
                          </text>
                        </g>
                      );
                    })}

                    {/* Orders Trend Line & Dots */}
                    {(() => {
                      const points = mock7DayRevenueTrend.map((d, idx) => {
                        const cx = gap + idx * (barWidth + gap) + barWidth / 2;
                        const cy = chartHeight - (d.orders / maxOrders) * (chartHeight - 50);
                        return { cx, cy, orders: d.orders, day: d.day };
                      });

                      const pathData = points.reduce((acc, curr, idx) => {
                        return idx === 0 ? `M ${curr.cx} ${curr.cy}` : `${acc} L ${curr.cx} ${curr.cy}`;
                      }, '');

                      return (
                        <>
                          <path
                            d={pathData}
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {points.map((pt, idx) => (
                            <circle
                              key={idx}
                              cx={pt.cx}
                              cy={pt.cy}
                              r={hoveredTrendIndex === idx ? 5 : 3.5}
                              fill="#ffffff"
                              stroke="#d97706"
                              strokeWidth="2"
                              className="transition-all duration-150 cursor-pointer"
                            />
                          ))}
                        </>
                      );
                    })()}
                  </svg>
                </div>

                {/* Live Tooltip Banner Below Chart */}
                <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                  {hoveredTrendIndex !== null ? (
                    <>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900">
                          {mock7DayRevenueTrend[hoveredTrendIndex].day}, {mock7DayRevenueTrend[hoveredTrendIndex].date}:
                        </span>
                        <span className="font-bold text-emerald-800">
                          {formatCurrency(mock7DayRevenueTrend[hoveredTrendIndex].revenue)}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="font-semibold text-amber-700">
                          {mock7DayRevenueTrend[hoveredTrendIndex].orders} Orders Placed
                        </span>
                      </div>
                      <span className="text-slate-500 text-[11px]">Hovered Day</span>
                    </>
                  ) : (
                    <>
                      <span className="text-slate-500">
                        Peak Turnover Day: <strong className="text-slate-900">Saturday (₹3,12,800)</strong> with 244 checkouts.
                      </span>
                      <span className="text-slate-400 text-[11px]">Hover over any bar to inspect daily breakdown</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Chart 2: Category Distribution Breakdown (5 Cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Category Turnover Share
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Gross revenue contribution by category.
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  5 Categories
                </span>
              </div>

              {/* Visual Doughnut Chart */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-6">
                
                {/* SVG Doughnut */}
                <div className="relative w-44 h-44 shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    {doughnutSegments.map((seg) => {
                      const radius = 38;
                      const circumference = 2 * Math.PI * radius;
                      const strokeDasharray = `${(seg.sharePercent / 100) * circumference} ${circumference}`;
                      const strokeDashoffset = -((seg.startAngle / 360) * circumference);
                      const isHovered = hoveredCategory === seg.category;

                      return (
                        <circle
                          key={seg.category}
                          cx="50"
                          cy="50"
                          r={radius}
                          fill="transparent"
                          stroke={seg.color}
                          strokeWidth={isHovered ? '14' : '11'}
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-all duration-200 cursor-pointer"
                          onMouseEnter={() => setHoveredCategory(seg.category)}
                          onMouseLeave={() => setHoveredCategory(null)}
                        />
                      );
                    })}
                  </svg>
                  
                  {/* Center Hub Metrics */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Catalog Total
                    </span>
                    <span className="text-base font-black text-slate-950">
                      ₹18.4L
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold">
                      100% Verified
                    </span>
                  </div>
                </div>

                {/* Category Legend & Breakdown List */}
                <div className="w-full space-y-2">
                  {mockCategoryDistribution.map((item) => {
                    const isHovered = hoveredCategory === item.category;
                    return (
                      <div
                        key={item.category}
                        onMouseEnter={() => setHoveredCategory(item.category)}
                        onMouseLeave={() => setHoveredCategory(null)}
                        className={`flex items-center justify-between p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                          isHovered ? 'bg-slate-100/80 font-bold' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-slate-800 font-semibold truncate max-w-[110px]">
                            {item.category}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-right">
                          <span className="font-extrabold text-slate-900">
                            {item.sharePercent}%
                          </span>
                          <span className="text-slate-500 font-mono text-[11px]">
                            {formatCurrency(item.revenue)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Whey & Plant drive 65% of platform gross volume
              </span>
            </div>
          </div>

        </section>

        {/* =========================================================================
            SECTION 3: OPERATIONS & INVENTORY TABLE WITH ACTIONS
            ========================================================================= */}
        <section className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          
          {/* Table Header & Controls Bar */}
          <div className="p-5 sm:p-6 border-b border-slate-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2.5">
                  <h2 className="text-lg font-black text-slate-950 tracking-tight flex items-center gap-2">
                    <Layers className="w-5 h-5 text-emerald-800" />
                    Product Catalog & Batch Integrity Registry
                  </h2>
                  <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                    {filteredProducts.length} of {products.length} SKUs
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Manage live SKU availability, monitor low stock alarms (&lt;10 units), and register certified NABL test batches.
                </p>
              </div>

              {/* Search & Filter Controls */}
              <div className="flex flex-wrap items-center gap-2.5">
                
                {/* Search SKU or Name */}
                <div className="relative min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search SKU ID, brand, name..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                  />
                </div>

                {/* Category Dropdown Filter */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="all">All Categories</option>
                  <option value="Whey Protein">Whey Protein</option>
                  <option value="Plant Protein">Plant Protein</option>
                  <option value="Creatine">Creatine</option>
                  <option value="Multivitamins">Multivitamins</option>
                  <option value="Fish Oil">Fish Oil</option>
                </select>

                {/* Stock Level Pills */}
                <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold">
                  <button
                    onClick={() => setStockFilter('all')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      stockFilter === 'all' ? 'bg-white text-slate-950 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setStockFilter('low')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center space-x-1 ${
                      stockFilter === 'low' ? 'bg-amber-500 text-white shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>Low Stock</span>
                    {lowStockCount > 0 && (
                      <span className="bg-amber-100 text-amber-900 text-[10px] px-1.5 py-0.2 rounded-full font-black">
                        {lowStockCount}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => setStockFilter('out')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center space-x-1 ${
                      stockFilter === 'out' ? 'bg-rose-600 text-white shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>Out of Stock</span>
                    {outOfStockCount > 0 && (
                      <span className="bg-rose-100 text-rose-900 text-[10px] px-1.5 py-0.2 rounded-full font-black">
                        {outOfStockCount}
                      </span>
                    )}
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* Table Element */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">SKU / Product</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Selling Price</th>
                  <th className="py-3.5 px-4">Stock Units</th>
                  <th className="py-3.5 px-4">Active Batches</th>
                  <th className="py-3.5 px-4 text-center">Store Availability</th>
                  <th className="py-3.5 px-4 text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      <Package className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="font-semibold text-sm text-slate-700">No products match your filter</p>
                      <p className="text-xs text-slate-400 mt-1">Try resetting the search query or stock filter.</p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setStockFilter('all');
                          setCategoryFilter('all');
                        }}
                        className="mt-3 text-xs text-emerald-800 font-bold hover:underline"
                      >
                        Clear All Filters
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => {
                    const isLowStock = product.stockUnits > 0 && product.stockUnits < 10 && product.inStock;
                    const isOutOfStock = !product.inStock || product.stockUnits === 0;

                    return (
                      <tr 
                        key={product.id}
                        className="hover:bg-slate-50/80 transition-colors group"
                      >
                        {/* 1. SKU & Product */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold">
                                  #{product.id}
                                </span>
                                <span className="text-[11px] font-bold text-emerald-800">
                                  {product.brand}
                                </span>
                              </div>
                              <div className="font-extrabold text-slate-900 line-clamp-1 max-w-[220px] text-xs">
                                {product.name}
                              </div>
                              <span className="text-[10px] text-slate-400">
                                {product.netWeightGrams >= 1000 ? `${product.netWeightGrams / 1000} kg` : `${product.netWeightGrams} g`} pack
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* 2. Category */}
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center text-[11px] font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                            {product.category}
                          </span>
                        </td>

                        {/* 3. Selling Price */}
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900 text-xs">
                          {formatCurrency(product.discountedPrice)}
                          <div className="text-[10px] text-slate-400 font-normal line-through">
                            {formatCurrency(product.mrp)}
                          </div>
                        </td>

                        {/* 4. Stock Units & Warning Badge */}
                        <td className="py-3.5 px-4">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1.5">
                              <span className={`font-mono font-black text-xs ${
                                isOutOfStock ? 'text-rose-600' : isLowStock ? 'text-amber-600' : 'text-slate-800'
                              }`}>
                                {product.stockUnits} units
                              </span>
                            </div>

                            {/* Warning Pills */}
                            {isOutOfStock ? (
                              <span className="inline-flex items-center space-x-1 bg-rose-50 text-rose-700 font-bold text-[10px] px-2 py-0.5 rounded-full border border-rose-200">
                                <AlertTriangle className="w-3 h-3 text-rose-500" />
                                <span>Out of Stock</span>
                              </span>
                            ) : isLowStock ? (
                              <span className="inline-flex items-center space-x-1 bg-amber-50 text-amber-800 font-bold text-[10px] px-2 py-0.5 rounded-full border border-amber-200 animate-pulse">
                                <AlertTriangle className="w-3 h-3 text-amber-600" />
                                <span>Low Stock (&lt;10)</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center space-x-1 text-emerald-700 font-medium text-[10px]">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>Healthy Stock</span>
                              </span>
                            )}
                          </div>
                        </td>

                        {/* 5. Active Batches */}
                        <td className="py-3.5 px-4">
                          <div className="space-y-1">
                            <span className="inline-flex items-center space-x-1 font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/80">
                              <ShieldCheck className="w-3 h-3 text-emerald-700" />
                              <span>{product.batches.length} Certified Batches</span>
                            </span>
                            <div className="text-[10px] text-slate-400 font-mono">
                              Latest: {product.batches[0]?.batchNumber || 'None'}
                            </div>
                          </div>
                        </td>

                        {/* 6. Inline Status Toggle (Active vs Out of Stock) */}
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex flex-col items-center space-y-1">
                            <button
                              onClick={() => handleToggleStock(product)}
                              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                                product.inStock ? 'bg-emerald-700' : 'bg-slate-300'
                              }`}
                              role="switch"
                              aria-checked={product.inStock}
                              title={`Toggle ${product.name} active availability`}
                            >
                              <span
                                aria-hidden="true"
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                                  product.inStock ? 'translate-x-5' : 'translate-x-0'
                                }`}
                              />
                            </button>
                            <span className={`text-[10px] font-bold ${
                              product.inStock ? 'text-emerald-800' : 'text-slate-400'
                            }`}>
                              {product.inStock ? 'Active' : 'Disabled'}
                            </span>
                          </div>
                        </td>

                        {/* 7. Quick Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            {/* Add Batch Action */}
                            <button
                              onClick={() => handleOpenAddBatch(product)}
                              className="inline-flex items-center space-x-1 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold px-2.5 py-1.5 rounded-lg transition-all text-xs shadow-2xs active:scale-95 cursor-pointer"
                              title="Register a new certified batch & lab report for this SKU"
                            >
                              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                              <span>Add Batch</span>
                            </button>

                            {/* View Latest Lab Report modal if callback available */}
                            {onVerifyBatchInModal && (
                              <button
                                onClick={() => onVerifyBatchInModal(product, product.batches[0]?.batchNumber)}
                                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                                title="Inspect Certificate of Analysis (CoA)"
                              >
                                <FileCheck className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Summary */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-slate-700">Audit Compliance:</span>
              <span>100% of SKUs have active third-party lab documentation with heavy metal & pathogen clearance.</span>
            </div>
            <div className="font-medium text-slate-600">
              Showing {filteredProducts.length} entries
            </div>
          </div>

        </section>

      </div>

      {/* Add New Batch Modal */}
      <AddBatchModal
        product={selectedProductForBatch}
        isOpen={isAddBatchOpen}
        onClose={() => {
          setIsAddBatchOpen(false);
          setSelectedProductForBatch(null);
        }}
        onSaveBatch={handleSaveBatch}
      />
    </div>
  );
};
