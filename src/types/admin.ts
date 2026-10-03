export interface RevenueDayTrend {
  day: string;
  date: string;
  revenue: number;
  orders: number;
}

export interface CategoryShare {
  category: string;
  sharePercent: number;
  revenue: number;
  color: string;
}

export interface AdminKpiSummary {
  grossRevenue: number;
  revenueGrowthPercent: number;
  totalOrders: number;
  ordersGrowthPercent: number;
  aov: number;
  aovGrowthPercent: number;
  labScansCount: number;
  scanConversionRate: number;
}

export interface NewBatchFormData {
  batchNumber: string;
  manufacturingDate: string;
  expiryDate: string;
  testDate: string;
  labName: string;
  reportId: string;
  accreditationId: string;
  proteinFoundPercent: number;
  proteinTestedGrams?: number;
  heavyMetalsPass: boolean;
  microbiologicalPass: boolean;
}

export interface AdminSession {
  email: string;
  name: string;
  role: string;
  token: string;
  loginTime: string;
}
