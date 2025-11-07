import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Minus, Plus, Trash2, ShoppingBag, CreditCard } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CartViewProps {
  onCheckout: () => void;
}

export function CartView({ onCheckout }: CartViewProps) {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      toast.success('Producto eliminado del carrito');
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast.success(`${productName} eliminado del carrito`);
  };

  const handleProceedToCheckout = () => {
    if (!user) {
      toast.error('Debes iniciar sesión para continuar');
      return;
    }
    
    if (items.length === 0) {
      toast.error('El carrito está vacío');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onCheckout();
    }, 1000);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl mb-4">Tu carrito está vacío</h2>
          <p className="text-muted-foreground mb-6">
            Agrega algunos productos para comenzar a comprar
          </p>
          <Button 
            onClick={() => window.location.hash = '#products'}
            className="px-8"
          >
            Explorar Productos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl mb-6">Carrito de Compras</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-24 h-24 shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <Badge variant="secondary" className="mt-1">
                          {item.category}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id, item.name)}
                        className="text-destructive hover:text-destructive/80 shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <div className="text-right">
                        {item.isRental ? (
                          <>
                            <div className="text-sm text-muted-foreground">
                              Alquiler por {item.rentalDuration} día{item.rentalDuration > 1 ? 's' : ''}
                            </div>
                            <div className="font-bold text-primary">
                              ${(item.totalRentalPrice ? item.totalRentalPrice * item.quantity : 0).toLocaleString('es-CO')}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-sm text-muted-foreground">
                              ${item.price.toLocaleString('es-CO')} c/u
                            </div>
                            <div className="font-bold text-primary">
                              ${(item.price * item.quantity).toLocaleString('es-CO')}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Productos ({getTotalItems()})</span>
                <span>${getTotalPrice().toLocaleString('es-CO')}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Envío</span>
                <span className="text-green-600">Gratis</span>
              </div>
              
              <div className="flex justify-between">
                <span>Impuestos</span>
                <span>${(getTotalPrice() * 0.1).toLocaleString('es-CO')}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${(getTotalPrice() * 1.1).toLocaleString('es-CO')}</span>
              </div>
              
              {!user && (
                <div className="text-sm text-muted-foreground bg-muted p-3 rounded">
                  Debes iniciar sesión para proceder con la compra
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleProceedToCheckout}
                className="w-full"
                disabled={!user || isProcessing}
              >
                {isProcessing ? (
                  'Procesando...'
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceder al Pago
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}