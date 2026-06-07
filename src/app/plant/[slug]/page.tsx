import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPlantBySlug } from '@/lib/queries/plants'
import type { Metadata } from 'next'

const LIGHT_LABELS: Record<string, string> = {
  full_sun: 'Sol directo',
  partial_shade: 'Semi sombra',
  shade: 'Sombra',
  indirect: 'Luz indirecta',
}

const WATER_LABELS: Record<string, string> = {
  daily: 'Diario',
  twice_week: '2 veces por semana',
  weekly: 'Semanal',
  biweekly: 'Cada 2 semanas',
  monthly: 'Mensual',
}

const CARE_LABELS: Record<string, string> = {
  easy: 'Fácil',
  moderate: 'Moderado',
  expert: 'Experto',
}

const CARE_COLORS: Record<string, string> = {
  easy: '#16a34a',
  moderate: '#d97706',
  expert: '#dc2626',
}

const GROWTH_LABELS: Record<string, string> = {
  slow: 'Lento',
  moderate: 'Moderado',
  fast: 'Rápido',
}

const STYLE_LABELS: Record<string, string> = {
  mediterranean: 'Mediterráneo',
  tropical: 'Tropical',
  minimal: 'Minimalista',
  natural: 'Natural',
  formal: 'Formal',
  cottage: 'Cottage',
}

const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const plant = await getPlantBySlug(params.slug)
    return {
      title: `${plant.common_name} — Floria`,
      description: plant.description ?? `Ficha botánica de ${plant.scientific_name}`,
    }
  } catch {
    return { title: 'Planta — Floria' }
  }
}

