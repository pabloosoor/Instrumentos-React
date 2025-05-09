# 🎸 Instrumentos-back-UTN-Lab4

API REST para la gestión de instrumentos musicales desarrollada con Spring Boot y MySQL.

## 🚀 Tecnologías utilizadas

- **Spring Boot 3.4.4**: Framework para crear aplicaciones Java
- **Spring Data JPA**: Para la persistencia de datos
- **MySQL**: Base de datos relacional
- **Lombok**: Reduce el código repetitivo (getters, setters, constructores)
- **Maven**: Gestión de dependencias

## 🔌 Conexión a la base de datos

La aplicación se conecta a una base de datos MySQL. La configuración se encuentra en `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/InstrumentosDB
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=create
```

> ⚠️ Cambiar `ddl-auto=create` a `update` después de la primera ejecución para mantener los datos.

## 🌐 Endpoints disponibles

### Categorías

#### GET `/api/categorias`

Retorna todas las categorías.

Ejemplo de respuesta:

```json
[
  {
    "idCategoria": 1,
    "nombre": "Cuerda"
  },
  {
    "idCategoria": 2,
    "nombre": "Viento"
  },
  {
    "idCategoria": 3,
    "nombre": "Percusión"
  }
]
```

#### GET `/api/categorias/{id}`

Retorna una categoría específica.

### Instrumentos

#### GET `/api/instrumentos`

Retorna todos los instrumentos con sus categorías.

Ejemplo de respuesta:

```json
[
  {
    "id": 1,
    "instrumento": "Mandolina Instrumento Musical Stagg Sunburst",
    "marca": "Stagg",
    "modelo": "M20",
    "imagen": "nro10.jpg",
    "precio": 2450.0,
    "costoEnvio": "G",
    "cantidadVendida": 28,
    "descripcion": "Estas viendo una excelente mandolina de la marca Stagg...",
    "categoria": {
      "idCategoria": 1,
      "nombre": "Cuerda"
    }
  }
]
```

#### GET `/api/instrumentos/{id}`

Retorna un instrumento específico.

#### POST `/api/instrumentos`

Crea un nuevo instrumento.

#### PUT `/api/instrumentos/{id}`

Actualiza un instrumento existente.

#### DELETE `/api/instrumentos/{id}`

Elimina un instrumento.

## 🚀 Inicialización de datos

La aplicación inicializa automáticamente la base de datos con categorías e instrumentos la primera vez que se ejecuta.

## 🛠️ Cómo ejecutar el proyecto

1. Clone el repositorio
2. Configure MySQL y cree una base de datos llamada "InstrumentosDB"
3. Configure las credenciales en `application.properties`
4. Ejecute el proyecto con Maven: `mvn spring-boot:run`
5. La API estará disponible en `http://localhost:8080`
