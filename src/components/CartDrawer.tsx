import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck
} from 'lucide-react';
import { calculateProteinMetrics } from '../utils/metrics';

export const CartDrawer: React.FC = () => {
  const { 
    isOpen, 
    closeCart, 
    items, 
    updateQuantity, 
    removeFromCart, 
    totalItemsCount, 
    subtotal,
    deliveryFee,
    gstAmount,
    totalPayable,
    totalSavings,
    clearCart,
    openCheckout
  } = useCart();

  // Prevent background page scrolling (overflow-hidden on body) while cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  // Cleanly handle ESC key to trigger exit animation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCart]);

  const FREE_SHIPPING_THRESHOLD = 999;
  const isFreeShipping = deliveryFee === 0 && subtotal > 0;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <div 
      className={`fixed inset-0 z-50 overflow-hidden pointer-events-none transition-visibility duration-300 ${
        isOpen ? 'visible' : 'invisible delay-300'
      }`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop: Animated overlay opacity from opacity-0 to opacity-100 with backdrop-blur-sm (300ms ease-out) */}
      <div 
        className={`absolute inset-0 bg-slate-950/65 backdrop-blur-sm transition-opacity duration-300 ease-out cursor-pointer ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer Panel Container: Fixed on right */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-10 pointer-events-none">
        {/* Drawer Panel: Animate entry and exit with cubic-bezier(0.16,1,0.3,1), translate-x-full to translate-x-0 */}
        <div 
          className={`w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200 transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'
          }`}
        >
          
          {/* Cart Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base leading-tight">
                  Your Delivery Cart
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {totalItemsCount} {totalItemsCount === 1 ? 'supplement' : 'supplements'}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-slate-400 hover:text-rose-600 px-2 py-1 rounded transition-colors cursor-pointer"
                  title="Clear all items"
                >
                  Clear
                </button>
              )}
              <button
                onClick={closeCart}
                className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-200/60 transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Free Shipping Progress Indicator */}
          {items.length > 0 && (
            <div className="bg-emerald-50/70 px-5 py-3 border-b border-emerald-100 text-xs shrink-0">
              <div className="flex items-center justify-between font-semibold text-emerald-950 mb-1.5">
                <span className="flex items-center">
                  <Truck className="w-4 h-4 mr-1 text-emerald-700 shrink-0" />
                  {isFreeShipping
                    ? '🎉 You unlocked Free Express Cold-Chain Delivery!'
                    : `Add ${formatCurrency(amountToFreeShipping)} more for Free Express Delivery`}
                </span>
                <span className="text-emerald-800 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-emerald-200/60 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-700 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-3 text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-800 text-base mb-1">
                  Your cart is empty
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mb-6">
                  Browse our certified supplements and add authenticated nutrition to your delivery.
                </p>
                <button
                  onClick={closeCart}
                  className="bg-emerald-800 hover:bg-emerald-700 text-white font-medium text-xs px-5 py-2.5 rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              items.map(({ product, quantity, selectedBatch, selectedFlavor }) => {
                const metric = calculateProteinMetrics(product);
                const itemTotal = product.discountedPrice * quantity;

                return (
                  <div
                    key={`${product.id}-${selectedFlavor || 'default'}`}
                    className="flex space-x-3 p-3.5 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 transition-colors shadow-2xs group"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-xl bg-slate-50 p-1 flex items-center justify-center shrink-0 border border-slate-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain mix-blend-multiply"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span className="font-bold text-emerald-800 uppercase text-[10px]">
                            {product.brand}
                          </span>
                          <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded">
                            {selectedBatch ? `#${selectedBatch}` : `#${product.batches[0]?.batchNumber || 'CERT'}`}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-xs truncate mt-0.5" title={product.name}>
                          {product.name}
                        </h4>

                        {/* Selected Flavor Display in Muted Subtext */}
                        {selectedFlavor && (
                          <div className="text-[11px] text-slate-500 font-medium mt-0.5 flex items-center space-x-1">
                            <span>Flavor:</span>
                            <span className="font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.2 rounded text-[10px]">
                              {selectedFlavor}
                            </span>
                          </div>
                        )}
                        
                        {metric && (
                          <div className="text-[11px] text-emerald-800 font-semibold mt-0.5">
                            {metric.formattedMetric}
                          </div>
                        )}
                      </div>

                      {/* Controls and Price */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                        {/* Quantity Modifier */}
                        <div className="flex items-center space-x-1.5 bg-slate-50 rounded-lg border border-slate-200 p-0.5">
                          <button
                            onClick={() => updateQuantity(product.id, -1, true, selectedFlavor)}
                            className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-white hover:text-slate-900 transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-slate-900 w-5 text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, 1, true, selectedFlavor)}
                            className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-white hover:text-slate-900 transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Item Total & Remove */}
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-900 text-sm">
                            {formatCurrency(itemTotal)}
                          </span>
                          <button
                            onClick={() => removeFromCart(product.id, selectedFlavor)}
                            className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Cart Footer: Order Summary & Checkout CTA */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3 shrink-0">
              {/* Savings callout */}
              {totalSavings > 0 && (
                <div className="p-2.5 rounded-xl bg-emerald-100/70 border border-emerald-200 text-emerald-950 text-xs flex items-center justify-between font-semibold">
                  <span>Total MRP Discount</span>
                  <span className="font-bold text-emerald-900">
                    -{formatCurrency(totalSavings)}
                  </span>
                </div>
              )}

              {/* Order Breakdown */}
              <div className="space-y-1.5 text-xs">
                {/* 1. Item Subtotal */}
                <div className="flex justify-between text-slate-600">
                  <span>Item Subtotal ({totalItemsCount} items)</span>
                  <span className="font-semibold text-slate-900">
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                {/* 2. Delivery Fee */}
                <div className="flex justify-between text-slate-600">
                  <div className="flex items-center space-x-1">
                    <span>Express Delivery</span>
                    {isFreeShipping && (
                      <span className="text-[10px] text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded font-bold">
                        Orders &gt; ₹999
                      </span>
                    )}
                  </div>
                  <span className={isFreeShipping ? 'text-emerald-800 font-bold' : 'font-semibold text-slate-800'}>
                    {isFreeShipping ? 'FREE' : formatCurrency(deliveryFee)}
                  </span>
                </div>

                {/* 3. Estimated GST Breakdown (18%) */}
                <div className="flex justify-between text-slate-500">
                  <span className="flex items-center">
                    <span>Estimated GST (18%)</span>
                    <span className="text-[10px] text-slate-400 ml-1">(Included in price)</span>
                  </span>
                  <span>{formatCurrency(gstAmount)}</span>
                </div>

                {/* 4. Total Payable Amount */}
                <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Payable</span>
                  <span className="text-emerald-800 text-lg">
                    {formatCurrency(totalPayable)}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                onClick={openCheckout}
                className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md shadow-emerald-900/10 flex items-center justify-center space-x-2 transition-all active:scale-[0.99] text-sm cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-500 pt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>100% Genuine Sealed Goods & Batch Lab Tested</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
