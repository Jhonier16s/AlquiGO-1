import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ShoppingBag, 
  Truck, 
  Shield, 
  Headphones, 
  Star,
  ArrowRight,
  Eye
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (view: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: Truck,
      title: 'Envío Gratis',
      description: 'En pedidos superiores a $500'
    },
    {
      icon: Shield,
      title: 'Compra Segura',
      description: 'Transacciones protegidas al 100%'
    },
    {
      icon: Headphones,
      title: 'Soporte 24/7',
      description: 'Asistencia cuando la necesites'
    }
  ];

  const featuredProducts = [
    {
      id: '1',
      name: 'Laptop Profesional',
      price: 3700000,
      originalPrice: 4950000,
      image: 'https://images.unsplash.com/photo-1737868131532-0efce8062b43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU2MzY4OTU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.8,
      reviews: 124,
      badge: 'Más vendido'
    },
    {
      id: '2',
      name: 'Audífonos Inalámbricos',
      price: 620000,
      originalPrice: 825000,
      image: 'https://images.unsplash.com/photo-1632200004922-bc18602c79fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBhdWRpb3xlbnwxfHx8fDE3NTYzMjUxODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      reviews: 89,
      badge: 'Oferta'
    },
    {
      id: '3',
      name: 'Smartphone Avanzado',
      price: 2900000,
      originalPrice: 3300000,
      image: 'https://images.unsplash.com/photo-1675953935267-e039f13ddd79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlJTIwcGhvbmV8ZW58MXx8fHwxNzU2MzMwNDE4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.7,
      reviews: 156,
      badge: 'Nuevo'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-accent/10 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl leading-tight">
                  Encuentra Todo lo que Necesitas en{' '}
                  <span className="text-primary">AlquiGo</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  La mejor selección de productos tecnológicos, accesorios y más, 
                  con envío gratis y garantía de calidad.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={() => onNavigate('products')}
                  className="px-8 bg-accent hover:bg-accent/90 text-accent-foreground border-0"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Explorar Productos
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => onNavigate('contacts')}
                  className="px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Más Información
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">Productos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50k+</div>
                  <div className="text-sm text-muted-foreground">Clientes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">4.9</div>
                  <div className="text-sm text-muted-foreground">Calificación</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBzaG9wcGluZyUyMGVjb21tZXJjZXxlbnwxfHx8fDE3NTYzNTk1NDd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Online Shopping"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Cards */}
              <Card className="absolute -bottom-6 -left-6 w-48 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className="font-medium text-sm">Envío Express</p>
                      <p className="text-xs text-muted-foreground">24-48 horas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">¿Por qué elegir AlquiGo?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ofrecemos la mejor experiencia de compra online con servicios de calidad
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Vision CTA */}
          <div className="mt-16">
            <Card className="bg-gradient-to-r from-primary/5 to-accent/10 border-2 border-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Eye className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl mb-4 text-primary">Conoce Nuestra Visión</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Descubre cómo estamos transformando el futuro del comercio digital en Colombia 
                  y cómo puedes ser parte de esta revolución tecnológica.
                </p>
                <Button 
                  onClick={() => onNavigate('vision')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Nuestra Visión
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl mb-4">Productos Destacados</h2>
              <p className="text-muted-foreground">
                Los más vendidos y mejor valorados por nuestros clientes
              </p>
            </div>
            <Button 
              variant="outline"
              onClick={() => onNavigate('products')}
              className="hidden sm:flex"
            >
              Ver Todos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary">{product.badge}</Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews} reseñas)
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-primary">
                        ${product.price}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    </div>
                    
                    <Button 
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground border-0"
                      onClick={() => onNavigate('products')}
                    >
                      Ver Detalles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 sm:hidden">
            <Button 
              onClick={() => onNavigate('products')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground border-0"
            >
              Ver Todos los Productos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl mb-6">
            ¿Listo para comenzar a comprar?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Únete a miles de clientes satisfechos y descubre la mejor experiencia de compra online
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => onNavigate('products')}
              className="px-8 bg-accent hover:bg-accent/90 text-accent-foreground border-0"
            >
              Explorar Catálogo
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => onNavigate('auth')}
              className="px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Crear Cuenta
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}