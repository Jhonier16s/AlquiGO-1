# Integración con Supabase - AlquiGo

## ✅ Funcionalidades Implementadas

La aplicación AlquiGo ahora está completamente integrada con Supabase para almacenar todos los datos de manera persistente.

### 1. **Sistema de Autenticación**

#### Registro de Usuarios
- Al registrarse, se guardan todos los datos del formulario en Supabase Auth y en la tabla KV
- Datos almacenados:
  - Información básica: nombre, apellido, email
  - Datos de contacto: teléfono
  - Información personal: fecha de nacimiento, género
  - Dirección: país, ciudad, dirección completa
  - Preferencias: aceptación de marketing

#### Inicio de Sesión
- Autenticación mediante Supabase Auth
- Sesión persistente con token de acceso
- Verificación automática de sesión al cargar la aplicación

### 2. **Almacenamiento de Transacciones**

Cada compra o alquiler se guarda con:
- ID único de transacción
- Lista completa de artículos (con toda la información)
- Datos de envío del cliente
- Método de pago utilizado (sin datos sensibles de tarjeta)
- Tipo de transacción: compra, alquiler o mixto
- Total de la transacción
- Fecha y hora de creación
- Estado de la transacción

### 3. **Generación y Almacenamiento de Contratos**

Cada contrato generado se guarda con:
- ID único del contrato
- Referencia a la transacción asociada
- Información completa del usuario
- Lista de artículos con detalles
- Total del contrato
- Contenido del contrato
- Estado del contrato
- Fecha de creación

### 4. **Visualización de Datos del Usuario**

El usuario puede ver:
- **Historial de Transacciones**: Todas sus compras y alquileres
- **Contratos Generados**: Todos los contratos con opción de descarga

## 📁 Estructura de Datos en Supabase KV Store

### Claves utilizadas:

```
user:{userId}                  - Datos completos del usuario
transaction:{transactionId}    - Datos de cada transacción
contract:{contractId}          - Datos de cada contrato
user_transactions:{userId}     - Lista de IDs de transacciones del usuario
user_contracts:{userId}        - Lista de IDs de contratos del usuario
```

## 🔧 Archivos Modificados/Creados

### Servidor (Backend)
- `/supabase/functions/server/index.tsx` - Rutas API implementadas:
  - `POST /signup` - Registro de usuario
  - `POST /signin` - Inicio de sesión
  - `GET /session` - Verificar sesión activa
  - `POST /transactions` - Crear transacción
  - `POST /contracts` - Crear contrato
  - `GET /user/transactions` - Obtener transacciones del usuario
  - `GET /user/contracts` - Obtener contratos del usuario

### Frontend (Cliente)
- `/components/AuthContext.tsx` - Integración con Supabase Auth
- `/components/AuthForm.tsx` - Envío de datos completos de registro
- `/components/Checkout.tsx` - Guardado de transacciones y contratos
- `/components/UserTransactions.tsx` - Visualización de datos del usuario (NUEVO)
- `/utils/supabase/client.tsx` - Utilidades para llamadas al servidor (NUEVO)
- `/App.tsx` - Integración del componente de transacciones

## 🔐 Seguridad

- ✅ Las contraseñas se manejan a través de Supabase Auth (cifradas)
- ✅ Los datos sensibles de tarjetas NO se almacenan
- ✅ Todas las rutas protegidas requieren autenticación
- ✅ Se verifica el token de acceso en cada petición protegida
- ✅ La clave de servicio de Supabase NO se expone al frontend

## 📊 Flujo de Datos

### Registro:
1. Usuario completa formulario → 
2. Frontend envía datos a `/signup` → 
3. Servidor crea usuario en Supabase Auth →
4. Servidor guarda datos adicionales en KV Store →
5. Usuario queda autenticado automáticamente

### Compra/Alquiler:
1. Usuario completa checkout →
2. Frontend envía datos a `/transactions` →
3. Servidor guarda transacción con verificación de usuario →
4. Frontend envía datos a `/contracts` →
5. Servidor guarda contrato →
6. Usuario puede descargar contrato

### Visualización:
1. Usuario accede a "Mi Perfil" →
2. Frontend solicita datos a `/user/transactions` y `/user/contracts` →
3. Servidor verifica autenticación y retorna datos →
4. Frontend muestra historial completo

## 🎯 Acceso a la Funcionalidad

Para ver tus transacciones y contratos:
1. Inicia sesión en la aplicación
2. Haz clic en el ícono de usuario en la navegación superior
3. Selecciona "Mi Perfil"
4. Verás dos pestañas:
   - **Transacciones**: Historial de compras y alquileres
   - **Contratos**: Contratos generados con opción de descarga

## 🔄 Próximos Pasos Sugeridos

- Implementar edición de perfil de usuario
- Agregar sistema de notificaciones por email
- Implementar panel de administrador para gestionar transacciones
- Agregar sistema de calificaciones y reseñas
- Implementar chat en tiempo real entre usuarios
