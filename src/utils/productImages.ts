/**
 * Realistic Sports Nutrition Product Package Renders (SVG Data URIs)
 * Clean, consistent 1:1 aspect ratio renders on pure #f8fafc background.
 * Free of random stock photography, pharmaceutical pills, or wooden logs.
 */

function createSvgDataUri(svgContent: string): string {
  const cleaned = svgContent
    .replace(/\s+/g, ' ')
    .trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(cleaned)}`;
}

// 1. MuscleBlaze Biozyme Whey Protein - Matte Black Tub with Gold/Blue Accent
export const svgMbBiozyme = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <rect width="400" height="400" fill="#f8fafc"/>
  
  <!-- Subtle Contact Shadow -->
  <ellipse cx="200" cy="355" rx="100" ry="14" fill="#0f172a" opacity="0.08"/>
  <ellipse cx="200" cy="355" rx="75" ry="8" fill="#0f172a" opacity="0.12"/>

  <!-- Tub Body Gradient -->
  <defs>
    <linearGradient id="mbTubGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="25%" stop-color="#334155"/>
      <stop offset="60%" stop-color="#1e293b"/>
      <stop offset="90%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="goldAccent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <linearGradient id="lidGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="35%" stop-color="#334155"/>
      <stop offset="70%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>

  <!-- Tub Cap / Lid -->
  <path d="M 125 90 C 125 80 145 76 200 76 C 255 76 275 80 275 90 L 275 118 C 275 125 255 128 200 128 C 145 128 125 125 125 118 Z" fill="url(#lidGrad)"/>
  <!-- Cap Ribs -->
  <line x1="140" y1="88" x2="140" y2="116" stroke="#475569" stroke-width="2"/>
  <line x1="160" y1="88" x2="160" y2="116" stroke="#475569" stroke-width="2"/>
  <line x1="180" y1="88" x2="180" y2="116" stroke="#475569" stroke-width="2"/>
  <line x1="200" y1="88" x2="200" y2="116" stroke="#64748b" stroke-width="2.5"/>
  <line x1="220" y1="88" x2="220" y2="116" stroke="#475569" stroke-width="2"/>
  <line x1="240" y1="88" x2="240" y2="116" stroke="#475569" stroke-width="2"/>
  <line x1="260" y1="88" x2="260" y2="116" stroke="#475569" stroke-width="2"/>

  <!-- Neck -->
  <rect x="135" y="118" width="130" height="15" fill="#0f172a"/>

  <!-- Main Tub Jar Body -->
  <path d="M 135 133 C 110 140 100 160 100 185 L 100 325 C 100 345 125 352 200 352 C 275 352 300 345 300 325 L 300 185 C 300 160 290 140 265 133 Z" fill="url(#mbTubGrad)"/>

  <!-- Label Wrap -->
  <rect x="106" y="170" width="188" height="150" rx="6" fill="#090d16"/>
  <!-- Gold Strip on Label -->
  <rect x="106" y="170" width="188" height="6" fill="url(#goldAccent)"/>

  <!-- Label Typography & Badges -->
  <text x="200" y="196" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="13" fill="#ffffff" letter-spacing="3">MUSCLEBLAZE</text>
  <text x="200" y="218" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="18" fill="#fbbf24">BIOZYME</text>
  <text x="200" y="235" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="12" fill="#38bdf8" letter-spacing="1">PERFORMANCE WHEY</text>

  <!-- Metric Badges Box -->
  <rect x="122" y="250" width="156" height="42" rx="6" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="145" y="268" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="14" fill="#ffffff">25g</text>
  <text x="145" y="282" text-anchor="middle" font-family="system-ui" font-weight="700" font-size="8" fill="#94a3b8">PROTEIN</text>
  <line x1="172" y1="256" x2="172" y2="286" stroke="#475569" stroke-width="1"/>
  <text x="200" y="268" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="13" fill="#fbbf24">5.5g</text>
  <text x="200" y="282" text-anchor="middle" font-family="system-ui" font-weight="700" font-size="8" fill="#94a3b8">BCAA</text>
  <line x1="228" y1="256" x2="228" y2="286" stroke="#475569" stroke-width="1"/>
  <text x="253" y="268" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="11" fill="#38bdf8">EAF®</text>
  <text x="253" y="282" text-anchor="middle" font-family="system-ui" font-weight="700" font-size="8" fill="#94a3b8">ABSORB</text>

  <!-- Informed Choice & NABL stamp -->
  <rect x="135" y="300" width="130" height="12" rx="3" fill="#047857"/>
  <text x="200" y="309" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="8" fill="#ffffff">✓ NABL LAB CERTIFIED BATCH</text>
</svg>
`);

