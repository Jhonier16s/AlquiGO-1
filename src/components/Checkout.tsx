import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { ContractGenerator } from './ContractGenerator';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { CreditCard, MapPin, User, CheckCircle, Loader2, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface CheckoutProps {
  onSuccess: () => void;
  onBack: () => void;
}

export function Checkout({ onSuccess, onBack }: CheckoutProps) {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user, accessToken } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showContract, setShowContract] = useState(false);
  const [contractId, setContractId] = useState('');
  const [transactionId, setTransactionId] = useState('');
  
  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    address: '',
    city: '',
    postalCode: '',
    country: 'México'
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    method: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: user?.name || ''
  });

  const handleInputChange = (section: 'shipping' | 'payment', field: string, value: string) => {
    if (section === 'shipping') {
      setShippingInfo(prev => ({ ...prev, [field]: value }));
    } else {
      setPaymentInfo(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!shippingInfo.fullName || !shippingInfo.address || !shippingInfo.city) {
      toast.error('Por favor completa la información de envío');
      return;
    }

    if (paymentInfo.method === 'card') {
      if (!paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv) {
        toast.error('Por favor completa la información de pago');
        return;
      }
    }

    if (!user || !accessToken) {
      toast.error('Debes iniciar sesión para completar la compra');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Determinar tipo de transacción
      const hasRental = items.some(item => item.isRental);
      const hasPurchase = items.some(item => !item.isRental);
      let transactionType = 'purchase';
      if (hasRental && hasPurchase) {
        transactionType = 'mixed';
      } else if (hasRental) {
        transactionType = 'rental';
      }

      // Guardar transacción localmente
      const transactionsRaw = localStorage.getItem('transactions');
      const transactions: any[] = transactionsRaw ? JSON.parse(transactionsRaw) : [];
      const newTransactionId = `TX-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      const transactionRecord = {
        id: newTransactionId,
        userId: user.id,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          isRental: item.isRental,
          rentalPrice: item.rentalPrice,
          rentalDuration: item.rentalDuration,
          seller: item.seller,
          condition: item.condition,
          location: item.location
        })),
        total: getTotalPrice() * 1.1,
        shippingInfo,
        paymentInfo: { method: paymentInfo.method },
        transactionType,
        status: 'completed',
        createdAt: new Date().toISOString(),
      };
      transactions.push(transactionRecord);
      localStorage.setItem('transactions', JSON.stringify(transactions));
      setTransactionId(newTransactionId);

      // Generar ID de contrato único
      const newContractId = `ALQ-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      setContractId(newContractId);

      // Guardar contrato localmente
      const contractsRaw = localStorage.getItem('contracts');
      const contracts: any[] = contractsRaw ? JSON.parse(contractsRaw) : [];
      const contractRecord = {
        id: newContractId,
        userId: user.id,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          isRental: item.isRental,
          rentalPrice: item.rentalPrice,
          rentalDuration: item.rentalDuration,
          seller: item.seller,
          condition: item.condition,
          location: item.location
        })),
        userInfo: {
          name: shippingInfo.fullName,
          email: user.email,
          phone: user.phone,
          address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`
        },
        total: getTotalPrice() * 1.1,
        transactionId: newTransactionId,
        status: 'active',
        createdAt: new Date().toISOString(),
        contractContent: `Contrato generado para transacción ${newTransactionId}`
      };
      contracts.push(contractRecord);
      localStorage.setItem('contracts', JSON.stringify(contracts));
      
      setIsProcessing(false);
      setShowContract(true);
      
      toast.success('¡Pago procesado exitosamente! Tu transacción y contrato han sido guardados localmente');
    } catch (error) {
      console.error('Error en el checkout:', error);
      setIsProcessing(false);
      toast.error('Error al procesar el pago. Por favor intenta nuevamente.');
    }
  };

  if (showContract) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-3xl mb-2">¡Transacción Completada!</h1>
          <p className="text-muted-foreground">
            Tu pago ha sido procesado exitosamente. A continuación puedes revisar y descargar tu contrato.
          </p>
        </div>

        <ContractGenerator 
          items={items}
          userInfo={{
            name: shippingInfo.fullName,
            email: user?.email || '',
            phone: user?.phone,
            address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`
          }}
          total={getTotalPrice() * 1.1}
          contractId={contractId}
        />

        <div className="flex justify-center space-x-4 mt-8">
          <Button 
            variant="outline" 
            onClick={() => {
              clearCart();
              setIsSuccess(true);
              setTimeout(() => onSuccess(), 1000);
            }}
          >
            Continuar Comprando
          </Button>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center">
          <CardContent className="pt-8 pb-6">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl mb-4">¡Gracias por tu compra!</h2>
            <p className="text-muted-foreground mb-6">
              Tu contrato ha sido generado y enviado a tu email. ¡Esperamos verte pronto!
            </p>
            <Button onClick={onSuccess} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Volver al Inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          ← Volver al carrito
        </Button>
        <h1 className="text-3xl">Finalizar Compra</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping & Payment Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Información de Envío</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nombre Completo</Label>
                    <Input
                      id="fullName"
                      value={shippingInfo.fullName}
                      onChange={(e) => handleInputChange('shipping', 'fullName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">País</Label>
                    <Select 
                      value={shippingInfo.country} 
                      onValueChange={(value: string) => handleInputChange('shipping', 'country', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="México">México</SelectItem>
                        <SelectItem value="España">España</SelectItem>
                        <SelectItem value="Argentina">Argentina</SelectItem>
                        <SelectItem value="Colombia">Colombia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    value={shippingInfo.address}
                    onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                    placeholder="Calle, número, colonia"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input
                      id="city"
                      value={shippingInfo.city}
                      onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Código Postal</Label>
                    <Input
                      id="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={(e) => handleInputChange('shipping', 'postalCode', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Método de Pago</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup 
                  value={paymentInfo.method} 
                  onValueChange={(value: string) => handleInputChange('payment', 'method', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Tarjeta de Crédito/Débito</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="transfer" id="transfer" />
                    <Label htmlFor="transfer">Transferencia Bancaria</Label>
                  </div>
                </RadioGroup>

                {paymentInfo.method === 'card' && (
                  <div className="space-y-4 pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="cardholderName">Nombre del Titular</Label>
                      <Input
                        id="cardholderName"
                        value={paymentInfo.cardholderName}
                        onChange={(e) => handleInputChange('payment', 'cardholderName', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Fecha de Vencimiento</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/AA"
                          value={paymentInfo.expiryDate}
                          onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={paymentInfo.cvv}
                          onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentInfo.method === 'paypal' && (
                  <Alert>
                    <AlertDescription>
                      Serás redirigido a PayPal para completar el pago de forma segura.
                    </AlertDescription>
                  </Alert>
                )}

                {paymentInfo.method === 'transfer' && (
                  <Alert>
                    <AlertDescription>
                      Te enviaremos los datos bancarios por email para realizar la transferencia.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map(item => (
                    <div key={`${item.id}-${item.isRental ? 'rental' : 'sale'}`} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <span>{item.name} × {item.quantity}</span>
                        {item.isRental && (
                          <div className="text-xs text-muted-foreground">
                            Alquiler por {item.rentalDuration} día{item.rentalDuration! > 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                      <span>
                        ${item.isRental 
                          ? ((item.rentalPrice || 0) * (item.rentalDuration || 1) * item.quantity).toFixed(2)
                          : (item.price * item.quantity).toFixed(2)
                        }
                      </span>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span className="text-green-600">Gratis</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Impuestos</span>
                    <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${(getTotalPrice() * 1.1).toFixed(2)}</span>
                </div>
              </CardContent>
              <CardContent className="pt-0">
                <Button 
                  type="submit" 
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground border-0" 
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Procesando Pago...
                    </>
                  ) : (
                    `Pagar ${(getTotalPrice() * 1.1).toFixed(2)}`
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}