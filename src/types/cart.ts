import type { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedBatch?: string;
  selectedFlavor?: string;
}

export interface CartToast {
  id: string;
  type: 'add' | 'remove' | 'update' | 'clear' | 'info';
  message: string;
  productName?: string;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, quantity?: number, openDrawer?: boolean, flavor?: string) => void;
  removeFromCart: (productId: string, flavor?: string) => void;
  updateQuantity: (productId: string, quantityOrDelta: number, isDelta?: boolean, flavor?: string) => void;
  clearCart: () => void;
  // Computed values
  totalItemsCount: number;
  subtotal: number;
  totalAmount: number; // alias for subtotal
  mrpTotal: number;
  totalSavings: number;
  deliveryFee: number;
  gstAmount: number; // 18% GST calculation
  totalPayable: number;
  // Toasts
  toasts: CartToast[];
  removeToast: (id: string) => void;
  // Checkout trigger
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
}
