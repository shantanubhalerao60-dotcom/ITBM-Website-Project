import { useState, useMemo, useEffect } from 'react';
import { mockProducts } from './data/mockData';
import type { Product, ProductCategory, ProductSortOption, ProductBatch } from './types/product';
import type { AdminSession } from './types/admin';
import { calculateProteinMetrics } from './utils/metrics';
import { getStoredAdminSession, clearStoredAdminSession } from './utils/adminAuth';
import { CartProvider } from './context/CartContext';
import { TrustBanner } from './components/TrustBanner';
import { Navbar } from './components/Navbar';
import { FilterSortBar } from './components/FilterSortBar';
import { ProductGrid } from './components/ProductGrid';
import { BatchVerificationModal } from './components/BatchVerificationModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { MetricExplainerModal } from './components/MetricExplainerModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CartToastContainer } from './components/CartToastContainer';
import { Footer } from './components/Footer';
import { RPBot } from './components/RPBot';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLogin } from './components/admin/AdminLogin';
import { 
  Sparkles, 
  FlaskConical, 
  ArrowRight,
  CheckCircle2,
  Check
} from 'lucide-react';

function SupplementAppRoot() {
  // Catalog products state
  const [products, setProducts] = useState<Product[]>(mockProducts);
  
  // Isolated Route Management: '/' vs '/admin'
  const [currentRoute, setCurrentRoute] = useState<'/' | '/admin'>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.startsWith('/admin') ? '/admin' : '/';
    }
    return '/';
  });

  // Admin authentication session (persisted in localStorage)
  const [adminSession, setAdminSession] = useState<AdminSession | null>(() => getStoredAdminSession());
  const isAdminAuthenticated = Boolean(adminSession);

  // Sync route with browser navigation (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const isPathAdmin = window.location.pathname.startsWith('/admin');
      setCurrentRoute(isPathAdmin ? '/admin' : '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Safe navigation helper
  const navigateToRoute = (route: '/' | '/admin') => {
    if (typeof window !== 'undefined' && window.location.pathname !== route) {
      window.history.pushState({}, '', route);
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sign out handler
  const handleAdminSignOut = () => {
    clearStoredAdminSession();
    setAdminSession(null);
    navigateToRoute('/');
  };

  // Storefront Filtering & Sorting State
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<ProductSortOption>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [verifyingProduct, setVerifyingProduct] = useState<Product | null>(null);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isExplainerOpen, setIsExplainerOpen] = useState(false);

  // Compute category counts from active products state
  const categoryCounts = useMemo(() => {
    const counts: Record<ProductCategory, number> = {
      All: products.length,
      'Whey Protein': 0,
      'Plant Protein': 0,
      'Performance & Creatine': 0,
      'Daily Wellness': 0,
    };

    products.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category] += 1;
      }
    });

    return counts;
  }, [products]);

  // Filter and sort products from active products state
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // 1. Category Filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 2. Search Query Filter (name or brand)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // 3. In-Stock Filter
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // 4. Sorting
    result.sort((a, b) => {
      switch (sortOption) {
        case 'price_asc':
          return a.discountedPrice - b.discountedPrice;
        case 'price_desc':
          return b.discountedPrice - a.discountedPrice;
        case 'rating_desc':
          return b.rating - a.rating;
        case 'protein_value': {
          const metricA = calculateProteinMetrics(a);
          const metricB = calculateProteinMetrics(b);
          if (metricA && metricB) {
            return metricA.pricePerGramProtein - metricB.pricePerGramProtein;
          }
          if (metricA && !metricB) return -1;
          if (!metricA && metricB) return 1;
          return a.discountedPrice - b.discountedPrice;
        }
        case 'featured':
        default:
          return 0;
      }
    });

    return result;
  }, [products, selectedCategory, searchQuery, inStockOnly, sortOption]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setInStockOnly(false);
    setSortOption('featured');
  };

  const handleOpenBatchVerification = (product?: Product) => {
    setVerifyingProduct(product ?? null);
    setIsBatchModalOpen(true);
  };

  // Admin Actions
  const handleToggleProductStock = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const nextInStock = !p.inStock;
          return {
            ...p,
            inStock: nextInStock,
            stockUnits: nextInStock ? (p.stockUnits === 0 ? 15 : p.stockUnits) : 0,
          };
        }
        return p;
      })
    );
  };

  const handleAddBatch = (productId: string, newBatch: ProductBatch) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            batches: [newBatch, ...p.batches],
          };
        }
        return p;
      })
    );
  };

  // =========================================================================
  // ROUTE 1: /admin - Isolated Admin Portal with Route Guard
  // =========================================================================
  if (currentRoute === '/admin') {
    // Unauthenticated -> Standalone Admin Login screen (no storefront navigation)
    if (!isAdminAuthenticated) {
      return (
        <AdminLogin
          onLoginSuccess={(session) => {
            setAdminSession(session);
          }}
          onReturnToStorefront={() => navigateToRoute('/')}
        />
      );
    }

    // Authenticated -> Admin Analytics & Batch Management Dashboard
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <AdminDashboard
          products={products}
          onToggleProductStock={handleToggleProductStock}
          onAddBatch={handleAddBatch}
          onSwitchToStorefront={() => navigateToRoute('/')}
          onSignOut={handleAdminSignOut}
          onVerifyBatchInModal={(product) => handleOpenBatchVerification(product)}
        />

        {/* Batch Verification Modal accessible by admin to inspect COAs */}
        <BatchVerificationModal
          initialProduct={verifyingProduct}
          isOpen={isBatchModalOpen}
          onClose={() => {
            setIsBatchModalOpen(false);
            setVerifyingProduct(null);
          }}
        />
      </div>
    );
  }

  // =========================================================================
  // ROUTE 2: / - Consumer Healthcare Storefront
  // (NO Admin buttons in header/navbar; small muted Staff Portal in footer)
  // =========================================================================
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
      {/* Single-Line Top Quality Guarantee Announcement */}
      <TrustBanner />

      {/* Main Responsive Header Navigation (Zero Admin references) */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categoryCounts={categoryCounts}
        onOpenMetricExplainer={() => setIsExplainerOpen(true)}
        onOpenBatchVerification={() => handleOpenBatchVerification()}
      />

      {/* TWO-COLUMN CONSUMER HERO SECTION - Only on Main Page */}
      {selectedCategory === 'All' && !searchQuery.trim() && (
        <section className="bg-gradient-to-b from-slate-50/70 via-white to-white border-b border-slate-100 py-10 sm:py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Headline, Subtext, Buttons & Trust Proof */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-900 border border-emerald-200/90 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-tight">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>Clinical Purity & Standardized Value</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5.5xl font-black tracking-tight text-slate-950 leading-[1.12]">
                Authentic Supplements, <br />
                <span className="text-emerald-800">Backed by Lab Tests.</span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl">
                Stop guessing protein purity or overpaying for bulky fillers. We independently assay every batch for heavy metals and amino spiking, standardizing every tub by its true cost per gram of protein.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedCategory('Whey Protein');
                    setSortOption('protein_value');
                  }}
                  className="inline-flex items-center space-x-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  <span>Shop Lab-Tested Protein</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <button
                  onClick={() => handleOpenBatchVerification()}
                  className="inline-flex items-center space-x-2 bg-white hover:bg-slate-50 text-slate-800 font-bold px-5 py-3.5 rounded-xl text-xs sm:text-sm border border-slate-300 shadow-2xs transition-all active:scale-95 cursor-pointer"
                >
                  <FlaskConical className="w-4 h-4 text-emerald-700" />
                  <span>Verify Your Batch</span>
                </button>
              </div>

              {/* Trust Proof Bar */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-600">
                <div className="flex items-center space-x-1.5">
                  <div className="flex text-amber-400 font-bold">
                    ★★★★★
                  </div>
                  <span className="font-extrabold text-slate-900">4.9/5</span>
                  <span className="text-slate-400">from 18k+ reviews</span>
                </div>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <div className="flex items-center space-x-1.5 text-slate-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Over 50,000+ verified batches delivered</span>
                </div>
              </div>
            </div>

            {/* Right Column: Prominent Visual Card with Mockup & Green Checkmark Stamp */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden group">
                
                {/* Header of Card */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Live Batch Testing Certificate
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    NABL ISO/IEC 17025
                  </span>
                </div>

                {/* Center: Supplement Mockup & Certificate Stamp */}
                <div className="grid grid-cols-12 gap-3 items-center my-2">
                  
                  {/* Tub Mockup */}
                  <div className="col-span-5 flex flex-col items-center">
                    <div className="relative w-full h-36 sm:h-40 flex items-center justify-center p-2 bg-white rounded-2xl border border-slate-100 shadow-2xs">
                      <img
                        src={products[0]?.image}
                        alt="MuscleBlaze Biozyme"
                        className="max-h-full max-w-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute bottom-1 bg-slate-900/90 text-white text-[9px] font-mono px-1.5 py-0.5 rounded">
                        #MB-BZ-2024-8841
                      </span>
                    </div>
                    <span className="text-[11px] font-extrabold text-slate-900 mt-1.5 text-center line-clamp-1">
                      Biozyme Whey Isolate
                    </span>
                  </div>

                  {/* Certificate Parameters Box */}
                  <div className="col-span-7 space-y-2">
                    
                    {/* Green Checkmark Stamp */}
                    <div className="bg-emerald-700 text-white rounded-2xl p-2.5 shadow-xs flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 stroke-[3] text-white" />
                      </div>
                      <div>
                        <div className="text-[11px] font-black tracking-tight leading-none">
                          100% AUTHENTIC
                        </div>
                        <div className="text-[10px] text-emerald-100 font-medium">
                          Certified Zero Amino Spiking
                        </div>
                      </div>
                    </div>

                    {/* Test Parameters Breakdown */}
                    <div className="bg-white rounded-2xl p-2.5 border border-slate-200/80 space-y-1.5 text-xs shadow-2xs">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-500 font-medium">Protein Assay:</span>
                        <span className="font-mono font-bold text-emerald-800">
                          25.2g / 31g (81.3%)
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-500 font-medium">Heavy Metals (Pb/As/Cd/Hg):</span>
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          ND (Pass)
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-500 font-medium">Microbiological Screen:</span>
                        <span className="text-emerald-700 font-bold">Negative (Pass)</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Bottom Action inside card */}
                <button
                  onClick={() => handleOpenBatchVerification(products[0])}
                  className="w-full mt-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-2xs cursor-pointer"
                >
                  <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Inspect Eurofins India Lab Report</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
      )}

      {/* Main Supplement Catalog Listing */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1">
        
        {/* Filter and Sorting Bar */}
        <FilterSortBar
          totalResults={filteredAndSortedProducts.length}
          sortOption={sortOption}
          onSortChange={setSortOption}
          inStockOnly={inStockOnly}
          onToggleInStock={setInStockOnly}
          activeCategory={selectedCategory}
          searchQuery={searchQuery}
          onClearFilters={handleResetFilters}
        />

        {/* Product Grid */}
        <ProductGrid
          products={filteredAndSortedProducts}
          onVerifyBatch={(product) => handleOpenBatchVerification(product)}
          onOpenMetricExplainer={() => setIsExplainerOpen(true)}
          onResetFilters={handleResetFilters}
          onSelectProduct={(product) => {
            setSelectedDetailProduct(product);
            setIsDetailModalOpen(true);
          }}
        />
      </main>

      {/* Slide-Over Cart Drawer */}
      <CartDrawer />

      {/* 3-Step Express Checkout Modal */}
      <CheckoutModal />

      {/* Floating Cart Toast Notifications */}
      <CartToastContainer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedDetailProduct}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedDetailProduct(null);
        }}
        onVerifyBatch={(product) => handleOpenBatchVerification(product)}
        onOpenMetricExplainer={() => setIsExplainerOpen(true)}
      />

      {/* Batch Verification Modal */}
      <BatchVerificationModal
        initialProduct={verifyingProduct}
        isOpen={isBatchModalOpen}
        onClose={() => {
          setIsBatchModalOpen(false);
          setVerifyingProduct(null);
        }}
      />

      {/* Metric Explainer Modal */}
      <MetricExplainerModal
        isOpen={isExplainerOpen}
        onClose={() => setIsExplainerOpen(false)}
      />

      {/* Native AI RP Bot Assistant */}
      {currentRoute === '/' && (
        <RPBot
          products={products}
          onSelectProduct={(product) => {
            setSelectedDetailProduct(product);
            setIsDetailModalOpen(true);
          }}
          onVerifyBatch={(product) => handleOpenBatchVerification(product)}
        />
      )}

      {/* Trust & Compliance Footer with Muted Staff Portal Link */}
      <Footer onNavigateToAdmin={() => navigateToRoute('/admin')} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <SupplementAppRoot />
    </CartProvider>
  );
}
