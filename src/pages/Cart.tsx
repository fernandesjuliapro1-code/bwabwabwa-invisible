import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Cart: React.FC = () => {
  const { items, total, updateQuantity, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="pt-48 pb-24 px-6 text-center min-h-screen bg-brand-white">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">VIDE.</h1>
        <p className="text-brand-gray font-light mb-12">Votre panier ne contient aucune pièce.</p>
        <Link to="/shop" className="inline-block py-4 px-12 bg-brand-black text-brand-white text-xs font-bold tracking-widest uppercase hover:bg-brand-burgundy transition-colors">
          RETOUR À LA BOUTIQUE
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-16">PANIER.</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          <div className="lg:col-span-2 space-y-12">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div 
                  key={`${item.product.id}-${item.size}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex gap-8 pb-12 border-b border-brand-black/10"
                >
                  <div className="w-32 md:w-48 aspect-[3/4] bg-gray-100 overflow-hidden">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl md:text-2xl font-bold tracking-tighter">{item.product.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.product.id, item.size)}
                          className="text-brand-gray hover:text-brand-burgundy transition-colors"
                        >
                          <Trash2 size={18} strokeWidth={1.5} />
                        </button>
                      </div>
                      <p className="text-[10px] tracking-widest text-brand-gray uppercase mb-4">Taille: {item.size}</p>
                      <p className="text-lg font-light">{item.product.price}€</p>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="flex items-center border border-brand-black/10">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-8 sticky top-32">
              <h2 className="text-[10px] tracking-widest font-bold uppercase mb-8">Récapitulatif</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm font-light">
                  <span>Sous-total</span>
                  <span>{total}€</span>
                </div>
                <div className="flex justify-between text-sm font-light">
                  <span>Livraison</span>
                  <span>Offerte</span>
                </div>
                <div className="pt-4 border-t border-brand-black/10 flex justify-between font-bold">
                  <span>TOTAL</span>
                  <span>{total}€</span>
                </div>
              </div>
              <Link to="/checkout" className="block w-full py-6 bg-brand-black text-brand-white text-center text-xs font-bold tracking-[0.3em] uppercase hover:bg-brand-burgundy transition-colors">
                COMMANDER
              </Link>
              <p className="mt-6 text-[10px] text-brand-gray text-center font-light">
                Paiement sécurisé. Livraison sous 3-5 jours ouvrés.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
