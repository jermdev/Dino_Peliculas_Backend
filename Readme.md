# 🦖 Dino Películas - Backend

API RESTful desarrollada con **Node.js**, **Fastify**, **TypeScript** y **Prisma ORM**, encargada de la gestión del catálogo, feed principal, búsqueda predictiva y administración de contenido multimedia para la plataforma de streaming **Dino Películas**.

El proyecto está diseñado bajo los principios de **Clean Architecture** (Arquitectura Limpia / Puertos y Adaptadores), garantizando alta modularidad, desacoplamiento de la lógica de negocio y facilidad de mantenimiento.

---

## 🎯 Objetivo del Proyecto

El objetivo principal es proporcionar un servicio de backend escalable, rápido y seguro que permita:

- **Centralizar el catálogo multimedia**: Servir metadatos de películas, series, episodios y categorías organizadas.
- **Optimizar la experiencia de usuario**: Proveer endpoints para el feed de inicio (`HomeFeed`), recomendaciones y autocompletado en tiempo real durante la búsqueda.
- **Gestionar la ingesta y actualización de contenido**: Permitir la creación y modificación de películas, asociando archivos multimedia, subtítulos, posters (horizontales y verticales) y taxonomía de categorías.
- **Mantener alta disponibilidad y bajo tiempo de respuesta**: Aprovechar el rendimiento de Fastify y la optimización de consultas de PostgreSQL mediante Prisma y pooling de conexiones.

---

## 🛠️ Tecnologías Utilizadas

- **Entorno de ejecución**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework Web**: [Fastify](https://fastify.dev/) (Rápido, con bajo overhead y soporte nativo para TypeScript)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **ORM / Base de Datos**: [Prisma ORM](https://www.prisma.io/) conectado a **PostgreSQL** (vía Supabase con PgBouncer)
- **Validación de Datos**: [Zod](https://zod.dev/)
- **CORS**: `@fastify/cors`
- **Herramientas de Desarrollo**: `tsx` (ejecución con watch mode), `tsc-alias` (resolución de alias `@/*`)

---

## 📁 Estructura del Proyecto

El código fuente sigue las capas de **Clean Architecture**:

```text
Dino_peliculas_bakend/
├── prisma/
│   ├── migrations/               # Historial de migraciones SQL
│   └── schema.prisma             # Modelos de datos (Movie, Category, etc.)
├── src/
│   ├── application/              # Casos de uso y lógica de aplicación
│   │   ├── helpers/              # Funciones auxiliares de aplicación
│   │   ├── services/             # Servicios de negocio (HomeFeed, Catalogo, etc.)
│   │   └── types/                # Tipos y DTOs de aplicación
│   ├── di/                       # Inyección de dependencias (Container)
│   ├── domain/                   # Capa central independiente del framework
│   │   ├── entities/             # Entidades del dominio (Movie, CategoryCatalogo, etc.)
│   │   ├── ports/                # Interfaces de repositorios y puertos
│   │   ├── types/                # Tipos puros de dominio
│   │   └── value-objects/        # Objetos de valor del dominio
│   ├── infrastructure/           # Implementaciones técnicas externas
│   │   └── persistence/          # Repositorios con Prisma (PrismaMovieRepository, etc.)
│   ├── interfaces/               # Adaptadores primarios / controladores de entrada
│   │   ├── controllers/          # Controladores HTTP de Fastify
│   │   ├── router/               # Definición y registro de rutas de la API
│   │   └── schemas/              # Esquemas de validación con Zod
│   ├── lib/                      # Configuración compartida y clientes (Prisma Client)
│   └── server.ts                 # Punto de entrada principal y arranque del servidor
├── .env                          # Variables de entorno (no versionar credenciales reales)
├── .gitignore                    # Reglas de exclusión de Git
├── package.json                  # Dependencias y scripts de ejecución
├── prisma.config.ts              # Configuración de Prisma v7
├── Readme.md                     # Documentación del proyecto
├── tsc-alias.config.js           # Configuración de mapeo de paths para build
└── tsconfig.json                 # Configuración del compilador TypeScript
```

### Descripción de las capas:

- **`domain/`**: Núcleo del sistema. Contiene entidades de negocio y puertos (interfaces) que dictan cómo interactuar con los datos sin depender de ninguna base de datos o framework.
- **`application/`**: Implementa los casos de uso específicos del sistema (`HomeFeedService`, `CatalogoQueryService`, `CreateMovieService`, `RecommendationService`, etc.).
- **`infrastructure/`**: Implementa los puertos definidos en el dominio (`PrismaMovieRepository`, adaptadores de base de datos PostgreSQL/Supabase).
- **`interfaces/`**: Encargada de recibir las solicitudes externas (`HTTP`), validar las entradas con **Zod** y delegar la ejecución a los servicios correspondientes a través de los controladores.

---

## 🚀 Cómo Inicializar el Proyecto

### 1. Prerrequisitos

Asegúrate de tener instalados:
- [Node.js](https://nodejs.org/) (versión 20 o superior recomendada)
- Gestor de paquetes: `npm` o `pnpm`
- Instancia de **PostgreSQL** disponible (local o en la nube como Supabase)

### 2. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd Dino_peliculas_bakend
```

### 3. Instalar Dependencias

Con **npm**:
```bash
npm install
```

O si usas **pnpm**:
```bash
pnpm install
```

### 4. Configurar las Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto basado en el siguiente ejemplo:

```env
# Conexión agrupada (PgBouncer o conexión transaccional)
DATABASE_URL="postgresql://usuario:password@host:6543/postgres?pgbouncer=true"

# Conexión directa (requerida por Prisma para migraciones)
DIRECT_URL="postgresql://usuario:password@host:5432/postgres"

# Puerto y Host del servidor (Opcionales, valores por defecto: 3000 y 0.0.0.0)
PORT=3000
HOST=0.0.0.0
```

### 5. Generar Cliente y Ejecutar Migraciones de Base de Datos

Sincroniza el esquema de Prisma con tu base de datos:

```bash
# Genera el cliente de Prisma
npx prisma generate

# Aplica las migraciones pendientes
npx prisma migrate dev
```

### 6. Iniciar el Servidor

#### Modo Desarrollo (con recarga automática):
```bash
npm run dev
```

El servidor estará escuchando en `http://localhost:3000`.

#### Modo Producción:
```bash
# Compilar código TypeScript a JavaScript en dist/
npm run build

# Iniciar el servidor compilado
npm run start
```

---

## 📡 Endpoints Principales de la API

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/home` | Obtiene el feed inicial con películas destacadas, catálogo por categorías y recomendaciones. |
| `GET` | `/api/content/:id` | Retorna los detalles de un contenido/película por su ID junto a contenido recomendado. |
| `GET` | `/api/movie/autocomplete?q=...` | Devuelve sugerencias de búsqueda predictiva en tiempo real. |
| `POST` | `/api/movies` | Registra una nueva película en la base de datos (con validación de esquema). |
| `PATCH` | `/api/movie/:id` | Actualiza campos o metadatos de una película existente. |

---
