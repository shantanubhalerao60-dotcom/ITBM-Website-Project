import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  User, 
  ChevronDown, 
  Package, 
  Repeat, 
  Gift, 
  Tag, 
  FileCheck2, 
  HelpCircle, 
  LogOut, 
  LogIn, 
  Check, 
  Copy, 
  X, 
  ExternalLink,
  ShoppingBag,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { mockProducts } from '../data/mockData';
import { formatCurrency } from '../utils/currency';

export interface CustomerUser {
  name: string;
  email: string;
  phone: string;
  isLoggedIn: boolean;
  memberTier: string;
  walletBalance: number;
}

const DEFAULT_CUSTOMER: CustomerUser = {
  name: 'Rahul Sharma',
  email: 'rahul.sharma@gmail.com',
  phone: '+91 98765 43210',
  isLoggedIn: true,
  memberTier: 'Gold Elite',
  walletBalance: 250,
};

type ActiveFeatureModal = 'orders' | 'buy_again' | 'refer' | 'offers' | 'help' | null;

interface CustomerAccountDropdownProps {
  onOpenMetricExplainer?: () => void;
}

export const CustomerAccountDropdown: React.FC<CustomerAccountDropdownProps> = ({
  onOpenMetricExplainer,
}) => {
  const { addToCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [customer, setCustomer] = useState<CustomerUser>(() => {
    try {
      const saved = localStorage.getItem('nutritrust_customer_user');
      return saved ? JSON.parse(saved) : DEFAULT_CUSTOMER;
    } catch {
      return DEFAULT_CUSTOMER;
    }
  });

  const [activeModal, setActiveModal] = useState<ActiveFeatureModal>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Prevent background scrolling and enable ESC to close modal
  useEffect(() => {
    if (activeModal) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setActiveModal(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [activeModal]);

  useEffect(() => {
    try {
      localStorage.setItem('nutritrust_customer_user', JSON.stringify(customer));
    } catch {
      // ignore
    }
  }, [customer]);

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggleLogin = () => {
    setCustomer(prev => ({
      ...prev,
      isLoggedIn: !prev.isLoggedIn,
      name: !prev.isLoggedIn ? 'Rahul Sharma' : 'Guest User',
    }));
    setIsOpen(false);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {/* Customer Login / Account Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer border ${
            customer.isLoggedIn
              ? 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-200'
          }`}
          title="Account, Orders & Offers"
        >
          <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0">
            {customer.isLoggedIn ? customer.name[0] : <User className="w-3.5 h-3.5 text-slate-700" />}
          </div>
          <span className="hidden sm:inline font-semibold">
            {customer.isLoggedIn ? customer.name.split(' ')[0] : 'Login'}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
            {/* Header: User Greeting */}
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-1.5">
                  <p className="font-extrabold text-slate-900 text-sm">
                    {customer.isLoggedIn ? customer.name : 'Welcome, Guest!'}
                  </p>
                  {customer.isLoggedIn && (
                    <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.2 rounded-full">
                      {customer.memberTier}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  {customer.isLoggedIn ? customer.phone : 'Sign in for member lab passes'}
                </p>
              </div>

              {customer.isLoggedIn ? (
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-medium block">Wallet</span>
                  <span className="text-xs font-black text-emerald-700">
                    ₹{customer.walletBalance}
                  </span>
                </div>
              ) : (
                <button
                  onClick={handleToggleLogin}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-2xs transition-colors cursor-pointer"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Menu Items */}
            <div className="py-1 text-xs text-slate-700">
              {/* My Orders */}
              <button
                onClick={() => {
                  setActiveModal('orders');
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left cursor-pointer group"
              >
                <div className="flex items-center space-x-2.5">
                  <Package className="w-4 h-4 text-emerald-700 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-slate-800">My Orders</span>
                </div>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200">
                  1 In Transit
                </span>
              </button>

              {/* Buy Again */}
              <button
                onClick={() => {
                  setActiveModal('buy_again');
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left cursor-pointer group"
              >
                <div className="flex items-center space-x-2.5">
                  <Repeat className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-slate-800">Buy Again</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">Reorder</span>
              </button>

              {/* Refer and Earn */}
              <button
                onClick={() => {
                  setActiveModal('refer');
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left cursor-pointer group"
              >
                <div className="flex items-center space-x-2.5">
                  <Gift className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-slate-800">Refer & Earn</span>
                </div>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                  Get ₹250
                </span>
              </button>

              {/* Offer Zone */}
              <button
                onClick={() => {
                  setActiveModal('offers');
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left cursor-pointer group"
              >
                <div className="flex items-center space-x-2.5">
                  <Tag className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-slate-800">Offer Zone</span>
                </div>
                <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                  3 Codes
                </span>
              </button>

              {/* ₹/g Value Calculator & Guide */}
              {onOpenMetricExplainer && (
                <button
                  onClick={() => {
                    onOpenMetricExplainer();
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left cursor-pointer group"
                >
                  <div className="flex items-center space-x-2.5">
                    <Sparkles className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-slate-800">₹/g Value Calculator</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    Guide
                  </span>
                </button>
              )}

              {/* Help & Support */}
              <button
                onClick={() => {
                  setActiveModal('help');
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2.5 flex items-center space-x-2.5 hover:bg-slate-50 transition-colors text-left cursor-pointer group"
              >
                <HelpCircle className="w-4 h-4 text-slate-500 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-slate-800">Help & Support</span>
              </button>
            </div>

            {/* Footer Sign In/Sign Out */}
            <div className="pt-2 mt-1 border-t border-slate-100 px-4 pb-1">
              <button
                onClick={handleToggleLogin}
                className="w-full flex items-center justify-between text-xs font-semibold text-slate-500 hover:text-slate-900 py-1 transition-colors cursor-pointer"
              >
                <span>{customer.isLoggedIn ? 'Sign Out of Account' : 'Switch / Demo Sign In'}</span>
                {customer.isLoggedIn ? (
                  <LogOut className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <LogIn className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: MY ORDERS */}
      {activeModal === 'orders' &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 relative my-auto animate-in zoom-in-95 duration-200">
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2.5 mb-5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900">My Orders & Lab Passes</h3>
                  <p className="text-xs text-slate-500">Track shipments and inspect batch authenticity certificates</p>
                </div>
              </div>

              <div className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
                {/* Order 1: In Transit */}
                <div className="p-4 rounded-2xl border border-emerald-200/90 bg-emerald-50/30 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-slate-900">#NT-2024-9104</span>
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                        Out for Delivery
                      </span>
                    </div>
                    <span className="text-slate-400 text-[11px]">Today, by 6:00 PM</span>
                  </div>

                  <div className="flex items-center space-x-3 bg-white p-2.5 rounded-xl border border-slate-200/80">
                    <img
                      src="/images/tata-1mg-omega-3.jpg"
                      alt="Tata 1mg Omega 3"
                      className="w-12 h-12 object-contain bg-slate-50 rounded-lg p-1"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        Tata 1mg Triple Strength Omega 3 (60 Capsules)
                      </h4>
                      <p className="text-[11px] text-slate-500 font-mono">
                        Batch #T1MG-OMG-2024-4190 • 1 item
                      </p>
                    </div>
                    <span className="text-xs font-extrabold text-slate-900">₹699</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-emerald-800 font-semibold flex items-center space-x-1">
                      <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>NABL Eurofins Certificate Attached</span>
                    </span>
                    <a
                      href="https://reports.nutritrust.internal/T1MG-OMG-2024-4190.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-bold hover:underline inline-flex items-center space-x-1"
                    >
                      <span>View COA</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Order 2: Delivered */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-slate-900">#NT-2024-8841</span>
                      <span className="bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full text-[10px]">
                        Delivered
                      </span>
                    </div>
                    <span className="text-slate-400 text-[11px]">Delivered on Sep 28</span>
                  </div>

                  <div className="flex items-center space-x-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <img
                      src="/images/mb-biozyme.jpg"
                      alt="MuscleBlaze Biozyme"
                      className="w-12 h-12 object-contain bg-white rounded-lg p-1"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        MuscleBlaze Biozyme Performance Whey (1kg)
                      </h4>
                      <p className="text-[11px] text-slate-500 font-mono">
                        Batch #MB-BZ-2024-8841 • 1 item
                      </p>
                    </div>
                    <span className="text-xs font-extrabold text-slate-900">₹2,199</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 text-center">
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Close Orders
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* MODAL 2: BUY AGAIN */}
      {activeModal === 'buy_again' &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 relative my-auto animate-in zoom-in-95 duration-200">
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2.5 mb-5">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center border border-blue-200">
                  <Repeat className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900">Buy Again (Quick Reorder)</h3>
                  <p className="text-xs text-slate-500">Quickly reorder your everyday supplements with 1-click</p>
                </div>
              </div>

              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                {mockProducts.slice(0, 4).map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors bg-white">
                    <div className="flex items-center space-x-3 min-w-0">
                      <img src={p.image} alt={p.name} className="w-12 h-12 object-contain bg-slate-50 rounded-xl p-1 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[11px] uppercase font-bold text-slate-400">{p.brand}</p>
                        <h4 className="text-xs font-bold text-slate-900 truncate max-w-[200px]">{p.name}</h4>
                        <p className="text-xs font-black text-slate-900 mt-0.5">{formatCurrency(p.discountedPrice)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        addToCart(p, 1, true, p.flavor || p.flavors?.[0]);
                      }}
                      className="inline-flex items-center space-x-1.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-2xs active:scale-95 cursor-pointer shrink-0"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Reorder</span>
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 text-center">
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Back to Catalog
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* MODAL 3: REFER & EARN */}
      {activeModal === 'refer' &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 relative my-auto animate-in zoom-in-95 duration-200 text-center">
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-3xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-200 mx-auto mb-4">
                <Gift className="w-8 h-8" />
              </div>

              <h3 className="font-black text-xl text-slate-950">Refer Friends, Get ₹250</h3>
              <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
                Share your invite link. When a friend places their first lab-verified order, both of you earn ₹250 wallet credit.
              </p>

              <div className="mt-5 p-4 bg-purple-50/60 rounded-2xl border border-purple-200 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-900">Your Referral Code</span>
                <div className="flex items-center justify-between bg-white px-3 py-2.5 rounded-xl border border-purple-300">
                  <span className="font-mono font-black text-base tracking-widest text-slate-900">RAHUL250</span>
                  <button
                    onClick={() => handleCopy('RAHUL250')}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-purple-700 hover:text-purple-900 cursor-pointer"
                  >
                    {copiedCode === 'RAHUL250' ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center space-x-6 text-xs text-slate-500">
                <div>
                  <span className="font-black text-base text-slate-900 block">4</span>
                  Friends Joined
                </div>
                <div className="h-6 w-px bg-slate-200"></div>
                <div>
                  <span className="font-black text-base text-purple-700 block">₹1,000</span>
                  Total Earned
                </div>
              </div>

              <div className="mt-6 pt-2">
                <button
                  onClick={() => handleCopy('https://nutritrust.in/invite/RAHUL250')}
                  className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>Share Referral Link</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* MODAL 4: OFFER ZONE */}
      {activeModal === 'offers' &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 relative my-auto animate-in zoom-in-95 duration-200">
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2.5 mb-5">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center border border-rose-200">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900">Offer Zone & Promo Codes</h3>
                  <p className="text-xs text-slate-500">Exclusive discounts on certified authentic nutrition</p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Promo 1 */}
                <div className="p-3.5 rounded-2xl border border-dashed border-rose-300 bg-rose-50/40 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-black tracking-wider text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
                      PURE20
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 mt-1">Extra 20% OFF on Whey Protein</h4>
                    <p className="text-[11px] text-slate-500">Applicable on orders above ₹1,999</p>
                  </div>
                  <button
                    onClick={() => handleCopy('PURE20')}
                    className="px-3 py-1.5 rounded-lg bg-white border border-rose-200 text-rose-700 font-bold text-xs hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                  >
                    {copiedCode === 'PURE20' ? 'Copied' : 'Apply'}
                  </button>
                </div>

                {/* Promo 2 */}
                <div className="p-3.5 rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/40 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-black tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      LABPASS
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 mt-1">Free Next-Day Delivery + ₹150 Off</h4>
                    <p className="text-[11px] text-slate-500">Zero minimum purchase required</p>
                  </div>
                  <button
                    onClick={() => handleCopy('LABPASS')}
                    className="px-3 py-1.5 rounded-lg bg-white border border-emerald-200 text-emerald-800 font-bold text-xs hover:bg-emerald-50 transition-colors cursor-pointer shrink-0"
                  >
                    {copiedCode === 'LABPASS' ? 'Copied' : 'Apply'}
                  </button>
                </div>

                {/* Promo 3 */}
                <div className="p-3.5 rounded-2xl border border-dashed border-blue-300 bg-blue-50/40 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-black tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                      CREATINE99
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 mt-1">Flat ₹100 Off on Creapure</h4>
                    <p className="text-[11px] text-slate-500">Valid on Wellcore Creatine 100g</p>
                  </div>
                  <button
                    onClick={() => handleCopy('CREATINE99')}
                    className="px-3 py-1.5 rounded-lg bg-white border border-blue-200 text-blue-800 font-bold text-xs hover:bg-blue-50 transition-colors cursor-pointer shrink-0"
                  >
                    {copiedCode === 'CREATINE99' ? 'Copied' : 'Apply'}
                  </button>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 text-center">
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Close Offer Zone
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* MODAL 5: HELP & SUPPORT */}
      {activeModal === 'help' &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 relative my-auto animate-in zoom-in-95 duration-200">
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2.5 mb-5">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900">24x7 Customer Support</h3>
                  <p className="text-xs text-slate-500">Clinical nutritionists & logistics support</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="font-bold text-slate-900">How do I verify a batch report?</p>
                  <p className="mt-1 text-slate-600">Every tub arrives with an authentic batch number printed on the neck or bottom. Click "Verify Batch" in the header to view the NABL laboratory report.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="font-bold text-slate-900">WhatsApp Clinical Helpline</p>
                  <p className="mt-1 font-mono font-bold text-emerald-700">+91 99887 76655 (Available 9 AM - 9 PM)</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="font-bold text-slate-900">Support Email</p>
                  <p className="mt-1 font-mono font-bold text-slate-800">care@nutritrust.in</p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 text-center">
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Close Support
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
