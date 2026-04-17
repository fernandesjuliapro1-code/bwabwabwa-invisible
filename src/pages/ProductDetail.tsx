import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { Size } from '../constants';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  if (!product) {
    return <div className="pt-32 text-center">Produit non trouvé.</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Veuillez sélectionner une taille');
      return;
    }
    addToCart(product, selectedSize);
  };

  const similarProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 2);

  return (
    <div className="pt-24 pb-24 px-6 md:px-12 bg-brand-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[10px] tracking-widest font-bold mb-12 hover:opacity-50 transition-opacity"
        >
          <ArrowLeft size={14} /> RETOUR
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Images Gallery - Lookbook Style */}
          <div className="space-y-12">
            {product.images.map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="aspect-[3/4] bg-gray-100 overflow-hidden"
              >
                <img 
                  src={img} 
                  alt={`${product.name} view ${idx + 1}`} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>

          {/* Info - Sticky on Desktop */}
          <div className="flex flex-col lg:sticky lg:top-32 lg:h-fit">
            <div className="mb-12">
              <p className="text-brand-gray text-[10px] tracking-[0.3em] uppercase mb-4">{product.category}</p>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">{product.name}</h1>
              <p className="text-2xl font-light">{product.price}€</p>
            </div>

            <div className="space-y-12 mb-16">
              <div>
                <h3 className="text-[10px] tracking-widest font-bold uppercase mb-4">Description</h3>
                <p className="text-brand-gray font-light leading-relaxed">{product.description}</p>
              </div>

              <div>
                <h3 className="text-[10px] tracking-widest font-bold uppercase mb-4">Concept</h3>
                <p className="text-brand-black font-light italic leading-relaxed">"{product.concept}"</p>
              </div>

              <div>
                <h3 className="text-[10px] tracking-widest font-bold uppercase mb-4">Taille</h3>
                <div className="flex flex-wrap gap-4">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "w-12 h-12 flex items-center justify-center border text-xs transition-all",
                        selectedSize === size 
                          ? "bg-brand-black text-brand-white border-brand-black" 
                          : "border-brand-black/10 hover:border-brand-black"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full py-6 bg-brand-black text-brand-white text-xs font-bold tracking-[0.3em] hover:bg-brand-burgundy transition-colors"
              >
                AJOUTER AU PANIER
              </button>
            </div>

            {/* Suggestions */}
            {similarProducts.length > 0 && (
              <div className="border-t border-brand-black/10 pt-12">
                <h3 className="text-[10px] tracking-widest font-bold uppercase mb-8">Pièces similaires</h3>
                <div className="grid grid-cols-2 gap-8">
                  {similarProducts.map(p => (
                    <Link key={p.id} to={`/product/${p.id}`} className="group">
                      <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="text-xs font-bold tracking-tighter">{p.name}</h4>
                      <p className="text-[10px] font-light">{p.price}€</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
