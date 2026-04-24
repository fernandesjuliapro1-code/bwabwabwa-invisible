import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS as INITIAL_PRODUCTS } from '../constants';

interface ProductContextType {
  products: Product[];
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  resetProducts: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('invisible_products');
    if (saved) {
      const parsed = JSON.parse(saved) as Product[];
      
      // On crée une map des produits sauvegardés pour un accès rapide
      const savedMap = new Map(parsed.map(p => [p.id, p]));
      
      // On force la mise à jour si on détecte une ancienne convention ou un changement vers Google Drive
      const merged = INITIAL_PRODUCTS.map(initial => {
        const savedProduct = savedMap.get(initial.id);
        if (savedProduct) {
          const hasOldPath = savedProduct.images.some(img => 
            img.includes(' ') || 
            img.includes('unsplash') || 
            (initial.images[0].includes('drive.google.com') && !img.includes('drive.google.com'))
          );
          if (hasOldPath) {
            return { ...savedProduct, images: initial.images };
          }
          return savedProduct;
        }
        return initial;
      });

      // On ajoute aussi les produits qui auraient été créés manuellement par l'utilisateur
      const initialIds = new Set(INITIAL_PRODUCTS.map(p => p.id));
      const customProducts = parsed.filter(p => !initialIds.has(p.id));
      
      return [...merged, ...customProducts];
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('invisible_products', JSON.stringify(products));
  }, [products]);

  const resetProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('invisible_products');
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const addProduct = (newProduct: Product) => {
    setProducts(prev => [...prev, newProduct]);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, updateProduct, addProduct, deleteProduct, resetProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
};
