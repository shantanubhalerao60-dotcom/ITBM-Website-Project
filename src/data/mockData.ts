import type { Product } from '../types/product';

export const mockProducts: Product[] = [
  {
    "id": "prod-mb-biozyme-01",
    "name": "Biozyme Performance Whey Protein (Rich Chocolate)",
    "brand": "MuscleBlaze",
    "weight": "1kg",
    "servings": 33,
    "price": 2199,
    "originalPrice": 2999,
    "proteinPerGram": 2.67,
    "category": "Whey Protein",
    "batchNumber": "MB-BZ-2024-8841",
    "rating": 4.8,
    "reviewsCount": 3840,
    "inStock": true,
    "stockUnits": 48,
    "netWeightGrams": 1000,
    "proteinPerServingGrams": 25,
    "servingsPerPack": 33,
    "mrp": 2999,
    "discountedPrice": 2199,
    "image": "/images/mb-biozyme.jpg",
    "flavor": "Rich Chocolate",
    "servingSizeGrams": 30,
    "dosageForm": "Powder",
    "tags": [
      "Enhanced Absorption Formula",
      "Informed-Choice Certified"
    ],
    "description": "Clinically tested for 50% higher protein absorption and 60% lower stomach discomfort in Indian bodies.",
    "keyHighlights": [
      "25g Protein per serving",
      "5.51g BCAAs",
      "US Patent Published EAF"
    ],
    "batches": [
      {
        "batchNumber": "MB-BZ-2024-8841",
        "manufacturingDate": "2024-08-15",
        "expiryDate": "2026-02-14",
        "testDate": "2024-08-18",
        "reportId": "EUR-IN-2024-99824",
        "labReportUrl": "https://reports.nutritrust.internal/MB-BZ-2024-8841.pdf",
        "labName": "Eurofins Analytical Services India Pvt Ltd",
        "accreditationId": "NABL TC-88912 / ISO-IEC 17025",
        "testedParameters": {
          "proteinFoundPercent": 83.2,
          "proteinClaimedGrams": 25,
          "proteinTestedGrams": 25.4,
          "heavyMetalsPass": true,
          "microbiologicalPass": true
        }
      }
    ],
    "flavors": [
      "Rich Chocolate",
      "Café Mocha",
      "Magical Mango",
      "Cookies & Cream"
    ]
  },
  {
    "id": "prod-on-gold-02",
    "name": "Gold Standard 100% Whey Protein Isolate Blend",
    "brand": "Optimum Nutrition",
    "weight": "907g",
    "servings": 29,
    "price": 3099,
    "originalPrice": 3899,
    "proteinPerGram": 4.45,
    "category": "Whey Protein",
    "batchNumber": "ON-GS-99042",
    "rating": 4.9,
    "reviewsCount": 8920,
    "inStock": true,
    "stockUnits": 6,
    "netWeightGrams": 907,
    "proteinPerServingGrams": 24,
    "servingsPerPack": 29,
    "mrp": 3899,
    "discountedPrice": 3099,
    "image": "/images/on-gold-standard.jpg",
    "flavor": "Vanilla Ice Cream",
    "servingSizeGrams": 30.4,
    "dosageForm": "Powder",
    "tags": [
      "Global #1 Bestseller",
      "Informed-Choice"
    ],
    "description": "The worlds gold standard for pure whey protein isolate and ultra-filtered whey concentrate peptides.",
    "keyHighlights": [
      "24g Protein per scoop",
      "5.5g naturally occurring BCAAs",
      "Gluten Free"
    ],
    "batches": [
      {
        "batchNumber": "ON-GS-99042",
        "manufacturingDate": "2024-07-20",
        "expiryDate": "2026-07-19",
        "testDate": "2024-07-24",
        "reportId": "SGS-IN-2024-44102",
        "labReportUrl": "https://reports.nutritrust.internal/ON-GS-99042.pdf",
        "labName": "SGS India Testing Laboratories Pvt Ltd",
        "accreditationId": "NABL TC-55102 / ISO-IEC 17025",
        "testedParameters": {
          "proteinFoundPercent": 79.4,
          "proteinClaimedGrams": 24,
          "proteinTestedGrams": 24.6,
          "heavyMetalsPass": true,
          "microbiologicalPass": true
        }
      }
    ],
    "flavors": [
      "Vanilla Ice Cream",
      "Double Rich Chocolate",
      "Delicious Strawberry",
      "Extreme Milk Chocolate"
    ]
  },
  {
    "id": "prod-avvatar-iso-03",
    "name": "100% Whey Protein Health Supplement (Unflavoured)",
    "brand": "Avvatar",
    "weight": "1kg",
    "servings": 29,
    "price": 2699,
    "originalPrice": 3499,
    "proteinPerGram": 3.45,
    "category": "Whey Protein",
    "batchNumber": "AV-FC-4482",
    "rating": 4.7,
    "reviewsCount": 1540,
    "inStock": true,
    "stockUnits": 24,
    "netWeightGrams": 1000,
    "proteinPerServingGrams": 27,
    "servingsPerPack": 29,
    "mrp": 3499,
    "discountedPrice": 2699,
    "image": "/images/avvatar-whey.jpg",
    "flavor": "Unflavoured",
    "servingSizeGrams": 34.5,
    "dosageForm": "Powder",
    "tags": [
      "Fresh From Farm to Shaker",
      "Sugar-Free & Soy-Free",
      "27g Protein"
    ],
    "description": "Avvatar 100% whey protein processed from fresh single-source cow milk within 24 hours of milking.",
    "keyHighlights": [
      "27g Protein per scoop",
      "29 Servings in 1kg tub",
      "Single source fresh dairy milk"
    ],
    "batches": [
      {
        "batchNumber": "AV-FC-4482",
        "manufacturingDate": "2024-09-01",
        "expiryDate": "2026-03-01",
        "testDate": "2024-09-05",
        "reportId": "TUV-SUD-2024-11820",
        "labReportUrl": "https://reports.nutritrust.internal/AV-FC-4482.pdf",
        "labName": "TUV SUD South Asia Pvt Ltd",
        "accreditationId": "NABL TC-44190 / ISO-IEC 17025",
        "testedParameters": {
          "proteinFoundPercent": 84.6,
          "proteinClaimedGrams": 27,
          "proteinTestedGrams": 27.4,
          "heavyMetalsPass": true,
          "microbiologicalPass": true
        }
      }
    ],
    "flavors": [
      "Unflavoured",
      "Belgian Chocolate",
      "Café Latte",
      "Malai Kulfi"
    ]
  },
  {
    "id": "prod-mb-raw-whey-09",
    "name": "100% Clean Raw Whey Concentrate (Unflavoured)",
    "brand": "MuscleBlaze",
    "weight": "1kg",
    "servings": 33,
    "price": 1999,
    "originalPrice": 2999,
    "proteinPerGram": 2.52,
    "category": "Whey Protein",
    "batchNumber": "MB-RAW-5501",
    "rating": 4.7,
    "reviewsCount": 2240,
    "inStock": true,
    "stockUnits": 4,
    "netWeightGrams": 1000,
    "proteinPerServingGrams": 24,
    "servingsPerPack": 33,
    "mrp": 2999,
    "discountedPrice": 1999,
    "image": "/images/mb-raw-whey.jpg",
    "flavor": "Unflavoured",
    "servingSizeGrams": 30,
    "dosageForm": "Powder",
    "tags": [
      "100% Clean Raw Whey",
      "24g Protein Per Scoop",
      "1 Ingredient Only"
    ],
    "description": "MuscleBlaze 100% clean raw whey concentrate with 24g protein per scoop, imported whey processed without chemicals.",
    "keyHighlights": [
      "24g Protein per scoop",
      "Imported whey without chemicals",
      "1 Ingredient only"
    ],
    "batches": [
      {
        "batchNumber": "MB-RAW-5501",
        "manufacturingDate": "2024-09-12",
        "expiryDate": "2026-03-11",
        "testDate": "2024-09-16",
        "reportId": "EUR-IN-2024-8812",
        "labReportUrl": "https://reports.nutritrust.internal/MB-RAW-5501.pdf",
        "labName": "Eurofins Analytical Services India Pvt Ltd",
        "accreditationId": "NABL TC-88912 / ISO-IEC 17025",
        "testedParameters": {
          "proteinFoundPercent": 80.4,
          "proteinClaimedGrams": 24,
          "proteinTestedGrams": 24.3,
          "heavyMetalsPass": true,
          "microbiologicalPass": true
        }
      }
    ],
    "flavors": [
      "Unflavoured Raw",
      "Chocolate Hazelnut",
      "Kesar Pista"
    ]
  },
  {
    "id": "prod-nakpro-iso-10",
    "name": "Whey Platinum Whey Protein Isolate (Double Rich Chocolate 500g)",
    "brand": "Nakpro",
    "weight": "500g",
    "servings": 15,
    "price": 1249,
    "originalPrice": 1799,
    "proteinPerGram": 2.97,
    "category": "Whey Protein",
    "batchNumber": "NKP-ISO-2024-118",
    "rating": 4.7,
    "reviewsCount": 3120,
    "inStock": true,
    "stockUnits": 36,
    "netWeightGrams": 500,
    "proteinPerServingGrams": 28,
    "servingsPerPack": 15,
    "mrp": 1799,
    "discountedPrice": 1249,
    "image": "/images/nakpro-whey.png",
    "flavor": "Double Rich Chocolate",
    "servingSizeGrams": 33.3,
    "dosageForm": "Powder",
    "tags": [
      "Trustified Blind Tested",
      "28g Pure Isolate",
      "Low Fat & Trans Fat Free"
    ],
    "description": "Nakpro Whey Platinum 100% Whey Isolate delivers ultra-fast absorption with 28g pure protein and 6.1g BCAAs per scoop.",
    "keyHighlights": [
      "28g Protein per serving",
      "Trustified Certified 100% Blind Testing",
      "Instant Soluble & Trans Fat Free"
    ],
    "batches": [
      {
        "batchNumber": "NKP-ISO-2024-118",
        "manufacturingDate": "2024-08-20",
        "expiryDate": "2026-08-19",
        "testDate": "2024-08-25",
        "reportId": "SGS-IN-2024-8119",
        "labReportUrl": "https://reports.nutritrust.internal/NKP-ISO-2024-118.pdf",
        "labName": "SGS India Testing Laboratories Pvt Ltd",
        "accreditationId": "NABL TC-55102 / ISO-IEC 17025",
        "testedParameters": {
          "proteinFoundPercent": 84.1,
          "proteinClaimedGrams": 28,
          "proteinTestedGrams": 28.2,
          "heavyMetalsPass": true,
          "microbiologicalPass": true
        }
      }
    ],
    "flavors": [
      "Chocolate",
      "Vanilla",
      "Coffee",
      "Mango",
      "Strawberry"
    ]
  },
  {
    "id": "prod-nutrabay-whey-11",
    "name": "Pure Concentrate Whey Protein (Unflavoured 1kg)",
    "brand": "Nutrabay",
    "weight": "1kg",
    "servings": 33,
    "price": 1749,
    "originalPrice": 2499,
    "proteinPerGram": 2.30,
    "category": "Whey Protein",
    "batchNumber": "NB-RAW-7719",
    "rating": 4.7,
    "reviewsCount": 4180,
    "inStock": true,
    "stockUnits": 42,
    "netWeightGrams": 1000,
    "proteinPerServingGrams": 23,
    "servingsPerPack": 33,
    "mrp": 2499,
    "discountedPrice": 1749,
    "image": "/images/nutrabay-whey.png",
    "flavor": "Unflavoured",
    "servingSizeGrams": 30,
    "dosageForm": "Powder",
    "tags": [
      "23g Protein & 5.3g BCAA",
      "33 Servings (1kg)",
      "Authentick Tested"
    ],
    "description": "Nutrabay Pure Concentrate Whey Protein delivers 23g protein and 5.3g BCAAs per scoop to support muscle building and accelerated recovery.",
    "keyHighlights": [
      "23g Protein & 5.3g BCAAs per scoop",
      "Authentick verified test badge",
      "Builds muscle & faster recovery"
    ],
    "batches": [
      {
        "batchNumber": "NB-RAW-7719",
        "manufacturingDate": "2024-09-02",
        "expiryDate": "2026-09-01",
        "testDate": "2024-09-06",
        "reportId": "EUR-IN-2024-9128",
        "labReportUrl": "https://reports.nutritrust.internal/NB-RAW-7719.pdf",
        "labName": "Eurofins Analytical Services India Pvt Ltd",
        "accreditationId": "NABL TC-88912 / ISO-IEC 17025",
        "testedParameters": {
          "proteinFoundPercent": 77.2,
          "proteinClaimedGrams": 23.1,
          "proteinTestedGrams": 23.4,
          "heavyMetalsPass": true,
          "microbiologicalPass": true
        }
      }
    ],
    "flavors": [
      "Unflavoured",
      "Rich Chocolate",
      "Café Mocha",
      "Vanilla"
    ]
  },
  {
    "id": "prod-cosmix-plant-04",
    "name": "Fermented Yeast Protein (Classic Unflavoured - 31g Protein)",
    "brand": "Cosmix",
    "weight": "500g",
    "servings": 16,
    "price": 1899,
    "originalPrice": 2499,
    "proteinPerGram": 3.83,
    "category": "Plant Protein",
    "batchNumber": "CX-PLT-3391",
    "rating": 4.7,
    "reviewsCount": 1120,
    "inStock": true,
    "stockUnits": 8,
    "netWeightGrams": 500,
    "proteinPerServingGrams": 31,
    "servingsPerPack": 16,
    "mrp": 2499,
    "discountedPrice": 1899,
    "image": "/images/cosmix-plant.jpg",
    "flavor": "Classic Unflavoured",
    "servingSizeGrams": 31.25,
    "dosageForm": "Powder",
    "tags": [
      "Just 2 Ingredients",
      "31g Protein",
      "7g BCAAs"
    ],
    "description": "Cosmix Fermented Yeast Protein with 31g protein and 7g BCAAs per scoop. Formulated with just 2 ingredients, no added sugar, and no dairy.",
    "keyHighlights": [
      "31g Clean Protein per scoop",
      "7g Naturally occurring BCAAs",
      "Just 2 ingredients (no nonsense)"
    ],
    "batches": [
      {
        "batchNumber": "CX-PLT-3391",
        "manufacturingDate": "2024-08-05",
        "expiryDate": "2025-11-30",
        "testDate": "2024-08-09",
        "reportId": "INT-IN-2024-6104",
        "labReportUrl": "https://reports.nutritrust.internal/CX-PLT-3391.pdf",
        "labName": "Intertek Food Services India Pvt Ltd",
        "accreditationId": "NABL TC-61922 / ISO-IEC 17025",
        "testedParameters": {
          "proteinFoundPercent": 80.1,
          "proteinClaimedGrams": 31,
          "proteinTestedGrams": 31.3,
          "heavyMetalsPass": true,
          "microbiologicalPass": true
        }
      }
    ],
    "flavors": [
      "Classic Unflavoured",
      "Indonesian Cacao",
      "Japanese Matcha",
      "Mocha Fudge"
    ]
  },
  {
    "id": "prod-origin-plant-05",
    "name": "Daily Plant Protein (Classic Unflavoured - 25g Protein)",
    "brand": "Origin Nutrition",
    "weight": "1kg",
    "servings": 30,
    "price": 2499,
    "originalPrice": 3199,
    "proteinPerGram": 3.33,
    "category": "Plant Protein",
    "batchNumber": "OR-VEG-8802",
    "rating": 4.6,
    "reviewsCount": 840,
    "inStock": true,
    "stockUnits": 31,
    "netWeightGrams": 1000,
    "proteinPerServingGrams": 25,
    "servingsPerPack": 30,
    "mrp": 3199,
    "discountedPrice": 2499,
    "image": "/images/origin-plant-protein.jpg",
    "flavor": "Classic Unflavoured",
    "servingSizeGrams": 33.3,
    "dosageForm": "Powder",
    "tags": [
      "25g Protein Per Scoop",
      "100% Natural Ingredients",
      "Dairy & Soy Free"
    ],
    "description": "Complete clean plant protein crafted with premium non-GMO pea and pumpkin seed protein.",
    "keyHighlights": [
      "25g Protein per serving",
      "30 Servings per pack",
      "100% Natural & Vegan"
    ],
    "batches": [
      {
        "batchNumber": "OR-VEG-8802",
        "manufacturingDate": "2024-07-12",
        "expiryDate": "2026-01-11",
        "testDate": "2024-07-16",
        "reportId": "EUR-IN-2024-5519",
        "labReportUrl": "https://reports.nutritrust.internal/OR-VEG-8802.pdf",
        "labName": "Eurofins Analytical Services India Pvt Ltd",
        "accreditationId": "NABL TC-88912 / ISO-IEC 17025",
        "testedParameters": {
          "proteinFoundPercent": 71.3,
          "proteinClaimedGrams": 25,
          "proteinTestedGrams": 25.1,
          "heavyMetalsPass": true,
          "microbiologicalPass": true
        }
      }
    ],
    "flavors": [
      "Classic Unflavoured",
      "Dark Chocolate",
      "Strawberry",
      "Vanilla"
    ]
  },
  {
    "id": "prod-nakpro-soy-12",
    "name": "Soy Platinum Soy Protein Isolate (Mango 1kg)",
    "brand": "Nakpro",
    "weight": "1kg",
    "servings": 33,
    "price": 1199,
    "originalPrice": 1799,
    "proteinPerGram": 1.35,
    "category": "Plant Protein",
    "batchNumber": "NKP-SOY-9021",
    "rating": 4.6,
    "reviewsCount": 1980,
    "inStock": true,
    "stockUnits": 28,
    "netWeightGrams": 1000,
    "proteinPerServingGrams": 27,
    "servingsPerPack": 33,
    "mrp": 1799,
    "discountedPrice": 1199,
    "image": "/images/nakpro-soy-isolate.png",
    "flavor": "Mango",
    "servingSizeGrams": 30,
    "dosageForm": "Powder",
    "tags": [
      "Soy Platinum Isolate",
      "Plant Based & Trans Fat Free",
      "Instant Soluble"
    ],
    "description": "Nakpro Soy Platinum 100% Soy Protein Isolate provides 27g clean plant-based protein per scoop with instant solubility.",
    "keyHighlights": [
      "Plant Based Protein Isolate",
      "Instant Soluble & Trans Fat Free",
      "Exotic Mango flavor"
    ],
    "batches": [
      {
        "batchNumber": "NKP-SOY-9021",
        "manufacturingDate": "2024-08-11",
        "expiryDate": "2026-08-10",
        "testDate": "2024-08-16",
        "reportId": "SGS-IN-2024-7712",
        "labReportUrl": "https://reports.nutritrust.internal/NKP-SOY-9021.pdf",
        "labName": "SGS India Testing Laboratories Pvt Ltd",
        "accreditationId": "NABL TC-55102 / ISO-IEC 17025",
        "testedParameters": {
          "proteinFoundPercent": 89.6,
          "proteinClaimedGrams": 27,
          "proteinTestedGrams": 27.2,
          "heavyMetalsPass": true,
          "microbiologicalPass": true
        }
      }
    ],
    "flavors": [
      "Chocolate",
      "Vanilla",
      "Classic Unflavoured",
      "Cookies & Cream"
    ]
  },
  {
    "id": "prod-nutrabox-plant-13",
    "name": "Plant Protein with EAAs & BCAAs (Chocolate 1kg)",
    "brand": "Nutrabox",
    "weight": "1kg",
    "servings": 30,
    "price": 2299,
    "originalPrice": 2999,
    "proteinPerGram": 3.13,
    "category": "Plant Protein",
    "batchNumber": "NBX-PLT-4402",
    "rating": 4.6,
    "reviewsCount": 1420,
    "inStock": true,
    "stockUnits": 20,
    "netWeightGrams": 1000,
    "proteinPerServingGrams": 24.5,
    "servingsPerPack": 30,
    "mrp": 2999,
    "discountedPrice": 2299,
    "image": "/images/nutrabox-plant.png",
    "flavor": "Chocolate",
    "servingSizeGrams": 33.3,
    "dosageForm": "Powder",
    "tags": [
      "24.5g Plant Protein",
      "10.17g EAA & 4.8g BCAA",
      "Superfood Blend"
    ],
    "description": "Nutrabox Vegan Plant Protein blend delivering 24.5g clean protein, 10.17g EAAs, and 4.80g BCAAs per scoop.",
    "keyHighlights": [
      "24.5g Protein per serving",
      "Rich chocolate swirl flavor",
      "100% Vegan certified"
    ],
    "batches": [
      {
        "batchNumber": "NBX-PLT-4402",
        "manufacturingDate": "2024-07-28",
        "expiryDate": "2026-01-27",
        "testDate": "2024-08-02",
        "reportId": "EUR-IN-2024-6991",
        "labReportUrl": "https://reports.nutritrust.internal/NBX-PLT-4402.pdf",
        "labName": "Eurofins Analytical Services India Pvt Ltd",
        "accreditationId": "NABL TC-88912 / ISO-IEC 17025",
        "testedParameters": {
          "proteinFoundPercent": 72.8,
          "proteinClaimedGrams": 24,
          "proteinTestedGrams": 24.3,
          "heavyMetalsPass": true,
          "microbiologicalPass": true
        }
      }
    ],
    "flavors": [
      "Swiss Chocolate",
      "Café Latte",
      "Almond Butter",
      "Berry Blast"
    ]
  },
  {
    "id": "prod-wellcore-creatine-06",
    "name": "Micronised Creatine Monohydrate (Unflavoured 100g)",
    "brand": "Wellcore",
    "weight": "100g",
    "servings": 33,
    "price": 499,
    "originalPrice": 799,
    "proteinPerGram": null,
    "category": "Performance & Creatine",
    "batchNumber": "WC-CR-11029",
    "rating": 4.9,
    "reviewsCount": 4210,
    "inStock": true,
    "stockUnits": 85,
    "netWeightGrams": 100,
    "proteinPerServingGrams": null,
    "servingsPerPack": 33,
    "mrp": 799,
    "discountedPrice": 499,
    "image": "/images/wellcore-creatine.jpg",
    "flavor": "Unflavoured Pure",
    "servingSizeGrams": 3,
    "dosageForm": "Powder",
    "tags": [
      "100% Pure Creatine",
      "33 Servings",
      "Boosts ATP Production"
    ],
    "description": "Wellversed Wellcore 100% micronised creatine monohydrate for muscle growth, rapid ATP synthesis, and zero side effects.",
    "keyHighlights": [
      "100% Pure Creatine Monohydrate",
      "33 Servings per container (3g per scoop)",
      "Zero side effects"
    ],
    "batches": [
      {
        "batchNumber": "WC-CR-11029",
        "manufacturingDate": "2024-08-22",
        "expiryDate": "2026-08-21",
        "testDate": "2024-08-26",
        "reportId": "TUV-DE-2024-9901",
        "labReportUrl": "https://reports.nutritrust.internal/WC-CR-11029.pdf",
        "labName": "TUV SUD Germany / India Pvt Ltd",
        "accreditationId": "NABL TC-44190 / ISO-IEC 17025",
        "testedParameters": {
          "proteinFoundPercent": 0,
          "heavyMetalsPass": true,
          "microbiologicalPass": true
        }
      }
    ],
    "flavors": [
      "Unflavoured",
      "Fruit Punch",
      "Watermelon",
      "Blue Raspberry"
    ]
  },
  {
    "id": "prod-nakpro-creatine-14",
    "name": "Micronized Creatine Monohydrate (Fruit Punch 100g)",
    "brand": "Nakpro",
    "weight": "100g",
    "servings": 25,
    "price": 299,
    "originalPrice": 499,
    "proteinPerGram": null,
    "category": "Performance & Creatine",
    "batchNumber": "NKP-CR-5541",
    "rating": 4.8,
    "reviewsCount": 2890,
    "inStock": true,
    "stockUnits": 55,
    "netWeightGrams": 100,
    "proteinPerServingGrams": null,
    "servingsPerPack": 25,
    "mrp": 499,
    "discountedPrice": 299,
    "image": "/images/nakpro-creatine.jpg",
    "flavor": "Fruit Punch",
    "servingSizeGrams": 3,
    "dosageForm": "Powder",
    "tags": [
      "Trustified Certified",
      "3g per scoop",
      "25 Servings pouch"
    ],
    "description": "Nakpro 100% Blind Tested Trustified Micronized Creatine Monohydrate for explosive strength and muscle volume.",
    "keyHighlights": [
      "3g Pure Creatine per scoop",
      "Trustified Certified 100% blind tested",
      "Fast-dissolving Fruit Punch flavor"
    ],
    "batches": [
      {
        "batchNumber": "NKP-CR-5541",
        "manufacturingDate": "2024-08-18",
        "expiryDate": "2026-08-17",
        "testDate": "2024-08-23",
        "reportId": "SGS-IN-2024-5510",
        "labReportUrl": "https://reports.nutritrust.internal/NKP-CR-5541.pdf",
        "labName": "SGS India Testing Laboratories Pvt Ltd",
        "accreditationId": "NABL TC-55102 / ISO-IEC 17025",
        "testedParameters": {
          "proteinFoundPercent": 0,
          "heavyMetalsPass": true,
          "microbiologicalPass": true
        }
      }
    ],
    "flavors": [
      "Unflavoured",
      "Fruit Punch",
      "Cola",
      "Tangy Orange"
    ]
  },
  {
    "id": "prod-nutrabay-creatine-15",
    "name": "Gold Creapure® Pure Creatine Monohydrate (100g)",
    "brand": "Nutrabay",
    "weight": "100g",
    "servings": 33,
    "price": 699,
    "originalPrice": 1099,
    "proteinPerGram": null,
    "category": "Performance & Creatine",
    "batchNumber": "NB-CREA-8812",
    "rating": 4.9,
    "reviewsCount": 3100,
    "inStock": true,
    "stockUnits": 40,
    "netWeightGrams": 100,
    "proteinPerServingGrams": null,
    "servingsPerPack": 33,
    "mrp": 1099,
    "discountedPrice": 699,
    "image": "/images/nutrabay-creatine.svg",
    "flavor": "Unflavoured",
    "servingSizeGrams": 3,
    "dosageForm": "Powder",
    "tags": [
      "Creapure® Germany",
      "Gold Standard",
      "Zero DCD / DHT"
    ],
    "description": "Nutrabay Gold Creapure® sourced from Alzchem Germany with guaranteed zero impurities and maximum bio-efficacy.",
    "keyHighlights": [
      "Creapure® Alzchem Germany source",
      "100% Pure Creatine",
      "Zero bloat formulation"
    ],
    "batches": [
      {
        "batchNumber": "NB-CREA-8812",
        "manufacturingDate": "2024-09-05",
        "expiryDate": "2026-09-04",
        "testDate": "2024-09-10",
        "reportId": "EUR-IN-2024-9912",
        "labReportUrl": "https://reports.nutritrust.internal/NB-CREA-8812.pdf",
        "labName": "Eurofins Analytical Services India Pvt Ltd",
        "accreditationId": "NABL TC-88912 / ISO-IEC 17025",
        "testedParameters": {
          "proteinFoundPercent": 0,
          "heavyMetalsPass": true,
          "microbiologicalPass": true
        }
      }
    ],
    "flavors": [
      "Unflavoured",
      "Green Apple",
      "Lemon Lime",
      "Fruit Punch"
    ]
  },
  {
    "id": "prod-nutrabox-preworkout-16",
    "name": "Ripped Pre Black Edition Pre-Workout (Orange 400g)",
    "brand": "Nutrabox",
    "weight": "400g",
    "servings": 30,
    "price": 1299,
    "originalPrice": 1899,
    "proteinPerGram": null,
    "category": "Performance & Creatine",
    "batchNumber": "NBX-PRE-3310",
    "rating": 4.8,
    "reviewsCount": 1650,
    "inStock": true,
    "stockUnits": 25,
    "netWeightGrams": 400,
    "proteinPerServingGrams": null,
    "servingsPerPack": 30,
    "mrp": 1899,
    "discountedPrice": 1299,
    "image": "/images/nutrabox-preworkout.png",
    "flavor": "Orange",
    "servingSizeGrams": 13.3,
    "dosageForm": "Powder",
    "tags": [
      "Black Edition",
      "Not For Beginners",
      "High Stim Energy"
    ],
    "description": "Nutrabox Ripped Pre Black Edition hardcore pre-workout formula loaded with clinical doses for savage energy and vascular pumps.",
    "keyHighlights": [
      "High intensity pre-workout formula",
      "Refreshing zesty Orange flavor",
      "30 Intense gym sessions"
    ],
    "batches": [
      {
        "batchNumber": "NBX-PRE-3310",
        "manufacturingDate": "2024-08-15",
        "expiryDate": "2026-02-14",
        "testDate": "2024-08-20",
        "reportId": "TUV-SUD-2024-4409",
        "labReportUrl": "https://reports.nutritrust.internal/NBX-PRE-3310.pdf",
        "labName": "TUV SUD South Asia Pvt Ltd",
        "accreditationId": "NABL TC-44190 / ISO-IEC 17025",
        "testedParameters": {
          "proteinFoundPercent": 0,
          "heavyMetalsPass": true,
          "microbiologicalPass": true
        }
      }
    ],
    "flavors": [
      "Fruit Punch",
      "Blue Razz",
      "Green Apple",
      "Watermelon Surge"
    ]
  },
  {
    "id": "prod-tata1mg-fishoil-08",
    "name": "Triple Strength Omega 3 Advanced Fish Oil (560mg EPA + 400mg DHA)",
    "brand": "Tata 1mg",
    "weight": "150g",
    "servings": 60,
    "price": 699,
    "originalPrice": 1195,
    "proteinPerGram": null,
    "category": "Daily Wellness",
    "batchNumber": "T1MG-OMG-2024-4190",
    "rating": 4.8,
    "reviewsCount": 3820,
    "inStock": true,
    "stockUnits": 64,
    "netWeightGrams": 150,
    "proteinPerServingGrams": null,
    "servingsPerPack": 60,
    "mrp": 1195,
    "discountedPrice": 699,
    "image": "/images/tata-1mg-omega-3.jpg",
    "dosageForm": "Capsules",
    "tags": [
      "1250mg Fish Oil",
      "560mg EPA / 400mg DHA",
      "With Vitamin E"
    ],
    "description": "Tata 1mg Triple Strength Omega 3 contains 1250mg fish oil with 560mg EPA and 400mg DHA to support heart, muscle, and joint health.",
    "keyHighlights": [
      "1250mg Fish Oil with 560mg EPA + 400mg DHA",
      "Fortified with Vitamin E",
      "60 Capsules (60-day supply)"
    ],
    "batches": [
      {
        "batchNumber": "T1MG-OMG-2024-4190",
        "manufacturingDate": "2024-08-01",
        "expiryDate": "2026-07-31",
        "testDate": "2024-08-06",
        "reportId": "EUR-IN-2024-9021",
        "labReportUrl": "https://reports.nutritrust.internal/T1MG-OMG-2024-4190.pdf",
        "labName": "Eurofins Analytical Services India Pvt Ltd",
        "accreditationId": "NABL TC-88912 / ISO-IEC 17025",
        "testedParameters": {
          "proteinFoundPercent": 0,
          "heavyMetalsPass": true,
          "microbiologicalPass": true
        }
      }
    ]
  },
  {
    "id": "prod-truebasics-multi-07",
    "name": "Advanced Multivitamin for Sports (30 Tablets)",
    "brand": "TrueBasics",
    "weight": "90g",
    "servings": 30,
    "price": 999,
    "originalPrice": 1499,
    "proteinPerGram": null,
    "category": "Daily Wellness",
    "batchNumber": "TB-MV-9021",
    "rating": 4.8,
    "reviewsCount": 2130,
    "inStock": true,
    "stockUnits": 52,
    "netWeightGrams": 90,
    "proteinPerServingGrams": null,
    "servingsPerPack": 30,
    "mrp": 1499,
    "discountedPrice": 999,
    "image": "/images/truebasics-multivitamin.jpg",
    "dosageForm": "Tablets",
    "tags": [
      "Sports Performance",
      "Amino Acid Blend",
      "Antioxidant Support"
    ],
    "description": "HealthKart TrueBasics Advanced Multivitamin for Sports formulated with vitamins, minerals, sports amino acids, and antioxidant immunity blend.",
    "keyHighlights": [
      "Clinically proven ingredients",
      "Sports, amino acid & antioxidant blend",
      "30 Tablets for active men"
    ],
    "batches": [
      {
        "batchNumber": "TB-MV-9021",
        "manufacturingDate": "2024-09-10",
        "expiryDate": "2026-03-09",
        "testDate": "2024-09-14",
        "reportId": "EUR-IN-2024-3381",
        "labReportUrl": "https://reports.nutritrust.internal/TB-MV-9021.pdf",
        "labName": "Eurofins Analytical Services India Pvt Ltd",
        "accreditationId": "NABL TC-88912 / ISO-IEC 17025",
        "testedParameters": {
          "proteinFoundPercent": 0,
          "heavyMetalsPass": true,
          "microbiologicalPass": true
        }
      }
    ]
  },
  {
    "id": "prod-nutrabay-multi-17",
    "name": "Nutrabay Multivitamin Men - Energy, Immunity & Vitality (60 Tablets)",
    "brand": "Nutrabay",
    "weight": "120g",
    "servings": 60,
    "price": 499,
    "originalPrice": 799,
    "proteinPerGram": null,
    "category": "Daily Wellness",
    "batchNumber": "NB-MV-6640",
    "rating": 4.7,
    "reviewsCount": 1980,
    "inStock": true,
    "stockUnits": 45,
    "netWeightGrams": 120,
    "proteinPerServingGrams": null,
    "servingsPerPack": 60,
    "mrp": 799,
    "discountedPrice": 499,
    "image": "/images/nutrabay-multi.png",
    "dosageForm": "Tablets",
    "tags": [
      "Energy, Immunity & Vitality",
      "60 Servings (1 Tab/Day)",
      "Essential Micronutrients"
    ],
    "description": "Nutrabay Multivitamin Men formulated for everyday stamina, immune defense, and active lifestyle vitality.",
    "keyHighlights": [
      "Supports Energy, Immunity & Vitality",
      "60 Tablets - 60 Daily Servings",
      "Essential daily micronutrient blend"
    ],
    "batches": [
      {
        "batchNumber": "NB-MV-6640",
        "manufacturingDate": "2024-08-25",
        "expiryDate": "2026-08-24",
        "testDate": "2024-08-30",
        "reportId": "SGS-IN-2024-6640",
        "labReportUrl": "https://reports.nutritrust.internal/NB-MV-6640.pdf",
        "labName": "SGS India Testing Laboratories Pvt Ltd",
        "accreditationId": "NABL TC-55102 / ISO-IEC 17025",
        "testedParameters": {
          "proteinFoundPercent": 0,
          "heavyMetalsPass": true,
          "microbiologicalPass": true
        }
      }
    ]
  },
  {
    "id": "prod-tata1mg-calcium-18",
    "name": "Calcium + Vitamin D3 Advanced Tablets (60 Tablets)",
    "brand": "Tata 1mg",
    "weight": "120g",
    "servings": 60,
    "price": 349,
    "originalPrice": 595,
    "proteinPerGram": null,
    "category": "Daily Wellness",
    "batchNumber": "T1MG-CAL-5520",
    "rating": 4.7,
    "reviewsCount": 2450,
    "inStock": true,
    "stockUnits": 50,
    "netWeightGrams": 120,
    "proteinPerServingGrams": null,
    "servingsPerPack": 60,
    "mrp": 595,
    "discountedPrice": 349,
    "image": "/images/tata-calcium.png",
    "dosageForm": "Tablets",
    "tags": [
      "Supports Bone, Muscle & Joint",
      "With Magnesium, Zinc & K2",
      "Calcium 500mg + D3 400IU"
    ],
    "description": "Tata 1mg Calcium + Vitamin D3 Advanced Tablets with Magnesium, Zinc, and Vitamin K2 for bone, muscle, and joint health.",
    "keyHighlights": [
      "Supports Bone, Muscle & Joint Health",
      "With Magnesium, Zinc & Vitamin K2",
      "Calcium 500mg & Vitamin D3 400IU"
    ],
    "batches": [
      {
        "batchNumber": "T1MG-CAL-5520",
        "manufacturingDate": "2024-09-08",
        "expiryDate": "2026-09-07",
        "testDate": "2024-09-12",
        "reportId": "EUR-IN-2024-5520",
        "labReportUrl": "https://reports.nutritrust.internal/T1MG-CAL-5520.pdf",
        "labName": "Eurofins Analytical Services India Pvt Ltd",
        "accreditationId": "NABL TC-88912 / ISO-IEC 17025",
        "testedParameters": {
          "proteinFoundPercent": 0,
          "heavyMetalsPass": true,
          "microbiologicalPass": true
        }
      }
    ]
  }
];