// 2. Optimum Nutrition Gold Standard Whey - Black & Red Classic Tub
export const svgOnGoldStandard = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <rect width="400" height="400" fill="#f8fafc"/>
  <ellipse cx="200" cy="355" rx="100" ry="14" fill="#0f172a" opacity="0.08"/>
  <ellipse cx="200" cy="355" rx="75" ry="8" fill="#0f172a" opacity="0.12"/>

  <defs>
    <linearGradient id="onTubGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#18181b"/>
      <stop offset="30%" stop-color="#27272a"/>
      <stop offset="65%" stop-color="#18181b"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>
    <linearGradient id="onRedGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#dc2626"/>
      <stop offset="100%" stop-color="#991b1b"/>
    </linearGradient>
  </defs>

  <!-- Black Ribbed Cap -->
  <path d="M 125 90 C 125 80 145 76 200 76 C 255 76 275 80 275 90 L 275 118 C 275 125 255 128 200 128 C 145 128 125 125 125 118 Z" fill="#27272a"/>
  <line x1="140" y1="88" x2="140" y2="116" stroke="#52525b" stroke-width="2"/>
  <line x1="170" y1="88" x2="170" y2="116" stroke="#52525b" stroke-width="2"/>
  <line x1="200" y1="88" x2="200" y2="116" stroke="#71717a" stroke-width="2.5"/>
  <line x1="230" y1="88" x2="230" y2="116" stroke="#52525b" stroke-width="2"/>
  <line x1="260" y1="88" x2="260" y2="116" stroke="#52525b" stroke-width="2"/>

  <!-- Tub Body -->
  <path d="M 135 133 C 110 140 100 160 100 185 L 100 325 C 100 345 125 352 200 352 C 275 352 300 345 300 325 L 300 185 C 300 160 290 140 265 133 Z" fill="url(#onTubGrad)"/>

  <!-- Label Section -->
  <rect x="106" y="165" width="188" height="155" rx="6" fill="#18181b"/>
  <!-- Red Arc/Band on ON label -->
  <path d="M 106 175 L 294 175 L 294 205 L 106 220 Z" fill="url(#onRedGrad)"/>

  <!-- ON Logo -->
  <circle cx="200" cy="180" r="16" fill="#09090b" stroke="#f59e0b" stroke-width="2"/>
  <text x="200" y="185" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="11" fill="#f59e0b">ON</text>

  <text x="200" y="235" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="17" fill="#fbbf24" letter-spacing="1">GOLD STANDARD</text>
  <text x="200" y="252" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="14" fill="#ffffff">100% WHEY</text>
  <text x="200" y="266" text-anchor="middle" font-family="system-ui" font-weight="600" font-size="9" fill="#a1a1aa">ISOLATE PRIMARY SOURCE</text>

  <rect x="125" y="278" width="150" height="26" rx="4" fill="#27272a"/>
  <text x="160" y="295" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="12" fill="#ffffff">24g</text>
  <text x="160" y="303" text-anchor="middle" font-family="system-ui" font-weight="600" font-size="7" fill="#71717a">PROTEIN</text>
  <text x="240" y="295" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="12" fill="#fbbf24">5.5g</text>
  <text x="240" y="303" text-anchor="middle" font-family="system-ui" font-weight="600" font-size="7" fill="#71717a">BCAAs</text>
</svg>
`);

// 3. Avvatar Grass-Fed Whey - Standup Fresh Dairy Pouch
export const svgAvvatarPouch = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <rect width="400" height="400" fill="#f8fafc"/>
  <ellipse cx="200" cy="355" rx="95" ry="12" fill="#0f172a" opacity="0.1"/>

  <defs>
    <linearGradient id="pouchGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#f1f5f9"/>
      <stop offset="40%" stop-color="#ffffff"/>
      <stop offset="70%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </linearGradient>
  </defs>

  <!-- Pouch Top Seal Line -->
  <polygon points="120,80 280,80 270,105 130,105" fill="#065f46"/>
  <line x1="125" y1="88" x2="275" y2="88" stroke="#047857" stroke-dasharray="3 2" stroke-width="1.5"/>

  <!-- Pouch Body -->
  <path d="M 130 105 L 115 160 L 105 320 C 105 345 130 352 200 352 C 270 352 295 345 295 320 L 285 160 L 270 105 Z" fill="url(#pouchGrad)" stroke="#cbd5e1" stroke-width="1.5"/>

  <!-- Emerald Fresh Milk Banner -->
  <path d="M 110 160 L 290 160 L 285 240 L 115 240 Z" fill="#064e3b"/>
  <text x="200" y="185" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="20" fill="#ffffff" letter-spacing="4">AVVATAR</text>
  <text x="200" y="205" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="11" fill="#6ee7b7">100% FRESH COW MILK</text>
  <text x="200" y="224" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="14" fill="#ffffff">WHEY PROTEIN</text>

  <!-- Metric Pill -->
  <rect x="135" y="260" width="130" height="40" rx="8" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1.5"/>
  <text x="200" y="280" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="16" fill="#065f46">28g PROTEIN</text>
  <text x="200" y="293" text-anchor="middle" font-family="system-ui" font-weight="700" font-size="9" fill="#047857">SINGLE SCOOP • ZERO ADDED SUGAR</text>

  <rect x="140" y="315" width="120" height="16" rx="4" fill="#0f172a"/>
  <text x="200" y="326" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="9" fill="#ffffff">MADE IN INDIA DIRECT</text>
</svg>
`);

