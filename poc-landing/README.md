# Comparador de Precios de Medicamentos

Sitio público SEO-first tipo comparador de precios de medicamentos. Páginas indexables por principio activo con precios actuales e históricos.

## Stack Tecnológico

- **Next.js 15** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS**
- **Server Components** por defecto
- **Zod** para validación de datos
- **Lucide React** para íconos

## Setup Local

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Instalación

1. Instalar dependencias:

```bash
npm install
```

2. Configurar variables de entorno:

Crear archivo `.env.local` (o copiar desde `.env.example`):

```env
PUNCH_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_ALLOW_INDEXING=false
```

3. Ejecutar en desarrollo:

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

## Estructura del Proyecto

```
POC landing/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Layout raíz
│   ├── page.tsx            # Home page
│   ├── buscar/             # Página de búsqueda (noindex)
│   ├── principio-activo/   # Páginas dinámicas de principios activos (SSR/ISR)
│   ├── api/active-ingredients/ # Mock API interna
│   ├── sitemap.ts          # Sitemap dinámico
│   └── robots.ts           # robots.txt
├── components/             # Componentes React
│   ├── ui/                 # Componentes UI base
│   ├── search/             # Componentes de búsqueda
│   ├── active-ingredient/  # Componentes de principio activo
│   └── layout/             # Header y Footer
├── lib/                    # Utilidades y lógica
│   ├── api/                # Cliente API y adapters
│   ├── mock/               # Data mock interna
│   └── utils/              # Utilidades (slug, format)
├── types/                  # Tipos TypeScript
│   └── domain.ts           # Tipos de dominio
└── public/                 # Archivos estáticos
```

## Caching y Revalidación

- **Revalidación estándar**: 14400 segundos (4 horas)
- Las páginas de principio activo usan ISR (Incremental Static Regeneration)
- La página `/principio-activo/[slug]` revalida mediante fetch server-side con `next: { revalidate: 14400 }`

## Mock API (interno)

- Endpoints mock en `app/api/active-ingredients/*`.
- Datos editables en `lib/mock/active-ingredients.ts` (slugs disponibles, grupos, precios, historial).

## Notas de accesibilidad

- Se incluye link “Saltar al contenido principal”.
- Tablas con `<caption>` y encabezados `<th scope>`.
- En mobile, la tabla de precios se transforma en cards con labels visibles.
- Los tabs son accesibles con roles/aria y navegación por teclado.
- El sitemap se regenera en cada build

## Cambiar de Mock a API Real

Actualmente el proyecto usa un mock API en `app/api/active-ingredients` con datos en
`lib/mock/active-ingredients.ts`. Para conectar la API real:

1. Actualizar `lib/api/active-ingredients-client.ts` para apuntar al backend real
   usando `PUNCH_API_BASE_URL`.
2. Ajustar los endpoints según la documentación de la API real.
3. Validar respuestas con los schemas de Zod en `lib/api/validation.ts`.

Ejemplo base para un fetch real:

```typescript
import { apiFetch } from './client';

export async function fetchActiveIngredientDetail(slug: string) {
  const baseUrl = process.env.PUNCH_API_BASE_URL;
  return apiFetch(`${baseUrl}/active-ingredients/${slug}`);
}
```

2. Ajustar los endpoints según la documentación de la API real
3. Validar respuestas con los schemas de Zod en `lib/api/validation.ts`

## Deploy a Vercel

1. Conectar el repositorio a Vercel
2. Configurar variables de entorno en el dashboard de Vercel:
   - `PUNCH_API_BASE_URL`
   - `NEXT_PUBLIC_BASE_URL` (URL de producción)
3. Deploy automático en cada push a main

## Características

- ✅ TypeScript strict (sin `any` implícitos)
- ✅ Server Components por defecto
- ✅ SEO optimizado (metadata dinámica, sitemap, robots.txt)
- ✅ Performance (ISR, mínimo JS en cliente)
- ✅ Accesibilidad básica (HTML semántico, labels, focus states)
- ✅ Archivos pequeños y mantenibles

## Scripts Disponibles

- `npm run dev` - Desarrollo local
- `npm run build` - Build de producción
- `npm run start` - Servidor de producción
- `npm run lint` - Linter
