import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Product } from '../types/product';
import type { CartItem, CartToast, CartContextType } from '../types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'nutritrust_cart_v2';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toasts, setToasts] = useState<CartToast[]>([]);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage quota errors
    }
  }, [items]);

  const addToast = useCallback((type: CartToast['type'], message: string, productName?: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newToast: CartToast = { id, type, message, productName };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const openCheckout = () => {
    setIsOpen(false);
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const addToCart = (product: Product, quantity = 1, openDrawer = true, flavor?: string) => {
    const chosenFlavor = flavor || product.flavor || product.flavors?.[0];
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && (!chosenFlavor || item.selectedFlavor === chosenFlavor)
      );
      if (existingIndex > -1) {
        const next = [...prevItems];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [
        ...prevItems,
        {
          product,
          quantity,
          selectedBatch: product.batches[0]?.batchNumber,
          selectedFlavor: chosenFlavor,
        },
      ];
    });

    addToast(
      'add',
      `Added to cart`,
      chosenFlavor ? `${product.name} (${chosenFlavor})` : product.name
    );

    if (openDrawer) {
      setIsOpen(true);
    }
  };

  const removeFromCart = (productId: string, flavor?: string) => {
    const itemToRemove = items.find(
      (i) => i.product.id === productId && (!flavor || i.selectedFlavor === flavor)
    );
    setItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && (!flavor || item.selectedFlavor === flavor))
      )
    );
    addToast('remove', `Removed from cart`, itemToRemove?.product.name);
  };

  const updateQuantity = (
    productId: string,
    quantityOrDelta: number,
    isDelta = false,
    flavor?: string
  ) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === productId && (!flavor || i.selectedFlavor === flavor)
      );
      if (!existing) return prev;

      const targetQuantity = isDelta ? existing.quantity + quantityOrDelta : quantityOrDelta;

      if (targetQuantity <= 0) {
        addToast('remove', `Removed from cart`, existing.product.name);
        return prev.filter(
          (item) => !(item.product.id === productId && (!flavor || item.selectedFlavor === flavor))
        );
      }

      addToast('update', `Quantity updated to ${targetQuantity}`, existing.product.name);
      return prev.map((item) =>
        item.product.id === productId && (!flavor || item.selectedFlavor === flavor)
          ? { ...item, quantity: targetQuantity }
          : item
      );
    });
  };

  const clearCart = () => {
    setItems([]);
    addToast('clear', `Cart cleared`);
  };

  // Calculations
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.discountedPrice * item.quantity,
    0
  );

  const mrpTotal = items.reduce(
    (sum, item) => sum + item.product.mrp * item.quantity,
    0
  );

  const totalSavings = Math.max(0, mrpTotal - subtotal);

  // Delivery: Free if order > ₹999, else ₹99 (₹0 if cart is empty)
  const deliveryFee = subtotal >= 999 || subtotal === 0 ? 0 : 99;

  // Estimated GST breakdown (18% GST portion)
  const gstAmount = Math.round(subtotal * 0.18);

  // Total payable amount
  const totalPayable = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        subtotal,
        totalAmount: subtotal,
        mrpTotal,
        totalSavings,
        deliveryFee,
        gstAmount,
        totalPayable,
        toasts,
        removeToast,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
