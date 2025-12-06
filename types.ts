export type Category = 'dog' | 'cat' | 'bird' | 'fish' | 'small_pet' | 'food' | 'accessory';

export interface Pet {
  id: string;
  name: string;
  type: 'pet';
  category: Category;
  breed: string;
  age: string;
  gender: 'Male' | 'Female';
  price: number;
  image: string;
  description: string;
  status: 'available' | 'sold';
  vaccinationStatus?: string;
}

export interface Product {
  id: string;
  name: string;
  type: 'product';
  category: Category;
  price: number;
  image: string;
  description: string;
  stock: number;
  brand?: string;
}

export type ShopItem = Pet | Product;

export interface CartItem {
  item: ShopItem;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  email: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