// 4. Cosmix No-Nonsense Plant Protein - Organic Kraft Pouch
export const svgCosmixPlant = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <rect width="400" height="400" fill="#f8fafc"/>
  <ellipse cx="200" cy="355" rx="90" ry="12" fill="#0f172a" opacity="0.1"/>

  <defs>
    <linearGradient id="kraftGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#d7ba9d"/>
      <stop offset="35%" stop-color="#eddac7"/>
      <stop offset="70%" stop-color="#e2cbb2"/>
      <stop offset="100%" stop-color="#caa98b"/>
    </linearGradient>
  </defs>

  <polygon points="125,85 275,85 268,105 132,105" fill="#8c6239"/>
  <path d="M 132 105 L 118 160 L 110 320 C 110 345 135 352 200 352 C 265 352 290 345 290 320 L 282 160 L 268 105 Z" fill="url(#kraftGrad)" stroke="#b08968" stroke-width="1.5"/>

  <!-- Minimalist Clean Botanical Label -->
  <rect x="125" y="145" width="150" height="165" rx="8" fill="#ffffff" stroke="#e6ccb2" stroke-width="1.5"/>
  <text x="200" y="172" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="17" fill="#43281c" letter-spacing="2">COSMIX</text>
  <line x1="150" y1="180" x2="250" y2="180" stroke="#7f4f24" stroke-width="1"/>
  
  <text x="200" y="198" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="12" fill="#7f4f24">NO-NONSENSE</text>
  <text x="200" y="214" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="15" fill="#43281c">PLANT PROTEIN</text>
  <text x="200" y="230" text-anchor="middle" font-family="system-ui" font-weight="600" font-size="9" fill="#936639">FERMENTED GOLDEN PEA</text>

  <rect x="140" y="245" width="120" height="32" rx="6" fill="#fdf0d5"/>
  <text x="200" y="262" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="14" fill="#7f4f24">24g PROTEIN</text>
  <text x="200" y="272" text-anchor="middle" font-family="system-ui" font-weight="700" font-size="8" fill="#936639">DIGEZYME • GUT ENZYMES</text>

  <text x="200" y="296" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="8" fill="#047857">100% VEGAN • ZERO GUMS</text>
</svg>
`);

// 5. Origin Nutrition Organic Vegan Protein Pouch
export const svgOriginPlant = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <rect width="400" height="400" fill="#f8fafc"/>
  <ellipse cx="200" cy="355" rx="90" ry="12" fill="#0f172a" opacity="0.1"/>

  <defs>
    <linearGradient id="sageGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#d1fae5"/>
      <stop offset="40%" stop-color="#ecfdf5"/>
      <stop offset="100%" stop-color="#a7f3d0"/>
    </linearGradient>
  </defs>

  <polygon points="125,85 275,85 268,105 132,105" fill="#047857"/>
  <path d="M 132 105 L 118 160 L 110 320 C 110 345 135 352 200 352 C 265 352 290 345 290 320 L 282 160 L 268 105 Z" fill="url(#sageGrad)" stroke="#6ee7b7" stroke-width="1.5"/>

  <rect x="125" y="145" width="150" height="165" rx="8" fill="#ffffff" stroke="#a7f3d0" stroke-width="1.5"/>
  <text x="200" y="172" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="16" fill="#065f46" letter-spacing="2">ORIGIN</text>
  <text x="200" y="185" text-anchor="middle" font-family="system-ui" font-weight="700" font-size="9" fill="#047857">NUTRITION</text>

  <text x="200" y="210" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="14" fill="#064e3b">ORGANIC VEGAN</text>
  <text x="200" y="226" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="12" fill="#047857">PEA &amp; PUMPKIN SEED</text>

  <rect x="140" y="242" width="120" height="32" rx="6" fill="#ecfdf5"/>
  <text x="200" y="259" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="14" fill="#065f46">25g PROTEIN</text>
  <text x="200" y="270" text-anchor="middle" font-family="system-ui" font-weight="700" font-size="8" fill="#059669">4g BCAAS • NON-GMO</text>

  <text x="200" y="296" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="8" fill="#047857">BOURBON VANILLA</text>
</svg>
`);

