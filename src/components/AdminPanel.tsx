import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  MessageSquare,
  FileText,
  Calendar,
  Filter,
  Download,
  Eye,
  CheckCircle,
  AlertCircle,
  Clock,
  Database
} from 'lucide-react';

interface AdminPanelProps {
  onNavigate?: (view: string) => void;
}

export function AdminPanel({ onNavigate }: AdminPanelProps = {}) {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [pqrsFilter, setPqrsFilter] = useState('all');

  // Mock data
  const stats = {
    totalUsers: 15420,
    totalOrders: 3245,
    revenue: 125800000, // COP
    growth: 18.5
  };

  const recentOrders = [
    { 
      id: '#ORD-001', 
      customer: 'Ana García', 
      amount: 350000, 
      status: 'completed', 
      date: '2024-09-12',
      type: 'purchase'
    },
    { 
      id: '#ORD-002', 
      customer: 'Carlos López', 
      amount: 120000, 
      status: 'pending', 
      date: '2024-09-12',
      type: 'rental'
    },
    { 
      id: '#ORD-003', 
      customer: 'María Rodríguez', 
      amount: 850000, 
      status: 'completed', 
      date: '2024-09-11',
      type: 'purchase'
    },
    { 
      id: '#ORD-004', 
      customer: 'Juan Pérez', 
      amount: 75000, 
      status: 'cancelled', 
      date: '2024-09-11',
      type: 'rental'
    },
    { 
      id: '#ORD-005', 
      customer: 'Sandra Martínez', 
      amount: 450000, 
      status: 'processing', 
      date: '2024-09-10',
      type: 'purchase'
    }
  ];

  const pqrsData = [
    {
      id: 'PQR-001',
      type: 'Petición',
      customer: 'Ana García',
      subject: 'Solicitud de información sobre envío',
      status: 'open',
      priority: 'medium',
      date: '2024-09-12',
      assignedTo: 'Soporte 1'
    },
    {
      id: 'PQR-002',
      type: 'Queja',
      customer: 'Carlos López',
      subject: 'Producto llegó dañado',
      status: 'in_progress',
      priority: 'high',
      date: '2024-09-11',
      assignedTo: 'Soporte 2'
    },
    {
      id: 'PQR-003',
      type: 'Reclamo',
      customer: 'María Rodríguez',
      subject: 'Demora en el procesamiento del pedido',
      status: 'resolved',
      priority: 'high',
      date: '2024-09-10',
      assignedTo: 'Soporte 1'
    },
    {
      id: 'PQR-004',
      type: 'Sugerencia',
      customer: 'Juan Pérez',
      subject: 'Mejora en la interfaz de usuario',
      status: 'open',
      priority: 'low',
      date: '2024-09-09',
      assignedTo: 'Desarrollo'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: string, type: 'order' | 'pqrs' = 'order') => {
    if (type === 'order') {
      switch (status) {
        case 'completed':
          return <Badge className="bg-green-100 text-green-800">Completado</Badge>;
        case 'pending':
          return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>;
        case 'processing':
          return <Badge className="bg-blue-100 text-blue-800">Procesando</Badge>;
        case 'cancelled':
          return <Badge className="bg-red-100 text-red-800">Cancelado</Badge>;
        default:
          return <Badge>{status}</Badge>;
      }
    } else {
      switch (status) {
        case 'open':
          return <Badge className="bg-blue-100 text-blue-800">Abierto</Badge>;
        case 'in_progress':
          return <Badge className="bg-yellow-100 text-yellow-800">En Progreso</Badge>;
        case 'resolved':
          return <Badge className="bg-green-100 text-green-800">Resuelto</Badge>;
        case 'closed':
          return <Badge className="bg-gray-100 text-gray-800">Cerrado</Badge>;
        default:
          return <Badge>{status}</Badge>;
      }
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">Alta</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Media</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Baja</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-primary">Panel de Administración</h1>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mes</SelectItem>
              <SelectItem value="quarter">Este trimestre</SelectItem>
              <SelectItem value="year">Este año</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Usuarios Totales</p>
                <p className="text-2xl">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pedidos Totales</p>
                <p className="text-2xl">{stats.totalOrders.toLocaleString()}</p>
              </div>
              <ShoppingBag className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ingresos</p>
                <p className="text-2xl">{formatCurrency(stats.revenue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Crecimiento</p>
                <p className="text-2xl text-green-600">+{stats.growth}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
          <TabsTrigger value="pqrs">PQRS</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="database">Base de Datos</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Historial de Pedidos</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Pedido</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {order.type === 'purchase' ? 'Compra' : 'Alquiler'}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatCurrency(order.amount)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumen de Ventas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Ventas del mes:</span>
                    <span className="font-medium">{formatCurrency(45600000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Alquileres del mes:</span>
                    <span className="font-medium">{formatCurrency(12800000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Comisiones:</span>
                    <span className="font-medium">{formatCurrency(5840000)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-4">
                    <span className="font-medium">Total:</span>
                    <span className="font-medium">{formatCurrency(64240000)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Productos Más Vendidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>iPhone 15 Pro</span>
                    <Badge>45 ventas</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>MacBook Air M2</span>
                    <Badge>38 ventas</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sony PlayStation 5</span>
                    <Badge>32 ventas</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Samsung Galaxy S24</span>
                    <Badge>28 ventas</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pqrs" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Sistema PQRS</CardTitle>
                <div className="flex gap-2">
                  <Select value={pqrsFilter} onValueChange={setPqrsFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="open">Abiertos</SelectItem>
                      <SelectItem value="in_progress">En Progreso</SelectItem>
                      <SelectItem value="resolved">Resueltos</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Nuevo PQRS
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Asunto</TableHead>
                    <TableHead>Prioridad</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Asignado a</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pqrsData.map((pqrs) => (
                    <TableRow key={pqrs.id}>
                      <TableCell className="font-medium">{pqrs.id}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{pqrs.type}</Badge>
                      </TableCell>
                      <TableCell>{pqrs.customer}</TableCell>
                      <TableCell className="max-w-xs truncate">{pqrs.subject}</TableCell>
                      <TableCell>{getPriorityBadge(pqrs.priority)}</TableCell>
                      <TableCell>{getStatusBadge(pqrs.status, 'pqrs')}</TableCell>
                      <TableCell>{pqrs.assignedTo}</TableCell>
                      <TableCell>{pqrs.date}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Usuarios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Módulo de gestión de usuarios en desarrollo</p>
                <p className="text-sm">Próximamente: Ver usuarios, roles y permisos</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Estructura de Base de Datos</CardTitle>
                <Button 
                  onClick={() => onNavigate?.('database-er')}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Database className="h-4 w-4 mr-2" />
                  Ver Diagrama E-R Completo
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-2 border-primary/20">
                    <CardContent className="p-4 text-center">
                      <Database className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <h3 className="font-medium">15 Tablas</h3>
                      <p className="text-sm text-muted-foreground">Entidades principales</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-secondary/20">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">🔗</div>
                      <h3 className="font-medium">16 Relaciones</h3>
                      <p className="text-sm text-muted-foreground">Entre entidades</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-accent/20">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">🔑</div>
                      <h3 className="font-medium">Integridad</h3>
                      <p className="text-sm text-muted-foreground">Claves y referencias</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Tablas Principales del Sistema</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      { name: 'users', description: 'Usuarios del sistema' },
                      { name: 'products', description: 'Catálogo de productos' },
                      { name: 'orders', description: 'Pedidos y transacciones' },
                      { name: 'sellers', description: 'Vendedores verificados' },
                      { name: 'categories', description: 'Categorías de productos' },
                      { name: 'contracts', description: 'Contratos generados' },
                      { name: 'pqrs', description: 'Sistema PQRS' },
                      { name: 'payment_transactions', description: 'Transacciones de pago' },
                      { name: 'user_locations', description: 'Ubicaciones de usuarios' }
                    ].map((table) => (
                      <div key={table.name} className="bg-muted/30 p-3 rounded-lg">
                        <div className="font-medium text-sm">{table.name}</div>
                        <div className="text-xs text-muted-foreground">{table.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">💡 Información Técnica</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Diseñado para Supabase (PostgreSQL)</li>
                    <li>• Row Level Security (RLS) implementado</li>
                    <li>• Optimizado para escalabilidad</li>
                    <li>• Integridad referencial garantizada</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}