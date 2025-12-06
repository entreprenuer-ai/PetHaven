import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Dog, Instagram, Facebook, Twitter, ArrowRight, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AiAssistant from './AiAssistant';

// --- Custom Magnetic Cursor ---
const CustomCursor = () => {
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorOutlineRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);
  
    useEffect(() => {
      const moveCursor = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        
        // Dot follows instantly
        if (cursorDotRef.current) {
          cursorDotRef.current.style.left = `${clientX}px`;
          cursorDotRef.current.style.top = `${clientY}px`;
        }
        
        // Outline follows with slight delay (handled by CSS transition mostly, but position needs JS)
        if (cursorOutlineRef.current) {
            cursorOutlineRef.current.animate({
                left: `${clientX}px`,
                top: `${clientY}px`
            }, { duration: 500, fill: 'forwards' });
        }
      };
  
      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName.toLowerCase() === 'a' || 
            target.tagName.toLowerCase() === 'button' ||
            target.closest('a') || 
            target.closest('button')) {
          setHovered(true);
        } else {
          setHovered(false);
        }
      };
  
      window.addEventListener('mousemove', moveCursor);
      window.addEventListener('mouseover', handleMouseOver);
  
      return () => {
        window.removeEventListener('mousemove', moveCursor);
        window.removeEventListener('mouseover', handleMouseOver);
      };
    }, []);
  
    return (
      <div className="hidden md:block">
        <div ref={cursorDotRef} className="cursor-dot" />
        <div ref={cursorOutlineRef} className={`cursor-outline ${hovered ? 'hovered' : ''}`} />
      </div>
    );
};

const Navbar: React.FC = () => {
  const { cart, isAdmin } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => 
    location.pathname === path 
      ? 'text-stone-900 font-bold' 
      : 'text-stone-500 hover:text-stone-900 font-medium';

  if (isAdminPage) return null;

  return (
    <>
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out flex justify-center ${scrolled ? 'pt-4' : 'pt-8'}`}>
      <div className={`
        transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
        ${scrolled 
          ? 'w-[90%] md:w-[60%] glass-nav rounded-full px-8 py-3 shadow-lg' 
          : 'w-full max-w-[1400px] px-8 py-4 bg-transparent'
        }
      `}>
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => navigate('/')}>
            <span className="text-xl font-serif font-black tracking-tighter text-stone-900 group-hover:text-emerald-700 transition-colors">
              PET<span className="text-emerald-600">HAVEN</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-12">
            <Link to="/" className={`${isActive('/')} text-xs uppercase tracking-widest transition-all relative group`}>
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-stone-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/shop?type=pet" className={`${isActive('/shop')} text-xs uppercase tracking-widest transition-all relative group`}>
              Pets
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-stone-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/shop?type=product" className={`${isActive('/shop')} text-xs uppercase tracking-widest transition-all relative group`}>
              Supplies
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-stone-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-6">
            {!isAdmin && (
                <Link to="/admin-login" className="text-[10px] font-bold text-stone-300 hover:text-stone-900 transition-colors uppercase tracking-wider">
                    Staff
                </Link>
            )}
            {isAdmin && (
                <Link to="/admin" className="text-xs px-4 py-1.5 rounded-full bg-stone-900 text-white font-bold border border-stone-900">
                    Dashboard
                </Link>
            )}
            
            <Link to="/profile" className="p-2 rounded-full hover:bg-stone-100 transition-colors">
                <User className="h-5 w-5 text-stone-900" />
            </Link>

            <button 
              className="relative p-2 rounded-full hover:bg-stone-100 transition-colors group" 
              onClick={() => navigate('/cart')}
            >
              <ShoppingBag className="h-5 w-5 text-stone-900" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-stone-900 p-2 hover:bg-stone-100 rounded-full transition">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>

    {/* Mobile Menu Overlay */}
    {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-[#FAFAF9] animate-fade-in-up flex flex-col items-center justify-center space-y-8">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-serif font-black text-stone-900">HOME</Link>
            <Link to="/shop?type=pet" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-serif font-black text-stone-900">PETS</Link>
            <Link to="/shop?type=product" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-serif font-black text-stone-900">SUPPLIES</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-serif font-black text-stone-900">CONTACT</Link>
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-8 p-4 bg-stone-200 rounded-full">
                <X size={24} />
            </button>
        </div>
    )}
    </>
  );
};

const Footer: React.FC = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;

  return (
  <footer className="bg-stone-950 text-white pt-32 pb-12 overflow-hidden relative rounded-t-[3rem]">
    <div className="max-w-[1400px] mx-auto px-6 relative z-10">
      
      {/* Giant Footer Title */}
      <div className="mb-24 border-b border-stone-800 pb-16">
        <h2 className="text-[12vw] leading-[0.8] font-serif font-black text-stone-800 opacity-30 select-none pointer-events-none text-center lg:text-left">
            PETHAVEN
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
        
        <div className="md:col-span-4 space-y-8">
          <p className="text-stone-400 text-lg leading-relaxed max-w-sm font-light">
            An avant-garde approach to ethical pet adoption and premium lifestyle supplies.
          </p>
          <div className="flex gap-4">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-full border border-stone-800 flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-600 hover:text-white transition-all duration-300 group">
                    <Icon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 md:col-start-7">
          <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-stone-500">Explore</h4>
          <ul className="space-y-4 text-stone-300">
            <li><Link to="/shop?type=pet" className="hover:text-emerald-400 transition-colors">Adopt</Link></li>
            <li><Link to="/shop?type=product" className="hover:text-emerald-400 transition-colors">Shop</Link></li>
            <li><Link to="/about" className="hover:text-emerald-400 transition-colors">Story</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-stone-500">Support</h4>
          <ul className="space-y-4 text-stone-300">
            <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
            <li><Link to="/book-visit" className="hover:text-emerald-400 transition-colors">Book Visit</Link></li>
            <li><Link to="/faq" className="hover:text-emerald-400 transition-colors">Legal</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
             <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-stone-500">Stay Updated</h4>
             <div className="flex flex-col gap-3">
                 <div className="relative">
                    <input type="email" placeholder="Email address" className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-emerald-600 transition-colors" />
                    <button className="absolute right-2 top-2 bottom-2 bg-emerald-600 text-white rounded-lg px-4 flex items-center justify-center hover:bg-emerald-500 transition-colors">
                        <ArrowRight size={18} />
                    </button>
                 </div>
             </div>
        </div>
      </div>
      
      <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-stone-600 text-xs font-bold uppercase tracking-widest">
        <p>&copy; 2024 PET HAVEN INC.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
)};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-emerald-500 selection:text-white cursor-none">
      <CustomCursor />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <AiAssistant />
    </div>
  );
};