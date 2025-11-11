import React, { useState } from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import { CartProvider, useCart } from './components/CartContext';
import { Navigation } from './components/Navigation';
import { AuthForm } from './components/AuthForm';
import { HomePage } from './components/HomePage';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetails } from './components/ProductDetails';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CartView } from './components/CartView';
import { Checkout } from './components/Checkout';
import { DocumentsPage } from './components/DocumentsPage';
import { ContactsPage } from './components/ContactsPage';
import { AboutPage } from './components/AboutPage';
import { AdminPanel } from './components/AdminPanel';
import { InfoPages } from './components/InfoPages';
import { DatabaseERDiagram } from './components/DatabaseERDiagram';
import { UserTransactions } from './components/UserTransactions';
import { Toaster } from './components/ui/sonner';
import type { Product } from './components/CartContext';

function AppContent() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    setSelectedProduct(null); // Reset selected product when navigating
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-details');
  };

  const handleAddToCart = (product: Product, isCheckout: boolean) => {
    // Add product to cart logic here
    addToCart(product);
    if (isCheckout) {
      setCurrentView('checkout');
    } else {
      setCurrentView('cart');
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      
      case 'products':
        return <ProductCatalog onProductSelect={handleProductSelect} />; // Change here
      
      case 'cart':
        return (
          <CartView 
            onCheckout={() => setCurrentView('checkout')} 
          />
        );
      
      case 'checkout':
        return (
          <Checkout
            onSuccess={() => setCurrentView('home')}
            onBack={() => setCurrentView('cart')}
          />
        );
      
      case 'auth':
        return (
          <AuthForm 
            onSuccess={() => setCurrentView('home')} 
          />
        );
      
      case 'profile':
        if (!user) {
          setCurrentView('auth');
          return null;
        }
        return (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <UserTransactions />
          </div>
        );
      
      case 'documents':
        if (!user) {
          setCurrentView('auth');
          return null;
        }
        return <DocumentsPage />;
      
      case 'contacts':
        return <ContactsPage />;
      
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      
      case 'vision':
        return <AboutPage onNavigate={handleNavigate} />; // Change here
      
      case 'admin':
        if (!user) {
          setCurrentView('auth');
          return null;
        }
        // En una aplicación real, aquí verificarías si el usuario es admin
        return <AdminPanel onNavigate={handleNavigate} />;
      
      case 'offers':
        return <InfoPages page="offers" />;
      
      case 'news':
        return <InfoPages page="news" />;
      
      case 'bestsellers':
        return <InfoPages page="bestsellers" />;
      
      case 'support':
        return <InfoPages page="support" />;
      
      case 'contact':
        return <InfoPages page="contact" />;
      
      case 'faq':
        return <InfoPages page="faq" />;
      
      case 'shipping':
        return <InfoPages page="shipping" />;
      
      case 'returns':
        return <InfoPages page="returns" />;
      
      case 'product-details':
        if (!selectedProduct) {
          setCurrentView('products');
          return null;
        }
        return (
          <ErrorBoundary>
            <ProductDetails product={selectedProduct} onBack={() => setCurrentView('products')} />
          </ErrorBoundary>
        );
      
      case 'database-er':
        return <DatabaseERDiagram />;
      
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
      />
      <main className="flex-1">
        {renderCurrentView()}
      </main>
      
      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-lg">AlquiGo</h3>
              <p className="text-muted-foreground text-sm">
                La mejor experiencia de compra y alquiler online en Colombia con productos de calidad y envío rápido a toda Colombia.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Productos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button 
                    onClick={() => setCurrentView('products')}
                    className="hover:text-foreground transition-colors"
                  >
                    Catálogo
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentView('offers')}
                    className="hover:text-foreground transition-colors"
                  >
                    Ofertas Especiales
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentView('news')}
                    className="hover:text-foreground transition-colors"
                  >
                    Novedades
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentView('bestsellers')}
                    className="hover:text-foreground transition-colors"
                  >
                    Más Vendidos
                  </button>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Soporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button 
                    onClick={() => setCurrentView('contact')}
                    className="hover:text-foreground transition-colors"
                  >
                    Contacto
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentView('faq')}
                    className="hover:text-foreground transition-colors"
                  >
                    Preguntas Frecuentes
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentView('shipping')}
                    className="hover:text-foreground transition-colors"
                  >
                    Envíos
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentView('returns')}
                    className="hover:text-foreground transition-colors"
                  >
                    Devoluciones
                  </button>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Mi Cuenta</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button 
                    onClick={() => setCurrentView(user ? 'profile' : 'auth')}
                    className="hover:text-foreground transition-colors"
                  >
                    {user ? 'Mi Perfil' : 'Iniciar Sesión'}
                  </button>
                </li>
                {user && (
                  <>
                    <li>
                      <button 
                        onClick={() => setCurrentView('documents')}
                        className="hover:text-foreground transition-colors"
                      >
                        Mis Documentos
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setCurrentView('cart')}
                        className="hover:text-foreground transition-colors"
                      >
                        Mi Carrito
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button 
                    onClick={() => setCurrentView('about')}
                    className="hover:text-foreground transition-colors"
                  >
                    Nuestra Visión
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentView('about')}
                    className="hover:text-foreground transition-colors"
                  >
                    Acerca de Nosotros
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentView('support')}
                    className="hover:text-foreground transition-colors"
                  >
                    Soporte
                  </button>
                </li>
                {user && (
                  <li>
                    <button 
                      onClick={() => setCurrentView('admin')}
                      className="hover:text-foreground transition-colors"
                    >
                      Panel Admin
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8">
            {/* Payment Methods */}
            <div className="mb-6">
              <h4 className="font-medium text-center mb-4">Métodos de Pago Seguros</h4>
              <div className="flex flex-wrap justify-center items-center gap-6">
                <div className="flex items-center space-x-2 bg-muted/30 px-4 py-2 rounded-lg">
                  <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">PSE</span>
                  </div>
                  <span className="text-sm font-medium">PSE</span>
                </div>
                
                <div className="flex items-center space-x-2 bg-muted/30 px-4 py-2 rounded-lg">
                  <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">N</span>
                  </div>
                  <span className="text-sm font-medium">Nequi</span>
                </div>
                
                <div className="flex items-center space-x-2 bg-muted/30 px-4 py-2 rounded-lg">
                  <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">$</span>
                  </div>
                  <span className="text-sm font-medium">Transferencia Bancaria</span>
                </div>
                
                <div className="flex items-center space-x-2 bg-muted/30 px-4 py-2 rounded-lg">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">💳</span>
                  </div>
                  <span className="text-sm font-medium">Tarjetas Débito/Crédito</span>
                </div>
                
                <div className="flex items-center space-x-2 bg-muted/30 px-4 py-2 rounded-lg">
                  <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">DV</span>
                  </div>
                  <span className="text-sm font-medium">Daviplata</span>
                </div>
              </div>
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>&copy; 2024 AlquiGo. Todos los derechos reservados.</p>
              <p className="mt-1">Transacciones seguras protegidas con tecnología SSL</p>
            </div>
          </div>
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}