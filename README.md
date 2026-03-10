# Expenses API - BACKEND

API RESTful para la gestión de gastos construida con NESTJS

## Descripción

Backend para la aplicación de gestión de gastos. Proporciona endpoints para crear, leer, actualizar y eliminar gastos con validación robusta y manejo de errores.

# Stack Tecnológico

- **Framework**: NestJS 11
- **Lenguaje**: TypeScript 5.9.3
- **Validación**: class-validator, class-transformer
- **CORS**: Habilitado para frontend en localhost:3000

# Instalación y setup

### Requisitos 
- Node.js (v18 o superior)
- npm o yarn
- **Frontend** - Este backend requiere del frontend (basado en Next.js) para funcionar completamente. La url del repositorio del front:  
- Es necesario ejecutar ambos para la funcionalidad completa

### Pasos de instalación y uso

```bash

# Clonamos repo
git clone <URL-del-repo>

# Accedemos al proyecto
cd backend

# Instalamos dependencias
npm i

# (Opcional) Instalar dependencias especificas de desarrollo
npm i --save-dev @types/node

```

### Iniciamos el proyecto

```bash
# Modo desarrollo
npm run start:dev

# Modo Producción
npm run start:prod

```

El servidor estará disponible en `http://localhost:4000`

### CORS
Por defecto, CORS está habilitado para:
- **Origen permitido** : `http://localhost:3000`

### Documentación Adicional

### Decisiones Arquitectónicas y Trades-offs

### 1. NestJS
**Ventajas**
- Arquitectura modular y escalable
- TypeScript con tipos muy robustos
- Estructura clara con Controllers -> Services -> Modules
- Excelente documentación y comunidad

**Desventajas**
- Curva de aprendizaje más pronunciada que Express puro

### 2. Validación con class-validator en DTOs

**Ventajas**
- Validación automática en todos los endpoints
- Mensajes de error consistentes
- Reutilizable en múltiples endpoints
- Menos código duplicado

**Desventajas**
- Si no hay customización avanzada, los mensajes de error pueden ser genéricos

### 3. Respuesta Envuelta en Metadatos
**Decisión** Todas las respuestas incluyen `{data, statusCode, message, timestamp}`

**Ventajas**
- Consistencia en todas las respuestas
- Información extra útil
- El cliente siempre sabe el formato esperado

**Desventajas**
- Nivel extra de anidamiento
- El cliente debe desempaquetar la respuesta

### 4. Base de Datos en Memoria

**Ventajas**
- Sin dependencias externas
- Rapido para desarrollo
- Ideal para tests y demos

**Desventajas**
- Los datos se pierden al reiniciar el servidor
- No apto para producción

### 5. CORS Especifico 
**Decisión** Solo acepta solicitudes de `http://localhost:3000`

- Protección básica contra ataques CSRF
- Front y Back acoplados intencionalmente
- Seguridad en desarrollo

**Porqué** Este es el origen esperado del front en Next.js durante el desarrollo

### 6. API REST vs GraphQL
**Decisión** REST (CRUD simple)

**Ventajas**
- Simple de implementar y entender
- Estándar de la industria
- Fácil cachear con HTTP

**Desventajas**
- Over-fetching (recibir datos inncesarios)
- Under-fetching (múltiples request para datos relacionados)
- No ideal para proyectos grandes y relaciones complejas

**Por qué** Es una aplicación simple sin relaciones complejas, por lo que REST es más que suficinente





