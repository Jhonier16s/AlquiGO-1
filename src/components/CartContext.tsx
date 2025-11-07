import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Seller {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  verifiedSeller: boolean;
  memberSince: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  seller: Seller;
  availableForRent: boolean;
  availableForSale: boolean;
  condition: 'new' | 'excellent' | 'good' | 'fair';
  location: string;
}

export interface CartItem extends Product {
  quantity: number;
  isRental: boolean;
  rentalDuration?: number; // days
  rentalPrice?: number; // price per day
  totalRentalPrice?: number; // total price for the entire rental period
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, isRental?: boolean, rentalDuration?: number, rentalUnit?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateRentalDuration: (productId: string, duration: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, isRental: boolean = false, rentalDuration: number = 1, rentalUnit: string = 'days') => {
    setItems(currentItems => {
      const itemKey = `${product.id}-${isRental ? 'rental' : 'sale'}`;
      const existingItem = currentItems.find(item => 
        item.id === product.id && item.isRental === isRental
      );
      
      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id && item.isRental === isRental
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      // Calculate rental price based on unit
      let dailyRate = product.price * 0.1; // 10% of sale price per day
      
      // Adjust rate based on unit
      switch (rentalUnit) {
        case 'hours':
          dailyRate = dailyRate / 8; // Assuming 8 hours per day
          break;
        case 'weeks':
          dailyRate = dailyRate * 6; // Discount for weekly rental
          break;
        case 'months':
          dailyRate = dailyRate * 25; // Bigger discount for monthly rental
          break;
        default: // days
          break;
      }
      
      const rentalPrice = isRental ? dailyRate : undefined;
      const totalRentalPrice = isRental ? dailyRate * rentalDuration : undefined;
      
      return [...currentItems, { 
        ...product, 
        quantity: 1, 
        isRental,
        rentalDuration: isRental ? rentalDuration : undefined,
        rentalPrice,
        totalRentalPrice
      }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== productId));
  };

  const updateRentalDuration = (productId: string, duration: number) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === productId && item.isRental
          ? { ...item, rentalDuration: duration }
          : item
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      if (item.isRental && item.totalRentalPrice) {
        return total + (item.totalRentalPrice * item.quantity);
      }
      return total + (item.price * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      updateRentalDuration,
      clearCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}