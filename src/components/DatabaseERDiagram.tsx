import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface Table {
  name: string;
  fields: Array<{
    name: string;
    type: string;
    isPrimary?: boolean;
    isForeign?: boolean;
    references?: string;
    isUnique?: boolean;
    nullable?: boolean;
  }>;
}

export function DatabaseERDiagram() {
  const tables: Table[] = [
    {
      name: "users",
      fields: [
        { name: "id", type: "UUID", isPrimary: true },
        { name: "email", type: "VARCHAR(255)", isUnique: true },
        { name: "password_hash", type: "VARCHAR(255)" },
        { name: "name", type: "VARCHAR(100)" },
        { name: "phone", type: "VARCHAR(20)", nullable: true },
        { name: "address", type: "TEXT", nullable: true },
        { name: "city", type: "VARCHAR(100)", nullable: true },
        { name: "country", type: "VARCHAR(100)", nullable: true },
        { name: "is_admin", type: "BOOLEAN", nullable: false },
        { name: "is_active", type: "BOOLEAN", nullable: false },
        { name: "created_at", type: "TIMESTAMP" },
        { name: "updated_at", type: "TIMESTAMP" }
      ]
    },
    {
      name: "categories",
      fields: [
        { name: "id", type: "UUID", isPrimary: true },
        { name: "name", type: "VARCHAR(100)" },
        { name: "description", type: "TEXT", nullable: true },
        { name: "image_url", type: "VARCHAR(500)", nullable: true },
        { name: "is_active", type: "BOOLEAN", nullable: false },
        { name: "created_at", type: "TIMESTAMP" },
        { name: "updated_at", type: "TIMESTAMP" }
      ]
    },
    {
      name: "sellers",
      fields: [
        { name: "id", type: "UUID", isPrimary: true },
        { name: "name", type: "VARCHAR(100)" },
        { name: "email", type: "VARCHAR(255)", isUnique: true },
        { name: "phone", type: "VARCHAR(20)" },
        { name: "address", type: "TEXT" },
        { name: "rating", type: "DECIMAL(2,1)" },
        { name: "total_sales", type: "INTEGER", nullable: false },
        { name: "is_verified", type: "BOOLEAN", nullable: false },
        { name: "created_at", type: "TIMESTAMP" },
        { name: "updated_at", type: "TIMESTAMP" }
      ]
    },
    {
      name: "products",
      fields: [
        { name: "id", type: "UUID", isPrimary: true },
        { name: "name", type: "VARCHAR(200)" },
        { name: "description", type: "TEXT" },
        { name: "price", type: "DECIMAL(10,2)" },
        { name: "rental_price_daily", type: "DECIMAL(10,2)", nullable: true },
        { name: "rental_price_weekly", type: "DECIMAL(10,2)", nullable: true },
        { name: "rental_price_monthly", type: "DECIMAL(10,2)", nullable: true },
        { name: "category_id", type: "UUID", isForeign: true, references: "categories(id)" },
        { name: "seller_id", type: "UUID", isForeign: true, references: "sellers(id)" },
        { name: "image_url", type: "VARCHAR(500)" },
        { name: "stock_quantity", type: "INTEGER", nullable: false },
        { name: "is_available_purchase", type: "BOOLEAN", nullable: false },
        { name: "is_available_rental", type: "BOOLEAN", nullable: false },
        { name: "condition", type: "VARCHAR(50)" },
        { name: "brand", type: "VARCHAR(100)", nullable: true },
        { name: "model", type: "VARCHAR(100)", nullable: true },
        { name: "weight", type: "DECIMAL(8,2)", nullable: true },
        { name: "dimensions", type: "VARCHAR(100)", nullable: true },
        { name: "is_active", type: "BOOLEAN", nullable: false },
        { name: "created_at", type: "TIMESTAMP" },
        { name: "updated_at", type: "TIMESTAMP" }
      ]
    },
    {
      name: "cart_items",
      fields: [
        { name: "id", type: "UUID", isPrimary: true },
        { name: "user_id", type: "UUID", isForeign: true, references: "users(id)" },
        { name: "product_id", type: "UUID", isForeign: true, references: "products(id)" },
        { name: "quantity", type: "INTEGER", nullable: false },
        { name: "is_rental", type: "BOOLEAN", nullable: false },
        { name: "rental_duration_days", type: "INTEGER", nullable: true },
        { name: "created_at", type: "TIMESTAMP" },
        { name: "updated_at", type: "TIMESTAMP" }
      ]
    },
    {
      name: "orders",
      fields: [
        { name: "id", type: "UUID", isPrimary: true },
        { name: "user_id", type: "UUID", isForeign: true, references: "users(id)" },
        { name: "order_number", type: "VARCHAR(50)", isUnique: true },
        { name: "total_amount", type: "DECIMAL(10,2)" },
        { name: "status", type: "VARCHAR(50)" },
        { name: "payment_method", type: "VARCHAR(50)" },
        { name: "payment_status", type: "VARCHAR(50)" },
        { name: "shipping_address", type: "TEXT" },
        { name: "shipping_city", type: "VARCHAR(100)" },
        { name: "shipping_cost", type: "DECIMAL(10,2)", nullable: true },
        { name: "tracking_number", type: "VARCHAR(100)", nullable: true },
        { name: "notes", type: "TEXT", nullable: true },
        { name: "created_at", type: "TIMESTAMP" },
        { name: "updated_at", type: "TIMESTAMP" },
        { name: "delivered_at", type: "TIMESTAMP", nullable: true }
      ]
    },
    {
      name: "order_items",
      fields: [
        { name: "id", type: "UUID", isPrimary: true },
        { name: "order_id", type: "UUID", isForeign: true, references: "orders(id)" },
        { name: "product_id", type: "UUID", isForeign: true, references: "products(id)" },
        { name: "quantity", type: "INTEGER", nullable: false },
        { name: "unit_price", type: "DECIMAL(10,2)" },
        { name: "total_price", type: "DECIMAL(10,2)" },
        { name: "is_rental", type: "BOOLEAN", nullable: false },
        { name: "rental_start_date", type: "TIMESTAMP", nullable: true },
        { name: "rental_end_date", type: "TIMESTAMP", nullable: true },
        { name: "rental_duration_days", type: "INTEGER", nullable: true },
        { name: "created_at", type: "TIMESTAMP" }
      ]
    },
    {
      name: "contracts",
      fields: [
        { name: "id", type: "UUID", isPrimary: true },
        { name: "order_id", type: "UUID", isForeign: true, references: "orders(id)" },
        { name: "contract_number", type: "VARCHAR(50)", isUnique: true },
        { name: "contract_type", type: "VARCHAR(50)" },
        { name: "contract_content", type: "TEXT" },
        { name: "is_signed", type: "BOOLEAN", nullable: false },
        { name: "signed_at", type: "TIMESTAMP", nullable: true },
        { name: "digital_signature", type: "TEXT", nullable: true },
        { name: "created_at", type: "TIMESTAMP" },
        { name: "updated_at", type: "TIMESTAMP" }
      ]
    },
    {
      name: "user_locations",
      fields: [
        { name: "id", type: "UUID", isPrimary: true },
        { name: "user_id", type: "UUID", isForeign: true, references: "users(id)" },
        { name: "name", type: "VARCHAR(100)" },
        { name: "address", type: "TEXT" },
        { name: "city", type: "VARCHAR(100)" },
        { name: "state", type: "VARCHAR(100)" },
        { name: "postal_code", type: "VARCHAR(20)" },
        { name: "country", type: "VARCHAR(100)" },
        { name: "latitude", type: "DECIMAL(10,8)", nullable: true },
        { name: "longitude", type: "DECIMAL(11,8)", nullable: true },
        { name: "is_default", type: "BOOLEAN", nullable: false },
        { name: "created_at", type: "TIMESTAMP" },
        { name: "updated_at", type: "TIMESTAMP" }
      ]
    },
    {
      name: "documents",
      fields: [
        { name: "id", type: "UUID", isPrimary: true },
        { name: "user_id", type: "UUID", isForeign: true, references: "users(id)" },
        { name: "document_type", type: "VARCHAR(50)" },
        { name: "document_name", type: "VARCHAR(200)" },
        { name: "file_url", type: "VARCHAR(500)" },
        { name: "file_size", type: "INTEGER" },
        { name: "mime_type", type: "VARCHAR(100)" },
        { name: "is_verified", type: "BOOLEAN", nullable: false },
        { name: "verified_by", type: "UUID", isForeign: true, references: "users(id)", nullable: true },
        { name: "verified_at", type: "TIMESTAMP", nullable: true },
        { name: "created_at", type: "TIMESTAMP" },
        { name: "updated_at", type: "TIMESTAMP" }
      ]
    },
    {
      name: "pqrs",
      fields: [
        { name: "id", type: "UUID", isPrimary: true },
        { name: "user_id", type: "UUID", isForeign: true, references: "users(id)", nullable: true },
        { name: "ticket_number", type: "VARCHAR(50)", isUnique: true },
        { name: "type", type: "VARCHAR(50)" },
        { name: "subject", type: "VARCHAR(200)" },
        { name: "description", type: "TEXT" },
        { name: "status", type: "VARCHAR(50)" },
        { name: "priority", type: "VARCHAR(50)" },
        { name: "assigned_to", type: "UUID", isForeign: true, references: "users(id)", nullable: true },
        { name: "email", type: "VARCHAR(255)" },
        { name: "phone", type: "VARCHAR(20)", nullable: true },
        { name: "response", type: "TEXT", nullable: true },
        { name: "resolved_at", type: "TIMESTAMP", nullable: true },
        { name: "created_at", type: "TIMESTAMP" },
        { name: "updated_at", type: "TIMESTAMP" }
      ]
    },
    {
      name: "payment_transactions",
      fields: [
        { name: "id", type: "UUID", isPrimary: true },
        { name: "order_id", type: "UUID", isForeign: true, references: "orders(id)" },
        { name: "transaction_id", type: "VARCHAR(100)", isUnique: true },
        { name: "payment_method", type: "VARCHAR(50)" },
        { name: "amount", type: "DECIMAL(10,2)" },
        { name: "currency", type: "VARCHAR(3)" },
        { name: "status", type: "VARCHAR(50)" },
        { name: "gateway_response", type: "JSONB", nullable: true },
        { name: "reference_number", type: "VARCHAR(100)", nullable: true },
        { name: "processed_at", type: "TIMESTAMP", nullable: true },
        { name: "created_at", type: "TIMESTAMP" },
        { name: "updated_at", type: "TIMESTAMP" }
      ]
    },
    {
      name: "product_reviews",
      fields: [
        { name: "id", type: "UUID", isPrimary: true },
        { name: "product_id", type: "UUID", isForeign: true, references: "products(id)" },
        { name: "user_id", type: "UUID", isForeign: true, references: "users(id)" },
        { name: "order_item_id", type: "UUID", isForeign: true, references: "order_items(id)", nullable: true },
        { name: "rating", type: "INTEGER" },
        { name: "title", type: "VARCHAR(200)", nullable: true },
        { name: "comment", type: "TEXT", nullable: true },
        { name: "is_verified_purchase", type: "BOOLEAN", nullable: false },
        { name: "created_at", type: "TIMESTAMP" },
        { name: "updated_at", type: "TIMESTAMP" }
      ]
    },
    {
      name: "seller_reviews",
      fields: [
        { name: "id", type: "UUID", isPrimary: true },
        { name: "seller_id", type: "UUID", isForeign: true, references: "sellers(id)" },
        { name: "user_id", type: "UUID", isForeign: true, references: "users(id)" },
        { name: "order_id", type: "UUID", isForeign: true, references: "orders(id)" },
        { name: "rating", type: "INTEGER" },
        { name: "comment", type: "TEXT", nullable: true },
        { name: "created_at", type: "TIMESTAMP" },
        { name: "updated_at", type: "TIMESTAMP" }
      ]
    }
  ];

  const relationships = [
    { from: "products", to: "categories", type: "N:1", description: "Un producto pertenece a una categoría" },
    { from: "products", to: "sellers", type: "N:1", description: "Un producto pertenece a un vendedor" },
    { from: "cart_items", to: "users", type: "N:1", description: "Items del carrito pertenecen a un usuario" },
    { from: "cart_items", to: "products", type: "N:1", description: "Items del carrito referencian productos" },
    { from: "orders", to: "users", type: "N:1", description: "Órdenes pertenecen a usuarios" },
    { from: "order_items", to: "orders", type: "N:1", description: "Items de orden pertenecen a una orden" },
    { from: "order_items", to: "products", type: "N:1", description: "Items de orden referencian productos" },
    { from: "contracts", to: "orders", type: "1:1", description: "Contratos están asociados a órdenes" },
    { from: "user_locations", to: "users", type: "N:1", description: "Ubicaciones pertenecen a usuarios" },
    { from: "documents", to: "users", type: "N:1", description: "Documentos pertenecen a usuarios" },
    { from: "pqrs", to: "users", type: "N:1", description: "PQRS pueden estar asociadas a usuarios" },
    { from: "payment_transactions", to: "orders", type: "N:1", description: "Transacciones están asociadas a órdenes" },
    { from: "product_reviews", to: "products", type: "N:1", description: "Reseñas pertenecen a productos" },
    { from: "product_reviews", to: "users", type: "N:1", description: "Reseñas son escritas por usuarios" },
    { from: "seller_reviews", to: "sellers", type: "N:1", description: "Reseñas pertenecen a vendedores" },
    { from: "seller_reviews", to: "users", type: "N:1", description: "Reseñas son escritas por usuarios" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Diagrama Entidad-Relación - Base de Datos AlquiGo</h1>
        <p className="text-muted-foreground mb-6">
          Estructura completa de la base de datos para el sistema de venta y alquiler AlquiGo
        </p>
        
        <div className="bg-card p-6 rounded-lg border mb-8">
          <h2 className="text-xl font-semibold mb-4">Resumen del Sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{tables.length}</div>
              <div className="text-sm text-muted-foreground">Tablas Principales</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{relationships.length}</div>
              <div className="text-sm text-muted-foreground">Relaciones</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">
                {tables.reduce((total, table) => total + table.fields.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Campos Totales</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tablas de la Base de Datos */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Estructura de Tablas</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tables.map((table) => (
            <Card key={table.name} className="h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-primary">
                  📊 {table.name.toUpperCase()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {table.fields.map((field) => (
                    <div 
                      key={field.name}
                      className={`flex justify-between items-center p-2 rounded text-sm ${
                        field.isPrimary 
                          ? 'bg-primary/10 border border-primary/20' 
                          : field.isForeign 
                          ? 'bg-secondary/10 border border-secondary/20'
                          : 'bg-muted/30'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">
                          {field.isPrimary && '🔑 '}
                          {field.isForeign && '🔗 '}
                          {field.isUnique && '⭐ '}
                          {field.name}
                        </span>
                        {field.nullable && (
                          <span className="text-xs text-muted-foreground">(nullable)</span>
                        )}
                      </div>
                      <span className="text-muted-foreground text-xs font-mono">
                        {field.type}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Referencias de claves foráneas */}
                {table.fields.some(f => f.isForeign) && (
                  <div className="mt-4 pt-3 border-t">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Referencias:</h4>
                    {table.fields
                      .filter(f => f.isForeign && f.references)
                      .map((field) => (
                        <div key={field.name} className="text-xs text-muted-foreground">
                          • {field.name} → {field.references}
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Relaciones */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Relaciones entre Entidades</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relationships.map((rel, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-primary">{rel.from}</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="font-medium text-secondary">{rel.to}</span>
                  </div>
                  <span className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-medium">
                    {rel.type}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{rel.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Leyenda */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Leyenda</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">🔑</div>
              <h3 className="font-medium">Clave Primaria</h3>
              <p className="text-sm text-muted-foreground">Identificador único</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">🔗</div>
              <h3 className="font-medium">Clave Foránea</h3>
              <p className="text-sm text-muted-foreground">Referencia a otra tabla</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">⭐</div>
              <h3 className="font-medium">Campo Único</h3>
              <p className="text-sm text-muted-foreground">Valor único en la tabla</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-medium">Entidad Principal</h3>
              <p className="text-sm text-muted-foreground">Tabla del sistema</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Consideraciones de Implementación */}
      <Card>
        <CardHeader>
          <CardTitle>Consideraciones de Implementación en Supabase</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">🔐 Seguridad y Autenticación</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Row Level Security (RLS) habilitado en todas las tablas</li>
                <li>Políticas de acceso basadas en roles de usuario</li>
                <li>Autenticación integrada con Supabase Auth</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">📈 Escalabilidad</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Índices en campos de búsqueda frecuente</li>
                <li>Particionamiento de tablas grandes (órdenes, transacciones)</li>
                <li>Uso de UUID para distribución horizontal</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">🔄 Integridad Referencial</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Restricciones de clave foránea con CASCADE/RESTRICT apropiados</li>
                <li>Triggers para actualización automática de campos calculados</li>
                <li>Validaciones a nivel de base de datos</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">💾 Optimización</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Campos JSONB para datos semi-estructurados</li>
                <li>Funciones y vistas para consultas complejas</li>
                <li>Estrategias de backup y recuperación</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}