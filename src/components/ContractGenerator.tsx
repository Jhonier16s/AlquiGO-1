import React, { useState } from 'react';
import { CartItem } from './CartContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { FileText, Download, Calendar, MapPin, User, ShoppingBag, CheckCircle, AlertTriangle } from 'lucide-react';

interface ContractGeneratorProps {
  items: CartItem[];
  userInfo: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
  };
  total: number;
  contractId: string;
}

export function ContractGenerator({ items, userInfo, total, contractId }: ContractGeneratorProps) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [contractAccepted, setContractAccepted] = useState(false);
  
  const currentDate = new Date().toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const currentDateTime = new Date().toLocaleString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const rentalItems = items.filter(item => item.isRental);
  const saleItems = items.filter(item => !item.isRental);

  const generateContract = () => {
    if (!acceptedTerms) {
      return;
    }
    
    const contractContent = `
CONTRATO DE COMPRA/ALQUILER - AlquiGo
Contrato No: ${contractId}
Fecha: ${currentDateTime}

═══════════════════════════════════════════════════════════════

DATOS DEL CLIENTE:
Nombre: ${userInfo.name}
Email: ${userInfo.email}
${userInfo.phone ? `Teléfono: ${userInfo.phone}` : ''}
${userInfo.address ? `Dirección: ${userInfo.address}` : ''}

═══════════════════════════════════════════════════════════════

ARTÍCULOS ADQUIRIDOS:

${saleItems.length > 0 ? `--- COMPRAS ---
${saleItems.map(item => `
• ${item.name}
  Vendedor: ${item.seller.name}
  Cantidad: ${item.quantity}
  Precio unitario: $${item.price.toFixed(2)}
  Subtotal: $${(item.price * item.quantity).toFixed(2)}
  Estado: ${item.condition}
  Ubicación: ${item.location}
`).join('')}` : ''}

${rentalItems.length > 0 ? `--- ALQUILERES ---
${rentalItems.map(item => `
• ${item.name}
  Arrendador: ${item.seller.name}
  Cantidad: ${item.quantity}
  Duración: ${item.rentalDuration} día${item.rentalDuration! > 1 ? 's' : ''}
  Precio por día: $${item.rentalPrice?.toFixed(2)}
  Subtotal: $${((item.rentalPrice || 0) * (item.rentalDuration || 1) * item.quantity).toFixed(2)}
  Estado: ${item.condition}
  Ubicación: ${item.location}
  
  CONDICIONES DE ALQUILER:
  - El artículo debe ser devuelto en las mismas condiciones
  - El período de alquiler vence el ${new Date(Date.now() + (item.rentalDuration || 1) * 24 * 60 * 60 * 1000).toLocaleDateString('es-MX')}
  - Daños o pérdida del artículo serán cobrados al valor comercial
`).join('')}` : ''}

═══════════════════════════════════════════════════════════════

RESUMEN FINANCIERO:
Total a pagar: $${total.toFixed(2)} MXN

═══════════════════════════════════════════════════════════════

TÉRMINOS Y CONDICIONES:

1. COMPRA:
   - La venta se considera final una vez procesado el pago
   - Los productos se entregan en las condiciones descritas
   - AlquiGo actúa como intermediario entre comprador y vendedor

2. ALQUILER:
   - El cliente se compromete a cuidar el artículo alquilado
   - La devolución debe realizarse en la fecha acordada
   - Retrasos en la devolución pueden generar cargos adicionales

3. RESPONSABILIDADES:
   - El cliente es responsable de los artículos desde la entrega
   - AlquiGo verificará el estado de los artículos al momento de la devolución
   - Cualquier disputa será resuelta según los términos de servicio

4. GARANTÍAS:
   - Los vendedores garantizan la autenticidad de sus productos
   - AlquiGo verifica la identidad de todos los vendedores
   - Política de devolución de 30 días para compras (sujeto a condiciones)

═══════════════════════════════════════════════════════════════

Al proceder con esta transacción, el cliente acepta todos los términos
y condiciones establecidos en este contrato y en los términos de
servicio de AlquiGo.

Documento generado electrónicamente el ${currentDateTime}

AlquiGo - Plataforma de Compra y Alquiler
www.alquigo.com | soporte@alquigo.com
`;

    // Create downloadable text file
    const blob = new Blob([contractContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contrato-alquigo-${contractId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <FileText className="w-6 h-6 text-primary" />
          <CardTitle className="text-2xl">Contrato de Transacción</CardTitle>
        </div>
        <p className="text-muted-foreground">
          Contrato No: <span className="font-mono text-primary">{contractId}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Generado el {currentDateTime}
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Customer Information */}
        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-3">
            <User className="w-5 h-5 text-primary" />
            <h3 className="font-medium">Información del Cliente</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="font-medium">Nombre:</span> {userInfo.name}
            </div>
            <div>
              <span className="font-medium">Email:</span> {userInfo.email}
            </div>
            {userInfo.phone && (
              <div>
                <span className="font-medium">Teléfono:</span> {userInfo.phone}
              </div>
            )}
            {userInfo.address && (
              <div className="md:col-span-2">
                <span className="font-medium">Dirección:</span> {userInfo.address}
              </div>
            )}
          </div>
        </div>

        {/* Purchase Items */}
        {saleItems.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <ShoppingBag className="w-5 h-5 text-accent" />
              <h3 className="font-medium">Artículos para Compra</h3>
            </div>
            <div className="space-y-3">
              {saleItems.map((item, index) => (
                <div key={`sale-${index}`} className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Vendedor: {item.seller.name}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{item.location}</span>
                      </div>
                    </div>
                    <Badge variant="secondary">{item.condition}</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Cantidad: {item.quantity}</span>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rental Items */}
        {rentalItems.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="w-5 h-5 text-secondary" />
              <h3 className="font-medium">Artículos para Alquiler</h3>
            </div>
            <div className="space-y-3">
              {rentalItems.map((item, index) => (
                <div key={`rental-${index}`} className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Arrendador: {item.seller.name}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{item.location}</span>
                      </div>
                    </div>
                    <Badge variant="secondary">{item.condition}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span>Duración: {item.rentalDuration} día{item.rentalDuration! > 1 ? 's' : ''}</span>
                    <span>Cantidad: {item.quantity}</span>
                    <span>Precio/día: ${item.rentalPrice?.toFixed(2)}</span>
                    <span className="font-medium">
                      Total: ${((item.rentalPrice || 0) * (item.rentalDuration || 1) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-2 p-2 bg-secondary/10 rounded text-xs text-secondary">
                    <strong>Fecha de devolución:</strong> {new Date(Date.now() + (item.rentalDuration || 1) * 24 * 60 * 60 * 1000).toLocaleDateString('es-MX')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Separator />

        {/* Total */}
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total a Pagar:</span>
          <span className="text-primary">${total.toFixed(2)} MXN</span>
        </div>

        {/* Terms Summary */}
        <div className="bg-muted/30 p-4 rounded-lg text-sm space-y-2">
          <h4 className="font-medium">Términos Importantes:</h4>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Las compras son finales una vez procesado el pago</li>
            <li>Los alquileres deben devolverse en la fecha acordada</li>
            <li>El cliente es responsable del cuidado de los artículos</li>
            <li>AlquiGo actúa como intermediario en las transacciones</li>
          </ul>
        </div>

        {/* Accept Terms Checkbox */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg border">
            <Checkbox 
              id="accept-terms"
              checked={acceptedTerms}
              onCheckedChange={setAcceptedTerms}
            />
            <Label htmlFor="accept-terms" className="text-sm cursor-pointer">
              He leído y acepto todos los términos y condiciones establecidos en este contrato
            </Label>
          </div>

          {acceptedTerms && (
            <div className="flex items-center space-x-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <Checkbox 
                id="confirm-purchase"
                checked={contractAccepted}
                onCheckedChange={setContractAccepted}
              />
              <Label htmlFor="confirm-purchase" className="text-sm cursor-pointer font-medium">
                Confirmo que acepto esta compra/alquiler y autorizo el procesamiento del pago
              </Label>
            </div>
          )}

          {contractAccepted && (
            <Alert className="border-green-500/50 bg-green-50/50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                ¡Perfecto! Has aceptado la compra. Ahora puedes descargar tu contrato oficial.
              </AlertDescription>
            </Alert>
          )}

          {!acceptedTerms && (
            <Alert className="border-orange-500/50 bg-orange-50/50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                Debes aceptar los términos y condiciones para poder descargar el contrato.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Download Button */}
        <div className="flex justify-center">
          <Button 
            onClick={generateContract}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
            disabled={!acceptedTerms || !contractAccepted}
          >
            <Download className="w-4 h-4 mr-2" />
            {contractAccepted ? 'Descargar Contrato Oficial' : 'Descargar Contrato'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}