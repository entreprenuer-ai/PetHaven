import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Plus, Trash, Package, DollarSign, Users, ShoppingBag, Wand2, Loader2, Search, Calendar, Lock, LogIn } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Pet, Product } from '../types';
import { generatePetDescription } from '../services/geminiService';
import { useNavigate } from 'react-router-dom';

// --- Auth ---

export const AdminLogin = () => {
    const { toggleAdmin } = useApp();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock simple auth
        if (password === 'admin' || password === '') {
            toggleAdmin(true);
            navigate('/admin');
        } else {
            alert("Incorrect password. Hint: It's empty or 'admin'");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9] p-6">
            <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-stone-100 w-full max-w-md reveal">
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-stone-900 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white shadow-xl">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-3xl font-serif font-bold text-stone-900">Admin Portal</h1>
                    <p className="text-stone-500 mt-2 font-light">Secure access for staff only.</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="input-premium bg-stone-50"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button type="submit" className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95">
                        <LogIn size={20} /> Access Dashboard
                    </button>
                </form>
                <div className="mt-8 text-center">
                    <button onClick={() => navigate('/')} className="text-sm text-stone-400 hover:text-stone-900 font-bold transition-colors">Back to Store</button>
                </div>
            </div>
        </div>
    );
};

// --- Dashboard Home ---

