import React, { useState, useMemo } from 'react';
import { Product, useCart } from './CartContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ShoppingCart, 
  ArrowLeft, 
  Star, 
  Shield, 
  MapPin, 
  Clock, 
  Info,
  Package,
  User,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
}

// Datos de especificaciones expandidos para cada producto
const productSpecifications: Record<string, { specifications: Record<string, string>; features: string[]; included: string[] }> = {
  '1': { // MacBook Pro
    specifications: {
      'Procesador': 'Apple M2 Pro (12-core CPU, 19-core GPU)',
      'Memoria RAM': '32GB Unified Memory',
      'Almacenamiento': '1TB SSD',
      'Pantalla': '16.2" Liquid Retina XDR (3456 x 2234)',
      'Conectividad': 'Wi-Fi 6E, Bluetooth 5.3',
      'Puertos': '3x Thunderbolt 4, HDMI, SD Card, MagSafe 3',
      'Batería': 'Hasta 22 horas de reproducción de video',
      'Sistema Operativo': 'macOS Ventura',
      'Peso': '2.15 kg',
      'Dimensiones': '35.57 × 24.81 × 1.68 cm'
    },
    features: [
      'Touch ID integrado',
      'Magic Keyboard retroiluminado',
      'Force Touch trackpad',
      'Cámara FaceTime HD 1080p',
      'Sistema de sonido de 6 altavoces',
      'Cancelación de ruido en micrófono',
      'ProRes y ProRAW support'
    ],
    included: [
      'MacBook Pro 16"',
      'Cargador MagSafe 3 de 140W',
      'Cable USB-C a MagSafe 3',
      'Documentación'
    ]
  },
  '2': { // AirPods Pro
    specifications: {
      'Drivers': 'Driver dinámico personalizado',
      'Chip': 'Apple H2',
      'Cancelación de ruido': 'Activa con modo Transparencia',
      'Audio espacial': 'Sí, con seguimiento dinámico de cabeza',
      'Resistencia': 'IPX4 (sudor y agua)',
      'Batería (auriculares)': 'Hasta 6 horas con ANC',
      'Batería (estuche)': 'Hasta 30 horas total',
      'Carga': 'Lightning, MagSafe, Qi wireless',
      'Conectividad': 'Bluetooth 5.3',
      'Peso': '5.3g cada auricular'
    },
    features: [
      'Cancelación activa de ruido de próxima generación',
      'Modo Transparencia Adaptativa',
      'Audio espacial personalizado',
      'Control de toque de fuerza',
      'Detección de conversación',
      'Ecualización adaptativa automática',
      'Compatibilidad con Siri'
    ],
    included: [
      'AirPods Pro (2ª generación)',
      'Estuche de carga MagSafe',
      'Almohadillas de silicona (XS, S, M, L)',
      'Cable Lightning a USB-C',
      'Documentación'
    ]
  },
  '3': { // iPhone 15 Pro Max
    specifications: {
      'Procesador': 'Apple A17 Pro (3nm)',
      'Pantalla': '6.7" Super Retina XDR OLED',
      'Resolución': '2796 x 1290 píxeles (460 ppi)',
      'Almacenamiento': '256GB',
      'Cámara principal': '48MP con estabilización óptica',
      'Cámara ultra gran angular': '12MP',
      'Cámara teleobjetivo': '12MP con zoom óptico 5x',
      'Cámara frontal': '12MP TrueDepth',
      'Video': '4K Dolby Vision hasta 60 fps',
      'Resistencia': 'IP68',
      'Batería': 'Hasta 29 horas de reproducción de video',
      'Peso': '221g'
    },
    features: [
      'Action Button personalizable',
      'Dynamic Island',
      'Face ID',
      'Ceramic Shield más resistente que cualquier vidrio de smartphone',
      'Modo Cine con enfoque automático',
      'Modo Retrato con efecto bokeh',
      'ProRAW y ProRes',
      'Carga inalámbrica MagSafe y Qi'
    ],
    included: [
      'iPhone 15 Pro Max',
      'Cable USB-C a USB-C',
      'Documentación',
      'Protector de pantalla pre-instalado'
    ]
  },
  '4': { // iPad Air
    specifications: {
      'Procesador': 'Apple M1',
      'Pantalla': '10.9" Liquid Retina',
      'Resolución': '2360 x 1640 píxeles (264 ppi)',
      'Almacenamiento': '256GB',
      'Cámara trasera': '12MP gran angular',
      'Cámara frontal': '12MP ultra gran angular',
      'Conectividad': 'Wi-Fi 6, Bluetooth 5.0',
      'Puertos': 'USB-C',
      'Compatibilidad': 'Apple Pencil (2ª gen), Magic Keyboard',
      'Batería': 'Hasta 10 horas de navegación web',
      'Peso': '461g'
    },
    features: [
      'Touch ID en el botón superior',
      'Pantalla Liquid Retina con True Tone',
      'Compatibilidad con Apple Pencil 2ª generación',
      'Cámara frontal con encuadre centrado',
      'Altavoces estéreo en horizontal',
      'Grabación de video 4K'
    ],
    included: [
      'iPad Air',
      'Cable USB-C a USB-C',
      'Cargador USB-C de 20W',
      'Documentación'
    ]
  },
  '5': { // Licuadora Vitamix
    specifications: {
      'Motor': '2.2 HP (Caballos de fuerza)',
      'Capacidad': '64 oz (1.9L)',
      'Velocidades': 'Variable de 1-10 + Pulse',
      'Cuchillas': 'Acero inoxidable templado',
      'Material del recipiente': 'Tritan sin BPA',
      'Dimensiones': '43 x 19 x 22 cm',
      'Peso': '5.2 kg',
      'Potencia': '1400W',
      'Garantía': '7 años completa',
      'Certificaciones': 'NSF, UL'
    },
    features: [
      'Tecnología de vórtex para mezcla total',
      'Capacidad para calentar sopas por fricción',
      'Cuchillas de acero templado que nunca se desafilan',
      'Contenedor autoajustable que empuja alimentos hacia las cuchillas',
      'Control de velocidad variable',
      'Interruptor de pulse para textura controlada',
      'Motor térmicamente protegido'
    ],
    included: [
      'Motor base Vitamix',
      'Contenedor de 64 oz',
      'Tapa con tapón medidor',
      'Libro de recetas',
      'Manual de instrucciones'
    ]
  },
  '12': { // Bicicleta Trek
    specifications: {
      'Cuadro': 'Aluminio Alpha Silver, geometría XC',
      'Suspensión delantera': 'RockShox Judy Silver TK, 100mm',
      'Cambios': 'Shimano Deore M6000, 1x10 velocidades',
      'Frenos': 'Shimano MT200 hidráulicos',
      'Ruedas': 'Bontrager Connection 29"',
      'Neumáticos': 'Bontrager XR2 Comp, 29x2.20"',
      'Tija de sillín': 'Bontrager Line Elite, 31.6mm',
      'Manillar': 'Bontrager Line Pro, aleación, 31.8mm',
      'Peso': '13.5 kg aproximadamente',
      'Tallas disponibles': 'S, M, L, XL'
    },
    features: [
      'Geometría XC optimizada para trail y montaña',
      'Suspensión RockShox con bloqueo',
      'Sistema de transmisión 1x10 Shimano',
      'Frenos hidráulicos de alto rendimiento',
      'Ruedas 29" para mejor rodado',
      'Cuadro liviano de aluminio',
      'Compatible con dropper post'
    ],
    included: [
      'Bicicleta Trek X-Caliber 8',
      'Pedales de plataforma',
      'Reflectores de seguridad',
      'Manual de usuario',
      'Certificado de garantía'
    ]
  }
};

