import Image from 'next/image'
import Link from 'next/link'
import type { Plant } from '@/types'
import type { Enrichment } from '@/lib/enrich'
import { lightShort } from '@/lib/enrich'

const CARE_LABELS: Record<string, string> = { easy: 'Fácil', moderate: 'Moderado', expert: 'Experto' }
const CARE_COLORS: Record<string, string> = { easy: '#16a34a', moderate: '#d97706', expert: '#dc2626' }

// Íconos line-art
const IconDrop = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.5c0 0 6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/></svg>)
const IconSun = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 1.5v2.5M12 20v2.5M3.5 12H1M23 12h-2.5M5.6 5.6L3.9 3.9M20.1 20.1l-1.7-1.7M18.4 5.6l1.7-1.7M3.9 20.1l1.7-1.7"/></svg>)
const IconTemp = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V5a2 2 0 0 0-4 0v9.76a4 4 0 1 0 4 0z"/></svg>)
const IconShield = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 3v6c0 5-3.5 8-8 11-4.5-3-8-6-8-11V5z"/></svg>)
const IconSoil = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#92400E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 15h18M5 15l1-4h12l1 4M9 11V8M12 11V7M15 11V8"/></svg>)
const IconPin = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>)

function CareRow({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', backgroundColor: '#F6F3EC', borderRadius: '16px', padding: '14px 16px' }}>
      <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>{icon}</div>
      <div><p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#1E3D2B' }}>{title}</p><p style={{ margin: 0, fontSize: '13px', color: '#4C7F5B' }}>{text}</p></div>
    </div>
  )
}

