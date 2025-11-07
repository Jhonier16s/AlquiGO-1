import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Product } from './CartContext';
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User, 
  ShoppingCart, 
  Search, 
  Star,
  Package,
  Clock,
  Tag
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  products?: Product[];
}

interface ChatbotProps {
  products: Product[];
  onProductSelect?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export function Chatbot({ products, onProductSelect, onAddToCart }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: '¡Hola! Soy AlquiBot, tu asistente personal de compras 🛍️. Puedo ayudarte a encontrar productos, comparar precios y recomendarte los mejores artículos según tus necesidades. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (type: 'user' | 'bot', content: string, products?: Product[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      products
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const findProducts = (query: string): Product[] => {
    const searchTerms = query.toLowerCase().split(' ');
    return products.filter(product => {
      const searchableText = `${product.name} ${product.description} ${product.category}`.toLowerCase();
      return searchTerms.some(term => searchableText.includes(term));
    }).slice(0, 6); // Limit to 6 products
  };

  const getProductRecommendations = (category?: string, priceRange?: { min: number; max: number }): Product[] => {
    let filtered = products;
    
    if (category) {
      filtered = filtered.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    }
    
    if (priceRange) {
      filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);
    }
    
    // Sort by rating and return top 6
    return filtered
      .sort((a, b) => b.seller.rating - a.seller.rating)
      .slice(0, 6);
  };

