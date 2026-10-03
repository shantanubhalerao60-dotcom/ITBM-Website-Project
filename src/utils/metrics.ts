import type { Product, ProteinValueMetric } from '../types/product';

/**
 * Calculates the total protein in grams and the price per gram of protein
 * for protein-based supplements.
 *
 * Total Protein = servingsPerPack * proteinPerServingGrams
 * Price Per Gram of Protein = discountedPrice / Total Protein
 *
 * @param product Product to calculate metrics for
 * @returns ProteinValueMetric or null if product is not a protein product
 */
export function calculateProteinMetrics(product: Product): ProteinValueMetric | null {
  const { servingsPerPack, proteinPerServingGrams, discountedPrice } = product;

  // Check if product is protein-based with valid non-null numerical values
  if (
    servingsPerPack === null ||
    proteinPerServingGrams === null ||
    servingsPerPack <= 0 ||
    proteinPerServingGrams <= 0 ||
    discountedPrice <= 0
  ) {
    return null;
  }

  const totalProteinGrams = servingsPerPack * proteinPerServingGrams;
  if (totalProteinGrams <= 0) return null;

  const pricePerGramProtein = discountedPrice / totalProteinGrams;

  return {
    totalProteinGrams: Math.round(totalProteinGrams * 10) / 10,
    pricePerGramProtein: Math.round(pricePerGramProtein * 100) / 100,
    formattedMetric: `₹${pricePerGramProtein.toFixed(2)} / g protein`,
    totalServings: servingsPerPack,
    proteinPerServing: proteinPerServingGrams,
  };
}

/**
 * Calculates discount percentage
 */
export function calculateDiscountPercentage(mrp: number, discountedPrice: number): number {
  if (mrp <= 0 || discountedPrice >= mrp) return 0;
  return Math.round(((mrp - discountedPrice) / mrp) * 100);
}
