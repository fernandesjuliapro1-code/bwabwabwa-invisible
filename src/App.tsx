import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Lookbook } from './pages/Lookbook';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { Admin } from './pages/Admin';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-brand-white flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/lookbook" element={<Lookbook />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
          
          <footer className="py-24 px-6 md:px-12 bg-brand-black text-brand-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold tracking-[0.2em] mb-8">INVISIBLE</h2>
                <p className="text-brand-gray text-sm font-light max-w-xs leading-relaxed">
                  Le vêtement est l'identité. Une approche radicale du minimalisme moderne.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-[10px] tracking-widest font-bold uppercase">Navigation</h3>
                <ul className="text-xs font-light space-y-2 text-brand-gray">
                  <li><a href="/shop" className="hover:text-white transition-colors">Boutique</a></li>
                  <li><a href="/lookbook" className="hover:text-white transition-colors">Lookbook</a></li>
                  <li><a href="/about" className="hover:text-white transition-colors">À Propos</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-[10px] tracking-widest font-bold uppercase">Newsletter</h3>
                <p className="text-[10px] text-brand-gray uppercase tracking-widest">Rejoignez le silence.</p>
                <div className="flex border-b border-white/20 py-2">
                  <input type="email" placeholder="EMAIL" className="bg-transparent outline-none text-xs flex-grow font-light" />
                  <button className="text-[10px] font-bold tracking-widest">S'ABONNER</button>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-widest text-brand-gray uppercase">
              <p>© 2026 INVISIBLE STUDIO. TOUS DROITS RÉSERVÉS.</p>
              <div className="flex gap-8">
                <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
                <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </CartProvider>
  </ProductProvider>
  );
}
