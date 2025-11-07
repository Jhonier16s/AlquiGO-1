import React, { useState } from 'react';
import { Product, useCart } from './CartContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ShoppingCart, Search, Star, Shield, Calendar, MapPin, Clock, Eye } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ProductCatalogProps {
  onProductSelect?: (product: Product) => void;
}

// Mock products with updated Colombian prices and locations
const mockProducts: Product[] = [
  // Electrónicos
  {
    id: '1',
    name: 'Laptop Profesional MacBook Pro',
    price: 11500000,
    image: 'https://images.unsplash.com/photo-1737868131532-0efce8062b43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU2MzY4OTU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'MacBook Pro 16" con chip M2 Pro, 32GB RAM, 1TB SSD. Perfecto para diseño, desarrollo y tareas intensivas.',
    category: 'electrónicos',
    condition: 'excellent',
    location: 'Bogotá, Cundinamarca',
    availableForRent: true,
    availableForSale: true,
    seller: {
      id: 'seller1',
      name: 'TechnoStore Colombia',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      rating: 4.9,
      reviewCount: 2847,
      verifiedSeller: true,
      memberSince: '2018-03-15'
    }
  },
  {
    id: '2',
    name: 'Audífonos Inalámbricos AirPods Pro',
    price: 1290000,
    image: 'https://images.unsplash.com/photo-1632200004922-bc18602c79fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBhdWRpb3xlbnwxfHx8fDE3NTYzMjUxODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'AirPods Pro con cancelación activa de ruido, audio espacial y hasta 30 horas de batería. Incluye estuche de carga.',
    category: 'electrónicos',
    condition: 'new',
    location: 'Medellín, Antioquia',
    availableForRent: true,
    availableForSale: true,
    seller: {
      id: 'seller2',
      name: 'AudioExperts Colombia',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      rating: 4.7,
      reviewCount: 1203,
      verifiedSeller: true,
      memberSince: '2019-07-22'
    }
  },
  {
    id: '3',
    name: 'iPhone 15 Pro Max 256GB',
    price: 5950000,
    image: 'https://images.unsplash.com/photo-1675953935267-e039f13ddd79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlJTIwcGhvbmV8ZW58MXx8fHwxNzU2MzMwNDE4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'iPhone 15 Pro Max con chip A17 Pro, sistema de cámara triple y Action Button. Incluye cargador y protector.',
    category: 'electrónicos',
    condition: 'new',
    location: 'Cali, Valle del Cauca',
    availableForRent: true,
    availableForSale: true,
    seller: {
      id: 'seller3',
      name: 'iZone Premium Colombia',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100',
      rating: 4.8,
      reviewCount: 3421,
      verifiedSeller: true,
      memberSince: '2017-11-08'
    }
  },
  {
    id: '4',
    name: 'Tablet iPad Air 10.9"',
    price: 2890000,
    image: 'https://images.unsplash.com/photo-1604319463636-54cf7751107f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBjb21wdXRlciUyMGRldmljZXxlbnwxfHx8fDE3NTY5NzIyNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'iPad Air con chip M1, pantalla Liquid Retina de 10.9" y soporte para Apple Pencil. Ideal para crear y trabajar.',
    category: 'electrónicos',
    condition: 'excellent',
    location: 'Cartagena, Bolívar',
    availableForRent: true,
    availableForSale: true,
    seller: {
      id: 'seller4',
      name: 'Digital Dreams Colombia',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9fd674b?w=100',
      rating: 4.6,
      reviewCount: 987,
      verifiedSeller: false,
      memberSince: '2020-01-15'
    }
  },

  // Hogar
  {
    id: '5',
    name: 'Licuadora de Alta Potencia Vitamix',
    price: 1890000,
    image: 'https://images.unsplash.com/photo-1585237672814-8f85a8118bf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwYXBwbGlhbmNlcyUyMGJsZW5kZXJ8ZW58MXx8fHwxNzU2OTg2NTI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Licuadora profesional Vitamix con motor de 2.2 HP, 64oz, perfecta para smoothies, sopas calientes y más.',
    category: 'hogar',
    condition: 'good',
    location: 'Barranquilla, Atlántico',
    availableForRent: true,
    availableForSale: true,
    seller: {
      id: 'seller5',
      name: 'CocinaTop Colombia',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      rating: 4.4,
      reviewCount: 756,
      verifiedSeller: true,
      memberSince: '2019-05-20'
    }
  },
  {
    id: '6',
    name: 'Taza de Cerámica Artesanal',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1720537262372-57e81c4db13c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBtdWclMjBjZXJhbWljfGVufDF8fHx8MTc1NjM4MjY5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Taza artesanal de cerámica hecha a mano con diseños únicos. Perfecta para café, té o chocolate caliente.',
    category: 'hogar',
    condition: 'new',
    location: 'Villa de Leyva, Boyacá',
    availableForRent: false,
    availableForSale: true,
    seller: {
      id: 'seller6',
      name: 'Artesanías Boyacenses',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      rating: 4.9,
      reviewCount: 234,
      verifiedSeller: true,
      memberSince: '2021-02-10'
    }
  },

  // Ropa y Accesorios
  {
    id: '7',
    name: 'Zapatillas Running Nike Air Max',
    price: 650000,
    image: 'https://images.unsplash.com/photo-1719523677291-a395426c1a87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXMlMjBzbmVha2Vyc3xlbnwxfHx8fDE3NTYzNzA3Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Nike Air Max 270 para running y actividades deportivas. Tecnología Air visible y máxima comodidad.',
    category: 'ropa',
    condition: 'excellent',
    location: 'Bucaramanga, Santander',
    availableForRent: false,
    availableForSale: true,
    seller: {
      id: 'seller7',
      name: 'SportZone Colombia',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      rating: 4.7,
      reviewCount: 1456,
      verifiedSeller: true,
      memberSince: '2018-09-12'
    }
  },
  {
    id: '8',
    name: 'Bolso de Diseñador Louis Vuitton',
    price: 8900000,
    image: 'https://images.unsplash.com/photo-1601924928357-22d3b3abfcfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGhhbmRiYWclMjBmYXNoaW9ufGVufDF8fHx8MTc1NjkxODAzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Bolso auténtico Louis Vuitton Neverfull MM en canvas monogram. Incluye dustbag y certificado de autenticidad.',
    category: 'ropa',
    condition: 'excellent',
    location: 'Zona Rosa, Bogotá',
    availableForRent: true,
    availableForSale: true,
    seller: {
      id: 'seller8',
      name: 'Luxury Boutique Colombia',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      rating: 4.9,
      reviewCount: 789,
      verifiedSeller: true,
      memberSince: '2016-04-18'
    }
  },
  {
    id: '9',
    name: 'Reloj Rolex Submariner',
    price: 45000000,
    image: 'https://images.unsplash.com/photo-1664437235473-65aaf8912d20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMHRpbWVwaWVjZXxlbnwxfHx8fDE3NTY4ODcwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Rolex Submariner Date acero inoxidable, resistente al agua hasta 300m. Incluye caja original y papeles.',
    category: 'ropa',
    condition: 'excellent',
    location: 'El Poblado, Medellín',
    availableForRent: true,
    availableForSale: true,
    seller: {
      id: 'seller9',
      name: 'TimeKeepers Colombia',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      rating: 4.8,
      reviewCount: 345,
      verifiedSeller: true,
      memberSince: '2015-08-30'
    }
  },

  // Accesorios
  {
    id: '10',
    name: 'Mochila de Viaje Patagonia',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1673505705687-dffbfd02b613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFjayUyMHRyYXZlbCUyMGJhZ3xlbnwxfHx8fDE3NTY0MjUzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Mochila Patagonia Black Hole 32L, resistente al agua con múltiples compartimentos para viajes y outdoor.',
    category: 'accesorios',
    condition: 'good',
    location: 'Santa Marta, Magdalena',
    availableForRent: true,
    availableForSale: true,
    seller: {
      id: 'seller10',
      name: 'Adventure Gear Colombia',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9fd674b?w=100',
      rating: 4.6,
      reviewCount: 892,
      verifiedSeller: true,
      memberSince: '2019-12-05'
    }
  },
  {
    id: '11',
    name: 'Cámara Canon EOS R5',
    price: 12800000,
    image: 'https://images.unsplash.com/photo-1729857037662-221cc636782a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTY5NDQ4Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Canon EOS R5 mirrorless con sensor de 45MP, video 8K, ideal para fotografía profesional y cinematografía.',
    category: 'accesorios',
    condition: 'excellent',
    location: 'San Andrés, Archipiélago',
    availableForRent: true,
    availableForSale: true,
    seller: {
      id: 'seller11',
      name: 'PhotoPro Colombia',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100',
      rating: 4.9,
      reviewCount: 567,
      verifiedSeller: true,
      memberSince: '2017-06-14'
    }
  },

  // Deportes
  {
    id: '12',
    name: 'Bicicleta de Montaña Trek',
    price: 3200000,
    image: 'https://images.unsplash.com/photo-1726813828002-775d4b8e30ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWN5Y2xlJTIwbW91bnRhaW4lMjBiaWtlfGVufDF8fHx8MTc1NjkzNDEyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Trek X-Caliber 8 con cuadro de aluminio, suspensión RockShox y cambios Shimano. Lista para cualquier sendero.',
    category: 'deportes',
    condition: 'good',
    location: 'Manizales, Caldas',
    availableForRent: true,
    availableForSale: true,
    seller: {
      id: 'seller12',
      name: 'CycleColombia',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      rating: 4.7,
      reviewCount: 1234,
      verifiedSeller: true,
      memberSince: '2018-11-22'
    }
  },
  {
    id: '13',
    name: 'Set de Pesas Ajustables',
    price: 1250000,
    image: 'https://images.unsplash.com/photo-1652492041264-efba848755d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZXF1aXBtZW50JTIwZHVtYmJlbGxzfGVufDF8fHx8MTc1Njk1MzcyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Set de mancuernas ajustables de 5-25kg cada una. Perfecto para entrenamientos en casa y espacios pequeños.',
    category: 'deportes',
    condition: 'excellent',
    location: 'Pereira, Risaralda',
    availableForRent: true,
    availableForSale: true,
    seller: {
      id: 'seller13',
      name: 'FitnessPro Colombia',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      rating: 4.5,
      reviewCount: 678,
      verifiedSeller: true,
      memberSince: '2020-03-08'
    }
  },

  // Herramientas
  {
    id: '14',
    name: 'Taladro Inalámbrico DeWalt',
    price: 890000,
    image: 'https://images.unsplash.com/photo-1755168648692-ef8937b7e63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMHRvb2xzJTIwZHJpbGwlMjBjb25zdHJ1Y3Rpb258ZW58MXx8fHwxNzU2OTkwNjExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Taladro DeWalt 20V MAX con batería de litio, incluye maletín y set de brocas. Ideal para construcción y hogar.',
    category: 'herramientas',
    condition: 'good',
    location: 'Ibagué, Tolima',
    availableForRent: true,
    availableForSale: true,
    seller: {
      id: 'seller14',
      name: 'ToolMaster Colombia',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      rating: 4.6,
      reviewCount: 543,
      verifiedSeller: true,
      memberSince: '2019-01-16'
    }
  },

  // Música
  {
    id: '15',
    name: 'Guitarra Acústica Taylor',
    price: 4200000,
    image: 'https://images.unsplash.com/photo-1708165802530-ccf9ca6a8269?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWl0YXIlMjBtdXNpY2FsJTIwaW5zdHJ1bWVudHxlbnwxfHx8fDE3NTY5NjU1NjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Guitarra acústica Taylor 214ce con electrificación, tapa de Sitka Spruce y fondo de Rosewood laminado.',
    category: 'música',
    condition: 'excellent',
    location: 'Armenia, Quindío',
    availableForRent: true,
    availableForSale: true,
    seller: {
      id: 'seller15',
      name: 'MusicStore Colombia',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      rating: 4.8,
      reviewCount: 432,
      verifiedSeller: true,
      memberSince: '2017-09-25'
    }
  },

  // Muebles
  {
    id: '16',
    name: 'Silla Gamer RGB Profesional',
    price: 1680000,
    image: 'https://images.unsplash.com/photo-1551033541-2075d8363c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjaGFpciUyMGRlc2slMjBzZXR1cHxlbnwxfHx8fDE3NTY4ODQ0MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Silla gamer ergonómica con iluminación RGB, reclinación 180°, cojines de memoria y reposabrazos ajustables.',
    category: 'muebles',
    condition: 'new',
    location: 'Chapinero, Bogotá',
    availableForRent: true,
    availableForSale: true,
    seller: {
      id: 'seller16',
      name: 'GamersCorner Colombia',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9fd674b?w=100',
      rating: 4.7,
      reviewCount: 1891,
      verifiedSeller: true,
      memberSince: '2018-12-03'
    }
  }
];

