# Back_y_Front_ReacCRUD_LabIV

# Pablo Osorio, Matias Araya, Jenifer Contreras, Lautaro Gonzalez y Eros Mariotti.

# 🎸 CRUD Instrumentos y Categorías - Proyecto UTN

Este es un proyecto web fullstack que permite administrar un catálogo de **instrumentos musicales** y **categorías**, con funcionalidades completas de ABM (Alta, Baja y Modificación). Desarrollado con **React + TypeScript** en el frontend y **Spring Boot + JPA/Hibernate** en el backend.

---

## ⚙️ Tecnologías implementadas

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- React Router DOM
- Fetch API
- Componentes genéricos reutilizables: `GenericForm`, `GenericTable`

### Backend
- Java 21
- Spring Boot 3.4.4
- Spring Data JPA
- Hibernate
- Base de datos MySQL WorkBench
- CORS habilitado para desarrollo (`localhost:5173`)


---

## 🌐 URLs principales

### 🛍️ Sitio público (cliente)
- `/` → Home
- `/productos` → Listado de instrumentos
- `/detalle/:id` → Detalle de un instrumento
- `/donde-estamos` → Página de ubicación/contacto

### 🛠️ Panel de administración (ABM)
- `/categorias` → ABM de Categorías
- `/instrumentos` → ABM de Instrumentos

---

## 🔄 Funcionalidades disponibles

### Categorías
✅ Listar  
✅ Crear  
✅ Editar  
✅ Eliminar (previa verificación de no tener instrumentos asociados con modal de advertencia)  

### Instrumentos
✅ Listar  
✅ Crear  
✅ Editar  
✅ Eliminar  

---

## 🚀 ¿Cómo correr el proyecto?

### Backend (Spring Boot)
1. Abrir el proyecto en tu IDE (IntelliJ, Eclipse, etc.)
2. Acceder a MySQL WorckBench, crear la tabla InstrumentosDB.
3. Correr la clase principal: `UtnApplication.java`


### Frontend (React + Vite)
1. En la carpeta del frontend:
```bash
npm install
npm run dev




 
