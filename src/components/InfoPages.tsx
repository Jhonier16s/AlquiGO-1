import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Star, 
  TrendingUp, 
  Gift, 
  HeadphonesIcon, 
  HelpCircle, 
  Truck, 
  RefreshCw,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Clock
} from 'lucide-react';

interface InfoPagesProps {
  page: 'offers' | 'news' | 'bestsellers' | 'support' | 'contact' | 'faq' | 'shipping' | 'returns';
}

export function InfoPages({ page }: InfoPagesProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const renderOffersPage = () => (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="mb-4 text-primary flex items-center justify-center gap-2">
          <Gift className="h-8 w-8" />
          Ofertas Especiales
        </h1>
        <p className="text-xl text-muted-foreground">
          Descubre las mejores ofertas y descuentos disponibles en AlquiGo
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card className="border-2 border-accent/20">
          <CardHeader>
            <Badge className="w-fit bg-accent text-accent-foreground">50% OFF</Badge>
            <CardTitle>Electrodomésticos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Descuento especial en toda la línea de electrodomésticos para el hogar.
            </p>
            <div className="space-y-2">
              <p className="text-sm"><strong>Válido hasta:</strong> 30 de Septiembre</p>
              <p className="text-sm"><strong>Productos incluidos:</strong> Neveras, lavadoras, hornos</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary/20">
          <CardHeader>
            <Badge className="w-fit bg-secondary text-secondary-foreground">3x2</Badge>
            <CardTitle>Tecnología</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Lleva 3 accesorios tecnológicos y paga solo 2.
            </p>
            <div className="space-y-2">
              <p className="text-sm"><strong>Válido hasta:</strong> 15 de Octubre</p>
              <p className="text-sm"><strong>Productos incluidos:</strong> Cables, cargadores, fundas</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/20">
          <CardHeader>
            <Badge className="w-fit bg-primary text-primary-foreground">Envío Gratis</Badge>
            <CardTitle>Compras superiores a</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl text-primary mb-4">{formatCurrency(200000)}</p>
            <p className="text-muted-foreground mb-4">
              Envío gratuito a toda Colombia en compras superiores a $200,000 COP.
            </p>
            <p className="text-sm"><strong>Aplica para todas las categorías</strong></p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Códigos de Descuento Activos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border border-primary/20 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <code className="bg-primary/10 px-2 py-1 rounded text-primary font-mono">BIENVENIDO20</code>
                <Badge>20% OFF</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Descuento del 20% para nuevos usuarios. Válido hasta el 31 de Diciembre.
              </p>
            </div>
            
            <div className="p-4 border border-secondary/20 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <code className="bg-secondary/10 px-2 py-1 rounded text-secondary font-mono">COLOMBIA15</code>
                <Badge>15% OFF</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Descuento especial por el mes de la independencia. Válido hasta el 30 de Septiembre.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNewsPage = () => (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="mb-4 text-primary flex items-center justify-center gap-2">
          <TrendingUp className="h-8 w-8" />
          Novedades
        </h1>
        <p className="text-xl text-muted-foreground">
          Mantente al día con las últimas novedades y productos en AlquiGo
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>Nuevos iPhone 15 Pro disponibles</CardTitle>
              <Badge>12 Sep 2024</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Ya están disponibles los nuevos iPhone 15 Pro y iPhone 15 Pro Max con tecnología A17 Pro. 
              Experimenta la máxima potencia y las cámaras más avanzadas.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Tecnología</Badge>
              <Badge variant="outline">Smartphones</Badge>
              <Badge variant="outline">Apple</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>Nueva categoría: Herramientas Profesionales</CardTitle>
              <Badge>10 Sep 2024</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Hemos agregado una nueva categoría de herramientas profesionales para satisfacer 
              las necesidades de los profesionales y empresas en Colombia.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Herramientas</Badge>
              <Badge variant="outline">Profesional</Badge>
              <Badge variant="outline">Empresas</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>Ampliación de cobertura a zonas rurales</CardTitle>
              <Badge>08 Sep 2024</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Nos complace anunciar que hemos ampliado nuestra cobertura de envíos a más de 500 
              municipios rurales en Colombia, acercando la tecnología a todos los rincones del país.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Envíos</Badge>
              <Badge variant="outline">Cobertura</Badge>
              <Badge variant="outline">Rural</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderBestsellersPage = () => (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="mb-4 text-primary flex items-center justify-center gap-2">
          <Star className="h-8 w-8" />
          Más Vendidos
        </h1>
        <p className="text-xl text-muted-foreground">
          Los productos más populares y mejor valorados por nuestros clientes
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'iPhone 15 Pro', price: 4500000, rating: 4.9, sales: 245 },
          { name: 'MacBook Air M2', price: 5200000, rating: 4.8, sales: 189 },
          { name: 'Sony PlayStation 5', price: 2800000, rating: 4.9, sales: 156 },
          { name: 'Samsung Galaxy S24', price: 3800000, rating: 4.7, sales: 134 },
          { name: 'AirPods Pro', price: 950000, rating: 4.8, sales: 298 },
          { name: 'iPad Air', price: 2400000, rating: 4.6, sales: 112 }
        ].map((product, index) => (
          <Card key={index} className="relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <Badge className="bg-accent text-accent-foreground">#{index + 1}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl text-primary">{formatCurrency(product.price)}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{product.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{product.sales} ventas este mes</span>
                  <Badge variant="outline">Disponible</Badge>
                </div>
                <Button className="w-full">Ver Producto</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSupportPage = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="mb-4 text-primary flex items-center justify-center gap-2">
          <HeadphonesIcon className="h-8 w-8" />
          Soporte al Cliente
        </h1>
        <p className="text-xl text-muted-foreground">
          Estamos aquí para ayudarte. Encuentra la información que necesitas o contáctanos directamente.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Canales de Atención</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 border border-primary/20 rounded-lg">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Línea Nacional</p>
                <p className="text-sm text-muted-foreground">01 8000 123 456</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 border border-secondary/20 rounded-lg">
              <MessageCircle className="h-5 w-5 text-secondary" />
              <div>
                <p className="font-medium">Chat en Vivo</p>
                <p className="text-sm text-muted-foreground">Disponible 24/7</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 border border-accent/20 rounded-lg">
              <Mail className="h-5 w-5 text-accent" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">soporte@alquigo.com</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Horarios de Atención</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Lunes a Viernes</p>
                <p className="text-sm text-muted-foreground">8:00 AM - 8:00 PM</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-secondary" />
              <div>
                <p className="font-medium">Sábados</p>
                <p className="text-sm text-muted-foreground">9:00 AM - 6:00 PM</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-accent" />
              <div>
                <p className="font-medium">Domingos y Festivos</p>
                <p className="text-sm text-muted-foreground">10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Temas Frecuentes de Soporte</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <p className="font-medium">Problemas con el pedido</p>
                <p className="text-sm text-muted-foreground">Estado, cancelación, modificación</p>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <p className="font-medium">Pagos y facturación</p>
                <p className="text-sm text-muted-foreground">Métodos de pago, facturas, reembolsos</p>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <p className="font-medium">Envíos y entregas</p>
                <p className="text-sm text-muted-foreground">Seguimiento, demoras, direcciones</p>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <p className="font-medium">Cuenta de usuario</p>
                <p className="text-sm text-muted-foreground">Registro, perfil, contraseña</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContactPage = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="mb-4 text-primary">Contacto</h1>
        <p className="text-xl text-muted-foreground">
          ¿Tienes alguna pregunta o sugerencia? Nos encantaría escucharte
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Información de Contacto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary mt-1" />
              <div>
                <h4 className="font-medium mb-2">Oficina Principal</h4>
                <p className="text-muted-foreground">
                  Carrera 7 # 32-16<br />
                  Bogotá, Colombia<br />
                  Código Postal: 110311
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-secondary mt-1" />
              <div>
                <h4 className="font-medium mb-2">Teléfonos</h4>
                <p className="text-muted-foreground">
                  Línea Nacional: 01 8000 123 456<br />
                  Bogotá: (601) 123 4567<br />
                  WhatsApp: +57 300 123 4567
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-accent mt-1" />
              <div>
                <h4 className="font-medium mb-2">Correos Electrónicos</h4>
                <p className="text-muted-foreground">
                  General: info@alquigo.com<br />
                  Soporte: soporte@alquigo.com<br />
                  Ventas: ventas@alquigo.com
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Otras Oficinas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-secondary/20 rounded-lg">
              <h4 className="font-medium text-secondary mb-2">Medellín</h4>
              <p className="text-sm text-muted-foreground">
                Carrera 43A # 1-50<br />
                El Poblado, Medellín<br />
                Tel: (604) 234 5678
              </p>
            </div>
            
            <div className="p-4 border border-accent/20 rounded-lg">
              <h4 className="font-medium text-accent mb-2">Cali</h4>
              <p className="text-sm text-muted-foreground">
                Avenida 6N # 15N-23<br />
                Cali, Valle del Cauca<br />
                Tel: (602) 345 6789
              </p>
            </div>
            
            <div className="p-4 border border-primary/20 rounded-lg">
              <h4 className="font-medium text-primary mb-2">Barranquilla</h4>
              <p className="text-sm text-muted-foreground">
                Carrera 53 # 75-180<br />
                Barranquilla, Atlántico<br />
                Tel: (605) 456 7890
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderFAQPage = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="mb-4 text-primary flex items-center justify-center gap-2">
          <HelpCircle className="h-8 w-8" />
          Preguntas Frecuentes
        </h1>
        <p className="text-xl text-muted-foreground">
          Encuentra respuestas rápidas a las preguntas más comunes
        </p>
      </div>

      <div className="space-y-6">
        {[
          {
            question: "¿Cómo puedo realizar un pedido?",
            answer: "Para realizar un pedido, simplemente navega por nuestro catálogo, agrega los productos al carrito y procede al checkout. Necesitarás crear una cuenta o iniciar sesión para completar la compra."
          },
          {
            question: "¿Qué métodos de pago aceptan?",
            answer: "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), PSE, Nequi, Daviplata y pago contra entrega en ciudades principales."
          },
          {
            question: "¿Cuánto tiempo tarda el envío?",
            answer: "Los envíos a ciudades principales toman entre 1-3 días hábiles. Para municipios y zonas rurales, el tiempo puede ser de 3-7 días hábiles."
          },
          {
            question: "¿Puedo devolver un producto?",
            answer: "Sí, tienes 30 días para devolver productos en perfecto estado. Los costos de envío de devolución corren por cuenta del cliente, excepto si el producto llega defectuoso."
          },
          {
            question: "¿Cómo funciona el alquiler de productos?",
            answer: "Selecciona el producto que deseas alquilar, elige el período de alquiler (días, semanas o meses), realiza el pago y recibirás el producto. Al finalizar el período, debes devolverlo en las mismas condiciones."
          },
          {
            question: "¿Ofrecen garantía en los productos?",
            answer: "Todos nuestros productos cuentan con garantía del fabricante. Adicionalmente, ofrecemos 30 días de garantía por defectos de fabricación desde AlquiGo."
          },
          {
            question: "¿Cómo puedo rastrear mi pedido?",
            answer: "Una vez confirmado tu pedido, recibirás un código de seguimiento por email y SMS. Puedes rastrearlo en nuestra página web o directamente con la transportadora."
          },
          {
            question: "¿Hay un monto mínimo para envío gratis?",
            answer: "Sí, ofrecemos envío gratuito en compras superiores a $200,000 COP a nivel nacional."
          }
        ].map((faq, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg text-primary">{faq.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderShippingPage = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="mb-4 text-primary flex items-center justify-center gap-2">
          <Truck className="h-8 w-8" />
          Información de Envíos
        </h1>
        <p className="text-xl text-muted-foreground">
          Todo lo que necesitas saber sobre nuestros envíos en Colombia
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Cobertura Nacional</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Realizamos envíos a todo el territorio colombiano, incluyendo:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-sm">
                <li>• Todas las capitales de departamento</li>
                <li>• Más de 1,000 municipios</li>
                <li>• Zonas rurales (tiempo extendido)</li>
                <li>• Islas (San Andrés, Providencia)</li>
              </ul>
              <ul className="space-y-2 text-sm">
                <li>• Amazonía (ciudades principales)</li>
                <li>• Chocó (Quibdó y principales municipios)</li>
                <li>• Guainía (Puerto Inírida)</li>
                <li>• Consulta disponibilidad para otras zonas</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Tiempos de Entrega</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border border-primary/20 rounded-lg">
                <div>
                  <p className="font-medium">Bogotá, Medellín, Cali, Barranquilla</p>
                  <p className="text-sm text-muted-foreground">Ciudades principales</p>
                </div>
                <Badge className="bg-green-100 text-green-800">1-2 días</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 border border-secondary/20 rounded-lg">
                <div>
                  <p className="font-medium">Otras capitales de departamento</p>
                  <p className="text-sm text-muted-foreground">Bucaramanga, Pereira, Cartagena, etc.</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">2-3 días</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 border border-accent/20 rounded-lg">
                <div>
                  <p className="font-medium">Municipios intermedios</p>
                  <p className="text-sm text-muted-foreground">Ciudades y municipios medianos</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">3-5 días</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 border border-muted rounded-lg">
                <div>
                  <p className="font-medium">Zonas rurales y apartadas</p>
                  <p className="text-sm text-muted-foreground">Municipios pequeños y veredas</p>
                </div>
                <Badge className="bg-orange-100 text-orange-800">5-10 días</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Tarifas de Envío</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-medium text-green-800 mb-2">¡Envío GRATIS!</p>
                <p className="text-sm text-green-700">
                  En compras superiores a {formatCurrency(200000)} a nivel nacional
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-3 border rounded-lg text-center">
                  <p className="font-medium">Zona 1</p>
                  <p className="text-sm text-muted-foreground mb-2">Bogotá, Soacha, Chía</p>
                  <p className="text-xl text-primary">{formatCurrency(8000)}</p>
                </div>
                
                <div className="p-3 border rounded-lg text-center">
                  <p className="font-medium">Zona 2</p>
                  <p className="text-sm text-muted-foreground mb-2">Ciudades principales</p>
                  <p className="text-xl text-secondary">{formatCurrency(12000)}</p>
                </div>
                
                <div className="p-3 border rounded-lg text-center">
                  <p className="font-medium">Zona 3</p>
                  <p className="text-sm text-muted-foreground mb-2">Resto del país</p>
                  <p className="text-xl text-accent">{formatCurrency(18000)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderReturnsPage = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="mb-4 text-primary flex items-center justify-center gap-2">
          <RefreshCw className="h-8 w-8" />
          Política de Devoluciones
        </h1>
        <p className="text-xl text-muted-foreground">
          Información completa sobre devoluciones y cambios en AlquiGo
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Condiciones Generales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3 text-secondary">Tiempo Límite</h4>
                <p className="text-muted-foreground text-sm">
                  Tienes 30 días calendario desde la fecha de entrega para solicitar 
                  una devolución o cambio del producto.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-3 text-accent">Estado del Producto</h4>
                <p className="text-muted-foreground text-sm">
                  Los productos deben estar en perfecto estado, sin uso, con empaques 
                  originales, etiquetas y accesorios completos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Proceso de Devolución</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 border border-primary/20 rounded-lg">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">1</div>
                <div>
                  <h4 className="font-medium">Solicita la devolución</h4>
                  <p className="text-sm text-muted-foreground">
                    Ingresa a tu cuenta, ve a "Mis pedidos" y selecciona "Solicitar devolución"
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-3 border border-secondary/20 rounded-lg">
                <div className="bg-secondary text-secondary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">2</div>
                <div>
                  <h4 className="font-medium">Aprobación y guía</h4>
                  <p className="text-sm text-muted-foreground">
                    Revisaremos tu solicitud y te enviaremos una guía de devolución prepagada
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-3 border border-accent/20 rounded-lg">
                <div className="bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">3</div>
                <div>
                  <h4 className="font-medium">Envía el producto</h4>
                  <p className="text-sm text-muted-foreground">
                    Empaca el producto y entrégalo a la transportadora con la guía
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-3 border border-green-200 rounded-lg">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">4</div>
                <div>
                  <h4 className="font-medium">Reembolso procesado</h4>
                  <p className="text-sm text-muted-foreground">
                    Una vez recibido y verificado, procesaremos tu reembolso en 3-5 días hábiles
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Excepciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <h4 className="font-medium text-destructive">Productos NO retornables:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                <li>• Productos de higiene personal (cepillos de dientes, productos de cuidado íntimo)</li>
                <li>• Software y productos digitales que han sido activados</li>
                <li>• Productos personalizados o hechos a medida</li>
                <li>• Alimentos perecederos y suplementos abiertos</li>
                <li>• Productos dañados por mal uso del cliente</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Casos Especiales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Producto Defectuoso</h4>
                <p className="text-sm text-muted-foreground">
                  Si el producto llega defectuoso o dañado, cubrimos los costos 
                  de devolución y procesamos el cambio inmediatamente.
                </p>
              </div>
              
              <div className="p-4 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Error en el Envío</h4>
                <p className="text-sm text-muted-foreground">
                  Si enviamos un producto incorrecto, asumimos todos los costos 
                  y organizamos el cambio sin costo adicional.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  switch (page) {
    case 'offers':
      return renderOffersPage();
    case 'news':
      return renderNewsPage();
    case 'bestsellers':
      return renderBestsellersPage();
    case 'support':
      return renderSupportPage();
    case 'contact':
      return renderContactPage();
    case 'faq':
      return renderFAQPage();
    case 'shipping':
      return renderShippingPage();
    case 'returns':
      return renderReturnsPage();
    default:
      return renderOffersPage();
  }
}