// Normalización defensiva del producto para evitar errores si faltan campos
function normalizeProduct(raw: Product): Product {
  // Clonar y aplicar defaults mínimos
  const fallbackSeller = {
    id: raw?.seller?.id || 'unknown',
    name: raw?.seller?.name || 'Vendedor',
    avatar: raw?.seller?.avatar || '',
    rating: typeof raw?.seller?.rating === 'number' ? raw.seller.rating : 0,
    reviewCount: typeof raw?.seller?.reviewCount === 'number' ? raw.seller.reviewCount : 0,
    verifiedSeller: !!raw?.seller?.verifiedSeller,
    memberSince: raw?.seller?.memberSince || new Date().toISOString()
  };
  return {
    id: raw?.id || '0',
    name: raw?.name || 'Producto',
    price: typeof raw?.price === 'number' ? raw.price : 0,
    image: raw?.image || '',
    description: raw?.description || 'Descripción no disponible.',
    category: raw?.category || 'general',
    seller: fallbackSeller,
    availableForRent: !!raw?.availableForRent,
    availableForSale: !!raw?.availableForSale,
    condition: raw?.condition || 'good',
    location: raw?.location || 'Colombia'
  };
}

export function ProductDetails({ product: incomingProduct, onBack }: ProductDetailsProps) {
  const product = useMemo(() => normalizeProduct(incomingProduct), [incomingProduct]);
  const { addToCart } = useCart();
  const [rentalUnit, setRentalUnit] = useState<'hours' | 'days' | 'weeks' | 'months'>('days');
  const [rentalDuration, setRentalDuration] = useState(1);

  const specs = productSpecifications[product.id] || {
    specifications: {},
    features: [],
    included: []
  };

  const handleAddToCart = (rental: boolean = false) => {
    addToCart(product, rental, rental ? rentalDuration : 1, rental ? rentalUnit : 'days');
    const action = rental ? 'alquilado' : 'agregado al carrito';
    const period = rental ? ` por ${rentalDuration} ${getUnitLabel(rentalUnit, rentalDuration)}` : '';
    toast.success(`${product.name} ${action}${period}`);
  };

  const getUnitLabel = (unit: string, duration: number) => {
    const labels = {
      hours: duration === 1 ? 'hora' : 'horas',
      days: duration === 1 ? 'día' : 'días', 
      weeks: duration === 1 ? 'semana' : 'semanas',
      months: duration === 1 ? 'mes' : 'meses'
    };
    return labels[unit as keyof typeof labels] || 'días';
  };

  const getConditionBadge = (condition: string) => {
    const badges = {
      'new': { label: 'Nuevo', variant: 'default' as const },
      'excellent': { label: 'Excelente', variant: 'secondary' as const },
      'good': { label: 'Bueno', variant: 'outline' as const },
      'fair': { label: 'Regular', variant: 'destructive' as const }
    };
    return badges[condition as keyof typeof badges] || badges.good;
  };

  const calculateRentalPrice = (duration: number, unit: string = 'days') => {
    let dailyRate = product.price * 0.1; // 10% of sale price per day
    
    // Adjust rate based on unit
    switch (unit) {
      case 'hours':
        dailyRate = dailyRate / 8; // Assuming 8 hours per day
        break;
      case 'weeks':
        dailyRate = dailyRate * 6; // Discount for weekly rental
        break;
      case 'months':
        dailyRate = dailyRate * 25; // Bigger discount for monthly rental
        break;
      default: // days
        break;
    }
    
    return dailyRate * duration;
  };

  const getRentalOptions = (unit: 'hours' | 'days' | 'weeks' | 'months') => {
    const options = {
      hours: [1, 3, 6, 8, 12, 24].map(hours => ({ value: hours, label: `${hours} hora${hours > 1 ? 's' : ''}` })),
      days: [1, 3, 7, 14, 30].map(days => ({ value: days, label: `${days} día${days > 1 ? 's' : ''}` })),
      weeks: [1, 2, 3, 4, 8].map(weeks => ({ value: weeks, label: `${weeks} semana${weeks > 1 ? 's' : ''}` })),
      months: [1, 2, 3, 6, 12].map(months => ({ value: months, label: `${months} mes${months > 1 ? 'es' : ''}` }))
    };
    return options[unit];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-6 hover:bg-muted"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver al catálogo
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <Badge {...getConditionBadge(product.condition)}>
                {getConditionBadge(product.condition).label}
              </Badge>
              {product.availableForRent && (
                <Badge variant="outline" className="bg-accent/90 text-accent-foreground border-accent">
                  Disponible para alquiler
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl">{product.name}</h1>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{product.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {product.location}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Seller Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                  <AvatarImage src={product.seller?.avatar || ''} />
                  <AvatarFallback>{(product.seller?.name || 'VD').substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium">{product.seller?.name || 'Vendedor'}</h3>
                    {product.seller?.verifiedSeller && (
                      <Shield className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.seller?.rating || 0)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {(product.seller?.rating || 0)} ({product.seller?.reviewCount || 0} reseñas)
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Miembro desde {new Date(product.seller?.memberSince || new Date().toISOString()).toLocaleDateString('es-CO', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing and Actions */}
          <div className="space-y-4">
            <div className="text-3xl font-bold text-primary">
              ${product.price.toLocaleString('es-CO')}
            </div>
            
            {product.availableForSale && (
              <Button
                size="lg"
                onClick={() => handleAddToCart(false)}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Comprar Ahora
              </Button>
            )}

            {product.availableForRent && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Opciones de Alquiler
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Tipo de alquiler</Label>
                      <Select 
                        value={rentalUnit} 
                        onValueChange={(value: 'hours' | 'days' | 'weeks' | 'months') => {
                          setRentalUnit(value);
                          setRentalDuration(1);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hours">Por Horas</SelectItem>
                          <SelectItem value="days">Por Días</SelectItem>
                          <SelectItem value="weeks">Por Semanas</SelectItem>
                          <SelectItem value="months">Por Meses</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Duración</Label>
                      <Select 
                        value={rentalDuration.toString()} 
                        onValueChange={(value) => setRentalDuration(parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {getRentalOptions(rentalUnit).map(option => (
                            <SelectItem key={option.value} value={option.value.toString()}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span>Precio de alquiler:</span>
                    <span className="font-bold text-lg">
                      ${calculateRentalPrice(rentalDuration, rentalUnit).toLocaleString('es-CO')}
                    </span>
                  </div>

                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => handleAddToCart(true)}
                    className="w-full"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Alquilar por {rentalDuration} {getUnitLabel(rentalUnit, rentalDuration)}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="specifications" className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              Especificaciones
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Características
            </TabsTrigger>
            <TabsTrigger value="included" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Qué incluye
            </TabsTrigger>
          </TabsList>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Especificaciones Técnicas</CardTitle>
              </CardHeader>
              <CardContent>
                {Object.keys(specs.specifications).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(specs.specifications).map(([key, value]) => (
                      <div key={key} className="flex flex-col space-y-1">
                        <dt className="text-sm font-medium text-muted-foreground">{key}</dt>
                        <dd className="text-sm">{value}</dd>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Las especificaciones técnicas detalladas estarán disponibles próximamente.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Características Principales</CardTitle>
              </CardHeader>
              <CardContent>
                {specs.features.length > 0 ? (
                  <ul className="space-y-2">
                    {specs.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">
                    Las características detalladas del producto estarán disponibles próximamente.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="included" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Qué incluye la compra/alquiler</CardTitle>
              </CardHeader>
              <CardContent>
                {specs.included.length > 0 ? (
                  <ul className="space-y-2">
                    {specs.included.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Package className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">
                    La información sobre qué incluye estará disponible próximamente.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}