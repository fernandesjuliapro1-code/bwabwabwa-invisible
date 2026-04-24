import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const LOOKBOOK_IMAGES = [
  '/images/baba.jpeg',
  '/images/chemise_01.jpeg',
  '/images/pantalon_04.jpeg',
  '/images/cardigan_02.jpeg',
  '/images/chaussures_01.jpeg',
  '/images/chemise_02.jpeg',
  '/images/pantalon_02.jpeg',
  '/images/chemise_03.jpeg',
  '/images/chaussures_02.jpeg',
  '/images/cardigan_01.jpeg',
];

export const Lookbook: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-black text-brand-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24 text-center">
          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-4">LOOKBOOK</h1>
          <p className="text-brand-gray text-[10px] tracking-[0.5em] uppercase">Saison 01 — Silence</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {LOOKBOOK_IMAGES.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx % 2 * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className={cn(
                "aspect-[3/4] overflow-hidden bg-white/5",
                idx % 3 === 0 ? "md:col-span-2 md:aspect-[16/9]" : ""
              )}
            >
              <img 
                src={img} 
                alt={`Lookbook ${idx}`} 
                className="w-full h-full object-cover grayscale hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>

        <footer className="mt-32 text-center py-24 border-t border-white/10">
          <p className="text-2xl md:text-4xl font-light italic tracking-tight max-w-2xl mx-auto">
            "Le vêtement n'est pas une parure, c'est une extension du silence intérieur."
          </p>
        </footer>
      </div>
    </div>
  );
};
