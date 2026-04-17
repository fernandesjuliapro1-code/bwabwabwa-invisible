import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { items } = useCart();
  const location = useLocation();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'BOUTIQUE', path: '/shop' },
    { name: 'LOOKBOOK', path: '/lookbook' },
    { name: 'À PROPOS', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-white py-8 px-6 md:px-12 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold tracking-[0.2em]">INVISIBLE</Link>
      
      <div className="hidden md:flex gap-12 text-xs font-light tracking-widest">
        {navLinks.map(link => (
          <Link 
            key={link.path} 
            to={link.path}
            className={cn(
              "hover:opacity-50 transition-opacity",
              location.pathname === link.path && "underline underline-offset-8"
            )}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <Link to="/cart" className="relative">
          <ShoppingBag size={20} strokeWidth={1} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 text-[10px] bg-white text-black w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </Link>
        <button className="md:hidden" onClick={() => setIsOpen(true)}>
          <Menu size={20} strokeWidth={1} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-brand-black text-brand-white z-[60] flex flex-col p-12"
          >
            <div className="flex justify-between items-center mb-24">
              <span className="text-2xl font-bold tracking-[0.2em]">INVISIBLE</span>
              <button onClick={() => setIsOpen(false)}>
                <X size={24} strokeWidth={1} />
              </button>
            </div>
            <div className="flex flex-col gap-8 text-4xl font-bold tracking-tighter">
              {navLinks.map(link => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className="hover:italic transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
