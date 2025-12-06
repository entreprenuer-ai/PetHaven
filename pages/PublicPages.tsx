import React, { useState, useMemo } from 'react';
import { Link, useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Heart, Filter, Star, Check, AlertCircle, Trash2, ArrowLeft, Search, ShoppingBag, MapPin, Calendar, User, Mail, Phone, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Category, ShopItem, Pet, Product, Booking } from '../types';

// --- Shared Components ---

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-[#FAFAF9]">
      {/* Background Mesh */}
      <div className="absolute inset-0 z-0 mesh-gradient opacity-80"></div>
      
      {/* Giant Outline Typography (Behind Image) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-full text-center pointer-events-none select-none">
         <h1 className="text-[18vw] font-serif font-black leading-none text-outline opacity-20 whitespace-nowrap">
            SOUL MATE
         </h1>
      </div>

      <div className="max-w-[1400px] w-full px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full pt-20">
        
        {/* Left Content */}
        <div className="lg:col-span-4 order-2 lg:order-1 reveal">
          <div className="flex items-center gap-3 mb-6">
             <span className="w-12 h-[1px] bg-stone-900"></span>
             <span className="text-xs font-bold uppercase tracking-widest text-stone-900">Est. 2024</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-serif font-medium text-stone-900 leading-[0.95] tracking-tight mb-8">
            Ethical <br/> <span className="italic text-emerald-600">Breeding</span> & <br/> Premium <br/> Care.
          </h2>
          <div className="flex flex-col gap-4 max-w-xs">
            <Link to="/shop?type=pet" className="btn-premium bg-stone-900 text-white hover:bg-emerald-600 flex items-center justify-between group">
              Adopt Now <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>
        </div>

        {/* Center Image (Floating) */}
        <div className="lg:col-span-4 order-1 lg:order-2 relative h-[50vh] md:h-[70vh] w-full reveal delay-200 flex justify-center">
           <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAF9] via-transparent to-transparent z-20"></div>
           <img 
             src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800&auto=format&fit=crop" 
             alt="Featured Dog" 
             className="h-full w-auto object-cover rounded-t-[10rem] rounded-b-[2rem] shadow-2xl z-10"
           />
           {/* Floating Badge */}
           <div className="absolute top-1/4 -right-4 md:-right-12 z-30 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 animate-float">
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">Breed of the Month</p>
              <p className="text-2xl font-serif font-bold text-stone-900">Golden Retriever</p>
           </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-4 order-3 flex flex-col justify-end h-full pb-32 reveal delay-300">
           <p className="text-xl text-stone-500 font-light leading-relaxed mb-8 text-justify">
             We curate connections between loving families and healthy, happy pets. Experience the joy of companionship with our concierge adoption service.
           </p>
           <div className="grid grid-cols-2 gap-8 border-t border-stone-200 pt-8">
              <div>
                 <p className="text-3xl font-serif font-bold text-stone-900">2k+</p>
                 <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Happy Families</p>
              </div>
              <div>
                 <p className="text-3xl font-serif font-bold text-stone-900">100%</p>
                 <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Health Guarantee</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const Marquee = () => (
    <div className="bg-stone-900 py-6 border-y border-stone-800 rotate-1 scale-105 overflow-hidden">
        <div className="marquee-container">
            <div className="marquee-content">
                {[...Array(10)].map((_, i) => (
                    <span key={i} className="text-4xl md:text-5xl font-serif font-black text-transparent text-outline-dark mx-8 italic">
                        PREMIUM COMPANIONS <span className="text-emerald-500 not-italic">•</span> ETHICAL SOURCING <span className="text-emerald-500 not-italic">•</span> LIFETIME SUPPORT <span className="text-emerald-500 not-italic">•</span>
                    </span>
                ))}
            </div>
        </div>
    </div>
);

