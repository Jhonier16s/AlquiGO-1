import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send,
  CheckCircle,
  HelpCircle,
  Truck,
  CreditCard,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';

interface ContactForm {
  category: string;
  subject: string;
  message: string;
  urgency: string;
}

export function ContactsPage() {
  const [formData, setFormData] = useState<ContactForm>({
    category: 'general',
    subject: '',
    message: '',
    urgency: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactCategories = [
    { value: 'general', label: 'Consulta General', icon: HelpCircle },
    { value: 'orders', label: 'Pedidos y Facturación', icon: CreditCard },
    { value: 'shipping', label: 'Envíos y Entregas', icon: Truck },
    { value: 'technical', label: 'Soporte Técnico', icon: Settings },
    { value: 'returns', label: 'Devoluciones', icon: MessageCircle }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Baja - Respuesta en 48-72h' },
    { value: 'normal', label: 'Normal - Respuesta en 24h' },
    { value: 'high', label: 'Alta - Respuesta en 4-8h' },
    { value: 'urgent', label: 'Urgente - Respuesta inmediata' }
  ];

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.subject || !formData.message) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    setIsSubmitting(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Mensaje enviado correctamente');
    
    // Resetear formulario después de 3 segundos
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        category: 'general',
        subject: '',
        message: '',
        urgency: 'normal'
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center">
          <CardContent className="pt-8 pb-6">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl mb-4">¡Mensaje Enviado!</h2>
            <p className="text-muted-foreground mb-6">
              Hemos recibido tu consulta. Te responderemos lo antes posible según la prioridad seleccionada.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-medium">Número de ticket: #TKT-{Date.now()}</p>
              <p className="text-sm text-muted-foreground">
                Guarda este número para hacer seguimiento de tu consulta
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Contacto y Soporte</h1>
        <p className="text-muted-foreground">
          Estamos aquí para ayudarte. Contacta con nuestro equipo de soporte.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Enviar Consulta</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría *</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value: string) => handleInputChange('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {contactCategories.map(category => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="urgency">Prioridad</Label>
                    <Select 
                      value={formData.urgency} 
                      onValueChange={(value: string) => handleInputChange('urgency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyLevels.map(level => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Asunto *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Describe brevemente tu consulta"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Describe tu consulta en detalle..."
                    rows={6}
                    required
                  />
                </div>

                <Alert>
                  <AlertDescription>
                    * Campos obligatorios. Tu información personal está protegida y solo será utilizada para responder a tu consulta.
                  </AlertDescription>
                </Alert>

                <Button 
                  type="submit" 
                  className="w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Send className="mr-2 h-4 w-4 animate-pulse" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Consulta
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information & FAQ */}
        <div className="lg:col-span-1 space-y-6">
          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Teléfono</p>
                  <p className="text-sm text-muted-foreground">+52 55 1234 5678</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">soporte@tiendaapp.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Dirección</p>
                  <p className="text-sm text-muted-foreground">
                    Av. Reforma 123<br />
                    Ciudad de México, México
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Horarios de Atención</p>
                  <p className="text-sm text-muted-foreground">
                    Lun - Vie: 9:00 - 18:00<br />
                    Sáb: 10:00 - 14:00
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle>Preguntas Frecuentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">¿Cómo puedo rastrear mi pedido?</h4>
                <p className="text-sm text-muted-foreground">
                  Recibirás un email con el número de seguimiento una vez que tu pedido sea enviado.
                </p>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">¿Cuál es la política de devoluciones?</h4>
                <p className="text-sm text-muted-foreground">
                  Tienes 30 días para devolver cualquier producto en perfecto estado.
                </p>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">¿Hacen envíos internacionales?</h4>
                <p className="text-sm text-muted-foreground">
                  Sí, enviamos a varios países. Los costos se calculan al momento del checkout.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}