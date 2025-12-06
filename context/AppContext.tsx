import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Pet, Product, CartItem, Order, ShopItem, Booking } from '../types';

interface AppContextType {
  pets: Pet[];
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  bookings: Booking[];
  isAdmin: boolean;
  addToCart: (item: ShopItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, qty: number) => void;
  clearCart: () => void;
  placeOrder: (customerDetails: { name: string; email: string }) => void;
  addBooking: (booking: Booking) => void;
  toggleAdmin: (status?: boolean) => void;
  addPet: (pet: Pet) => void;
  addProduct: (product: Product) => void;
  updatePetStatus: (id: string, status: 'available' | 'sold') => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  deleteItem: (id: string, type: 'pet' | 'product') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock Data
const INITIAL_PETS: Pet[] = [
  { id: 'p1', name: 'Buddy', type: 'pet', category: 'dog', breed: 'Golden Retriever', age: '3 months', gender: 'Male', price: 1200, status: 'available', image: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?q=80&w=600&auto=format&fit=crop', description: 'Friendly and energetic puppy looking for a loving home.', vaccinationStatus: 'First shot done' },
  { id: 'p2', name: 'Luna', type: 'pet', category: 'cat', breed: 'Siamese', age: '1 year', gender: 'Female', price: 400, status: 'available', image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?q=80&w=600&auto=format&fit=crop', description: 'Calm and affectionate.', vaccinationStatus: 'Fully vaccinated' },
  { id: 'p3', name: 'Nemo', type: 'pet', category: 'fish', breed: 'Clownfish', age: '6 months', gender: 'Male', price: 25, status: 'available', image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=600&auto=format&fit=crop', description: 'Vibrant colors, perfect for saltwater tanks.' },
];

const INITIAL_PRODUCTS: Product[] = [
  { id: 'pr1', name: 'Premium Dog Food', type: 'product', category: 'food', price: 45, stock: 50, image: 'https://images.unsplash.com/photo-1589924691195-41432c84c161?q=80&w=600&auto=format&fit=crop', description: 'High protein formula for active dogs.' },
  { id: 'pr2', name: 'Cat Scratch Post', type: 'product', category: 'accessory', price: 30, stock: 20, image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?q=80&w=600&auto=format&fit=crop', description: 'Durable sisal rope scratcher.' },
  { id: 'pr3', name: 'Fish Tank Filter', type: 'product', category: 'accessory', price: 15, stock: 15, image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=600&auto=format&fit=crop', description: 'Quiet and efficient water filtration.' },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pets, setPets] = useState<Pet[]>(INITIAL_PETS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Persistence simulation
  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) setOrders(JSON.parse(storedOrders));
    
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) setBookings(JSON.parse(storedBookings));
  }, []);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);
  
  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addToCart = (item: ShopItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.item.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, qty: number) => {
    setCart(prev => prev.map(i => i.item.id === itemId ? { ...i, quantity: qty } : i).filter(i => i.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const placeOrder = (customerDetails: { name: string; email: string }) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      customerName: customerDetails.name,
      email: customerDetails.email,
      items: [...cart],
      total: cart.reduce((sum, i) => sum + (i.item.price * i.quantity), 0),
      status: 'pending',
      date: new Date().toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);
    
    // Auto-mark pets as sold if purchased
    cart.forEach(cartItem => {
      if (cartItem.item.type === 'pet') {
        updatePetStatus(cartItem.item.id, 'sold');
      }
    });

    clearCart();
  };

  const addBooking = (booking: Booking) => {
    setBookings(prev => [booking, ...prev]);
  };

  const toggleAdmin = (status?: boolean) => setIsAdmin(prev => status !== undefined ? status : !prev);

  const addPet = (pet: Pet) => setPets(prev => [...prev, pet]);
  const addProduct = (product: Product) => setProducts(prev => [...prev, product]);

  const updatePetStatus = (id: string, status: 'available' | 'sold') => {
    setPets(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const deleteItem = (id: string, type: 'pet' | 'product') => {
    if (type === 'pet') setPets(prev => prev.filter(p => p.id !== id));
    else setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <AppContext.Provider value={{
      pets, products, cart, orders, bookings, isAdmin,
      addToCart, removeFromCart, updateCartQuantity, clearCart, placeOrder, addBooking,
      toggleAdmin, addPet, addProduct, updatePetStatus, updateOrderStatus, updateBookingStatus, deleteItem
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};