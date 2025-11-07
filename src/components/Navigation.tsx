import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ShoppingCart, 
  User, 
  Menu, 
  LogOut, 
  FileText, 
  Phone,
  Home,
  Package,
  Heart,
  Settings,
  Eye
} from 'lucide-react';

interface NavigationProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export function Navigation({ currentView, setCurrentView }: NavigationProps) {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { 
      id: 'home', 
      label: 'Inicio', 
      icon: Home,
      image: 'https://images.unsplash.com/photo-1684506035284-41be63fd2b27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwaG91c2UlMjBpY29ufGVufDF8fHx8MTc1NjQyNjEwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      id: 'products', 
      label: 'Productos', 
      icon: Package,
      image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9wcGluZyUyMHByb2R1Y3RzJTIwbWFya2V0cGxhY2V8ZW58MXx8fHwxNzU2NDIyMTA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      id: 'about', 
      label: 'Nosotros', 
      icon: Heart,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYm91dCUyMHVzJTIwY29tcGFueSUyMHRlYW18ZW58MXx8fHwxNzU2NDIyMTU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      id: 'cart', 
      label: 'Carrito', 
      icon: ShoppingCart, 
      badge: getTotalItems(),
      image: 'https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9wcGluZyUyMGNhcnQlMjBlY29tbWVyY2V8ZW58MXx8fHwxNzU2NDIyMTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
  ];

  const userMenuItems = [
    { 
      id: 'profile', 
      label: 'Mis Transacciones', 
      icon: User,
      image: 'https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMHBlcnNvbnxlbnwxfHx8fDE3NTY0MjYxMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      id: 'documents', 
      label: 'Documentos', 
      icon: FileText,
      image: 'https://images.unsplash.com/photo-1583521214690-73421a1829a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N1bWVudHMlMjBmaWxlcyUyMHBhcGVyc3xlbnwxfHx8fDE3NTY0MjYxMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      id: 'contacts', 
      label: 'Contactos', 
      icon: Phone,
      image: 'https://images.unsplash.com/photo-1553775282-20af80779df7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwcGhvbmUlMjBzdXBwb3J0fGVufDF8fHx8MTc1NjQyNjEyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      id: 'admin', 
      label: 'Panel Admin', 
      icon: Settings,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZG1pbiUyMHBhbmVsJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc1NjQyNjE3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
  ];

  return (
    <nav className="bg-primary border-b border-primary-foreground/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => setCurrentView('home')}
              className="text-2xl font-bold text-primary-foreground hover:text-accent transition-colors"
            >
              AlquiGo
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigationItems.map(item => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => setCurrentView(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      currentView === item.id 
                        ? 'bg-primary-foreground/20 text-primary-foreground shadow-sm' 
                        : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground hover:shadow-sm'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <Badge variant="destructive" className="ml-1">
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                  
                  {/* Hover Card */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-10">
                    <div className="bg-white rounded-lg shadow-lg border border-border overflow-hidden">
                      <div className="relative h-24 overflow-hidden">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.label}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute bottom-2 left-2 text-white">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-sm">{item.label}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.id === 'home' && 'Volver al inicio'}
                          {item.id === 'products' && 'Explorar todos los productos'}
                          {item.id === 'about' && 'Conoce más sobre AlquiGo'}
                          {item.id === 'cart' && `${item.badge || 0} productos en carrito`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 text-primary-foreground hover:bg-primary-foreground/10">
                    <User className="w-4 h-4" />
                    <span className="hidden md:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {userMenuItems.map(item => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem
                        key={item.id}
                        onClick={() => setCurrentView(item.id)}
                        className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-accent/50"
                      >
                        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-muted">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.label}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                      </DropdownMenuItem>
                    );
                  })}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={logout}
                    className="flex items-center space-x-2 cursor-pointer text-destructive"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => setCurrentView('auth')}
                className="bg-accent hover:bg-accent/90 text-accent-foreground border-0"
              >
                Iniciar Sesión
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-primary-foreground/20 bg-primary">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md transition-colors ${
                      currentView === item.id 
                        ? 'bg-primary-foreground/20 text-primary-foreground' 
                        : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <Badge variant="destructive" className="ml-1">
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}