  const generateBotResponse = (userMessage: string): { content: string; products?: Product[] } => {
    const message = userMessage.toLowerCase();
    
    // Search queries
    if (message.includes('buscar') || message.includes('busco') || message.includes('necesito') || message.includes('quiero')) {
      const foundProducts = findProducts(userMessage);
      if (foundProducts.length > 0) {
        return {
          content: `Encontré ${foundProducts.length} productos relacionados con tu búsqueda. Aquí tienes algunas opciones:`,
          products: foundProducts
        };
      } else {
        return {
          content: 'No encontré productos exactos para tu búsqueda, pero puedo recomendarte nuestros productos más populares. ¿Te gustaría ver alguna categoría específica?'
        };
      }
    }
    
    // Category recommendations
    if (message.includes('electrónicos') || message.includes('tecnología') || message.includes('computador') || message.includes('celular')) {
      const recommended = getProductRecommendations('electrónicos');
      return {
        content: 'Te recomiendo estos excelentes productos electrónicos:',
        products: recommended
      };
    }
    
    if (message.includes('ropa') || message.includes('vestir') || message.includes('zapatos') || message.includes('accesorios')) {
      const recommended = getProductRecommendations('ropa');
      return {
        content: 'Aquí tienes nuestra mejor selección de ropa y accesorios:',
        products: recommended
      };
    }
    
    if (message.includes('hogar') || message.includes('casa') || message.includes('cocina') || message.includes('muebles')) {
      const hogarProducts = getProductRecommendations('hogar');
      const mueblesProducts = getProductRecommendations('muebles');
      const combined = [...hogarProducts, ...mueblesProducts].slice(0, 6);
      return {
        content: 'Perfectos productos para tu hogar:',
        products: combined
      };
    }
    
    if (message.includes('deportes') || message.includes('ejercicio') || message.includes('fitness') || message.includes('gym')) {
      const recommended = getProductRecommendations('deportes');
      return {
        content: 'Mantente activo con estos productos deportivos:',
        products: recommended
      };
    }
    
    // Price range queries
    if (message.includes('barato') || message.includes('económico') || message.includes('precio bajo')) {
      const cheapProducts = products
        .filter(p => p.price < 1000000)
        .sort((a, b) => a.price - b.price)
        .slice(0, 6);
      return {
        content: 'Estos son nuestros productos más económicos (menos de $1,000,000):',
        products: cheapProducts
      };
    }
    
    if (message.includes('caro') || message.includes('premium') || message.includes('lujo') || message.includes('alta gama')) {
      const expensiveProducts = products
        .filter(p => p.price > 5000000)
        .sort((a, b) => b.price - a.price)
        .slice(0, 6);
      return {
        content: 'Nuestra selección premium (más de $5,000,000):',
        products: expensiveProducts
      };
    }
    
    // Rental queries
    if (message.includes('alquiler') || message.includes('alquilar') || message.includes('rentar')) {
      const rentalProducts = products.filter(p => p.availableForRent).slice(0, 6);
      return {
        content: 'Estos productos están disponibles para alquiler:',
        products: rentalProducts
      };
    }
    
    // Help queries
    if (message.includes('ayuda') || message.includes('cómo') || message.includes('funciona')) {
      return {
        content: `¡Por supuesto! Te puedo ayudar con:

🔍 **Búsquedas**: Di "busco [producto]" o "necesito [producto]"
📱 **Categorías**: Pregunta por electrónicos, ropa, hogar, deportes, etc.
💰 **Precios**: Pregunta por productos baratos, caros, o un rango específico
🏠 **Alquiler**: Pregunta por "productos en alquiler"
⭐ **Recomendaciones**: Puedo sugerirte los mejores productos por categoría

Solo escribe lo que necesitas y te ayudo a encontrarlo.`
      };
    }
    
    // Greeting responses
    if (message.includes('hola') || message.includes('buenos') || message.includes('hi')) {
      return {
        content: '¡Hola! 👋 Bienvenido a AlquiGo. Estoy aquí para ayudarte a encontrar exactamente lo que necesitas. ¿Qué producto estás buscando hoy?'
      };
    }
    
    // Thank you responses
    if (message.includes('gracias') || message.includes('thanks')) {
      return {
        content: '¡De nada! 😊 Siempre estoy aquí para ayudarte. ¿Hay algo más que pueda hacer por ti?'
      };
    }
    
    // Default response with popular products
    const popularProducts = products
      .sort((a, b) => b.seller.rating - a.seller.rating)
      .slice(0, 6);
    
    return {
      content: 'Interesante pregunta. Mientras tanto, aquí tienes algunos de nuestros productos más populares:',
      products: popularProducts
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message
    addMessage('user', userMessage);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate thinking time
    setTimeout(() => {
      const response = generateBotResponse(userMessage);
      setIsTyping(false);
      addMessage('bot', response.content, response.products);
    }, 1000 + Math.random() * 1000); // 1-2 seconds delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-CO')}`;
  };

  const getRentalPrice = (price: number) => {
    return `$${Math.round(price * 0.035).toLocaleString('es-CO')}/día`;
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg z-50 p-0"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl h-[80vh] flex flex-col p-0">
          <DialogHeader className="p-4 border-b bg-primary text-primary-foreground">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-accent-foreground" />
                </div>
                <div>
                  <DialogTitle className="text-primary-foreground">AlquiBot</DialogTitle>
                  <p className="text-sm text-primary-foreground/80">Tu asistente de compras inteligente</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-start space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className={message.type === 'user' ? 'bg-secondary' : 'bg-primary'}>
                          {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-primary-foreground" />}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`rounded-lg p-3 ${
                        message.type === 'user' 
                          ? 'bg-secondary text-secondary-foreground ml-auto' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {message.timestamp.toLocaleTimeString('es-CO', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                    
                    {/* Product Recommendations */}
                    {message.products && message.products.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.products.map((product) => (
                          <Card key={product.id} className="overflow-hidden">
                            <CardContent className="p-3">
                              <div className="flex space-x-3">
                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-sm line-clamp-1">{product.name}</h4>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <Badge variant="outline" className="text-xs">
                                      {product.category}
                                    </Badge>
                                    <div className="flex items-center">
                                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                      <span className="text-xs text-muted-foreground ml-1">
                                        {product.seller.rating}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between mt-2">
                                    <div>
                                      <span className="font-bold text-primary text-sm">
                                        {formatPrice(product.price)}
                                      </span>
                                      {product.availableForRent && (
                                        <p className="text-xs text-muted-foreground">
                                          o {getRentalPrice(product.price)}
                                        </p>
                                      )}
                                    </div>
                                    <div className="flex space-x-1">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => onProductSelect && onProductSelect(product)}
                                        className="h-7 px-2 text-xs"
                                      >
                                        Ver
                                      </Button>
                                      <Button
                                        size="sm"
                                        onClick={() => onAddToCart && onAddToCart(product)}
                                        className="h-7 px-2 text-xs bg-accent hover:bg-accent/90"
                                      >
                                        <ShoppingCart className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder="Escribe tu pregunta aquí..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!inputMessage.trim() || isTyping}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setInputMessage('¿Qué productos tienes en electrónicos?');
                  setTimeout(() => handleSendMessage(), 100);
                }}
                className="text-xs"
                disabled={isTyping}
              >
                Electrónicos
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setInputMessage('Busco productos para alquilar');
                  setTimeout(() => handleSendMessage(), 100);
                }}
                className="text-xs"
                disabled={isTyping}
              >
                Alquileres
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setInputMessage('¿Qué productos económicos tienes?');
                  setTimeout(() => handleSendMessage(), 100);
                }}
                className="text-xs"
                disabled={isTyping}
              >
                Ofertas
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}