export const Dashboard = () => {
  const { pets, products, orders, bookings } = useApp();
  
  const stats = [
    { label: 'Total Revenue', value: `$${orders.reduce((a, c) => a + c.total, 0).toLocaleString()}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Visit Requests', value: bookings.length, icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Low Stock', value: products.filter(p => p.stock < 5).length, icon: Package, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const chartData = [
    { name: 'Mon', sales: 400 }, { name: 'Tue', sales: 300 },
    { name: 'Wed', sales: 550 }, { name: 'Thu', sales: 450 },
    { name: 'Fri', sales: 600 }, { name: 'Sat', sales: 800 },
    { name: 'Sun', sales: 700 },
  ];

  return (
    <div className="space-y-8 reveal">
      <div>
        <h1 className="text-4xl font-serif font-bold text-stone-900">Dashboard</h1>
        <p className="text-stone-500 mt-1 font-light">Overview of your store's performance.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center gap-5">
              <div className={`p-4 rounded-2xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-serif font-bold text-stone-900 mt-1">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm h-96">
          <h3 className="font-bold text-stone-900 mb-6 text-lg">Weekly Revenue</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
              <Tooltip 
                cursor={{ fill: '#FAFAF9' }} 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
              />
              <Bar dataKey="sales" fill="#1C1917" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm overflow-hidden">
          <h3 className="font-bold text-stone-900 mb-6 text-lg">Recent Activity</h3>
          <div className="space-y-6">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="flex justify-between items-center group">
                 <div className="flex gap-4 items-center">
                   <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-500 group-hover:bg-stone-900 group-hover:text-white transition-colors">
                     <ShoppingBag size={18} />
                   </div>
                   <div>
                     <p className="font-bold text-stone-900 text-sm">{order.customerName}</p>
                     <p className="text-xs text-stone-400 font-medium">{new Date(order.date).toLocaleDateString()}</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="font-bold text-emerald-600 text-sm">+${order.total}</p>
                 </div>
              </div>
            ))}
            {orders.length === 0 && <p className="text-stone-400 text-sm text-center py-4">No recent orders found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Manage Pets ---

export const ManagePets = () => {
  const { pets, addPet, deleteItem } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [newPet, setNewPet] = useState<Partial<Pet>>({
    category: 'dog', status: 'available', image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=300'
  });
  const [generating, setGenerating] = useState(false);
  const [filter, setFilter] = useState('');

  const handleAiDescription = async () => {
    if (!newPet.breed || !newPet.age) {
      alert("Please enter Breed and Age first.");
      return;
    }
    setGenerating(true);
    const desc = await generatePetDescription(newPet.breed, newPet.category || 'pet', newPet.age, 'Friendly, energetic');
    setNewPet(prev => ({ ...prev, description: desc }));
    setGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPet.name && newPet.price) {
      addPet({ ...newPet, id: Math.random().toString(), type: 'pet' } as Pet);
      setShowAdd(false);
      setNewPet({ category: 'dog', status: 'available', image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=300' });
    }
  };

  const filteredPets = pets.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="reveal">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div>
           <h1 className="text-4xl font-serif font-bold text-stone-900">Pet Inventory</h1>
           <p className="text-stone-500 mt-1 font-light">Manage adoption listings.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-4 text-stone-400" size={18} />
            <input 
              className="pl-12 input-premium rounded-full bg-white" 
              placeholder="Search pets..." 
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
          </div>
          <button onClick={() => setShowAdd(!showAdd)} className="bg-stone-900 text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-emerald-600 transition shadow-lg font-bold">
            <Plus size={18} /> <span className="hidden sm:inline">Add Pet</span>
          </button>
        </div>
      </div>

      {showAdd && (
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-stone-100 mb-10 reveal">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-2xl text-stone-900">Add New Pet</h3>
            <button onClick={() => setShowAdd(false)} className="text-stone-400 hover:text-stone-900">Cancel</button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input placeholder="Pet Name" className="input-premium" onChange={e => setNewPet({...newPet, name: e.target.value})} required />
            <select className="input-premium appearance-none" onChange={e => setNewPet({...newPet, category: e.target.value as any})} value={newPet.category}>
              <option value="dog">Dog</option><option value="cat">Cat</option><option value="bird">Bird</option><option value="fish">Fish</option>
            </select>
            <input placeholder="Breed" className="input-premium" onChange={e => setNewPet({...newPet, breed: e.target.value})} required />
            <div className="flex gap-4">
               <input placeholder="Age" className="input-premium" onChange={e => setNewPet({...newPet, age: e.target.value})} required />
               <select className="input-premium appearance-none" onChange={e => setNewPet({...newPet, gender: e.target.value as any})}>
                 <option value="Male">Male</option><option value="Female">Female</option>
               </select>
            </div>
            <input type="number" placeholder="Price ($)" className="input-premium" onChange={e => setNewPet({...newPet, price: Number(e.target.value)})} required />
            <input placeholder="Image URL" className="input-premium" value={newPet.image} onChange={e => setNewPet({...newPet, image: e.target.value})} />
            
            <div className="md:col-span-2 relative">
              <textarea 
                placeholder="Description" 
                className="input-premium w-full h-32 resize-none" 
                value={newPet.description || ''} 
                onChange={e => setNewPet({...newPet, description: e.target.value})} 
              />
              <button 
                type="button" 
                onClick={handleAiDescription}
                disabled={generating}
                className="absolute right-4 top-4 bg-purple-50 text-purple-600 p-2 rounded-xl hover:bg-purple-100 transition border border-purple-100"
                title="Generate AI Description"
              >
                {generating ? <Loader2 className="animate-spin" size={18} /> : <Wand2 size={18} />}
              </button>
            </div>
            <div className="md:col-span-2 flex justify-end">
               <button type="submit" className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition shadow-lg">Save Listing</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-[2.5rem] border border-stone-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-stone-50 border-b border-stone-100">
            <tr>
              <th className="p-8 font-bold text-stone-500 text-xs uppercase tracking-widest">Pet Details</th>
              <th className="p-8 font-bold text-stone-500 text-xs uppercase tracking-widest">Category</th>
              <th className="p-8 font-bold text-stone-500 text-xs uppercase tracking-widest">Price</th>
              <th className="p-8 font-bold text-stone-500 text-xs uppercase tracking-widest">Status</th>
              <th className="p-8 font-bold text-stone-500 text-xs uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {filteredPets.map(pet => (
              <tr key={pet.id} className="hover:bg-stone-50/50 transition-colors">
                <td className="p-8 flex items-center gap-6">
                  <img src={pet.image} alt="" className="w-16 h-16 rounded-2xl object-cover shadow-sm" />
                  <div>
                    <p className="font-bold text-stone-900 text-lg">{pet.name}</p>
                    <p className="text-xs text-stone-400 font-medium">{pet.breed} • {pet.age}</p>
                  </div>
                </td>
                <td className="p-8 capitalize text-stone-600 font-medium">{pet.category}</td>
                <td className="p-8 font-bold text-stone-900 font-serif">${pet.price}</td>
                <td className="p-8">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${pet.status === 'available' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-stone-100 text-stone-500 border-stone-200'}`}>
                    {pet.status}
                  </span>
                </td>
                <td className="p-8 text-right">
                  <button onClick={() => deleteItem(pet.id, 'pet')} className="text-stone-300 hover:text-red-500 transition p-3 hover:bg-red-50 rounded-xl">
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const ManageProducts = () => {
    const { products, addProduct, deleteItem } = useApp();
    const [showAdd, setShowAdd] = useState(false);
    const [newProduct, setNewProduct] = useState<Partial<Product>>({
      category: 'food', stock: 10, image: 'https://images.unsplash.com/photo-1589924691195-41432c84c161?auto=format&fit=crop&q=80&w=300'
    });
    const [filter, setFilter] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (newProduct.name && newProduct.price) {
        addProduct({ ...newProduct, id: Math.random().toString(), type: 'product' } as Product);
        setShowAdd(false);
        setNewProduct({ category: 'food', stock: 10, image: 'https://images.unsplash.com/photo-1589924691195-41432c84c161?auto=format&fit=crop&q=80&w=300' });
      }
    };
  
    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));
  
    return (
      <div className="reveal">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div>
             <h1 className="text-4xl font-serif font-bold text-stone-900">Product Inventory</h1>
             <p className="text-stone-500 mt-1 font-light">Manage food and supplies.</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-4 text-stone-400" size={18} />
              <input 
                className="pl-12 input-premium rounded-full bg-white" 
                placeholder="Search products..." 
                value={filter}
                onChange={e => setFilter(e.target.value)}
              />
            </div>
            <button onClick={() => setShowAdd(!showAdd)} className="bg-stone-900 text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-emerald-600 transition shadow-lg font-bold">
              <Plus size={18} /> <span className="hidden sm:inline">Add Product</span>
            </button>
          </div>
        </div>
  
        {showAdd && (
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-stone-100 mb-10 reveal">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-2xl text-stone-900">Add New Product</h3>
              <button onClick={() => setShowAdd(false)} className="text-stone-400 hover:text-stone-900">Cancel</button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input placeholder="Product Name" className="input-premium" onChange={e => setNewProduct({...newProduct, name: e.target.value})} required />
              <select className="input-premium appearance-none" onChange={e => setNewProduct({...newProduct, category: e.target.value as any})} value={newProduct.category}>
                <option value="food">Food</option><option value="accessory">Accessory</option>
              </select>
              <input type="number" placeholder="Price ($)" className="input-premium" onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} required />
              <input type="number" placeholder="Stock Qty" className="input-premium" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: Number(e.target.value)})} required />
              <div className="md:col-span-2">
                 <input placeholder="Image URL" className="input-premium" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} />
              </div>
              <div className="md:col-span-2">
                <textarea 
                  placeholder="Description" 
                  className="input-premium w-full h-24 resize-none" 
                  value={newProduct.description || ''} 
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})} 
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                 <button type="submit" className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition shadow-lg">Save Product</button>
              </div>
            </form>
          </div>
        )}
  
        <div className="bg-white rounded-[2.5rem] border border-stone-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-stone-50 border-b border-stone-100">
              <tr>
                <th className="p-8 font-bold text-stone-500 text-xs uppercase tracking-widest">Product</th>
                <th className="p-8 font-bold text-stone-500 text-xs uppercase tracking-widest">Category</th>
                <th className="p-8 font-bold text-stone-500 text-xs uppercase tracking-widest">Price</th>
                <th className="p-8 font-bold text-stone-500 text-xs uppercase tracking-widest">Stock</th>
                <th className="p-8 font-bold text-stone-500 text-xs uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filteredProducts.map(p => (
                <tr key={p.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-8 flex items-center gap-6">
                    <img src={p.image} alt="" className="w-16 h-16 rounded-2xl object-cover shadow-sm" />
                    <div>
                      <p className="font-bold text-stone-900 text-lg">{p.name}</p>
                    </div>
                  </td>
                  <td className="p-8 capitalize text-stone-600 font-medium">{p.category}</td>
                  <td className="p-8 font-bold text-stone-900 font-serif">${p.price}</td>
                  <td className="p-8">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${p.stock > 0 ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                      {p.stock} Units
                    </span>
                  </td>
                  <td className="p-8 text-right">
                    <button onClick={() => deleteItem(p.id, 'product')} className="text-stone-300 hover:text-red-500 transition p-3 hover:bg-red-50 rounded-xl">
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export const ManageOrders = () => {
    const { orders, updateOrderStatus } = useApp();
    return (
        <div className="space-y-8 reveal">
            <div>
              <h1 className="text-4xl font-serif font-bold text-stone-900">Orders</h1>
              <p className="text-stone-500 mt-1 font-light">Track and manage customer shipments.</p>
            </div>
            
            <div className="space-y-6">
                {orders.map(order => (
                    <div key={order.id} className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-lg transition-all">
                        <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-8 gap-6">
                            <div className="flex gap-5 items-center">
                                <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
                                  {order.customerName.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-stone-900">{order.customerName}</h3>
                                    <p className="text-stone-400 text-xs uppercase tracking-widest font-bold mt-1">ID: {order.id}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-8">
                                <div className="text-right">
                                  <p className="text-xs text-stone-400 uppercase font-bold tracking-widest mb-1">Total</p>
                                  <span className="font-bold text-2xl text-stone-900 font-serif">${order.total}</span>
                                </div>
                                <select 
                                    className="bg-stone-50 border border-stone-200 rounded-xl px-5 py-3 text-sm font-bold text-stone-700 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer hover:bg-stone-100 transition"
                                    value={order.status}
                                    onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                                >
                                    <option value="pending">⏳ Pending</option>
                                    <option value="processing">⚙️ Processing</option>
                                    <option value="shipped">🚚 Shipped</option>
                                    <option value="delivered">✅ Delivered</option>
                                </select>
                            </div>
                        </div>
                        <div className="bg-stone-50/50 p-6 rounded-2xl space-y-3 border border-stone-100">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm text-stone-600 font-medium">
                                    <span className="flex items-center gap-3">
                                      <span className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-xs font-bold border border-stone-200 shadow-sm">{item.quantity}</span> 
                                      {item.item.name}
                                    </span>
                                    <span>${item.item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export const ManageBookings = () => {
    const { bookings, updateBookingStatus } = useApp();
    return (
        <div className="space-y-8 reveal">
            <div>
              <h1 className="text-4xl font-serif font-bold text-stone-900">Bookings</h1>
              <p className="text-stone-500 mt-1 font-light">Manage store visits and consultations.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {bookings.map(booking => (
                    <div key={booking.id} className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-lg transition-all">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="font-bold text-xl text-stone-900">{booking.customerName}</h3>
                                <p className="text-stone-500 text-sm mt-1">{booking.email}</p>
                            </div>
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                                booking.status === 'confirmed' ? 'bg-green-50 text-green-700 border border-green-100' : 
                                booking.status === 'cancelled' ? 'bg-red-50 text-red-700 border border-red-100' : 
                                'bg-amber-50 text-amber-700 border border-amber-100'
                            }`}>
                                {booking.status}
                            </span>
                        </div>
                        
                        <div className="flex gap-4 mb-8">
                            <div className="bg-stone-50 p-4 rounded-2xl flex-1 border border-stone-100 text-center">
                                <span className="block text-xs text-stone-400 font-bold uppercase tracking-widest mb-1">Date</span>
                                <span className="font-bold text-stone-900">{booking.date}</span>
                            </div>
                            <div className="bg-stone-50 p-4 rounded-2xl flex-1 border border-stone-100 text-center">
                                <span className="block text-xs text-stone-400 font-bold uppercase tracking-widest mb-1">Time</span>
                                <span className="font-bold text-stone-900">{booking.time}</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            {booking.status === 'pending' && (
                                <>
                                    <button onClick={() => updateBookingStatus(booking.id, 'confirmed')} className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-emerald-700 transition shadow-lg">Confirm</button>
                                    <button onClick={() => updateBookingStatus(booking.id, 'cancelled')} className="flex-1 bg-stone-100 text-stone-600 py-3 rounded-xl font-bold text-sm hover:bg-red-50 hover:text-red-500 transition">Cancel</button>
                                </>
                            )}
                            {booking.status !== 'pending' && (
                                <button className="flex-1 bg-stone-50 text-stone-400 py-3 rounded-xl font-bold text-sm cursor-not-allowed border border-stone-100">Processed</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};