# 🎸 Instrumentos Musicales - Frontend

Esta aplicación React se conecta a un backend de Java para mostrar una tienda de instrumentos musicales con varias funcionalidades.

## ✨ Características

- 🔌 Conexión a API REST desde un backend en Java
- 🛒 Catálogo de productos con filtros
- 🎹 Detalles de cada instrumento
- 🏠 Página de inicio atractiva
- 📍 Sección "Dónde Estamos" con ubicación
- 🔍 Búsqueda y filtrado de instrumentos
- 📱 Diseño responsive con Tailwind CSS

## 🚀 Tecnologías

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Fetch API

## 🔄 Conexión con la API

La aplicación utiliza servicios tipados para conectarse al backend:

```typescript
// Ejemplo de servicio para obtener instrumentos
export async function getInstrumentos(): Promise<Instrumento[]> {
  const res = await fetch(`${API_URL}/api/instrumentos`);
  if (!res.ok) throw new Error('Error al obtener instrumentos');
  const data = await res.json();
  // Procesamiento...
  return items.map(item => new Instrumento(item));
}
```

## 🎨 Componentes Principales

### 📋 Listado de Productos

Muestra todos los instrumentos con filtros por categoría, precio y nombre.

### 🔎 Detalle de Producto

Vista detallada de cada instrumento con:

- Imagen
- Descripción
- Precio
- Información de envío
- Marca y modelo

### 🏡 Home

Página principal con banner y destacados.

### 📌 Donde Estamos

Muestra la ubicación y datos de contacto de la tienda.

## 🏗️ Estructura de Modelos

Los datos están estructurados en clases tipadas:

```typescript
// Ejemplo de modelo Instrumento
export class Instrumento {
  id: number;
  nombre: string;
  precio: number;
  // ...otros campos
  categoria: Categoria | null;

  constructor(data: any) {
    // Inicialización con valores del backend
  }
}
```
