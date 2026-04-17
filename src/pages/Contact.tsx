import React from 'react';
import { motion } from 'motion/react';
import { Send } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-white min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div>
          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-8">CONTACT.</h1>
          <p className="text-brand-gray text-lg font-light max-w-md mb-12">
            Pour toute demande relative à nos pièces, collaborations ou presse. Nous répondons avec la même discrétion que nos créations.
          </p>
          
          <div className="space-y-8 text-sm tracking-widest uppercase">
            <div>
              <p className="text-brand-gray mb-2">Email</p>
              <p className="font-bold">contact@invisible-studio.com</p>
            </div>
            <div>
              <p className="text-brand-gray mb-2">Atelier</p>
              <p className="font-bold">Tokyo / Paris</p>
            </div>
            <div>
              <p className="text-brand-gray mb-2">Instagram</p>
              <p className="font-bold">@invisible_minimal</p>
            </div>
          </div>
        </div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="space-y-2">
            <label className="text-[10px] tracking-widest font-bold uppercase">Nom</label>
            <input 
              type="text" 
              className="w-full bg-transparent border-b border-brand-black/20 py-4 focus:border-brand-black outline-none transition-colors font-light"
              placeholder="VOTRE NOM"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] tracking-widest font-bold uppercase">Email</label>
            <input 
              type="email" 
              className="w-full bg-transparent border-b border-brand-black/20 py-4 focus:border-brand-black outline-none transition-colors font-light"
              placeholder="VOTRE EMAIL"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] tracking-widest font-bold uppercase">Message</label>
            <textarea 
              rows={4}
              className="w-full bg-transparent border-b border-brand-black/20 py-4 focus:border-brand-black outline-none transition-colors font-light resize-none"
              placeholder="VOTRE MESSAGE"
            />
          </div>
          
          <button className="group flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase">
            ENVOYER <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </motion.form>
      </div>
    </div>
  );
};
