# 🎸 Musical Hendrix - CRUD Fullstack Instrumentos y Categorías

Proyecto web fullstack para la gestión de un catálogo de **instrumentos musicales** y **categorías**, con funcionalidades completas de ABM (Alta, Baja y Modificación), carrito de compras y reportes. Desarrollado para la UTN.

![image](https://github.com/user-attachments/assets/2b2b75b4-f482-402c-ac0b-58efdfe78f51)


---

## 👥 Autores

- Pablo Osorio
- Matias Araya
- Jenifer Contreras
- Lautaro Gonzalez
- Eros Mariotti

---

## 📝 Descripción

Este sistema permite a usuarios y administradores:
- Navegar y buscar instrumentos musicales.
- Administrar categorías e instrumentos (ABM).
- Realizar compras simuladas con carrito.
- Exportar reportes y detalles en PDF/Excel.
- Controlar permisos según el rol (ADMIN, OPERADOR, VISOR).

---

## ⚙️ Tecnologías implementadas

### Frontend
- ![React](https://img.shields.io/badge/React-18-blue?logo=react) + TypeScript
- Vite
- TailwindCSS
- React Router DOM
- Fetch API
- Componentes genéricos: `GenericForm`, `GenericTable`

### Backend
- ![Java](https://img.shields.io/badge/Java-21-red?logo=java)
- Spring Boot 3.4.4
- Spring Data JPA + Hibernate
- MySQL Workbench
- CORS habilitado para desarrollo (`localhost:5173`)

---

## 🌐 URLs principales

- `/` → Home
- `/productos` → Listado de instrumentos
- `/detalle/:id` → Detalle de un instrumento
- `/donde-estamos` → Ubicación/contacto

### Panel de administración (requiere login como ADMIN/OPERADOR)
- `/categorias` → ABM de Categorías
- `/instrumentos` → ABM de Instrumentos
- `/reportes` → Reportes y exportaciones

---

## 🔄 Funcionalidades

### Categorías
- ✅ Listar
- ✅ Crear
- ✅ Editar
- ✅ Eliminar (solo si no tiene instrumentos asociados; muestra advertencia)

### Instrumentos
- ✅ Listar
- ✅ Crear
- ✅ Editar
- ✅ Eliminar (solo si no está en pedidos históricos)

### Carrito de Compras
- ✅ Agregar instrumentos
- ✅ Calcular total
- ✅ Enviar pedido al backend
- ✅ Confirmar guardado con mensaje e ID

### Reportes
- ✅ Exportar a PDF y Excel
- ✅ Gráficos de ventas

---

## 🚀 ¿Cómo correr el proyecto?

### Backend (Spring Boot)
1. Clona el repositorio y abre el proyecto en tu IDE (IntelliJ, Eclipse, etc.)
2. Crea la base de datos `InstrumentosDB` en MySQL Workbench.
3. Configura las credenciales de la base de datos en `src/main/resources/application.properties`.
4. Ejecuta la clase principal: `UtnApplication.java`.

### Frontend (React + Vite)
1. Ve a la carpeta del frontend:
   ```bash
   npm install
   npm run dev
   ```
2. Accede a [http://localhost:5173](http://localhost:5173)

---

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/9b34b662-1c90-4468-9307-3bd7779e67e5)
![image](https://github.com/user-attachments/assets/8f4ab754-45b7-4dff-994f-f2ef2c1cf61e)
![image](https://github.com/user-attachments/assets/8abe0860-6aba-41e3-b1ff-fc7c2ce29b24)
![image](https://github.com/user-attachments/assets/7cc32b35-a348-45a9-afba-0ec5fb37c34e)
![image](https://github.com/user-attachments/assets/0d36757b-8021-4bca-b8b3-d1cb33805367)
![image](https://github.com/user-attachments/assets/a257d78b-92b6-4987-adbc-ae20282c5f83)





---

## 📝 Notas

- Proyecto académico para la UTN - Laboratorio de Computación IV.
- Para pruebas de login, los usuarios por defecto son:
  - **admin1 / admin123** (ADMIN)
  - **operador1 / operador123** (OPERADOR)
  - **usuario1 / usuario123** (VISOR)
- No se puede eliminar una categoría con instrumentos asociados ni un instrumento que esté en pedidos históricos.

---

¡Gracias por revisar el proyecto!  
