# Floria — Guía para Claude

App de paisajismo + identificación botánica con IA.

## Stack
- **Framework:** Next.js 14 (App Router, `src/app/`)
- **Estilos:** Tailwind CSS + inline styles (paleta `floria-*`)
- **Backend:** Supabase (Auth, Postgres, Storage)
- **Pagos:** Stripe (webhook en `/api/webhooks/stripe`)
- **Deploy:** Vercel (auto-deploy en push a `main`)

## Estructura de rutas
| Ruta | Estado |
|------|--------|
| `/` | Landing premium |
| `/explore` | Catálogo con filtros |
| `/plant/[slug]` | Ficha de planta |
| `/identify` | Upload + Plant.id API |
| `/pricing` | Planes Free / Pro |
| `/auth/login` | Login y registro Supabase |
| `/api/identify` | Endpoint IA con límites por tier |
| `/api/webhooks/stripe` | Stripe webhook |

## Diseño
- **Fuentes:** Cormorant Garamond (títulos) + Montserrat (cuerpo)
- **Paleta principal:** `#1E3D2B` (verde oscuro), `#F9FCF8` (fondo), `#4C7F5B` (acento)
- **Sin componentes reutilizables todavía** — estilos inline en cada página
- **Nav:** píldora flotante con glassmorphism (patrón igual en todas las páginas)

## Tiers
- **Free:** 3 identificaciones/mes, 1 jardín, 10 búsquedas/día
- **Pro:** $9.99/mes — todo ilimitado + exportar + combinaciones IA

## Comandos
```bash
npm run dev      # dev server en localhost:3000
npm run build    # build de producción
```

## Variables de entorno (`.env.local`, no subir a git)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `PLANT_ID_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

## Reglas de trabajo
- Hacer commit y push directo sin pedir confirmación para la terminal
- Siempre desarrollar en la rama designada, nunca pushear a `main` directamente