export default function FichaContent({ plant, enrichment, combinations }: {
  plant: Plant
  enrichment: Enrichment
  combinations: Partial<Plant>[]
}) {
  const { taxonomy, care } = enrichment
  const taxRows: [string, string | undefined][] = [
    ['Orden', taxonomy.orden], ['Género', taxonomy.genero], ['Familia', taxonomy.familia],
    ['Clase', taxonomy.clase], ['Filo', taxonomy.filo],
  ]

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 0 40px' }}>
      {/* HERO imagen full-bleed */}
      <div style={{ position: 'relative', width: '100%', height: '340px', backgroundColor: '#E7EFE6' }}>
        {plant.cover_image ? (
          <Image src={plant.cover_image} alt={plant.common_name} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '80px' }}>🌿</div>
        )}
      </div>

      <div style={{ padding: '0 20px', marginTop: '-24px', position: 'relative' }}>
        {/* Encabezado sobre tarjeta */}
        <div style={{ backgroundColor: '#F2E9DD', borderRadius: '28px 28px 0 0', padding: '24px 4px 0' }}>
          <h1 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '38px', fontWeight: 700, margin: '0 0 2px', lineHeight: 1.05, letterSpacing: '-0.5px' }}>
            {plant.common_name}
          </h1>
          <p style={{ fontSize: '15px', fontStyle: 'italic', color: '#4C7F5B', margin: '0 0 16px' }}>{plant.scientific_name}</p>

          {/* Chips */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
            {plant.indoor && <span style={chip}>Interior</span>}
            {plant.outdoor && <span style={chip}>Exterior</span>}
            {plant.pot_suitable && <span style={{ ...chip, backgroundColor: '#E7EFE6' }}>Apto maceta</span>}
            {plant.is_native && <span style={{ ...chip, backgroundColor: '#ECFDF5', color: '#047857' }}>Nativa</span>}
            <span style={{ ...chip, backgroundColor: `${CARE_COLORS[plant.care_level]}18`, color: CARE_COLORS[plant.care_level] }}>
              Cuidado {CARE_LABELS[plant.care_level]}
            </span>
          </div>

          {/* Aviso toxicidad */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#FEF7EE', border: '1px solid #F6E0C8', borderRadius: '16px', padding: '12px 14px', marginBottom: '24px' }}>
            <span style={{ fontSize: '18px' }}>⚠️</span>
            <p style={{ margin: 0, fontSize: '12px', color: '#92400E', lineHeight: 1.5 }}>{care.toxicidad}</p>
          </div>
        </div>

        {/* DESCRIPCIÓN */}
        {plant.description && (
          <Section title="Descripción">
            <p style={{ fontSize: '14px', color: '#345E43', lineHeight: 1.8, margin: 0 }}>{plant.description}</p>
          </Section>
        )}

        {/* CUIDADOS (Agua / Luz) */}
        <Section title="Cuidados">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={careIconBox}><IconDrop /></div>
              <div><p style={careH}>Agua</p><p style={careP}>{care.agua}</p></div>
            </div>
            <div style={{ height: '1px', backgroundColor: '#EDE5D6' }} />
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={careIconBox}><IconSun /></div>
              <div><p style={careH}>Luz solar</p><p style={careP}>{care.luz}</p></div>
            </div>
          </div>
        </Section>

        {/* REQUISITOS DE CUIDADO */}
        <Section title="Requisitos de cuidado">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
            <div style={statBox}><p style={statLabel}>Temperatura</p><p style={statVal}>{care.temperatura}</p></div>
            <div style={statBox}><p style={statLabel}>Zona de resistencia</p><p style={statVal}>{care.zona}</p></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <CareRow icon={<IconSun />} title="Luz solar" text={lightShort(plant.light)} />
            <CareRow icon={<IconSoil />} title="Suelo" text={care.suelo} />
            <CareRow icon={<IconPin />} title="Ubicación" text={care.ubicacion} />
            {(plant.height_min_cm || plant.height_max_cm) && (
              <CareRow icon={<IconTemp />} title="Altura" text={`${((plant.height_min_cm ?? 0) / 100).toFixed(1)}–${((plant.height_max_cm ?? plant.height_min_cm ?? 0) / 100).toFixed(1)} m`} />
            )}
          </div>
        </Section>

        {/* CLASIFICACIÓN CIENTÍFICA */}
        <Section title="Clasificaciones científicas">
          <div style={{ backgroundColor: '#F6F3EC', borderRadius: '18px', padding: '4px 18px' }}>
            {taxRows.filter(([, v]) => v).map(([k, v], i, arr) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: i < arr.length - 1 ? '1px solid #EAE1D0' : 'none' }}>
                <span style={{ fontSize: '15px', color: '#4C7F5B' }}>{k}</span>
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#1E3D2B', fontStyle: k === 'Género' ? 'italic' : 'normal' }}>{v}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* COMBINACIONES */}
        {combinations.length > 0 && (
          <Section title="Combina con">
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '6px' }}>
              {combinations.slice(0, 8).map(c => (
                <Link key={c.id} href={`/plant/${c.slug}`} style={{ minWidth: '130px', maxWidth: '130px', textDecoration: 'none' }}>
                  <div style={{ height: '110px', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#E7EFE6', marginBottom: '8px', position: 'relative' }}>
                    {c.cover_image && <Image src={c.cover_image} alt={c.common_name ?? ''} fill sizes="130px" style={{ objectFit: 'cover' }} />}
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#1E3D2B' }}>{c.common_name}</p>
                </Link>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  )
}

const chip: React.CSSProperties = { fontSize: '11px', padding: '5px 12px', borderRadius: '999px', backgroundColor: '#E7EFE6', color: '#1E3D2B', fontWeight: 600 }
const careIconBox: React.CSSProperties = { width: '38px', height: '38px', borderRadius: '11px', backgroundColor: '#F6F3EC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
const careH: React.CSSProperties = { margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#1E3D2B' }
const careP: React.CSSProperties = { margin: 0, fontSize: '13px', color: '#4C7F5B', lineHeight: 1.7 }
const statBox: React.CSSProperties = { backgroundColor: '#F6F3EC', borderRadius: '16px', padding: '16px', textAlign: 'center' }
const statLabel: React.CSSProperties = { margin: '0 0 4px', fontSize: '13px', fontWeight: 700, color: '#1E3D2B' }
const statVal: React.CSSProperties = { margin: 0, fontSize: '14px', color: '#4C7F5B' }

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: '28px' }}>
      <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '24px', fontWeight: 600, margin: '0 0 14px', color: '#1E3D2B' }}>{title}</h2>
      {children}
    </section>
  )
}
