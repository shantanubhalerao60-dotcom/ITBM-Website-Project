export type ProductCategory = 
  | 'All'
  | 'Whey Protein'
  | 'Plant Protein'
  | 'Performance & Creatine'
  | 'Daily Wellness';

export type ProductSortOption = 
  | 'featured'
  | 'price_asc'
  | 'price_desc'
  | 'protein_value'
  | 'rating_desc';

export interface HeavyMetalsDetail {
  leadPpm: number;      // e.g. 0.012 ppm (limit < 0.5 ppm)
  cadmiumPpm: number;   // e.g. 0.004 ppm (limit < 0.3 ppm)
  arsenicPpm: number;   // e.g. 0.008 ppm (limit < 0.5 ppm)
  mercuryPpm: number;   // e.g. 0.001 ppm (limit < 0.1 ppm)
}

export interface MicrobiologyDetail {
  eColiPass: boolean;       // Absent / 10g
  salmonellaPass: boolean;   // Absent / 25g
  yeastMoldPass: boolean;    // < 100 CFU/g
}

export interface TestedParameters {
  proteinFoundPercent: number; // e.g. 83.2%
  proteinClaimedGrams?: number; // e.g. 25.0g per scoop
  proteinTestedGrams?: number;  // e.g. 25.4g per scoop
  heavyMetalsPass: boolean;
  heavyMetalsDetail?: HeavyMetalsDetail;
  microbiologicalPass: boolean;
  microbiologyDetail?: MicrobiologyDetail;
}

export interface ProductBatch {
  batchNumber: string;
  manufacturingDate: string; // YYYY-MM-DD
  expiryDate: string;        // YYYY-MM-DD
  testDate: string;          // YYYY-MM-DD
  labReportUrl: string;
  reportId: string;
  labName: string;
  accreditationId: string;
  testedParameters: TestedParameters;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Exclude<ProductCategory, 'All'>;
  image: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockUnits: number;
  netWeightGrams: number;
  proteinPerServingGrams: number | null;
  servingsPerPack: number | null;
  mrp: number;
  discountedPrice: number;
  batches: ProductBatch[];
  // User schema fields
  weight?: string;
  servings?: number | null;
  price?: number;
  originalPrice?: number;
  proteinPerGram?: number | null;
  batchNumber?: string;
  // Additional rich e-commerce healthcare metadata
  flavor?: string;
  flavors?: string[];
  servingSizeGrams?: number;
  dosageForm?: 'Powder' | 'Capsules' | 'Softgels' | 'Tablets';
  tags?: string[];
  description?: string;
  keyHighlights?: string[];
}

export interface ProteinValueMetric {
  totalProteinGrams: number;
  pricePerGramProtein: number;
  formattedMetric: string;
  totalServings: number;
  proteinPerServing: number;
}