// 6. Wellcore Creapure Creatine - Wide-Mouth Matte Black Tub
export const svgWellcoreCreatine = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <rect width="400" height="400" fill="#f8fafc"/>
  <ellipse cx="200" cy="352" rx="95" ry="12" fill="#0f172a" opacity="0.1"/>

  <!-- Wide Mouth Squat Tub -->
  <rect x="120" y="130" width="160" height="35" rx="5" fill="#0f172a"/>
  <rect x="110" y="165" width="180" height="175" rx="16" fill="#18181b" stroke="#27272a" stroke-width="2"/>

  <!-- Label -->
  <rect x="118" y="185" width="164" height="135" rx="8" fill="#09090b"/>
  <text x="200" y="215" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="18" fill="#ffffff" letter-spacing="3">WELLCORE</text>
  <text x="200" y="235" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="13" fill="#38bdf8">MICRONIZED</text>
  <text x="200" y="255" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="16" fill="#facc15">CREAPURE®</text>

  <rect x="135" y="268" width="130" height="26" rx="4" fill="#1e293b"/>
  <text x="200" y="284" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="11" fill="#ffffff">99.99% HPLC PURITY</text>
  <text x="200" y="306" text-anchor="middle" font-family="system-ui" font-weight="700" font-size="8" fill="#94a3b8">ALZCHEM GERMANY ORIGIN</text>
</svg>
`);

// 7. TrueBasics Daily Multivitamin - Clean Clinical White Bottle
export const svgTrueBasicsMulti = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <rect width="400" height="400" fill="#f8fafc"/>
  <ellipse cx="200" cy="355" rx="75" ry="11" fill="#0f172a" opacity="0.1"/>

  <!-- Teal Bottle Cap -->
  <rect x="150" y="100" width="100" height="35" rx="6" fill="#0d9488"/>
  <line x1="165" y1="102" x2="165" y2="133" stroke="#14b8a6" stroke-width="1.5"/>
  <line x1="185" y1="102" x2="185" y2="133" stroke="#14b8a6" stroke-width="1.5"/>
  <line x1="205" y1="102" x2="205" y2="133" stroke="#14b8a6" stroke-width="1.5"/>
  <line x1="225" y1="102" x2="225" y2="133" stroke="#14b8a6" stroke-width="1.5"/>

  <!-- Bottle Body -->
  <rect x="130" y="135" width="140" height="205" rx="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>

  <!-- Label -->
  <rect x="136" y="165" width="128" height="150" rx="8" fill="#f0fdfa" stroke="#ccfbf1" stroke-width="1"/>
  <text x="200" y="195" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="15" fill="#0f766e" letter-spacing="1">TRUEBASICS</text>
  <text x="200" y="215" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="14" fill="#0f172a">MULTI-VIT</text>
  <text x="200" y="230" text-anchor="middle" font-family="system-ui" font-weight="700" font-size="10" fill="#0d9488">ACTIVE DAILY</text>

  <rect x="145" y="245" width="110" height="30" rx="6" fill="#0d9488"/>
  <text x="200" y="261" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="12" fill="#ffffff">23 NUTRIENTS</text>
  <text x="200" y="271" text-anchor="middle" font-family="system-ui" font-weight="600" font-size="8" fill="#ccfbf1">100% RDA CHELATED</text>

  <text x="200" y="298" text-anchor="middle" font-family="system-ui" font-weight="700" font-size="8" fill="#0f766e">60 TABLETS • CLINICAL GRADE</text>
</svg>
`);

