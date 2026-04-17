import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useProducts } from '../context/ProductContext';
import { Category, Size } from '../constants';
import { cn } from '../lib/utils';

export const Shop: React.FC = () => {
  const { products } = useProducts();
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [activeSize, setActiveSize] = useState<Size | 'all'>('all');

  const categories: (Category | 'all')[] = ['all', 'chemise', 'pantalon', 'chaussures', 'cardigan'];
  const sizes: (Size | 'all')[] = ['all', 'XS', 'S', 'M', 'L', 'XL'];

  const filteredProducts = products.filter(product => {
    const categoryMatch = activeCategory === 'all' || product.category === activeCategory;
    const sizeMatch = activeSize === 'all' || product.sizes.includes(activeSize as Size);
    return categoryMatch && sizeMatch;
  });

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 min-h-screen bg-brand-white">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">BOUTIQUE</h1>
          
          <div className="flex flex-col md:flex-row gap-12 border-t border-brand-black/10 pt-8">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] tracking-widest text-brand-gray uppercase">Catégories</span>
              <div className="flex flex-wrap gap-4">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "text-xs tracking-widest uppercase transition-all",
                      activeCategory === cat ? "font-bold underline underline-offset-4" : "font-light opacity-50 hover:opacity-100"
                    )}
                  >
                    {cat === 'all' ? 'Tout' : cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-[10px] tracking-widest text-brand-gray uppercase">Tailles</span>
              <div className="flex flex-wrap gap-4">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setActiveSize(size)}
                    className={cn(
                      "text-xs tracking-widest uppercase transition-all",
                      activeSize === size ? "font-bold underline underline-offset-4" : "font-light opacity-50 hover:opacity-100"
                    )}
                  >
                    {size === 'all' ? 'Tout' : size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <Link to={`/product/${product.id}`} className="group block">
                  <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-6 relative">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/5 transition-colors" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold tracking-tighter">{product.name}</h3>
                      <p className="text-brand-gray text-[10px] tracking-widest uppercase">{product.category}</p>
                    </div>
                    <span className="text-sm font-light">{product.price}€</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-brand-gray font-light italic">Aucune pièce ne correspond à votre sélection.</p>
          </div>
        )}
      </div>
    </div>
  );
};
