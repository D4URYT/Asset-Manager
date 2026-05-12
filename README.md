# Asset Manager

Monorepo TypeScript para una plataforma de gestion empresarial con dashboard, CRUDs de usuarios/productos/clientes/publicaciones, API REST y librerias compartidas para esquema, validacion y cliente HTTP.

## Que incluye

- Dashboard web en React + Vite.
- API en Express.
- Esquema de base de datos con Drizzle ORM.
- OpenAPI como fuente de verdad para generar cliente React Query y esquemas Zod.
- Integracion con Supabase para autenticacion y persistencia.

## Stack

- Node.js 24
- pnpm workspaces
- TypeScript 5.9
- React 19 + Vite + Wouter + TanStack Query
- Express 5
- PostgreSQL / Supabase
- Drizzle ORM
- Zod
- Orval

## Estructura del proyecto

```text
.
|-- artifacts/
|   |-- api-server/       # API REST
|   |-- dashboard/        # Frontend principal
|   `-- mockup-sandbox/   # Sandbox visual/prototipos
|-- lib/
|   |-- api-client-react/ # Cliente generado para React
|   |-- api-spec/         # Especificacion OpenAPI
|   |-- api-zod/          # Esquemas Zod generados
|   `-- db/               # Esquema y configuracion Drizzle
|-- scripts/
|-- supabase-schema.sql   # SQL de apoyo para Supabase
`-- replit.md             # Notas operativas del proyecto
```

## Requisitos

- Node.js 24
- pnpm
- Un proyecto de Supabase
- Base de datos PostgreSQL accesible desde `DATABASE_URL`

## Variables de entorno

El backend lee un archivo `.env` en la raiz. Estas variables son necesarias:

```env
PORT=8080
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu_clave_anon
```

Para el frontend se usan estas variables:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anon
```

Ademas, `artifacts/dashboard` exige `PORT` y `BASE_PATH` al arrancar Vite.

## Instalacion

```bash
pnpm install
```

## Ejecucion local

1. Inicia la API:

```powershell
$env:PORT=8080
pnpm --filter @workspace/api-server run dev
```

2. En otra terminal, inicia el dashboard:

```powershell
$env:PORT=23183
$env:BASE_PATH="/"
pnpm --filter @workspace/dashboard run dev
```

3. Abre la aplicacion en `http://localhost:23183`.

El frontend proxya `/api` hacia `http://127.0.0.1:8080`.

## Scripts utiles

```bash
pnpm run typecheck
pnpm run build
pnpm --filter @workspace/api-server run test
pnpm --filter @workspace/dashboard run test:e2e
pnpm --filter @workspace/api-spec run codegen
pnpm --filter @workspace/db run push
```

## Modulos principales

- `artifacts/api-server`: rutas REST, seed inicial y acceso a Supabase.
- `artifacts/dashboard`: interfaz de administracion con paginas de dashboard, usuarios, productos, clientes, posts y ajustes.
- `lib/db`: tablas y esquema central del dominio.
- `lib/api-spec`: contrato OpenAPI.
- `lib/api-client-react`: hooks y cliente generados.
- `lib/api-zod`: validadores compartidos entre frontend y backend.

## Datos iniciales

Al levantar la API, el proyecto intenta poblar la base si la tabla `users` esta vacia. Incluye, entre otros, este usuario:

- `admin@empresa.com` / `admin123`

## Notas importantes

- El backend necesita conectividad real a Supabase para autenticacion y persistencia.
- Algunas rutas del API tienen fallback a datos mock si Supabase no responde correctamente.
- Despues de `pnpm --filter @workspace/api-spec run codegen`, puede ser necesario revisar `lib/api-zod/src/index.ts` para evitar exports duplicados.
- El dashboard usa Supabase Auth en cliente para la sesion.

## Referencias rapidas

- Esquema DB: `lib/db/src/schema/`
- OpenAPI: `lib/api-spec/openapi.yaml`
- Rutas API: `artifacts/api-server/src/routes/`
- Paginas frontend: `artifacts/dashboard/src/pages/`

