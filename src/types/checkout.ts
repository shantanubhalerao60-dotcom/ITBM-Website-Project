import type { CartItem } from './cart';

export type PaymentMethod = 'upi' | 'card' | 'cod';

export interface DeliveryAddress {
  fullName: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  pinCode: string;
  landmark?: string;
}

export interface OrderPricingBreakdown {
  subtotal: number;
  deliveryFee: number;
  gstAmount: number; // 18% GST
  totalPayable: number;
  totalSavings: number;
}

export interface PlacedOrder {
  orderId: string;
  placedAt: string;
  deliveryAddress: DeliveryAddress;
  paymentMethod: PaymentMethod;
  items: CartItem[];
  pricing: OrderPricingBreakdown;
  estimatedDeliveryTime: string;
  authenticityCertificateId: string;
  trackingNumber: string;
}

export type CheckoutStep = 1 | 2 | 3; // 1: Address, 2: Payment, 3: Processing/Confirmation
