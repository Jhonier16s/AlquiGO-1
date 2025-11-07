import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  FileText, 
  Download, 
  Search, 
  Calendar,
  Eye,
  Filter
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'factura' | 'orden' | 'garantia' | 'manual';
  date: string;
  size: string;
  status: 'disponible' | 'procesando';
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Factura #ORD-1234',
    type: 'factura',
    date: '2024-01-15',
    size: '245 KB',
    status: 'disponible'
  },
  {
    id: '2',
    name: 'Orden de Compra #ORD-1234',
    type: 'orden',
    date: '2024-01-15',
    size: '182 KB',
    status: 'disponible'
  },
  {
    id: '3',
    name: 'Garantía - Laptop Profesional',
    type: 'garantia',
    date: '2024-01-15',
    size: '156 KB',
    status: 'disponible'
  },
  {
    id: '4',
    name: 'Manual - Audífonos Inalámbricos',
    type: 'manual',
    date: '2024-01-10',
    size: '2.1 MB',
    status: 'disponible'
  },
  {
    id: '5',
    name: 'Factura #ORD-1567',
    type: 'factura',
    date: '2023-12-20',
    size: '198 KB',
    status: 'procesando'
  }
];

export function DocumentsPage() {
  const [documents] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || doc.type === filterType;
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeIcon = (type: string) => {
    return <FileText className="w-4 h-4" />;
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      factura: 'Factura',
      orden: 'Orden de Compra',
      garantia: 'Garantía',
      manual: 'Manual'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === 'disponible' ? 'default' : 'secondary'}>
        {status === 'disponible' ? 'Disponible' : 'Procesando'}
      </Badge>
    );
  };

  const handleDownload = (documentName: string) => {
    // Simular descarga
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${documentName}.pdf`;
    link.click();
  };

  const handleView = (documentName: string) => {
    // Simular visualización
    window.open('#', '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Mis Documentos</h1>
        <p className="text-muted-foreground">
          Accede a todas tus facturas, órdenes de compra, garantías y manuales.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar documentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Tipo de documento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="factura">Facturas</SelectItem>
                <SelectItem value="orden">Órdenes de Compra</SelectItem>
                <SelectItem value="garantia">Garantías</SelectItem>
                <SelectItem value="manual">Manuales</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="disponible">Disponibles</SelectItem>
                <SelectItem value="procesando">Procesando</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocuments.map(document => (
          <Card key={document.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                    {getTypeIcon(document.type)}
                  </div>
                  
                  <div className="space-y-1 flex-1">
                    <h3 className="font-medium">{document.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(document.date).toLocaleDateString('es-ES')}</span>
                      </span>
                      <span>{document.size}</span>
                      <Badge variant="outline">
                        {getTypeLabel(document.type)}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {getStatusBadge(document.status)}
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(document.name)}
                      disabled={document.status === 'procesando'}
                      className="flex items-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="hidden sm:inline">Ver</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(document.name)}
                      disabled={document.status === 'procesando'}
                      className="flex items-center space-x-1"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Descargar</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg mb-2">No se encontraron documentos</h3>
            <p className="text-muted-foreground">
              {searchTerm || filterType !== 'all' || filterStatus !== 'all' 
                ? 'Prueba ajustando los filtros de búsqueda'
                : 'Los documentos aparecerán aquí después de realizar compras'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}