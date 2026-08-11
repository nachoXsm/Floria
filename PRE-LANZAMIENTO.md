# ✅ Checklist de pre-lanzamiento — Floria

Cosas pendientes a resolver **antes del lanzamiento público**.

## 🔒 Seguridad / límites

- [ ] **Endurecer el límite freemium de invitados en `/api/identify`.**
  Hoy la cuota gratuita de los invitados (sin registro) se guarda en una **cookie**
  (`floria_free_ident`). Es fácil de evadir: borrar cookies o usar modo incógnito
  resetea las 3 identificaciones gratis.
  Opciones para endurecer:
  - Forzar registro para identificar (modelo "requiere cuenta"), o
  - Sumar control por IP / device fingerprint / rate-limit del lado del servidor, o
  - Habilitar sesiones anónimas de Supabase y contar por usuario anónimo.
  Ref: `src/app/api/identify/route.ts` (constante `FREE_LIMIT`, cookie `GUEST_COOKIE`).

## 🗄️ Base de datos

- [ ] Correr la migración `007_backfill_profiles.sql` en Supabase (rellena perfiles faltantes).
- [ ] Correr la migración `006_plant_translations.sql` + import de traducciones (panel `/admin`).

---
_Última actualización: 2026-08-11_
