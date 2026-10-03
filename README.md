# NutriTrust — Supplement Delivery Web Platform

A clinical-grade, high-trust sports nutrition and wellness supplement delivery web platform built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Lucide Icons**.

## Key Highlights & Core Features

### 1. Calculated Value Metric (`₹ / g protein`)
Consumers are frequently misled by container weight or exaggerated scoop sizes. NutriTrust normalizes every protein supplement with a calculated value metric:
$$\text{Total Protein (g)} = \text{Servings Per Pack} \times \text{Protein Per Serving (g)}$$
$$\text{Price Per Gram of Protein} = \frac{\text{Discounted Price}}{\text{Total Protein (g)}}$$
- **Prominent Card Badge**: E.g., `₹2.67 / g protein (825g total protein)`.
- **Value Sorting**: Sort by "Price per g of Protein" to instantly identify the most cost-effective protein yields.

### 2. Batch Purity & Lab Report Verification
Every product displays an authentic production batch record. Clicking **"Verify Batch & Lab Report"** opens an interactive certificate viewer detailing:
- Chemical protein recovery vs. label claim (e.g., 83.2% protein assayed).
- ICP-MS heavy metals screen (Lead, Cadmium, Arsenic, Mercury ppm).
- Microbiological pathogen testing (Salmonella, E. Coli, Yeast & Mold).
- Accredited testing facility credentials (NABL / ISO/IEC 17025:2017).

### 3. Healthcare E-Commerce Visual Design
- Neutral crisp whites, slate surfaces (`slate-50`, `slate-900`), and accents in clinical emerald green (`emerald-600`, `emerald-500`).
- Category filter pills with live counts for **Whey Protein**, **Plant Protein**, **Creatine**, **Multivitamins**, and **Fish Oil**.
- Live search bar and stock filters.
- Interactive slide-over cart drawer with free express delivery progress bar and item quantity management.

---

## Getting Started

### Recommended Workspace Setting
Please set your active workspace to:
```
C:\Users\shant\.gemini\antigravity\scratch\supplement-delivery-app
```

### Development Server
```bash
npm install
npm run dev
```

### Production Build & Typecheck
```bash
npm run build
```
