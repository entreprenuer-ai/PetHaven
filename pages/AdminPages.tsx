import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { Plus, Trash, Edit, Package, DollarSign, Users, ShoppingBag, Wand2, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Pet, Product } from '../types';
import { generatePetDescription } from '../services/geminiService';

// --- Dashboard Home ---

export const Dashboard = () => {
  const { pets, products, orders } = useApp();
  
  const stats = [
    { label: 'Total Sales', value: `$${orders.reduce((a, c) => a + c.total, 0)}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Available Pets', value: pets.filter(p => p.status === 'available').length, icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Low Stock Products', value: products.filter(p => p.stock < 5).length, icon: Package, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  const chartData = [
    { name: 'Mon', sales: 400 },
    { name: 'Tue', sales: 300 },
    { name: 'Wed', sales: 550 },
    { name: 'Thu', sales: 450 },
    { name: 'Fri', sales: 600 },
    { name: 'Sat', sales: 800 },
    { name: 'Sun', sales: 700 },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Store Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-80">
          <h3 className="font-semibold text-gray-700 mb-6">Weekly Sales</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: '#f3f4f6' }} />
              <Bar dataKey="sales" fill="#0d9488" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition border border-transparent hover:border-gray-100">
                 <div>
                   <p className="font-medium text-gray-900">{order.customerName}</p>
                   <p className="text-xs text-gray-500">{order.id} • {new Date(order.date).toLocaleDateString()}</p>
                 </div>
                 <div className="text-right">
                   <p className="font-bold text-gray-900">${order.total}</p>
                   <span className={`text-xs px-2 py-1 rounded-full ${
                     order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                   }`}>{order.status}</span>
                 </div>
              </div>
            ))}
            {orders.length === 0 && <p className="text-gray-400 text-sm">No recent orders</p>}
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
    category: 'dog', status: 'available', image: 'https://picsum.photos/400/400'
  });
  const [generating, setGenerating] = useState(false);

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
      setNewPet({ category: 'dog', status: 'available', image: 'https://picsum.photos/400/400' });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Inventory: Pets</h1>
        <button onClick={() => setShowAdd(!showAdd)} className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-700 transition">
          <Plus size={18} /> Add New Pet
        </button>
      </div>

      {showAdd && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 animate-fade-in-down">
          <h3 className="font-bold text-lg mb-4">Add New Pet</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Name" className="input-std" onChange={e => setNewPet({...newPet, name: e.target.value})} required />
            <select className="input-std" onChange={e => setNewPet({...newPet, category: e.target.value as any})} value={newPet.category}>
              <option value="dog">Dog</option><option value="cat">Cat</option><option value="bird">Bird</option><option value="fish">Fish</option>
            </select>
            <input placeholder="Breed" className="input-std" onChange={e => setNewPet({...newPet, breed: e.target.value})} required />
            <input placeholder="Age" className="input-std" onChange={e => setNewPet({...newPet, age: e.target.value})} required />
            <input type="number" placeholder="Price" className="input-std" onChange={e => setNewPet({...newPet, price: Number(e.target.value)})} required />
            <select className="input-std" onChange={e => setNewPet({...newPet, gender: e.target.value as any})}>
              <option value="Male">Male</option><option value="Female">Female</option>
            </select>
            <div className="md:col-span-2 relative">
              <textarea 
                placeholder="Description" 
                className="input-std w-full h-24 pr-10" 
                value={newPet.description || ''} 
                onChange={e => setNewPet({...newPet, description: e.target.value})} 
              />
              <button 
                type="button" 
                onClick={handleAiDescription}
                disabled={generating}
                className="absolute right-2 top-2 bg-purple-100 text-purple-600 p-2 rounded-md hover:bg-purple-200 transition"
                title="Generate with AI"
              >
                {generating ? <Loader2 className="animate-spin" size={16} /> : <Wand2 size={16} />}
              </button>
            </div>
            <button type="submit" className="md:col-span-2 bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700">Save Pet</button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Pet</th>
              <th className="p-4 font-semibold text-gray-600">Category</th>
              <th className="p-4 font-semibold text-gray-600">Price</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pets.map(pet => (
              <tr key={pet.id} className="hover:bg-gray-50">
                <td className="p-4 flex items-center gap-3">
                  <img src={pet.image} alt="" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-gray-900">{pet.name}</p>
                    <p className="text-xs text-gray-500">{pet.breed}</p>
                  </div>
                </td>
                <td className="p-4 capitalize text-gray-600">{pet.category}</td>
                <td className="p-4 font-medium text-gray-900">${pet.price}</td>
                <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-bold ${pet.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{pet.status}</span></td>
                <td className="p-4 text-right">
                  <button onClick={() => deleteItem(pet.id, 'pet')} className="text-gray-400 hover:text-red-500 transition"><Trash size={18} /></button>
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
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
            <div className="space-y-4">
                {orders.map(order => (
                    <div key={order.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
                            <div>
                                <h3 className="font-bold text-lg">{order.customerName} <span className="text-gray-400 text-sm font-normal">#{order.id}</span></h3>
                                <p className="text-gray-500 text-sm">{new Date(order.date).toLocaleString()}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="font-bold text-xl text-teal-600">${order.total}</span>
                                <select 
                                    className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none"
                                    value={order.status}
                                    onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm text-gray-600">
                                    <span>{item.quantity}x {item.item.name}</span>
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