const BentoGrid = () => (
    <section className="py-32 px-6 max-w-[1400px] mx-auto">
        <div className="mb-12 flex items-end justify-between">
            <h2 className="text-5xl font-serif font-bold text-stone-900">Collections</h2>
            <Link to="/shop" className="text-stone-500 hover:text-stone-900 font-bold flex items-center gap-2">View All <ArrowRight size={18} /></Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[800px] md:h-[600px]">
            {/* Large Box */}
            <Link to="/shop?type=pet&category=dog" className="col-span-1 md:col-span-2 md:row-span-2 relative rounded-[2rem] overflow-hidden group cursor-none">
                <img src="https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                <div className="absolute bottom-8 left-8">
                    <h3 className="text-4xl font-serif font-bold text-white mb-2">Dogs</h3>
                    <p className="text-stone-200 text-sm font-medium">Faithful Companions</p>
                </div>
            </Link>
            
            {/* Medium Box */}
            <Link to="/shop?type=pet&category=cat" className="col-span-1 md:col-span-1 md:row-span-2 relative rounded-[2rem] overflow-hidden group cursor-none">
                <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                <div className="absolute bottom-8 left-8">
                    <h3 className="text-3xl font-serif font-bold text-white mb-2">Cats</h3>
                    <p className="text-stone-200 text-sm font-medium">Independent Spirits</p>
                </div>
            </Link>
            
            {/* Small Box 1 */}
            <Link to="/shop?type=pet&category=fish" className="relative rounded-[2rem] overflow-hidden group cursor-none">
                 <img src="https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                 <div className="absolute bottom-6 left-6">
                    <h3 className="text-2xl font-serif font-bold text-white">Aquatic</h3>
                </div>
            </Link>
            
            {/* Small Box 2 */}
            <Link to="/shop?type=product" className="relative rounded-[2rem] overflow-hidden group cursor-none bg-stone-100 flex items-center justify-center">
                 <div className="text-center group-hover:scale-110 transition-transform">
                     <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-stone-900 shadow-md">
                         <ShoppingBag size={24} />
                     </div>
                     <h3 className="text-2xl font-serif font-bold text-stone-900">Supplies</h3>
                     <p className="text-stone-500 text-xs font-bold uppercase tracking-widest mt-1">Premium Gear</p>
                 </div>
            </Link>
        </div>
    </section>
);

