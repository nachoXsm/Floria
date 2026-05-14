# 🌿 Floria

**Tu espacio, tu naturaleza.**  
Plataforma inteligente para descubrir, identificar, combinar y cuidar plantas.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 14 (App Router) + React + Tailwind CSS |
| Hosting | Vercel |
| Backend / DB | Supabase (PostgreSQL + Storage + Auth) |
| IA Reconocimiento | Plant.id API |
| IA Conversacional | OpenAI API (Etapa 3) |
| Pagos | Stripe |
| Repositorio / CI | GitHub Actions |

---

## Setup rápido

### 1. Clonar y dependencias

```bash
git clone https://github.com/tu-usuario/floria.git
cd floria
npm install
```

### 2. Variables de entorno

```bash
cp .env.local.example .env.local
# Completá cada variable en .env.local
```

### 3. Supabase

1. Creá un proyecto en [supabase.com](https://supabase.com)
2. Copiá la URL y anon key a `.env.local`
3. Ejecutá las migraciones:

```bash
npx supabase login
npx supabase link --project-ref TU_PROJECT_REF
npx supabase db push
```

O ejecutá manualmente el SQL en `supabase/migrations/001_initial_schema.sql`.

### 4. Vercel

```bash
npx vercel
# Seguí las instrucciones y configurá las env vars en el dashboard
```

### 5. Desarrollo local

```bash
npm run dev
# → http://localhost:3000
```

---

## Estructura del proyecto

```
floria/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── page.tsx             # Landing page
│   │   ├── explore/             # Catálogo con filtros
│   │   ├── plant/[slug]/        # Ficha de especie
│   │   ├── identify/            # Reconocimiento por foto
│   │   ├── garden/              # Mis jardines
│   │   ├── profile/             # Perfil de usuario
│   │   └── api/                 # API Routes
│   │       ├── identify/        # POST → Plant.id
│   │       ├── plants/          # CRUD plantas
│   │       ├── gardens/         # CRUD jardines
│   │       └── webhooks/stripe/ # Webhooks de pagos
│   ├── components/
│   │   ├── layout/              # Navbar, Footer
│   │   ├── plants/              # PlantCard, PlantFilters, PlantDetail
│   │   ├── garden/              # GardenCard, GardenBuilder
│   │   └── ui/                  # Button, Input, Modal, Badge
│   ├── lib/
│   │   ├── supabase/            # client.ts, server.ts
│   │   └── queries/             # plants.ts, gardens.ts, profiles.ts
│   ├── hooks/                   # usePlants, useProfile, useGarden
│   └── types/                   # TypeScript types
├── supabase/
│   ├── migrations/              # SQL migrations
│   └── functions/               # Edge Functions (futuro)
└── .github/workflows/ci.yml    # CI/CD
```

---

## Modelo freemium

| Feature | Free | Pro ($9.99/mes) |
|---------|------|-----------------|
| Búsquedas | 10/día | Ilimitadas |
| Identificaciones IA | 3/mes | Ilimitadas |
| Jardines guardados | 1 | Ilimitados |
| Exportar (PDF/PNG) | ✗ | ✓ |
| Combinaciones IA | ✗ | ✓ |
| Asistente botánico | ✗ | ✓ |

---

## Roadmap MVP

### Etapa 1 — Catálogo (semanas 1-3)
- [x] Schema DB completo
- [ ] Seed datos: 50 plantas iniciales
- [ ] Página explore con filtros
- [ ] Ficha de planta detallada
- [ ] Auth (email + Google OAuth)

### Etapa 2 — IA Reconocimiento (semanas 4-6)
- [ ] Integración Plant.id
- [ ] Historial de identificaciones
- [ ] Match con catálogo propio
- [ ] Límites freemium + Stripe

### Etapa 3 — IA Avanzada (semanas 7-10)
- [ ] Asistente botánico (OpenAI)
- [ ] Combinaciones automáticas (pgvector)
- [ ] Diseñador de jardines básico
- [ ] Exportación PDF

---

## Variables de entorno requeridas

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Plant.id (https://plant.id — plan Hobbyist: ~$20/mes)
PLANT_ID_API_KEY=

# OpenAI (Etapa 3)
OPENAI_API_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# App
NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app
```

---

## GitHub Secrets necesarios para CI/CD

```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

---

## Licencia

Propietaria — © 2025 Floria
