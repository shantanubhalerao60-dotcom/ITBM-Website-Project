import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';
import type { DeliveryAddress, PaymentMethod, PlacedOrder, CheckoutStep } from '../types/checkout';
import { 
  X, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  Smartphone, 
  Banknote, 
  Download, 
  Loader2, 
  Building2, 
  Phone, 
  User, 
  Award,
  PackageCheck
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    closeCheckout, 
    items, 
    subtotal, 
    deliveryFee, 
    gstAmount, 
    totalPayable, 
    clearCart 
  } = useCart();

  const [step, setStep] = useState<CheckoutStep>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('Verifying batch inventory & cold chain...');
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  // Address Form State
  const [address, setAddress] = useState<DeliveryAddress>({
    fullName: '',
    phoneNumber: '',
    streetAddress: '',
    city: '',
    state: 'Karnataka',
    pinCode: '',
  });

  const [addressErrors, setAddressErrors] = useState<Record<string, string>>({});

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('rohit.verma@oksbi');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8891');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('•••');
  const [cardName, setCardName] = useState('Rohit Verma');

  // Two-phase mount/animate state for smooth entry & exit transitions
  const [isRendered, setIsRendered] = useState(isCheckoutOpen);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  useEffect(() => {
    if (isCheckoutOpen) {
      setIsRendered(true);
      document.body.classList.add('overflow-hidden');
      const timer = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimatingIn(true);
        });
      });
      return () => cancelAnimationFrame(timer);
    } else {
      setIsAnimatingIn(false);
      const timeout = setTimeout(() => {
        setIsRendered(false);
      }, 250);
      document.body.classList.remove('overflow-hidden');
      return () => clearTimeout(timeout);
    }
  }, [isCheckoutOpen]);

  useEffect(() => {
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCheckoutOpen && !isProcessing) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCheckoutOpen, isProcessing]);

  if (!isRendered) return null;

  const handleFillSampleAddress = () => {
    setAddress({
      fullName: 'Rohit Verma',
      phoneNumber: '9876543210',
      streetAddress: 'Flat 402, Green Glen Layout, Bellandur Outer Ring Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560103',
      landmark: 'Near Ecospace Business Park',
    });
    setAddressErrors({});
  };

  const validateAddress = (): boolean => {
    const errors: Record<string, string> = {};
    if (!address.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!address.phoneNumber.trim() || !/^\d{10}$/.test(address.phoneNumber.trim())) {
      errors.phoneNumber = 'Enter a valid 10-digit mobile number';
    }
    if (!address.streetAddress.trim()) errors.streetAddress = 'Address is required';
    if (!address.city.trim()) errors.city = 'City is required';
    if (!address.pinCode.trim() || !/^\d{6}$/.test(address.pinCode.trim())) {
      errors.pinCode = 'Enter a valid 6-digit PIN code';
    }

    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAddress()) {
      setStep(2);
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setProcessingStatus('Securing inventory and validating NABL batch seals...');

    setTimeout(() => {
      setProcessingStatus('Encrypting payment token and generating Authenticity Guarantee...');
    }, 700);

    setTimeout(() => {
      const orderId = `NT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      const certId = `AUTH-NABL-${Math.floor(100000 + Math.random() * 900000)}`;
      const trackId = `TRK-${Math.floor(1000000 + Math.random() * 9000000)}`;

      const newOrder: PlacedOrder = {
        orderId,
        placedAt: new Date().toISOString(),
        deliveryAddress: address,
        paymentMethod,
        items: [...items],
        pricing: {
          subtotal,
          deliveryFee,
          gstAmount,
          totalPayable,
          totalSavings: 0,
        },
        estimatedDeliveryTime: 'Today in 120 minutes (Express Delivery)',
        authenticityCertificateId: certId,
        trackingNumber: trackId,
      };

      setPlacedOrder(newOrder);
      setIsProcessing(false);
      setStep(3);
      clearCart();
    }, 1500);
  };

  const handleClose = () => {
    if (step === 3) {
      setStep(1);
      setPlacedOrder(null);
    }
    closeCheckout();
  };

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto flex items-center justify-center p-3 sm:p-5">
      {/* Backdrop: GPU-accelerated opacity transition (200ms ease-out) */}
      <div 
        className={`fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity duration-200 ease-out cursor-pointer ${
          isAnimatingIn ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Dialog Box: Spring/Scale transition (250ms ease-out) */}
      <div 
        className={`relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] z-10 transform transition-all duration-250 ease-out ${
          isAnimatingIn 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-2'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white">
                {step === 3 ? 'Order Confirmed' : 'Express Checkout'}
              </h2>
              <span className="text-xs text-slate-400">
                {step === 1 && 'Step 1 of 2: Shipping Destination'}
                {step === 2 && 'Step 2 of 2: Payment & Order Review'}
                {step === 3 && 'Guaranteed Batch Authenticity'}
              </span>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (Steps 1 & 2) */}
        {step < 3 && (
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between text-xs shrink-0">
            <div className="flex items-center space-x-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                step === 1 ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-800'
              }`}>
                1
              </span>
              <span className={`font-semibold ${step === 1 ? 'text-slate-900' : 'text-slate-500'}`}>
                Delivery Address
              </span>
            </div>

            <div className="h-0.5 flex-1 mx-4 bg-slate-200">
              <div className={`h-full bg-emerald-600 transition-all duration-300 ${
                step === 2 ? 'w-full' : 'w-0'
              }`} />
            </div>

            <div className="flex items-center space-x-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                step === 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                2
              </span>
              <span className={`font-semibold ${step === 2 ? 'text-slate-900' : 'text-slate-500'}`}>
                Payment & Review
              </span>
            </div>
          </div>
        )}

        {/* Modal Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          
          {/* STEP 1: DELIVERY ADDRESS */}
          {step === 1 && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                  Delivery Details
                </span>
                <button
                  type="button"
                  onClick={handleFillSampleAddress}
                  className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors"
                >
                  ⚡ Autofill Demo Address
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                    <input
                      type="text"
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      placeholder="e.g. Rohit Verma"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  {addressErrors.fullName && (
                    <span className="text-[11px] text-rose-600 mt-0.5 block">{addressErrors.fullName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Phone Number (10 digits) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                    <input
                      type="tel"
                      value={address.phoneNumber}
                      onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                      placeholder="e.g. 9876543210"
                      maxLength={10}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  {addressErrors.phoneNumber && (
                    <span className="text-[11px] text-rose-600 mt-0.5 block">{addressErrors.phoneNumber}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Street Address & Flat / House No. <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    value={address.streetAddress}
                    onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
                    placeholder="e.g. 402, Green Glen Layout, Outer Ring Road"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                {addressErrors.streetAddress && (
                  <span className="text-[11px] text-rose-600 mt-0.5 block">{addressErrors.streetAddress}</span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    PIN Code <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={address.pinCode}
                    onChange={(e) => setAddress({ ...address, pinCode: e.target.value })}
                    placeholder="e.g. 560103"
                    maxLength={6}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono"
                  />
                  {addressErrors.pinCode && (
                    <span className="text-[11px] text-rose-600 mt-0.5 block">{addressErrors.pinCode}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    City <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    placeholder="e.g. Bengaluru"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                  {addressErrors.city && (
                    <span className="text-[11px] text-rose-600 mt-0.5 block">{addressErrors.city}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    placeholder="e.g. Karnataka"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Express Delivery Note */}
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3.5 flex items-center space-x-3 text-xs">
                <Truck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-slate-700">
                  <span className="font-bold text-emerald-950 block">Cold-Chain Express Delivery Enabled</span>
                  Your supplements are dispatched in temperature-regulated tamper-proof boxes within 2 hours.
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 text-sm cursor-pointer"
                >
                  <span>Continue to Payment Method</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD SELECTION & REVIEW */}
          {step === 2 && !isProcessing && (
            <div className="space-y-5">
              
              {/* Payment Methods */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2.5">
                  Select Payment Method:
                </span>

                <div className="space-y-2.5">
                  {/* Option 1: Mock UPI */}
                  <label className={`block border rounded-2xl p-3.5 cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'upi'}
                          onChange={() => setPaymentMethod('upi')}
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                        />
                        <div className="flex items-center space-x-2">
                          <Smartphone className="w-4 h-4 text-emerald-600" />
                          <span className="font-bold text-xs sm:text-sm text-slate-900">
                            Instant UPI (GPay / PhonePe / Paytm / BHIM)
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                        Fastest (0% Fee)
                      </span>
                    </div>

                    {paymentMethod === 'upi' && (
                      <div className="mt-3 pt-3 border-t border-emerald-100/80 text-xs space-y-2 animate-in fade-in">
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="username@upi"
                            className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 flex-1 focus:ring-1 focus:ring-emerald-500"
                          />
                          <span className="text-[11px] text-emerald-700 font-semibold flex items-center">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Verified
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          A payment request will be simulated to your UPI handle upon placing the order.
                        </p>
                      </div>
                    )}
                  </label>

                  {/* Option 2: Credit / Debit Card */}
                  <label className={`block border rounded-2xl p-3.5 cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                        />
                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-4 h-4 text-slate-700" />
                          <span className="font-bold text-xs sm:text-sm text-slate-900">
                            Credit / Debit Card (Visa, MasterCard, RuPay)
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded">
                        256-Bit Encrypted
                      </span>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="mt-3 pt-3 border-t border-emerald-100/80 text-xs space-y-2.5 animate-in fade-in">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="col-span-2">
                            <input
                              type="text"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              placeholder="Cardholder Name"
                              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900"
                            />
                          </div>
                          <div className="col-span-2">
                            <input
                              type="text"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              placeholder="Card Number (16 Digits)"
                              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-mono"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="MM/YY"
                              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-mono"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              placeholder="CVV"
                              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </label>

                  {/* Option 3: Cash on Delivery */}
                  <label className={`block border rounded-2xl p-3.5 cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                        />
                        <div className="flex items-center space-x-2">
                          <Banknote className="w-4 h-4 text-emerald-700" />
                          <span className="font-bold text-xs sm:text-sm text-slate-900">
                            Cash / Pay on Delivery (OTP Verified)
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded">
                        Available
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Summary Recap */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-2">
                <span className="font-bold text-slate-900 block pb-1 border-b border-slate-200 uppercase text-[11px] tracking-wider">
                  Payment Summary
                </span>
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({items.length} unique items)</span>
                  <span className="font-semibold text-slate-800">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Cold-Chain Express Delivery</span>
                  <span className={deliveryFee === 0 ? 'text-emerald-700 font-bold' : 'font-semibold text-slate-800'}>
                    {deliveryFee === 0 ? 'FREE' : formatCurrency(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Estimated 18% GST</span>
                  <span>{formatCurrency(gstAmount)}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-1.5 border-t border-slate-200">
                  <span>Total Payable</span>
                  <span className="text-emerald-800 text-base">{formatCurrency(totalPayable)}</span>
                </div>
              </div>

              {/* Destination Address Snippet */}
              <div className="bg-white border border-slate-200 rounded-xl p-3 text-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Delivering To:</span>
                  <span className="font-bold text-slate-800">{address.fullName} ({address.phoneNumber})</span>
                  <p className="text-slate-500 truncate max-w-sm mt-0.5">{address.streetAddress}, {address.city} - {address.pinCode}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-emerald-700 hover:underline font-semibold"
                >
                  Edit
                </button>
              </div>

              {/* Navigation Actions */}
              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 px-4 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 text-sm cursor-pointer"
                >
                  <span>Place Order • {formatCurrency(totalPayable)}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 LOADING: Processing Spinner */}
          {isProcessing && (
            <div className="py-16 px-4 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-inner animate-spin">
                <Loader2 className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Authorizing Express Supplement Order
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto animate-pulse">
                {processingStatus}
              </p>
            </div>
          )}

          {/* STEP 3 SUCCESS: ORDER CONFIRMATION & AUTHENTICITY GUARANTEE SLIP */}
          {step === 3 && placedOrder && !isProcessing && (
            <div className="space-y-6 animate-in zoom-in-95 duration-300">
              
              {/* Success Hero Header */}
              <div className="text-center bg-gradient-to-b from-emerald-50 via-teal-50/40 to-white p-6 rounded-2xl border border-emerald-200">
                <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-600/30">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  Payment Confirmed • Order #{placedOrder.orderId}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  Supplement Order Placed Successfully!
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                  Your batch-authenticated supplements are being packed in our temperature-controlled cold hub.
                </p>
              </div>

              {/* Delivery Timeline Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 flex items-center">
                    <Clock className="w-4 h-4 text-emerald-600 mr-1.5" />
                    Delivery Timeline
                  </span>
                  <span className="font-mono text-slate-500">
                    AWB: {placedOrder.trackingNumber}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-sm font-extrabold text-emerald-800 bg-emerald-100/60 p-2.5 rounded-xl border border-emerald-200">
                  <Truck className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>{placedOrder.estimatedDeliveryTime}</span>
                </div>

                {/* Tracking Progress */}
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold text-slate-500 pt-1">
                  <div className="text-emerald-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block mr-1"></span>
                    Order Placed
                  </div>
                  <div className="text-emerald-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block mr-1"></span>
                    Batch Inspected
                  </div>
                  <div className="text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-slate-300 inline-block mr-1"></span>
                    Out for Delivery
                  </div>
                </div>
              </div>

              {/* AUTHENTICITY GUARANTEE SLIP SUMMARY */}
              <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-xs">
                  AUTHENTICITY SLIP
                </div>

                <div className="flex items-start space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      Clinical Authenticity & Quality Slip
                    </h4>
                    <span className="text-[11px] font-mono text-emerald-800 block">
                      Certificate ID: {placedOrder.authenticityCertificateId}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-700 border-t border-slate-100 pt-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Every batch item in this order has been validated against active NABL laboratory analytical certificates.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Tamper-proof security RFID seal applied. Do not accept if seal is breached.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>100% Genuine Direct-from-Manufacturer Sourcing Guarantee.</span>
                  </div>
                </div>
              </div>

              {/* Item Summary Breakdown */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-3">
                <span className="font-bold text-slate-900 text-xs block uppercase tracking-wider">
                  Ordered Items ({placedOrder.items.length})
                </span>

                <div className="space-y-2">
                  {placedOrder.items.map(({ product, quantity, selectedBatch, selectedFlavor }) => (
                    <div key={`${product.id}-${selectedFlavor || 'default'}`} className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-slate-200">
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <img src={product.image} alt={product.name} className="w-10 h-10 object-contain mix-blend-multiply shrink-0" />
                        <div className="min-w-0">
                          <span className="font-bold text-slate-900 block truncate">{product.name}</span>
                          {selectedFlavor && (
                            <span className="text-slate-600 text-[11px] font-semibold block">
                              Flavor: {selectedFlavor}
                            </span>
                          )}
                          <span className="text-slate-400 text-[11px]">
                            Qty: {quantity} • Batch: #{selectedBatch || product.batches[0]?.batchNumber}
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900 shrink-0 ml-2">
                        {formatCurrency(product.discountedPrice * quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between text-xs font-bold text-slate-800">
                  <span>Total Amount Paid</span>
                  <span className="text-emerald-800 text-sm font-extrabold">{formatCurrency(placedOrder.pricing.totalPayable)}</span>
                </div>
              </div>

              {/* Actions: Download Invoice & Continue Shopping */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={() => alert(`Downloaded Official Tax Invoice and Authenticity Certificate for Order #${placedOrder.orderId}.`)}
                  className="w-full sm:w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors border border-slate-200 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-slate-600" />
                  <span>Download Invoice & CoA</span>
                </button>

                <button
                  onClick={handleClose}
                  className="w-full sm:w-1/2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <PackageCheck className="w-4 h-4 text-emerald-400" />
                  <span>Continue Shopping</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
