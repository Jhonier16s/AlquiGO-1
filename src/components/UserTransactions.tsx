import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Alert, AlertDescription } from './ui/alert';
import { 
  ShoppingBag, 
  FileText, 
  Calendar,
  Download,
  Loader2,
  CheckCircle,
  AlertCircle,
  PackageOpen
} from 'lucide-react';
// Eliminado getFromSupabase (antes Supabase). Ahora lectura localStorage.
import { toast } from 'sonner';

interface Transaction {
  id: string;
  items: any[];
  total: number;
  shippingInfo: any;
  transactionType: string;
  status: string;
  createdAt: string;
}

interface Contract {
  id: string;
  items: any[];
  userInfo: any;
  total: number;
  transactionId: string;
  status: string;
  createdAt: string;
}

export function UserTransactions() {
  const { user, accessToken } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && accessToken) {
      loadUserData();
    }
  }, [user, accessToken]);

  const loadUserData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const allTransactionsRaw = localStorage.getItem('transactions');
      const allContractsRaw = localStorage.getItem('contracts');
      const allTransactions: any[] = allTransactionsRaw ? JSON.parse(allTransactionsRaw) : [];
      const allContracts: any[] = allContractsRaw ? JSON.parse(allContractsRaw) : [];
      // Filtrar por usuario
      const userTransactions = allTransactions.filter(t => t.userId === user?.id);
      const userContracts = allContracts.filter(c => c.userId === user?.id);
      setTransactions(userTransactions);
      setContracts(userContracts);
    } catch (err) {
      console.error('Error cargando datos del usuario:', err);
      setError('Error al cargar tus datos. Por favor intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: any; label: string }> = {
      completed: { variant: 'default', label: 'Completado' },
      pending: { variant: 'secondary', label: 'Pendiente' },
      active: { variant: 'default', label: 'Activo' },
      cancelled: { variant: 'destructive', label: 'Cancelado' }
    };

    const config = statusConfig[status] || { variant: 'secondary', label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getTransactionTypeBadge = (type: string) => {
    const typeConfig: Record<string, { color: string; label: string }> = {
      purchase: { color: 'bg-blue-100 text-blue-800', label: 'Compra' },
      rental: { color: 'bg-purple-100 text-purple-800', label: 'Alquiler' },
      mixed: { color: 'bg-green-100 text-green-800', label: 'Mixto' }
    };

    const config = typeConfig[type] || { color: 'bg-gray-100 text-gray-800', label: type };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const downloadContract = (contract: Contract) => {
    const contractContent = `
CONTRATO DE COMPRA/ALQUILER - AlquiGo
Contrato No: ${contract.id}
Fecha: ${formatDate(contract.createdAt)}

═══════════════════════════════════════════════════════════════

DATOS DEL CLIENTE:
Nombre: ${contract.userInfo.name}
Email: ${contract.userInfo.email}
${contract.userInfo.phone ? `Teléfono: ${contract.userInfo.phone}` : ''}
${contract.userInfo.address ? `Dirección: ${contract.userInfo.address}` : ''}

═══════════════════════════════════════════════════════════════

ARTÍCULOS:
${contract.items.map((item, index) => `
${index + 1}. ${item.name}
   Vendedor: ${item.seller?.name || 'N/A'}
   Cantidad: ${item.quantity}
   ${item.isRental ? `Tipo: Alquiler (${item.rentalDuration} días)` : 'Tipo: Compra'}
   Precio: ${formatCurrency(item.isRental ? (item.rentalPrice * item.rentalDuration) : item.price)}
`).join('')}

═══════════════════════════════════════════════════════════════

RESUMEN FINANCIERO:
Total: ${formatCurrency(contract.total)}

Transacción ID: ${contract.transactionId}
Estado: ${contract.status}

═══════════════════════════════════════════════════════════════

Documento generado electrónicamente
AlquiGo - Plataforma de Compra y Alquiler
www.alquigo.com | soporte@alquigo.com
`;

    const blob = new Blob([contractContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contrato-${contract.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Contrato descargado exitosamente');
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Debes iniciar sesión para ver tus transacciones y contratos</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Cargando tus datos...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Mis Transacciones y Contratos</h2>
        <p className="text-muted-foreground">
          Revisa el historial de tus compras, alquileres y contratos generados
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="transactions" className="flex items-center space-x-2">
            <ShoppingBag className="w-4 h-4" />
            <span>Transacciones ({transactions.length})</span>
          </TabsTrigger>
          <TabsTrigger value="contracts" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Contratos ({contracts.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          {transactions.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <PackageOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No tienes transacciones registradas aún</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Cuando realices una compra o alquiler, aparecerá aquí
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Historial de Transacciones</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Artículos</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fecha</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-mono text-sm">
                          {transaction.id}
                        </TableCell>
                        <TableCell>
                          {getTransactionTypeBadge(transaction.transactionType)}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {transaction.items.slice(0, 2).map((item, idx) => (
                              <div key={idx} className="text-sm">
                                {item.name} x{item.quantity}
                              </div>
                            ))}
                            {transaction.items.length > 2 && (
                              <div className="text-xs text-muted-foreground">
                                +{transaction.items.length - 2} más
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(transaction.total)}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(transaction.status)}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(transaction.createdAt)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          {contracts.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No tienes contratos generados aún</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Cuando completes una transacción, el contrato aparecerá aquí
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contracts.map((contract) => (
                <Card key={contract.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg font-mono">
                          {contract.id}
                        </CardTitle>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(contract.createdAt)}</span>
                        </div>
                      </div>
                      {getStatusBadge(contract.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total:</span>
                        <span className="font-medium">{formatCurrency(contract.total)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Artículos:</span>
                        <span>{contract.items.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Transacción:</span>
                        <span className="font-mono text-xs">{contract.transactionId}</span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="text-sm space-y-1">
                        {contract.items.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span className="text-muted-foreground truncate pr-2">
                              {item.name}
                            </span>
                            <span className="text-xs">
                              {item.isRental ? 'Alquiler' : 'Compra'}
                            </span>
                          </div>
                        ))}
                        {contract.items.length > 3 && (
                          <div className="text-xs text-muted-foreground">
                            +{contract.items.length - 3} artículos más
                          </div>
                        )}
                      </div>
                    </div>

                    <Button
                      onClick={() => downloadContract(contract)}
                      className="w-full"
                      variant="outline"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Descargar Contrato
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="flex justify-center">
        <Button onClick={loadUserData} variant="outline">
          Actualizar Datos
        </Button>
      </div>
    </div>
  );
}
