import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

export const Home: React.FC = () => {
  const { products } = useProducts();
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="h-screen w-full relative overflow-hidden bg-brand-black flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <img 
            src="/images/baba.jpeg" 
            alt="Hero" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-brand-white text-6xl md:text-9xl font-bold tracking-tighter mb-4"
          >
            SILENCE.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-brand-white text-xs md:text-sm tracking-[0.5em] font-light uppercase"
          >
            Le vêtement est l'identité.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="w-[1px] h-24 bg-brand-white/30 relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 96] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-12 bg-brand-white"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-32 px-6 md:px-12 bg-brand-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">SÉLECTION</h2>
              <p className="text-brand-gray text-xs tracking-widest mt-2 uppercase">Essentiels de saison</p>
            </div>
            <Link to="/shop" className="group flex items-center gap-2 text-xs font-bold tracking-widest">
              VOIR TOUT <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {products.slice(0, 3).map((product, index) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Link to={`/product/${product.id}`} className="group block">
                  <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-6">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
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
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section className="py-32 px-6 md:px-12 bg-brand-black text-brand-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
              L'ABSENCE <br /> DE LOGO <br /> EST NOTRE <br /> SIGNATURE.
            </h2>
            <p className="text-brand-gray text-sm md:text-base font-light leading-relaxed max-w-md">
              Nous refusons la visibilité facile. Nos pièces sont conçues pour ceux qui apprécient la texture, la coupe et le détail invisible. Le vêtement ne doit pas crier, il doit murmurer.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-square bg-brand-burgundy/20 relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1000" 
              alt="Concept" 
              className="w-full h-full object-cover grayscale mix-blend-overlay"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Klaviyo Newsletter Section */}
      <section className="py-24 px-6 bg-brand-white border-t border-brand-black/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-8 uppercase">Newsletter Invisible</h2>
          <div className="klaviyo-form-UGnS8v"></div>
          <p className="text-brand-gray text-[10px] tracking-widest uppercase mt-8">Rejoignez le silence. Soyez informé des sorties exclusives.</p>
        </div>
      </section>
    </div>
  );
};