export function ProductCatalog({ onProductSelect }: ProductCatalogProps = {}) {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceOrder, setPriceOrder] = useState('none');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isRental, setIsRental] = useState(false);
  const [rentalDuration, setRentalDuration] = useState(1);
  const [rentalUnit, setRentalUnit] = useState<'hours' | 'days' | 'weeks' | 'months'>('days');

  const categories = ['all', 'electrónicos', 'hogar', 'ropa', 'accesorios', 'deportes', 'herramientas', 'música', 'muebles'];

  const filteredProducts = mockProducts
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (priceOrder === 'asc') return a.price - b.price;
      if (priceOrder === 'desc') return b.price - a.price;
      return 0;
    });

  const handleAddToCart = (product: Product, rental: boolean = false, duration: number = 1, unit: string = 'days') => {
    addToCart(product, rental, duration, unit);
    const action = rental ? 'alquilado' : 'agregado al carrito';
    const period = rental ? ` por ${duration} ${getUnitLabel(unit, duration)}` : '';
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

  const calculateRentalPrice = (product: Product, duration: number, unit: string = 'days') => {
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
      <div className="mb-8">
        <h1 className="text-3xl mb-6">Nuestros Productos</h1>
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {categories.slice(1).map(category => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priceOrder} onValueChange={setPriceOrder}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Ordenar por precio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Sin orden</SelectItem>
              <SelectItem value="asc">Precio: Menor a Mayor</SelectItem>
              <SelectItem value="desc">Precio: Mayor a Menor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square relative">
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
                    Alquiler
                  </Badge>
                )}
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-lg line-clamp-2 flex-1">{product.name}</h3>
                  <Badge variant="secondary" className="ml-2 shrink-0">
                    {product.category}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {product.description}
                </p>

                {/* Seller Info */}
                <div className="flex items-center space-x-2 p-2 bg-muted/30 rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={product.seller.avatar} />
                    <AvatarFallback>{product.seller.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1">
                      <p className="text-sm font-medium truncate">{product.seller.name}</p>
                      {product.seller.verifiedSeller && (
                        <Shield className="h-3 w-3 text-primary" />
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.seller.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {product.seller.rating} ({product.seller.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  {product.location}
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">
                      ${product.price.toLocaleString('es-CO')}
                    </span>
                    {product.availableForRent && (
                      <p className="text-sm text-muted-foreground">
                        o desde ${(product.price * 0.1 / 8).toLocaleString('es-CO')}/hora
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="p-4 pt-0 space-y-2">
              {/* Ver detalles button */}
              <Button
                variant="secondary"
                onClick={() => onProductSelect && onProductSelect(product)}
                className="w-full"
              >
                <Eye className="w-4 h-4 mr-2" />
                Ver Detalles y Especificaciones
              </Button>

              {product.availableForSale && (
                <Button
                  onClick={() => handleAddToCart(product, false)}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground border-0"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Comprar
                </Button>
              )}
              
              {product.availableForRent && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Alquilar
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Alquilar {product.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Desde ${(product.price * 0.1 / 8).toLocaleString('es-CO')} por hora
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="rental-unit">Tipo de alquiler</Label>
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
                          <Label htmlFor="rental-duration">Duración</Label>
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

                        <div className="bg-muted/30 p-4 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Total del alquiler:</span>
                            <span className="text-xl font-bold text-primary">
                              ${calculateRentalPrice(product, rentalDuration, rentalUnit).toLocaleString('es-CO')}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {rentalDuration} {getUnitLabel(rentalUnit, rentalDuration)}
                          </p>
                        </div>

                        <Button 
                          onClick={() => {
                            handleAddToCart(product, true, rentalDuration, rentalUnit);
                          }}
                          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          Alquilar por ${calculateRentalPrice(product, rentalDuration, rentalUnit).toLocaleString('es-CO')}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}