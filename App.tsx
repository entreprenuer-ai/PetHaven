import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import { Home, Shop, ItemDetails, Cart } from './pages/PublicPages';
import { Dashboard, ManagePets, ManageOrders } from './pages/AdminPages';

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useApp();
  return isAdmin ? <>{children}</> : <Navigate to="/" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/details/:type/:id" element={<ItemDetails />} />
      <Route path="/cart" element={<Cart />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute><div className="flex min-h-screen bg-gray-50"><AdminSidebar /><div className="flex-1 p-8 overflow-y-auto"><Dashboard /></div></div></AdminRoute>} />
      <Route path="/admin/pets" element={<AdminRoute><div className="flex min-h-screen bg-gray-50"><AdminSidebar /><div className="flex-1 p-8 overflow-y-auto"><ManagePets /></div></div></AdminRoute>} />
      <Route path="/admin/orders" element={<AdminRoute><div className="flex min-h-screen bg-gray-50"><AdminSidebar /><div className="flex-1 p-8 overflow-y-auto"><ManageOrders /></div></div></AdminRoute>} />
    </Routes>
  );
};

// Simple sidebar for Admin layout specific to App.tsx to avoid circular deps
const AdminSidebar = () => {
    const { toggleAdmin } = useApp();
    const linkClass = "flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition mb-1";
    return (
        <aside className="w-64 bg-gray-900 text-white flex-shrink-0 hidden md:block">
            <div className="p-6 font-bold text-xl tracking-wide text-teal-400">PetHaven Admin</div>
            <nav className="px-4 mt-4">
                <a href="#/admin" className={linkClass}>Dashboard</a>
                <a href="#/admin/pets" className={linkClass}>Pets Inventory</a>
                <a href="#/admin/orders" className={linkClass}>Orders</a>
            </nav>
            <div className="absolute bottom-8 left-4 right-4">
                <button onClick={toggleAdmin} className="w-full bg-red-600/20 text-red-400 py-2 rounded-lg hover:bg-red-600/30 transition text-sm font-semibold">Logout</button>
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