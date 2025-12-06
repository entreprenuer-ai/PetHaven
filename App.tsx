import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, Link, useNavigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import { Home, Shop, ItemDetails, Cart, Contact, BookVisit, UserProfile } from './pages/PublicPages';
import { Dashboard, ManagePets, ManageProducts, ManageOrders, ManageBookings, AdminLogin } from './pages/AdminPages';
import { LayoutDashboard, Dog, ShoppingBag, LogOut, Package, Calendar, Settings } from 'lucide-react';

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useApp();
  return isAdmin ? <>{children}</> : <Navigate to="/admin-login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/details/:type/:id" element={<ItemDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/book-visit" element={<BookVisit />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute><div className="flex min-h-screen bg-stone-50"><AdminSidebar /><div className="flex-1 p-8 overflow-y-auto"><Dashboard /></div></div></AdminRoute>} />
      <Route path="/admin/pets" element={<AdminRoute><div className="flex min-h-screen bg-stone-50"><AdminSidebar /><div className="flex-1 p-8 overflow-y-auto"><ManagePets /></div></div></AdminRoute>} />
      <Route path="/admin/products" element={<AdminRoute><div className="flex min-h-screen bg-stone-50"><AdminSidebar /><div className="flex-1 p-8 overflow-y-auto"><ManageProducts /></div></div></AdminRoute>} />
      <Route path="/admin/orders" element={<AdminRoute><div className="flex min-h-screen bg-stone-50"><AdminSidebar /><div className="flex-1 p-8 overflow-y-auto"><ManageOrders /></div></div></AdminRoute>} />
      <Route path="/admin/bookings" element={<AdminRoute><div className="flex min-h-screen bg-stone-50"><AdminSidebar /><div className="flex-1 p-8 overflow-y-auto"><ManageBookings /></div></div></AdminRoute>} />
    </Routes>
  );
};

// Simple sidebar for Admin layout specific to App.tsx
const AdminSidebar = () => {
    const { toggleAdmin } = useApp();
    const location = useLocation();
    const navigate = useNavigate();
    
    const isActive = (path: string) => location.pathname === path 
      ? "bg-white text-stone-900 shadow-md" 
      : "text-stone-400 hover:text-white";

    const linkClass = "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm mb-2";

    const handleLogout = () => {
      toggleAdmin(false);
      navigate('/');
    };

    return (
        <aside className="w-72 bg-stone-950 text-white flex-shrink-0 hidden md:flex flex-col border-r border-stone-900">
            <div className="p-8">
               <div className="flex items-center gap-2 mb-10">
                 <span className="font-serif font-black text-2xl tracking-tight">PET<span className="text-emerald-500">HAVEN</span></span>
               </div>
               
               <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-4 pl-2">Store</p>
               <nav className="mb-8">
                  <Link to="/admin" className={`${linkClass} ${isActive('/admin')}`}>
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>
                  <Link to="/admin/orders" className={`${linkClass} ${isActive('/admin/orders')}`}>
                    <ShoppingBag size={18} /> Orders
                  </Link>
                  <Link to="/admin/bookings" className={`${linkClass} ${isActive('/admin/bookings')}`}>
                    <Calendar size={18} /> Bookings
                  </Link>
               </nav>

               <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-4 pl-2">Inventory</p>
               <nav>
                  <Link to="/admin/pets" className={`${linkClass} ${isActive('/admin/pets')}`}>
                    <Dog size={18} /> Pets
                  </Link>
                  <Link to="/admin/products" className={`${linkClass} ${isActive('/admin/products')}`}>
                    <Package size={18} /> Products
                  </Link>
               </nav>
            </div>
            <div className="mt-auto p-6 border-t border-stone-900">
                <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-stone-900 text-stone-400 py-3 rounded-xl hover:bg-red-900/20 hover:text-red-500 transition text-sm font-semibold">
                  <LogOut size={16} /> Logout
                </button>
            </div>
        </aside>
    );
};

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </HashRouter>
    </AppProvider>
  );
}