const ItemCard: React.FC<{ item: ShopItem }> = ({ item }) => {
  const isPet = item.type === 'pet';
  const petItem = item as Pet;
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/details/${item.type}/${item.id}`)}
      className="group relative bg-white rounded-[2rem] overflow-hidden cursor-none flex-shrink-0 w-[300px] md:w-[350px] snap-center transition-all duration-500 hover:shadow-2xl border border-transparent hover:border-emerald-100"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        
        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-900">
            {item.category}
          </span>
        </div>

        {/* Sold Overlay */}
        {isPet && petItem.status === 'sold' && (
           <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px] flex items-center justify-center z-10">
             <span className="bg-white text-stone-900 px-6 py-2 font-bold transform -rotate-6 rounded-full shadow-2xl">ADOPTED</span>
           </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif font-bold text-2xl text-stone-900 group-hover:text-emerald-700 transition-colors">{item.name}</h3>
          <span className="font-bold text-lg text-stone-900">${item.price}</span>
        </div>
        
        {isPet ? (
            <div className="flex gap-4 mt-2">
                <p className="text-xs uppercase tracking-widest text-stone-400 font-bold">{petItem.breed}</p>
            </div>
        ) : (
            <p className="text-sm text-stone-500 line-clamp-1 mt-1 font-light">{item.description}</p>
        )}
      </div>
    </div>
  );
};

// --- Pages ---

export const Home = () => {
  const { pets } = useApp();
  const featuredPets = pets.filter(p => p.status === 'available').slice(0, 5);

  return (
    <div className="pb-24">
      <Hero />
      <Marquee />
      <BentoGrid />
      
      {/* Horizontal Scroll Gallery */}
      <section className="py-24 border-t border-stone-100">
        <div className="max-w-[1400px] mx-auto px-6 mb-12 flex items-end justify-between">
            <div>
                <span className="text-emerald-600 font-bold tracking-widest text-xs uppercase mb-2 block">Available Now</span>
                <h2 className="text-5xl font-serif font-medium text-stone-900">Latest Arrivals</h2>
            </div>
            {/* Scroll indicators could go here */}
        </div>
        
        <div className="flex overflow-x-auto gap-8 px-6 pb-12 snap-x snap-mandatory no-scrollbar max-w-[1400px] mx-auto">
           {featuredPets.map((pet, idx) => (
               <ItemCard key={pet.id} item={pet} />
           ))}
           
           {/* 'View All' Card at the end */}
           <Link to="/shop?type=pet" className="w-[300px] flex-shrink-0 snap-center bg-stone-100 rounded-[2rem] flex items-center justify-center group hover:bg-stone-900 hover:text-white transition-colors cursor-none">
               <div className="text-center">
                   <span className="text-xl font-serif font-bold mb-2 block">View All Pets</span>
                   <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center mx-auto group-hover:bg-white group-hover:text-stone-900 transition-colors">
                       <ArrowRight size={24} />
                   </div>
               </div>
           </Link>
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

  const categories = typeFilter === 'pet' 
    ? ['dog', 'cat', 'bird', 'fish'] 
    : ['food', 'accessory'];

  return (
    <div className="min-h-screen bg-[#FAFAF9] pt-32 pb-24">
       <div className="max-w-[1400px] mx-auto px-6">
          
          <div className="flex flex-col lg:flex-row gap-16">
             {/* Sticky Sidebar */}
             <aside className="lg:w-64 flex-shrink-0 space-y-12 lg:sticky lg:top-32 lg:h-fit reveal">
                <div>
                   <h1 className="text-5xl font-serif text-stone-900 mb-8 capitalize leading-[0.9]">
                      {categoryFilter ? `${categoryFilter}s` : (typeFilter === 'pet' ? 'Adoption' : 'Supplies')}
                   </h1>
                   <p className="text-sm text-stone-500 font-medium leading-relaxed mb-8">
                        {filteredItems.length} results found
                   </p>
                </div>

                <div>
                   <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-6">Department</h3>
                   <div className="flex flex-col gap-3">
                      <Link 
                        to="/shop?type=pet" 
                        className={`text-lg transition-colors ${typeFilter === 'pet' ? 'text-stone-900 font-bold' : 'text-stone-400 hover:text-stone-900'}`}
                      >
                        Pets
                      </Link>
                      <Link 
                         to="/shop?type=product" 
                         className={`text-lg transition-colors ${typeFilter === 'product' ? 'text-stone-900 font-bold' : 'text-stone-400 hover:text-stone-900'}`}
                      >
                        Supplies
                      </Link>
                   </div>
                </div>

                <div>
                   <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-6">Filter</h3>
                   <div className="flex flex-col gap-2">
                      <Link 
                         to={`/shop?type=${typeFilter}`} 
                         className={`text-sm py-2 px-4 rounded-lg transition-colors flex justify-between items-center ${!categoryFilter ? 'bg-stone-900 text-white font-bold' : 'text-stone-600 hover:bg-stone-100'}`}
                      >
                         All Items
                      </Link>
                      {categories.map(cat => (
                         <Link 
                            key={cat}
                            to={`/shop?type=${typeFilter}&category=${cat}`}
                            className={`text-sm py-2 px-4 rounded-lg transition-colors flex justify-between items-center capitalize ${categoryFilter === cat ? 'bg-stone-900 text-white font-bold' : 'text-stone-600 hover:bg-stone-100'}`}
                         >
                            {cat}s
                         </Link>
                      ))}
                   </div>
                </div>
             </aside>

             {/* Grid */}
             <div className="flex-1">
                {filteredItems.length > 0 ? (
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                      {filteredItems.map((item, idx) => (
                         <div key={item.id} className={`reveal delay-${(idx % 4) * 100}`}>
                            <ItemCard item={item} />
                         </div>
                      ))}
                   </div>
                ) : (
                   <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-12 bg-white rounded-[2rem] border border-dashed border-stone-200">
                      <Search size={48} className="text-stone-300 mb-4" />
                      <h3 className="text-xl font-bold text-stone-900 mb-2">No matches found</h3>
                      <Link to="/shop" className="text-emerald-600 font-bold hover:underline">Clear All Filters</Link>
                   </div>
                )}
             </div>
          </div>
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
    <div className="min-h-screen bg-[#FAFAF9] pt-32 pb-20">
       <div className="max-w-6xl mx-auto px-6">
          <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-stone-400 hover:text-stone-900 font-bold transition-colors text-xs uppercase tracking-widest">
             <ArrowLeft size={16} /> Back to Browse
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
             {/* Left: Image (Containerized) */}
             <div className="relative h-[500px] lg:h-[700px] rounded-[3rem] overflow-hidden shadow-2xl border border-white/50 group reveal">
                 <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                 
                 {isPet && pet.status === 'sold' && (
                    <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center">
                       <span className="border-4 border-white text-white px-10 py-4 font-bold text-4xl uppercase tracking-widest transform -rotate-12">Adopted</span>
                    </div>
                 )}
                 <div className="absolute top-6 left-6">
                    <span className="bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-900 shadow-md">
                        {item.category}
                    </span>
                 </div>
             </div>

             {/* Right: Content */}
             <div className="flex flex-col justify-center reveal delay-100">
                <div className="flex items-center gap-3 mb-6">
                   {isPet && pet.status === 'available' && <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-widest rounded-full">Available Now</span>}
                </div>

                <h1 className="text-6xl md:text-7xl font-serif text-stone-900 mb-6 leading-[0.9]">{item.name}</h1>
                <p className="text-4xl font-light text-stone-400 mb-10">${item.price}</p>

                <div className="prose prose-lg prose-stone mb-12 text-stone-600 font-light border-l-2 border-emerald-500 pl-6">
                   <p>{item.description}</p>
                </div>

                {isPet && (
                   <div className="grid grid-cols-2 gap-4 mb-12">
                      <div className="bg-white border border-stone-100 p-6 rounded-2xl">
                         <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Breed</span>
                         <span className="text-lg font-serif text-stone-900">{pet.breed}</span>
                      </div>
                      <div className="bg-white border border-stone-100 p-6 rounded-2xl">
                         <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Age</span>
                         <span className="text-lg font-serif text-stone-900">{pet.age}</span>
                      </div>
                      <div className="bg-white border border-stone-100 p-6 rounded-2xl">
                         <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Gender</span>
                         <span className="text-lg font-serif text-stone-900">{pet.gender}</span>
                      </div>
                      <div className="bg-white border border-stone-100 p-6 rounded-2xl">
                         <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Health</span>
                         <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                            <Check size={16} /> Verified
                         </div>
                      </div>
                   </div>
                )}

                <div className="flex flex-col gap-4">
                   {(!isPet || pet.status === 'available') ? (
                      <>
                        <button 
                           onClick={() => { addToCart(item); navigate('/cart'); }}
                           className="w-full bg-stone-900 text-white py-5 rounded-full font-bold text-lg hover:bg-emerald-600 transition-all shadow-xl active:scale-[0.98]"
                        >
                           {isPet ? 'Start Adoption Process' : 'Add to Cart'}
                        </button>
                        {isPet && (
                           <Link to="/book-visit" className="w-full border-2 border-stone-200 text-stone-900 py-5 rounded-full font-bold text-lg hover:border-stone-900 transition-colors flex items-center justify-center gap-2 bg-white">
                              <Calendar size={20} /> Schedule a Meet & Greet
                           </Link>
                        )}
                      </>
                   ) : (
                      <button disabled className="w-full bg-stone-100 text-stone-400 py-5 rounded-full font-bold text-lg cursor-not-allowed">
                         No Longer Available
                      </button>
                   )}
                </div>
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
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center reveal pt-24">
        <div className="w-32 h-32 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-2xl animate-bounce">
          <Check size={64} strokeWidth={3} />
        </div>
        <h2 className="text-5xl font-serif text-stone-900 mb-6">Order Confirmed</h2>
        <p className="text-stone-500 mb-10 max-w-md text-xl font-light">Thank you, <span className="font-bold text-stone-900">{details.name}</span>. We'll be in touch shortly.</p>
        <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/profile" className="btn-premium bg-stone-100 text-stone-900 hover:bg-stone-200">Track Order</Link>
            <Link to="/" className="btn-premium bg-stone-900 text-white hover:bg-emerald-600">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (step === 'checkout') {
    return (
      <div className="max-w-4xl mx-auto py-32 px-6 reveal">
        <button onClick={() => setStep('cart')} className="mb-10 text-stone-400 hover:text-stone-900 font-bold flex items-center gap-2 transition-colors">
          <ArrowLeft size={20} /> Return to Cart
        </button>
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-stone-100 grid grid-cols-1 md:grid-cols-5">
           <div className="md:col-span-3 p-10 md:p-16">
              <h2 className="text-3xl font-serif text-stone-900 mb-8">Shipping Information</h2>
              <form onSubmit={handleCheckout} className="space-y-6">
                 <div>
                    <label className="block text-xs font-bold text-stone-400 uppercase mb-2 tracking-widest">Full Name</label>
                    <input required type="text" className="input-premium" value={details.name} onChange={e => setDetails({...details, name: e.target.value})} placeholder="Jane Doe" />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-stone-400 uppercase mb-2 tracking-widest">Email Address</label>
                    <input required type="email" className="input-premium" value={details.email} onChange={e => setDetails({...details, email: e.target.value})} placeholder="jane@example.com" />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-stone-400 uppercase mb-2 tracking-widest">Address</label>
                    <textarea required rows={3} className="input-premium resize-none" value={details.address} onChange={e => setDetails({...details, address: e.target.value})} placeholder="123 Boulevard..."></textarea>
                 </div>
                 <button type="submit" className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg mt-6">Complete Order</button>
              </form>
           </div>
           <div className="md:col-span-2 bg-stone-50 p-10 md:p-16 flex flex-col justify-center border-l border-stone-100">
              <h3 className="text-stone-900 font-bold mb-8 text-xl">Order Summary</h3>
              <div className="space-y-4 mb-8 flex-1">
                 <div className="flex justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span>${total}</span>
                 </div>
                 <div className="flex justify-between text-stone-600">
                    <span>Taxes</span>
                    <span>${(total * 0.08).toFixed(2)}</span>
                 </div>
                 <div className="border-t border-stone-200 pt-4 flex justify-between font-bold text-2xl text-stone-900 font-serif">
                    <span>Total</span>
                    <span>${(total * 1.08).toFixed(2)}</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-32 min-h-screen">
      <h1 className="text-5xl font-serif text-stone-900 mb-16">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[3rem] border border-stone-100 shadow-sm reveal">
          <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-300">
            <ShoppingBag size={40} />
          </div>
          <p className="text-stone-500 text-xl mb-8 font-light">Your cart is currently empty.</p>
          <Link to="/shop" className="btn-premium bg-stone-900 text-white hover:bg-emerald-600">Start Browsing</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 reveal">
          <div className="lg:col-span-2 space-y-8">
            {cart.map(({ item, quantity }) => (
              <div key={item.id} className="flex gap-8 p-6 bg-white border border-stone-100 rounded-[2rem] items-center hover:shadow-lg transition-shadow">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-stone-100">
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-stone-900 text-2xl mb-1">{item.name}</h3>
                  <p className="text-sm text-stone-500 capitalize font-medium">{item.category}</p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <span className="font-bold text-2xl text-stone-900">${(item.price * quantity).toFixed(2)}</span>
                  <div className="flex items-center gap-6">
                    {item.type === 'product' && (
                      <div className="flex items-center bg-stone-50 rounded-xl p-1.5 border border-stone-200">
                        <button onClick={() => updateCartQuantity(item.id, quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition font-bold text-stone-600">-</button>
                        <span className="w-8 text-center text-sm font-bold">{quantity}</span>
                        <button onClick={() => updateCartQuantity(item.id, quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition font-bold text-stone-600">+</button>
                      </div>
                    )}
                    <button onClick={() => removeFromCart(item.id)} className="text-stone-300 hover:text-red-500 p-2 transition-colors"><Trash2 size={20} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-stone-900 text-white p-10 rounded-[2.5rem] h-fit sticky top-32 shadow-2xl">
            <h3 className="text-2xl font-serif mb-8">Summary</h3>
            <div className="space-y-6 mb-10">
              <div className="flex justify-between text-stone-400">
                <span>Subtotal</span>
                <span className="font-medium text-white">${total}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Shipping</span>
                <span className="font-medium text-white">Free</span>
              </div>
              <div className="border-t border-stone-800 pt-6 flex justify-between font-bold text-3xl font-serif">
                <span>Total</span>
                <span>${(total * 1.08).toFixed(2)}</span>
              </div>
            </div>
            <button onClick={() => setStep('checkout')} className="w-full bg-white text-stone-900 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-400 transition-all shadow-lg active:scale-95">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const Contact = () => (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20 reveal">
            <h1 className="text-6xl font-serif text-stone-900 mb-6">Get in Touch</h1>
            <p className="text-xl text-stone-500 font-light">We'd love to hear from you. Visit us or send a message.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
                { icon: MapPin, title: "Visit Us", desc: "123 Pet Haven Lane, Beverly Hills, CA", action: "Get Directions" },
                { icon: Mail, title: "Email Us", desc: "hello@pethaven.com", action: "Send Email" },
                { icon: Phone, title: "Call Us", desc: "+1 (555) 123-4567", action: "Call Now" }
            ].map((c, i) => (
                <div key={i} className={`bg-white p-10 rounded-[2.5rem] text-center border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 reveal delay-${i*100}`}>
                    <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-stone-900">
                        <c.icon size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-stone-900 mb-2">{c.title}</h3>
                    <p className="text-stone-500 mb-8 font-light">{c.desc}</p>
                    <button className="text-emerald-600 font-bold hover:underline">{c.action}</button>
                </div>
            ))}
        </div>
    </div>
);

export const BookVisit = () => {
    const { addBooking } = useApp();
    const [booking, setBooking] = useState<Partial<Booking>>({ purpose: 'visit_pet' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addBooking({ 
            ...booking as Booking, 
            id: Math.random().toString(36).substr(2, 9), 
            status: 'pending' 
        });
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center pt-24 reveal">
                <div className="w-24 h-24 bg-stone-900 text-white rounded-full flex items-center justify-center mb-8 shadow-xl">
                    <Calendar size={40} />
                </div>
                <h2 className="text-4xl font-serif text-stone-900 mb-4">Request Received</h2>
                <p className="text-stone-500 mb-10 max-w-md text-lg font-light">We will contact you shortly to confirm your appointment time.</p>
                <Link to="/" className="btn-premium bg-stone-900 text-white hover:bg-emerald-600">Back Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-24 px-6 bg-[#FAFAF9]">
            <div className="max-w-6xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-stone-100 grid grid-cols-1 lg:grid-cols-2 reveal">
                <div className="p-12 lg:p-20">
                    <h1 className="text-4xl font-serif text-stone-900 mb-4">Book a Visit</h1>
                    <p className="text-stone-500 mb-12 font-light">Schedule a private appointment to meet our pets.</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="label-premium">Full Name</label>
                                <input required className="input-premium" placeholder="Jane Doe" onChange={e => setBooking({...booking, customerName: e.target.value})} />
                            </div>
                            <div className="col-span-2">
                                <label className="label-premium">Email</label>
                                <input required type="email" className="input-premium" placeholder="jane@example.com" onChange={e => setBooking({...booking, email: e.target.value})} />
                            </div>
                            <div>
                                <label className="label-premium">Date</label>
                                <input required type="date" className="input-premium" onChange={e => setBooking({...booking, date: e.target.value})} />
                            </div>
                            <div>
                                <label className="label-premium">Time</label>
                                <input required type="time" className="input-premium" onChange={e => setBooking({...booking, time: e.target.value})} />
                            </div>
                            <div className="col-span-2">
                                <label className="label-premium">Purpose</label>
                                <select className="input-premium appearance-none" onChange={e => setBooking({...booking, purpose: e.target.value as any})}>
                                    <option value="visit_pet">Meet a Pet</option>
                                    <option value="pickup">Order Pickup</option>
                                    <option value="consultation">Care Consultation</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-lg mt-4">Submit Request</button>
                    </form>
                </div>
                <div className="bg-stone-100 relative hidden lg:block">
                    <img src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-stone-900/20"></div>
                </div>
            </div>
        </div>
    );
};

export const UserProfile = () => {
    const { orders } = useApp();
    
    return (
        <div className="max-w-5xl mx-auto px-6 py-32 min-h-screen reveal">
            <h1 className="text-4xl font-serif text-stone-900 mb-12">My Account</h1>
            
            <div className="flex flex-col md:flex-row gap-16">
                <div className="md:w-1/3">
                    <div className="bg-white rounded-[2.5rem] p-8 border border-stone-100 shadow-lg text-center sticky top-32">
                        <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full mx-auto mb-6 flex items-center justify-center text-emerald-600 shadow-inner">
                            <User size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-stone-900">Guest User</h2>
                        <p className="text-stone-400 text-sm mb-8">Member since 2024</p>
                        
                        <div className="space-y-3">
                            <button className="w-full text-left px-6 py-4 rounded-2xl bg-stone-900 text-white font-bold shadow-lg">Orders History</button>
                            <button className="w-full text-left px-6 py-4 rounded-2xl text-stone-500 hover:bg-stone-50 transition font-medium">Account Settings</button>
                            <button className="w-full text-left px-6 py-4 rounded-2xl text-stone-500 hover:bg-red-50 hover:text-red-500 transition font-medium">Log Out</button>
                        </div>
                    </div>
                </div>
                
                <div className="md:w-2/3">
                    <h2 className="text-xl font-bold text-stone-900 mb-8 flex items-center gap-3">
                        <ShoppingBag size={20} className="text-stone-400" /> Recent Orders
                    </h2>
                    
                    {orders.length === 0 ? (
                        <div className="bg-white rounded-[2.5rem] p-16 text-center border border-stone-100 border-dashed">
                             <p className="text-stone-400 mb-6 text-lg">You haven't placed any orders yet.</p>
                             <Link to="/shop" className="text-emerald-600 font-bold hover:underline">Start Shopping</Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map(order => (
                                <div key={order.id} className="bg-white rounded-[2rem] p-8 border border-stone-100 shadow-sm hover:shadow-lg transition-all">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <p className="font-bold text-stone-900 text-lg">Order #{order.id}</p>
                                            <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">{new Date(order.date).toLocaleDateString()}</p>
                                        </div>
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${order.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="space-y-3 mb-6">
                                        {order.items.map((item, i) => (
                                            <div key={i} className="flex justify-between text-sm items-center">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-6 h-6 bg-stone-100 rounded-md flex items-center justify-center text-xs font-bold text-stone-600">{item.quantity}</span> 
                                                    <span className="text-stone-600 font-medium">{item.item.name}</span>
                                                </div>
                                                <span className="font-bold text-stone-900">${(item.item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-6 border-t border-stone-100 flex justify-between items-center">
                                        <span className="text-stone-400 text-sm font-bold uppercase tracking-widest">Total Amount</span>
                                        <span className="font-bold text-stone-900 text-2xl font-serif">${(order.total * 1.08).toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};