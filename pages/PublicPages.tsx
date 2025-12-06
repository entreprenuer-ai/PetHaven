import React, { useState, useMemo } from 'react';
import { Link, useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Heart, Filter, Star, Check, AlertCircle, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Category, ShopItem, Pet, Product } from '../types';

// --- Components ---

const Hero = () => (
  <div className="relative bg-teal-900 h-[500px] overflow-hidden">
    <img 
      src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=2000" 
      alt="Hero" 
      className="absolute inset-0 w-full h-full object-cover opacity-40"
    />
    <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
      <div className="max-w-xl text-white">
        <h1 className="text-5xl font-bold mb-6 leading-tight">Find Your New Best Friend</h1>
        <p className="text-xl mb-8 text-teal-50">Browse hundreds of lovable pets or find the perfect supplies for your current companion.</p>
        <div className="flex gap-4">
          <Link to="/shop?type=pet" className="bg-amber-50 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-semibold transition flex items-center gap-2">
            Adopt a Pet <ArrowRight size={18} />
          </Link>
          <Link to="/shop?type=product" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-3 rounded-full font-semibold transition border border-white/30">
            Shop Supplies
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const ItemCard: React.FC<{ item: ShopItem }> = ({ item }) => {
  const isPet = item.type === 'pet';
  const petItem = item as Pet;
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/details/${item.type}/${item.id}`)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <div className="relative aspect-square overflow-hidden">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
        {isPet && petItem.status === 'sold' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-1 font-bold transform -rotate-12 rounded shadow-lg">ADOPTED</span>
          </div>
        )}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
          <button className="bg-white p-2 rounded-full shadow-md text-gray-400 hover:text-red-500 hover:scale-110 transition">
            <Heart size={18} />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
            <p className="text-gray-500 text-sm capitalize">{item.category}</p>
          </div>
          <span className="font-bold text-teal-600">${item.price}</span>
        </div>
        {isPet ? (
          <div className="flex gap-2 text-xs text-gray-500 mb-3">
            <span className="bg-gray-100 px-2 py-1 rounded-md">{petItem.breed}</span>
            <span className="bg-gray-100 px-2 py-1 rounded-md">{petItem.age}</span>
          </div>
        ) : (
          <p className="text-xs text-gray-400 mb-3 line-clamp-2">{item.description}</p>
        )}
        <button className="w-full mt-2 py-2 rounded-lg border border-teal-600 text-teal-600 font-medium hover:bg-teal-50 transition text-sm">
          View Details
        </button>
      </div>
    </div>
  );
};

// --- Pages ---

export const Home = () => {
  const { pets, products } = useApp();
  const featuredPets = pets.filter(p => p.status === 'available').slice(0, 4);

  return (
    <div>
      <Hero />
      
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
            <p className="text-gray-500 mt-2">Meet the latest additions to our family</p>
          </div>
          <Link to="/shop?type=pet" className="text-teal-600 font-semibold hover:text-teal-700 flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPets.map(pet => <ItemCard key={pet.id} item={pet} />)}
        </div>
      </section>

      <section className="bg-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Dogs', icon: '🐶', type: 'pet', cat: 'dog' },
              { label: 'Cats', icon: '🐱', type: 'pet', cat: 'cat' },
              { label: 'Fish', icon: '🐠', type: 'pet', cat: 'fish' },
              { label: 'Food', icon: '🍖', type: 'product', cat: 'food' },
            ].map((c, i) => (
              <Link 
                key={i} 
                to={`/shop?type=${c.type}&category=${c.cat}`}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center group border border-amber-100"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition duration-300 inline-block">{c.icon}</div>
                <h3 className="font-semibold text-gray-900">{c.label}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export const Shop = () => {
  const [searchParams] = useSearchParams();
  const { pets, products } = useApp();
  
  const typeFilter = searchParams.get('type') as 'pet' | 'product' || 'pet';
  const categoryFilter = searchParams.get('category');

  const items = typeFilter === 'pet' ? pets : products;

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      if (categoryFilter && item.category !== categoryFilter) return false;
      return true;
    });
  }, [items, categoryFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 capitalize">{typeFilter === 'pet' ? 'Find a Pet' : 'Pet Supplies'}</h1>
          <p className="text-gray-500 mt-1">
            {filteredItems.length} results found
            {categoryFilter && <span className="font-medium text-teal-600 ml-1">in {categoryFilter}</span>}
          </p>
        </div>
        <div className="flex gap-2">
          <Link to={`/shop?type=pet`} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${typeFilter === 'pet' ? 'bg-teal-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>Pets</Link>
          <Link to={`/shop?type=product`} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${typeFilter === 'product' ? 'bg-teal-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>Products</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1 space-y-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Filter size={18} /> Filters</h3>
            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Category</p>
              {['dog', 'cat', 'bird', 'fish'].map(c => (
                 <Link key={c} to={`/shop?type=pet&category=${c}`} className="block text-sm text-gray-600 hover:text-teal-600 py-1 capitalize">
                   {c}s
                 </Link>
              ))}
              <div className="border-t border-gray-100 my-2"></div>
              {['food', 'accessory'].map(c => (
                 <Link key={c} to={`/shop?type=product&category=${c}`} className="block text-sm text-gray-600 hover:text-teal-600 py-1 capitalize">
                   {c}
                 </Link>
              ))}
            </div>
          </div>
        </aside>

        <main className="md:col-span-3">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => <ItemCard key={item.id} item={item} />)}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-xl">
              <p className="text-gray-500">No items found in this category.</p>
              <Link to="/shop" className="text-teal-600 hover:underline mt-2 inline-block">Clear Filters</Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export const ItemDetails = () => {
  const { type, id } = useParams();
  const { pets, products, addToCart } = useApp();
  const navigate = useNavigate();

  const item = type === 'pet' 
    ? pets.find(p => p.id === id) 
    : products.find(p => p.id === id);

  if (!item) return <div className="p-20 text-center">Item not found</div>;

  const isPet = item.type === 'pet';
  const pet = item as Pet;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-teal-600 mb-6 flex items-center gap-1">← Back</button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-white">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover max-h-[500px]" />
        </div>
        
        <div>
          <div className="flex justify-between items-start">
            <div>
               <h1 className="text-4xl font-bold text-gray-900 mb-2">{item.name}</h1>
               <p className="text-xl text-gray-500 capitalize">{item.category} {isPet && `• ${pet.breed}`}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-teal-600">${item.price}</p>
              {isPet && pet.status === 'sold' && <span className="text-red-500 font-bold uppercase text-sm">Adopted</span>}
            </div>
          </div>

          <div className="border-t border-gray-100 my-6"></div>

          <div className="prose text-gray-600 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
            <p>{item.description}</p>
            
            {isPet && (
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                  <span className="block text-xs text-amber-600 font-bold uppercase">Age</span>
                  <span className="font-medium">{pet.age}</span>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                   <span className="block text-xs text-amber-600 font-bold uppercase">Gender</span>
                   <span className="font-medium">{pet.gender}</span>
                </div>
                <div className="col-span-2 bg-green-50 p-3 rounded-lg border border-green-100 flex items-center gap-2">
                   <Check size={16} className="text-green-600" />
                   <span className="text-sm text-green-800 font-medium">Vaccination: {pet.vaccinationStatus || 'Up to date'}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            {(!isPet || pet.status === 'available') ? (
              <button 
                onClick={() => { addToCart(item); navigate('/cart'); }}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition transform active:scale-95"
              >
                {isPet ? 'Start Adoption Process' : 'Add to Cart'}
              </button>
            ) : (
              <button disabled className="flex-1 bg-gray-200 text-gray-500 py-4 rounded-xl font-bold cursor-not-allowed">
                Currently Unavailable
              </button>
            )}
            <button className="p-4 rounded-xl border-2 border-gray-200 text-gray-400 hover:border-red-500 hover:text-red-500 transition">
              <Heart />
            </button>
          </div>
          
          <div className="mt-6 flex items-start gap-3 bg-blue-50 p-4 rounded-xl text-blue-800 text-sm">
             <AlertCircle size={20} className="shrink-0 mt-0.5" />
             <p>Have questions about {item.name}? Use the AI Assistant in the bottom right corner to ask specific questions about this {isPet ? pet.breed : 'product'}!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity, placeOrder } = useApp();
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [details, setDetails] = useState({ name: '', email: '', address: '' });
  
  const total = cart.reduce((acc, curr) => acc + (curr.item.price * curr.quantity), 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrder(details);
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="max-w-md mx-auto py-20 text-center px-4">
        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={40} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Placed!</h2>
        <p className="text-gray-500 mb-8">Thank you, {details.name}. We have sent the confirmation to {details.email}.</p>
        <Link to="/" className="bg-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-700">Continue Shopping</Link>
      </div>
    );
  }

  if (step === 'checkout') {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <button onClick={() => setStep('cart')} className="mb-6 text-gray-500 hover:text-teal-600">← Back to Cart</button>
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>
        <form onSubmit={handleCheckout} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none" value={details.name} onChange={e => setDetails({...details, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input required type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none" value={details.email} onChange={e => setDetails({...details, email: e.target.value})} />
          </div>
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
             <textarea required rows={3} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none" value={details.address} onChange={e => setDetails({...details, address: e.target.value})}></textarea>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
            <span className="font-semibold text-gray-700">Total Amount</span>
            <span className="font-bold text-xl text-teal-600">${total}</span>
          </div>
          <button type="submit" className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold hover:bg-teal-700 transition">Confirm Order</button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <Link to="/shop" className="text-teal-600 font-semibold hover:underline">Start Browsing</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(({ item, quantity }) => (
              <div key={item.id} className="flex gap-4 p-4 bg-white border border-gray-100 rounded-xl items-center">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{item.type} • {item.category}</p>
                </div>
                <div className="flex items-center gap-3">
                  {item.type === 'product' && (
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button onClick={() => updateCartQuantity(item.id, quantity - 1)} className="px-3 py-1 hover:bg-gray-50">-</button>
                      <span className="px-2 text-sm font-medium">{quantity}</span>
                      <button onClick={() => updateCartQuantity(item.id, quantity + 1)} className="px-3 py-1 hover:bg-gray-50">+</button>
                    </div>
                  )}
                  <span className="font-bold w-16 text-right">${item.price * quantity}</span>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 h-fit shadow-sm">
            <h3 className="text-lg font-bold mb-4">Summary</h3>
            <div className="flex justify-between mb-2 text-gray-600">
              <span>Subtotal</span>
              <span>${total}</span>
            </div>
            <div className="flex justify-between mb-4 text-gray-600">
              <span>Tax (Est.)</span>
              <span>${(total * 0.08).toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-xl mb-6">
              <span>Total</span>
              <span>${(total * 1.08).toFixed(2)}</span>
            </div>
            <button onClick={() => setStep('checkout')} className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold hover:bg-teal-700 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};