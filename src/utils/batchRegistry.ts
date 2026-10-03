import type { Product, ProductBatch } from '../types/product';
import { mockProducts } from '../data/mockData';

export interface BatchLookupResult {
  product: Product;
  batch: ProductBatch;
}

export interface DemoSampleBatch {
  batchNumber: string;
  brand: string;
  productName: string;
  isKnownValid: boolean;
}

/**
 * Searches across all products for a matching batch number (case-insensitive & trimmed)
 */
export function searchBatchRegistry(input: string): BatchLookupResult | null {
  const sanitized = input.trim().toLowerCase();
  if (!sanitized) return null;

  for (const product of mockProducts) {
    const foundBatch = product.batches.find(
      (b) => b.batchNumber.toLowerCase() === sanitized
    );
    if (foundBatch) {
      return { product, batch: foundBatch };
    }
  }

  return null;
}

/**
 * Sample clickable chips for instant testing and live demonstrations
 */
export const DEMO_SAMPLE_BATCHES: DemoSampleBatch[] = [
  {
    batchNumber: 'MB-BZ-2024-8841',
    brand: 'MuscleBlaze',
    productName: 'Biozyme Performance Whey',
    isKnownValid: true,
  },
  {
    batchNumber: 'ON-GS-99042',
    brand: 'Optimum Nutrition',
    productName: 'Gold Standard 100% Whey',
    isKnownValid: true,
  },
  {
    batchNumber: 'AV-FC-4482',
    brand: 'Avvatar',
    productName: 'Grass-Fed Whey Isolate',
    isKnownValid: true,
  },
  {
    batchNumber: 'CX-PLT-3391',
    brand: 'Cosmix',
    productName: 'No-Nonsense Plant Protein',
    isKnownValid: true,
  },
  {
    batchNumber: 'WC-CR-11029',
    brand: 'Wellcore',
    productName: 'Creapure Micronized Creatine',
    isKnownValid: true,
  },
  {
    batchNumber: 'T1MG-OMG-2024-4190',
    brand: 'Tata 1mg',
    productName: 'Triple Strength Omega 3',
    isKnownValid: true,
  },
  {
    batchNumber: 'FAKE-OR-EXPIRED-99',
    brand: 'Unknown',
    productName: 'Simulated Invalid Batch Test',
    isKnownValid: false,
  },
];
