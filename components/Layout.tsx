import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Dog, LayoutDashboard, LogOut, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AiAssistant from './AiAssistant';

const Navbar: React.FC = () => {
  const { cart, isAdmin, toggleAdmin } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path ? 'text-teal-600 font-semibold' : 'text-gray-600 hover:text-teal-500';

  return (
    <nav className="bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm backdrop-blur-lg bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-teal-100 p-2 rounded-lg">
              <Dog className="h-6 w-6 text-teal-600" />
            </div>
            <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600">
              PetHaven
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/shop?type=pet" className={isActive('/shop')}>Find a Pet</Link>
            <Link to="/shop?type=product" className={isActive('/shop')}>Supplies</Link>
            {isAdmin && <Link to="/admin" className={isActive('/admin')}>Dashboard</Link>}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
              <ShoppingBag className="h-6 w-6 text-gray-600 hover:text-teal-600 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </div>
            
            <button 
              onClick={toggleAdmin}
              className="text-xs px-3 py-1 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-500 transition"
            >
              {isAdmin ? 'Exit Admin' : 'Staff Login'}
            </button>
          </div>

          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600">
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in-down">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50">Home</Link>
            <Link to="/shop?type=pet" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50">Find a Pet</Link>
            <Link to="/shop?type=product" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50">Supplies</Link>
            <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50">Cart ({cartCount})</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-gray-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
            <Dog className="text-teal-500" /> PetHaven
          </h3>
          <p className="text-sm text-gray-400">Connecting loving families with perfect pets since 2024.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop?type=pet" className="hover:text-teal-400">Adopt a Pet</Link></li>
            <li><Link to="/shop?type=product" className="hover:text-teal-400">Pet Food</Link></li>
            <li><Link to="/shop?type=product" className="hover:text-teal-400">Accessories</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-teal-400">Contact Us</a></li>
            <li><a href="#" className="hover:text-teal-400">Visit Booking</a></li>
            <li><a href="#" className="hover:text-teal-400">Shipping Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Newsletter</h4>
          <div className="flex">
            <input type="email" placeholder="Your email" className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none w-full text-sm" />
            <button className="bg-teal-600 px-4 py-2 rounded-r-md hover:bg-teal-700 transition">Go</button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs text-gray-500">
        © 2024 PetHaven. All rights reserved.
      </div>
    </div>
  </footer>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <AiAssistant />
    </div>
  );
};