// 8. Neuherbs Deep Sea Omega-3 - Amber Bottle
export const svgNeuherbsFishOil = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <rect width="400" height="400" fill="#f8fafc"/>
  <ellipse cx="200" cy="355" rx="75" ry="11" fill="#0f172a" opacity="0.1"/>

  <defs>
    <linearGradient id="amberGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#78350f"/>
      <stop offset="40%" stop-color="#b45309"/>
      <stop offset="80%" stop-color="#92400e"/>
      <stop offset="100%" stop-color="#451a03"/>
    </linearGradient>
  </defs>

  <!-- Gold Bottle Cap -->
  <rect x="150" y="100" width="100" height="35" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
  <!-- Amber Glass Bottle Body -->
  <rect x="130" y="135" width="140" height="205" rx="20" fill="url(#amberGrad)" stroke="#78350f" stroke-width="1.5"/>

  <!-- Navy & Gold Label -->
  <rect x="136" y="165" width="128" height="150" rx="8" fill="#0f172a"/>
  <text x="200" y="195" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="14" fill="#fbbf24" letter-spacing="2">NEUHERBS</text>
  <text x="200" y="215" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="12" fill="#38bdf8">DEEP SEA</text>
  <text x="200" y="232" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="14" fill="#ffffff">OMEGA-3</text>

  <rect x="145" y="245" width="110" height="30" rx="6" fill="#0284c7"/>
  <text x="200" y="261" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="11" fill="#ffffff">1000mg EPA+DHA</text>
  <text x="200" y="271" text-anchor="middle" font-family="system-ui" font-weight="700" font-size="8" fill="#bae6fd">MOLECULARLY DISTILLED</text>

  <text x="200" y="298" text-anchor="middle" font-family="system-ui" font-weight="700" font-size="8" fill="#94a3b8">ZERO FISHY BURPS • LEMON</text>
</svg>
`);

// 9. MuscleBlaze Raw Whey Isolate 90% - Platinum Silver & Black Tub
export const svgMbRawWhey = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <rect width="400" height="400" fill="#f8fafc"/>
  <ellipse cx="200" cy="355" rx="100" ry="14" fill="#0f172a" opacity="0.08"/>
  <ellipse cx="200" cy="355" rx="75" ry="8" fill="#0f172a" opacity="0.12"/>

  <defs>
    <linearGradient id="silverTub" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#94a3b8"/>
      <stop offset="35%" stop-color="#e2e8f0"/>
      <stop offset="65%" stop-color="#cbd5e1"/>
      <stop offset="100%" stop-color="#64748b"/>
    </linearGradient>
  </defs>

  <!-- Black Cap -->
  <path d="M 125 90 C 125 80 145 76 200 76 C 255 76 275 80 275 90 L 275 118 C 275 125 255 128 200 128 C 145 128 125 125 125 118 Z" fill="#0f172a"/>
  <!-- Silver Tub Body -->
  <path d="M 135 133 C 110 140 100 160 100 185 L 100 325 C 100 345 125 352 200 352 C 275 352 300 345 300 325 L 300 185 C 300 160 290 140 265 133 Z" fill="url(#silverTub)" stroke="#94a3b8" stroke-width="1.5"/>

  <!-- Charcoal Wrap Label -->
  <rect x="106" y="170" width="188" height="150" rx="6" fill="#0f172a"/>
  <text x="200" y="196" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="12" fill="#94a3b8" letter-spacing="3">MUSCLEBLAZE</text>
  <text x="200" y="218" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="17" fill="#ffffff">RAW WHEY ISOLATE</text>
  <text x="200" y="235" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="13" fill="#38bdf8">90% PURE PROTEIN</text>

  <rect x="122" y="250" width="156" height="42" rx="6" fill="#1e293b"/>
  <text x="160" y="268" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="14" fill="#ffffff">27g</text>
  <text x="160" y="282" text-anchor="middle" font-family="system-ui" font-weight="700" font-size="8" fill="#94a3b8">PROTEIN</text>
  <line x1="200" y1="256" x2="200" y2="286" stroke="#475569" stroke-width="1"/>
  <text x="240" y="268" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="13" fill="#38bdf8">ZERO</text>
  <text x="240" y="282" text-anchor="middle" font-family="system-ui" font-weight="700" font-size="8" fill="#94a3b8">FLAVOR/SUGAR</text>

  <text x="200" y="309" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="8" fill="#34d399">✓ 100% INDEPENDENT NABL TESTED</text>
</svg>
`);

export const productSvgMap: Record<string, string> = {
  'prod-mb-biozyme-01': svgMbBiozyme,
  'prod-on-gold-02': svgOnGoldStandard,
  'prod-avvatar-iso-03': svgAvvatarPouch,
  'prod-cosmix-plant-04': svgCosmixPlant,
  'prod-origin-plant-05': svgOriginPlant,
  'prod-wellcore-creatine-06': svgWellcoreCreatine,
  'prod-truebasics-multi-07': svgTrueBasicsMulti,
  'prod-neuherbs-fishoil-08': svgNeuherbsFishOil,
  'prod-tata1mg-fishoil-08': svgNeuherbsFishOil,
  'prod-mb-raw-whey-09': svgMbRawWhey,
};
