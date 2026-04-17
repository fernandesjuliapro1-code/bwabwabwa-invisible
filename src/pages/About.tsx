import React from 'react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-7xl md:text-9xl font-bold tracking-tighter mb-16"
        >
          CONCEPT.
        </motion.h1>

        <div className="space-y-16 text-lg md:text-2xl font-light leading-relaxed">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="font-bold">INVISIBLE</span> est une réponse au bruit visuel permanent. Nous croyons que l'identité ne devrait pas être dictée par un logo, mais par la qualité intrinsèque de ce que nous portons.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12 border-y border-brand-black/10"
          >
            <div>
              <h3 className="text-[10px] tracking-widest font-bold uppercase mb-4">L'Approche</h3>
              <p className="text-sm text-brand-gray leading-relaxed">
                Inspirés par le minimalisme radical et le streetwear japonais contemporain, nous créons des pièces qui privilégient la structure, la texture et le mouvement. Chaque couture est pensée, chaque étiquette est dissimulée.
              </p>
            </div>
            <div>
              <h3 className="text-[10px] tracking-widest font-bold uppercase mb-4">La Signature</h3>
              <p className="text-sm text-brand-gray leading-relaxed">
                Notre signature est invisible pour l'œil non averti. C'est une coupe particulière, un tombé de tissu, une sensation sur la peau. C'est le luxe de la discrétion.
              </p>
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Le vêtement est le langage. Nous ne parlons pas, nous créons des formes qui habitent le silence.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-24 aspect-video bg-gray-100 overflow-hidden"
        >
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1500" 
            alt="Atelier" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
    </div>
  );
};
