import fs from 'fs';
import path from 'path';

const FLAVORS_MAP = {
  // Whey Protein (6 items)
  'prod-mb-biozyme-01': ['Rich Chocolate', 'Café Mocha', 'Magical Mango', 'Cookies & Cream'],
  'prod-on-gold-02': ['Vanilla Ice Cream', 'Double Rich Chocolate', 'Delicious Strawberry', 'Extreme Milk Chocolate'],
  'prod-avvatar-iso-03': ['Unflavoured', 'Belgian Chocolate', 'Café Latte', 'Malai Kulfi'],
  'prod-mb-raw-whey-09': ['Unflavoured Raw', 'Chocolate Hazelnut', 'Kesar Pista'],
  'prod-nakpro-iso-10': ['Chocolate', 'Vanilla', 'Coffee', 'Mango', 'Strawberry'],
  'prod-nutrabay-whey-11': ['Unflavoured', 'Rich Chocolate', 'Café Mocha', 'Vanilla'],

  // Plant Protein (4 items)
  'prod-cosmix-plant-04': ['Classic Unflavoured', 'Indonesian Cacao', 'Japanese Matcha', 'Mocha Fudge'],
  'prod-origin-plant-05': ['Classic Unflavoured', 'Dark Chocolate', 'Strawberry', 'Vanilla'],
  'prod-nakpro-soy-12': ['Chocolate', 'Vanilla', 'Classic Unflavoured', 'Cookies & Cream'],
  'prod-nutrabox-plant-13': ['Swiss Chocolate', 'Café Latte', 'Almond Butter', 'Berry Blast'],

  // Performance & Creatine (4 items)
  'prod-wellcore-creatine-06': ['Unflavoured', 'Fruit Punch', 'Watermelon', 'Blue Raspberry'],
  'prod-nakpro-creatine-14': ['Unflavoured', 'Fruit Punch', 'Cola', 'Tangy Orange'],
  'prod-nutrabay-creatine-15': ['Unflavoured', 'Green Apple', 'Lemon Lime', 'Fruit Punch'],
  'prod-nutrabox-preworkout-16': ['Fruit Punch', 'Blue Razz', 'Green Apple', 'Watermelon Surge'],
};

const baseDir = 'C:/Users/shant/.gemini/antigravity/scratch/supplement-delivery-app';

const jsonFiles = [
  path.join(baseDir, 'products.json'),
  path.join(baseDir, 'public/products.json'),
  path.join(baseDir, 'src/data/products.json'),
];

jsonFiles.forEach(filePath => {
  const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  products.forEach(p => {
    if (FLAVORS_MAP[p.id]) {
      p.flavors = FLAVORS_MAP[p.id];
      if (!p.flavor) {
        p.flavor = FLAVORS_MAP[p.id][0];
      }
    }
  });
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8');
  console.log(`Updated flavors in ${filePath}`);
});

// Also update mockData.ts
const products = JSON.parse(fs.readFileSync(path.join(baseDir, 'products.json'), 'utf8'));
const mockDataContent = `import type { Product } from '../types/product';\n\nexport const mockProducts: Product[] = ${JSON.stringify(products, null, 2)};\n`;
fs.writeFileSync(path.join(baseDir, 'src/data/mockData.ts'), mockDataContent, 'utf8');
console.log('Updated mockData.ts with new flavors');