export default async function PlantPage({ params }: Props) {
  let plant
  try {
    plant = await getPlantBySlug(params.slug)
  } catch {
    notFound()
  }

  const combinations = [
    ...(plant.plant_combinations_a?.map((c: { plant_b: { id: string; common_name: string; cover_image: string | null; slug: string | null; care_level: string } }) => c.plant_b) ?? []),
    ...(plant.plant_combinations_b?.map((c: { plant_a: { id: string; common_name: string; cover_image: string | null; slug: string | null; care_level: string } }) => c.plant_a) ?? []),
  ]

  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#F9FCF8',
      fontFamily: 'Montserrat, system-ui, sans-serif',
      color: '#1E3D2B',
    }}>
      {/* NAV */}
      <nav style={{
        position: 'fixed',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: '1120px',
        zIndex: 50,
        backgroundColor: 'rgba(249,252,248,0.92)',
        backdropFilter: 'blur(18px)',
        border: '1px solid rgba(231,239,230,0.9)',
        boxShadow: '0 16px 40px rgba(30,61,43,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px 0 20px',
        borderRadius: '999px',
        height: '60px',
      }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', lineHeight: 0 }}>
          <img src="/logo-floria.png" alt="Floria" style={{ width: '200px', height: 'auto', display: 'block' }} />
        </a>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <a href="/explore" style={{ color: '#4C7F5B', textDecoration: 'none', fontSize: '13px', fontWeight: 500, padding: '8px 12px' }}>Explorar</a>
          <a href="/identify" style={{ color: '#4C7F5B', textDecoration: 'none', fontSize: '13px', fontWeight: 500, padding: '8px 12px' }}>Identificar</a>
          <a href="/auth/login" style={{ color: '#4C7F5B', textDecoration: 'none', fontSize: '13px', fontWeight: 500, padding: '8px 12px' }}>Mi cuenta</a>
        </div>
      </nav>

      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '96px 24px 60px' }}>

        {/* BREADCRUMB */}
        <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#4C7F5B' }}>
          <Link href="/explore" style={{ color: '#4C7F5B', textDecoration: 'none' }}>← Explorar</Link>
          <span>/</span>
          <span style={{ color: '#1E3D2B' }}>{plant.common_name}</span>
        </div>

        {/* HERO */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          marginBottom: '48px',
          alignItems: 'start',
        }}>
          {/* Imagen principal */}
          <div style={{
            borderRadius: '32px',
            overflow: 'hidden',
            aspectRatio: '4/3',
            backgroundColor: '#E7EFE6',
            position: 'relative',
          }}>
            {plant.cover_image ? (
              <Image
                src={plant.cover_image}
                alt={plant.common_name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '80px' }}>
                🌿
              </div>
            )}
          </div>

          {/* Info principal */}
          <div>
            {/* Tags de ubicación */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {plant.indoor && (
                <span style={{ fontSize: '11px', padding: '4px 12px', borderRadius: '999px', backgroundColor: '#E7EFE6', color: '#1E3D2B', fontWeight: 600 }}>
                  Interior
                </span>
              )}
              {plant.outdoor && (
                <span style={{ fontSize: '11px', padding: '4px 12px', borderRadius: '999px', backgroundColor: '#E7EFE6', color: '#1E3D2B', fontWeight: 600 }}>
                  Exterior
                </span>
              )}
              {plant.pot_suitable && (
                <span style={{ fontSize: '11px', padding: '4px 12px', borderRadius: '999px', backgroundColor: '#F0FDF4', color: '#166534', fontWeight: 600 }}>
                  Apto maceta
                </span>
              )}
              {plant.flowering && (
                <span style={{ fontSize: '11px', padding: '4px 12px', borderRadius: '999px', backgroundColor: '#FDF2F8', color: '#9D174D', fontWeight: 600 }}>
                  Florece
                </span>
              )}
            </div>

            <h1 style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(38px, 5vw, 62px)',
              lineHeight: 1,
              margin: '0 0 8px',
              fontWeight: 500,
              letterSpacing: '-1px',
            }}>
              {plant.common_name}
            </h1>
            <p style={{ fontSize: '16px', fontStyle: 'italic', color: '#4C7F5B', margin: '0 0 20px' }}>
              {plant.scientific_name}
            </p>
            {plant.family && (
              <p style={{ fontSize: '12px', color: '#7A9E82', margin: '0 0 24px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>
                Familia {plant.family}
              </p>
            )}

            {plant.description && (
              <p style={{ fontSize: '15px', color: '#345E43', lineHeight: 1.8, margin: '0 0 28px' }}>
                {plant.description}
              </p>
            )}

            {/* Nivel de cuidado */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: `${CARE_COLORS[plant.care_level]}12`,
              border: `1px solid ${CARE_COLORS[plant.care_level]}30`,
              borderRadius: '12px',
              padding: '10px 16px',
              marginBottom: '24px',
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '999px', backgroundColor: CARE_COLORS[plant.care_level], flexShrink: 0 }} />
              <span style={{ fontSize: '13px', fontWeight: 600, color: CARE_COLORS[plant.care_level] }}>
                Cuidado {CARE_LABELS[plant.care_level]}
              </span>
            </div>

            {/* Estilos paisajísticos */}
            {plant.garden_styles?.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '11px', color: '#7A9E82', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600, margin: '0 0 10px' }}>Estilo paisajístico</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {plant.garden_styles.map(s => (
                    <span key={s} style={{ fontSize: '12px', padding: '5px 14px', borderRadius: '999px', border: '1px solid #C5D9C2', color: '#1E3D2B', fontWeight: 500 }}>
                      {STYLE_LABELS[s] ?? s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* REQUERIMIENTOS */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '32px',
            color: '#1E3D2B',
            margin: '0 0 24px',
            fontWeight: 500,
          }}>
            Requerimientos
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            {[
              { label: 'Luz', value: LIGHT_LABELS[plant.light] ?? plant.light, icon: '☀' },
              { label: 'Riego', value: WATER_LABELS[plant.water] ?? plant.water, icon: '💧' },
              plant.growth_speed && { label: 'Crecimiento', value: GROWTH_LABELS[plant.growth_speed] ?? plant.growth_speed, icon: '↑' },
              (plant.height_min_cm || plant.height_max_cm) && {
                label: 'Altura',
                value: plant.height_min_cm && plant.height_max_cm
                  ? `${plant.height_min_cm}–${plant.height_max_cm} cm`
                  : plant.height_max_cm ? `hasta ${plant.height_max_cm} cm` : `desde ${plant.height_min_cm} cm`,
                icon: '📏',
              },
              (plant.temp_min_c !== null || plant.temp_max_c !== null) && {
                label: 'Temperatura',
                value: plant.temp_min_c !== null && plant.temp_max_c !== null
                  ? `${plant.temp_min_c}°–${plant.temp_max_c}°C`
                  : plant.temp_min_c !== null ? `mín. ${plant.temp_min_c}°C` : `máx. ${plant.temp_max_c}°C`,
                icon: '🌡',
              },
              (plant.humidity_min || plant.humidity_max) && {
                label: 'Humedad',
                value: `${plant.humidity_min ?? 0}–${plant.humidity_max ?? 100}%`,
                icon: '💦',
              },
            ].filter(Boolean).map((item: { label: string; value: string; icon: string } | false) => {
              if (!item) return null
              return (
                <div key={item.label} style={{
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  padding: '20px',
                  border: '1px solid #E7EFE6',
                  boxShadow: '0 4px 16px rgba(30,61,43,0.04)',
                }}>
                  <p style={{ fontSize: '22px', margin: '0 0 8px' }}>{item.icon}</p>
                  <p style={{ fontSize: '11px', color: '#7A9E82', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600, margin: '0 0 4px' }}>{item.label}</p>
                  <p style={{ fontSize: '14px', color: '#1E3D2B', fontWeight: 600, margin: 0 }}>{item.value}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* FLORACIÓN */}
        {plant.flowering && plant.flowering_months?.length > 0 && (
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '32px', color: '#1E3D2B', margin: '0 0 20px', fontWeight: 500 }}>
              Temporada de floración
            </h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {MONTHS.map((m, i) => {
                const active = plant.flowering_months.includes(i + 1)
                return (
                  <div key={m} style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 600,
                    backgroundColor: active ? '#FDF2F8' : '#F9FCF8',
                    color: active ? '#9D174D' : '#A7C4A1',
                    border: active ? '1px solid #F9A8D4' : '1px solid #E7EFE6',
                  }}>
                    {m}
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* SUELO Y USOS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          {plant.soil_types?.length > 0 && (
            <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '28px', border: '1px solid #E7EFE6' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '22px', color: '#1E3D2B', margin: '0 0 16px', fontWeight: 500 }}>Tipo de suelo</h3>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {plant.soil_types.map(s => (
                  <span key={s} style={{ fontSize: '12px', padding: '5px 14px', borderRadius: '999px', backgroundColor: '#F9FCF8', border: '1px solid #C5D9C2', color: '#345E43' }}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {plant.uses?.length > 0 && (
            <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '28px', border: '1px solid #E7EFE6' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '22px', color: '#1E3D2B', margin: '0 0 16px', fontWeight: 500 }}>Usos</h3>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {plant.uses.map(u => (
                  <span key={u} style={{ fontSize: '12px', padding: '5px 14px', borderRadius: '999px', backgroundColor: '#F9FCF8', border: '1px solid #C5D9C2', color: '#345E43' }}>{u}</span>
                ))}
              </div>
            </div>
          )}

          {plant.origin?.length > 0 && (
            <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '28px', border: '1px solid #E7EFE6' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '22px', color: '#1E3D2B', margin: '0 0 16px', fontWeight: 500 }}>Origen</h3>
              <p style={{ fontSize: '14px', color: '#345E43', margin: 0, lineHeight: 1.7 }}>{plant.origin.join(', ')}</p>
            </div>
          )}
        </div>

        {/* COMBINACIONES */}
        {combinations.length > 0 && (
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '32px', color: '#1E3D2B', margin: '0 0 8px', fontWeight: 500 }}>
              Combina bien con
            </h2>
            <p style={{ fontSize: '14px', color: '#4C7F5B', margin: '0 0 24px' }}>
              Plantas compatibles por estética y requerimientos
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
              {combinations.map((p: { id: string; common_name: string; cover_image: string | null; slug: string | null; care_level: string }) => (
                <Link key={p.id} href={`/plant/${p.slug ?? p.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1px solid #E7EFE6',
                    transition: 'all 0.2s',
                  }}>
                    <div style={{ height: '110px', backgroundColor: '#E7EFE6', position: 'relative' }}>
                      {p.cover_image ? (
                        <Image src={p.cover_image} alt={p.common_name} fill sizes="180px" style={{ objectFit: 'cover' }} />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '32px' }}>🌿</div>
                      )}
                    </div>
                    <div style={{ padding: '12px' }}>
                      <p style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '15px', color: '#1E3D2B', margin: 0 }}>{p.common_name}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* GALERÍA extra */}
        {plant.images?.length > 1 && (
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '32px', color: '#1E3D2B', margin: '0 0 20px', fontWeight: 500 }}>
              Galería
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
              {plant.images.slice(1).map((img, i) => (
                <div key={i} style={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: '4/3', position: 'relative', backgroundColor: '#E7EFE6' }}>
                  <Image src={img} alt={`${plant.common_name} ${i + 2}`} fill sizes="220px" style={{ objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div style={{
          backgroundColor: '#1E3D2B',
          borderRadius: '32px',
          padding: '40px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #1E3D2B 0%, #0D1E15 100%)',
        }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '36px', color: 'white', margin: '0 0 12px', fontWeight: 500 }}>
            ¿Tenés esta planta?
          </h3>
          <p style={{ color: '#A7C4A1', fontSize: '15px', margin: '0 0 28px' }}>
            Guardala en tu jardín y armá tu colección botánica personal.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/auth/login" style={{
              backgroundColor: '#F9FCF8',
              color: '#1E3D2B',
              padding: '13px 28px',
              borderRadius: '999px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
            }}>
              Guardar en mi jardín
            </Link>
            <Link href="/explore" style={{
              border: '1px solid rgba(231,239,230,0.3)',
              color: '#E7EFE6',
              padding: '13px 28px',
              borderRadius: '999px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
            }}>
              Seguir explorando
            </Link>
          </div>
        </div>

      </div>
    </main>
  )
}
