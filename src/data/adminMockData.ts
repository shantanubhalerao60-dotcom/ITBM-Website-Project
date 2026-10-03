import type { RevenueDayTrend, CategoryShare, AdminKpiSummary } from '../types/admin';

export const mockAdminKpis: AdminKpiSummary = {
  grossRevenue: 1842850,
  revenueGrowthPercent: 14.8,
  totalOrders: 1428,
  ordersGrowthPercent: 8.2,
  aov: 2340,
  aovGrowthPercent: 4.5,
  labScansCount: 8940,
  scanConversionRate: 92.4,
};

export const mock7DayRevenueTrend: RevenueDayTrend[] = [
  { day: 'Mon', date: 'Sep 25', revenue: 215400, orders: 172 },
  { day: 'Tue', date: 'Sep 26', revenue: 238200, orders: 191 },
  { day: 'Wed', date: 'Sep 27', revenue: 264900, orders: 208 },
  { day: 'Thu', date: 'Sep 28', revenue: 251100, orders: 195 },
  { day: 'Fri', date: 'Sep 29', revenue: 289400, orders: 226 },
  { day: 'Sat', date: 'Sep 30', revenue: 312800, orders: 244 },
  { day: 'Sun', date: 'Oct 01', revenue: 271050, orders: 192 },
];

export const mockCategoryDistribution: CategoryShare[] = [
  { category: 'Whey Protein', sharePercent: 48, revenue: 884570, color: '#047857' },           // emerald-700
  { category: 'Plant Protein', sharePercent: 22, revenue: 405420, color: '#059669' },          // emerald-600
  { category: 'Performance & Creatine', sharePercent: 18, revenue: 331710, color: '#0d9488' }, // teal-600
  { category: 'Daily Wellness', sharePercent: 12, revenue: 221150, color: '#0284c7' },         // sky-600
];
