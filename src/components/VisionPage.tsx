import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Star, Target, Eye, Heart, Lightbulb, Users, Globe, ShoppingBag } from 'lucide-react';

interface VisionPageProps {
  onNavigate?: (view: string) => void;
}

export function VisionPage({ onNavigate }: VisionPageProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <Eye className="h-12 w-12 text-primary mr-4" />
          <h1 className="text-primary">Nuestra Visión</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
          Transformando el futuro del comercio en Colombia a través de la innovación, 
          sostenibilidad y accesibilidad para todos los colombianos.
        </p>
      </div>

      {/* Main Vision Card */}
      <Card className="border-2 border-primary/20 mb-12">
        <CardHeader>
          <CardTitle className="text-2xl text-primary flex items-center gap-3">
            <Star className="h-8 w-8" />
            Visión 2030: AlquiGo como Líder del Comercio Digital en Colombia
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-lg">
            <p className="text-lg leading-relaxed">
              <strong>Ser la plataforma de comercio electrónico más confiable y accesible de Colombia</strong>, 
              transformando la manera en que los colombianos compran y alquilan productos, 
              fomentando una <strong>economía circular y sostenible</strong> que beneficie a todas las comunidades 
              del país, desde las grandes ciudades hasta los municipios más remotos.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-primary flex items-center gap-2">
                <Target className="h-5 w-5" />
                Objetivos Estratégicos
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Alcanzar 10 millones de usuarios activos en Colombia</li>
                <li>• Cubrir el 100% de municipios colombianos</li>
                <li>• Apoyar a 100,000 emprendedores locales</li>
                <li>• Reducir el impacto ambiental del consumo</li>
                <li>• Crear 50,000 empleos directos e indirectos</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-secondary flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Impacto Social
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Democratizar el acceso a productos de calidad</li>
                <li>• Impulsar la economía local en todas las regiones</li>
                <li>• Promover el consumo responsable y sostenible</li>
                <li>• Facilitar la inclusión digital empresarial</li>
                <li>• Conectar Colombia a través del comercio digital</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pillars of Our Vision */}
      <div className="mb-12">
        <h2 className="text-center mb-8 text-primary">Los Pilares de Nuestra Visión</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-primary">Innovación Constante</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Utilizamos las últimas tecnologías para crear experiencias únicas de compra y venta, 
                con inteligencia artificial, realidad aumentada y análisis predictivo.
              </p>
              <Badge variant="outline" className="mt-3 text-primary border-primary">
                Tecnología de Vanguardia
              </Badge>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-secondary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <CardTitle className="text-secondary">Inclusión Social</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Construimos puentes digitales que conectan a emprendedores rurales con mercados urbanos, 
                promoviendo la equidad y oportunidades para todos.
              </p>
              <Badge variant="outline" className="mt-3 text-secondary border-secondary">
                Equidad Digital
              </Badge>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-accent/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Globe className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-accent">Sostenibilidad</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Promovemos una economía circular donde el alquiler y la reutilización reducen 
                el desperdicio y protegen nuestro medio ambiente.
              </p>
              <Badge variant="outline" className="mt-3 text-accent border-accent">
                Economía Verde
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Future Projections */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-primary">AlquiGo en 2030</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">10M+</div>
              <p className="text-sm text-muted-foreground">Usuarios Activos</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-secondary">1,100+</div>
              <p className="text-sm text-muted-foreground">Municipios Cubiertos</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">100K+</div>
              <p className="text-sm text-muted-foreground">Emprendedores Apoyados</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">$1B+</div>
              <p className="text-sm text-muted-foreground">Transacciones Anuales</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-2 border-primary/20">
        <CardContent className="text-center py-8">
          <ShoppingBag className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl mb-4 text-primary">Sé Parte de Esta Visión</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Únete a miles de colombianos que ya están construyendo el futuro del comercio digital. 
            Cada compra, cada venta, cada alquiler nos acerca más a nuestra visión de una Colombia conectada y próspera.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => onNavigate?.('products')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Explorar Productos
            </Button>
            <Button 
              variant="outline"
              onClick={() => onNavigate?.('about')}
              className="border-primary text-primary hover:bg-primary/5"
            >
              Conocer Más
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}