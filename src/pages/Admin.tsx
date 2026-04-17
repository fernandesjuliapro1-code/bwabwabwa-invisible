import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon, RefreshCcw } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { Product, Category, Size } from '../constants';
import { cn } from '../lib/utils';

export const Admin: React.FC = () => {
  const { products, updateProduct, addProduct, deleteProduct, resetProducts } = useProducts();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };

  const handleSave = () => {
    if (editForm) {
      if (editingId === 'new') {
        addProduct({ ...editForm, id: Math.random().toString(36).substr(2, 9) });
      } else {
        updateProduct(editForm);
      }
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleAddNew = () => {
    const newProduct: Product = {
      id: 'new',
      name: 'NOUVEAU PRODUIT',
      category: 'chemise',
      price: 0,
      description: '',
      concept: '',
      images: [''],
      sizes: ['M']
    };
    setEditingId('new');
    setEditForm(newProduct);
  };

  const updateImage = (index: number, value: string) => {
    if (editForm) {
      const newImages = [...editForm.images];
      newImages[index] = value;
      setEditForm({ ...editForm, images: newImages });
    }
  };

  const addImageField = () => {
    if (editForm) {
      setEditForm({ ...editForm, images: [...editForm.images, ''] });
    }
  };

  const removeImageField = (index: number) => {
    if (editForm && editForm.images.length > 1) {
      const newImages = editForm.images.filter((_, i) => i !== index);
      setEditForm({ ...editForm, images: newImages });
    }
  };

  const toggleSize = (size: Size) => {
    if (editForm) {
      const newSizes = editForm.sizes.includes(size)
        ? editForm.sizes.filter(s => s !== size)
        : [...editForm.sizes, size];
      setEditForm({ ...editForm, sizes: newSizes as Size[] });
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">GESTION.</h1>
            <p className="text-brand-gray text-[10px] tracking-widest uppercase mt-4">Inventaire & Visuels</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => {
                if(confirm('Réinitialiser tous les produits aux valeurs par défaut (images locales) ?')) {
                  resetProducts();
                }
              }}
              className="flex items-center gap-2 px-6 py-3 border border-brand-black text-[10px] font-bold tracking-widest uppercase hover:bg-gray-100 transition-colors"
            >
              <RefreshCcw size={14} /> Réinitialiser
            </button>
            <button 
              onClick={handleAddNew}
              className="flex items-center gap-2 px-6 py-3 bg-brand-black text-brand-white text-[10px] font-bold tracking-widest uppercase hover:bg-brand-burgundy transition-colors"
            >
              <Plus size={14} /> Ajouter une pièce
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {products.map(product => (
            <div key={product.id} className="border border-brand-black/10 p-8 flex flex-col md:flex-row gap-8 items-start">
              <div className="w-32 aspect-[3/4] bg-gray-100 overflow-hidden flex-shrink-0">
                <img src={product.images[0]} alt="" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
              </div>
              
              <div className="flex-grow space-y-2">
                <h3 className="text-2xl font-bold tracking-tighter">{product.name}</h3>
                <p className="text-xs text-brand-gray uppercase tracking-widest">{product.category} — {product.price}€</p>
                <p className="text-sm font-light text-brand-gray line-clamp-2 max-w-2xl">{product.description}</p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => handleEdit(product)}
                  className="p-3 border border-brand-black/10 hover:bg-brand-black hover:text-brand-white transition-all"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => deleteProduct(product.id)}
                  className="p-3 border border-brand-black/10 hover:bg-brand-burgundy hover:text-brand-white transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingId && editForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-black/90 z-[100] flex items-center justify-center p-6 overflow-y-auto"
          >
            <motion.div 
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              className="bg-brand-white w-full max-w-4xl p-8 md:p-12 max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-4xl font-bold tracking-tighter">ÉDITION PIÈCE</h2>
                <button onClick={() => setEditingId(null)}><X size={24} /></button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase">Nom de la pièce</label>
                    <input 
                      type="text" 
                      value={editForm.name}
                      onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full bg-transparent border-b border-brand-black/20 py-2 focus:border-brand-black outline-none font-light"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-widest uppercase">Prix (€)</label>
                      <input 
                        type="number" 
                        value={editForm.price}
                        onChange={e => setEditForm({ ...editForm, price: Number(e.target.value) })}
                        className="w-full bg-transparent border-b border-brand-black/20 py-2 focus:border-brand-black outline-none font-light"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-widest uppercase">Catégorie</label>
                      <select 
                        value={editForm.category}
                        onChange={e => setEditForm({ ...editForm, category: e.target.value as Category })}
                        className="w-full bg-transparent border-b border-brand-black/20 py-2 focus:border-brand-black outline-none font-light uppercase text-xs tracking-widest"
                      >
                        <option value="chemise">Chemise</option>
                        <option value="pantalon">Pantalon</option>
                        <option value="chaussures">Chaussures</option>
                        <option value="cardigan">Cardigan</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase">Description</label>
                    <textarea 
                      value={editForm.description}
                      onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                      rows={3}
                      className="w-full bg-transparent border border-brand-black/10 p-4 focus:border-brand-black outline-none font-light text-sm resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase">Concept</label>
                    <textarea 
                      value={editForm.concept}
                      onChange={e => setEditForm({ ...editForm, concept: e.target.value })}
                      rows={2}
                      className="w-full bg-transparent border border-brand-black/10 p-4 focus:border-brand-black outline-none font-light italic text-sm resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase">Tailles disponibles</label>
                    <div className="flex gap-2">
                      {(['XS', 'S', 'M', 'L', 'XL'] as Size[]).map(size => (
                        <button
                          key={size}
                          onClick={() => toggleSize(size)}
                          className={cn(
                            "w-10 h-10 border text-[10px] font-bold transition-all",
                            editForm.sizes.includes(size) ? "bg-brand-black text-brand-white border-brand-black" : "border-brand-black/10"
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold tracking-widest uppercase">Visuels (URLs)</label>
                      <button onClick={addImageField} className="text-[10px] font-bold underline">Ajouter un visuel</button>
                    </div>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                      {editForm.images.map((img, idx) => (
                        <div key={idx} className="flex gap-4 items-center">
                          <div className="w-12 h-12 bg-gray-100 flex-shrink-0 overflow-hidden border border-brand-black/10">
                            {img ? <img src={img} alt="" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" /> : <div className="w-full h-full flex items-center justify-center"><ImageIcon size={16} className="text-brand-gray" /></div>}
                          </div>
                          <input 
                            type="text" 
                            value={img}
                            placeholder="URL de l'image"
                            onChange={e => updateImage(idx, e.target.value)}
                            className="flex-grow bg-transparent border-b border-brand-black/20 py-2 focus:border-brand-black outline-none font-light text-[10px]"
                          />
                          <button onClick={() => removeImageField(idx)} className="text-brand-gray hover:text-brand-burgundy"><X size={14} /></button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={handleSave}
                    className="w-full py-6 bg-brand-black text-brand-white text-xs font-bold tracking-[0.3em] uppercase hover:bg-brand-burgundy transition-colors flex items-center justify-center gap-4"
                  >
                    <Save size={16} /> ENREGISTRER LES MODIFICATIONS
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
