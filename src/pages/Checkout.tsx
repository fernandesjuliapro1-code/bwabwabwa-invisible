import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, CreditCard, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';

export const Checkout: React.FC = () => {
  const { total, clearCart } = useCart();
  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    clearCart();
  };

  if (step === 'success') {
    return (
      <div className="pt-48 pb-24 px-6 text-center min-h-screen bg-brand-white">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md mx-auto"
        >
          <CheckCircle2 size={64} className="mx-auto mb-8 text-brand-black" strokeWidth={1} />
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">MERCI.</h1>
          <p className="text-brand-gray font-light mb-12 leading-relaxed">
            Votre commande a été enregistrée. Un email de confirmation vous a été envoyé. Le silence est en route.
          </p>
          <a href="/" className="inline-block py-4 px-12 bg-brand-black text-brand-white text-xs font-bold tracking-widest uppercase hover:bg-brand-burgundy transition-colors">
            RETOUR À L'ACCUEIL
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-16">PAIEMENT.</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <div className="space-y-12">
            <div className="flex gap-8 mb-12">
              <span className={cn("text-[10px] font-bold tracking-widest uppercase pb-2 border-b-2 transition-all", step === 'info' ? "border-brand-black" : "border-transparent opacity-30")}>01. Informations</span>
              <span className={cn("text-[10px] font-bold tracking-widest uppercase pb-2 border-b-2 transition-all", step === 'payment' ? "border-brand-black" : "border-transparent opacity-30")}>02. Paiement</span>
            </div>

            {step === 'info' ? (
              <form className="space-y-8" onSubmit={() => setStep('payment')}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest font-bold uppercase">Prénom</label>
                    <input required type="text" className="w-full bg-transparent border-b border-brand-black/20 py-3 focus:border-brand-black outline-none font-light" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest font-bold uppercase">Nom</label>
                    <input required type="text" className="w-full bg-transparent border-b border-brand-black/20 py-3 focus:border-brand-black outline-none font-light" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest font-bold uppercase">Email</label>
                  <input required type="email" className="w-full bg-transparent border-b border-brand-black/20 py-3 focus:border-brand-black outline-none font-light" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest font-bold uppercase">Adresse</label>
                  <input required type="text" className="w-full bg-transparent border-b border-brand-black/20 py-3 focus:border-brand-black outline-none font-light" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest font-bold uppercase">Ville</label>
                    <input required type="text" className="w-full bg-transparent border-b border-brand-black/20 py-3 focus:border-brand-black outline-none font-light" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest font-bold uppercase">Code Postal</label>
                    <input required type="text" className="w-full bg-transparent border-b border-brand-black/20 py-3 focus:border-brand-black outline-none font-light" />
                  </div>
                </div>
                <button type="submit" className="w-full py-6 bg-brand-black text-brand-white text-xs font-bold tracking-[0.3em] uppercase hover:bg-brand-burgundy transition-colors">
                  CONTINUER
                </button>
              </form>
            ) : (
              <form className="space-y-8" onSubmit={handlePayment}>
                <div className="p-6 border border-brand-black flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <CreditCard size={20} />
                    <span className="text-xs font-bold tracking-widest uppercase">Carte Bancaire</span>
                  </div>
                  <ShieldCheck size={20} className="text-brand-gray" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest font-bold uppercase">Numéro de carte</label>
                  <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-transparent border-b border-brand-black/20 py-3 focus:border-brand-black outline-none font-light" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest font-bold uppercase">Expiration</label>
                    <input required type="text" placeholder="MM/YY" className="w-full bg-transparent border-b border-brand-black/20 py-3 focus:border-brand-black outline-none font-light" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest font-bold uppercase">CVC</label>
                    <input required type="text" placeholder="000" className="w-full bg-transparent border-b border-brand-black/20 py-3 focus:border-brand-black outline-none font-light" />
                  </div>
                </div>
                <button type="submit" className="w-full py-6 bg-brand-black text-brand-white text-xs font-bold tracking-[0.3em] uppercase hover:bg-brand-burgundy transition-colors">
                  PAYER {total}€
                </button>
                <button type="button" onClick={() => setStep('info')} className="w-full text-[10px] font-bold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">
                  RETOUR AUX INFORMATIONS
                </button>
              </form>
            )}
          </div>

          <div className="hidden md:block">
            <div className="bg-gray-50 p-8 sticky top-32">
              <h2 className="text-[10px] tracking-widest font-bold uppercase mb-8">Votre Commande</h2>
              <div className="space-y-4">
                <div className="flex justify-between font-bold text-xl tracking-tighter pt-4 border-t border-brand-black/10">
                  <span>TOTAL</span>
                  <span>{total}€</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
