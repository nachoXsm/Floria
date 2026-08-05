import Image from 'next/image'
import Link from 'next/link'
import type { Plant } from '@/types'
import type { Enrichment } from '@/lib/enrich'
import { lightShort } from '@/lib/enrich'
import { color, font, shadow, radius } from '@/lib/ui'
import { Drop, Sun, Thermometer, ShieldCheck, MapPin, Ruler, Mountains, Warning, Leaf } from '@phosphor-icons/react/dist/ssr'

const CARE_LABELS: Record<string, string> = { easy: 'Fácil', moderate: 'Moderado', expert: 'Experto' }
const CARE_COLORS: Record<string, string> = { easy: '#2E7D46', moderate: '#B57A1E', expert: '#C0453A' }

function CareRow({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', backgroundColor: color.paper, borderRadius: `${radius.md}px`, padding: '15px 16px', border: `1px solid ${color.line}`, boxShadow: shadow.soft }}>
      <div style={{ width: '44px', height: '44px', borderRadius: '13px', backgroundColor: color.mist, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
      <div><p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: color.ink }}>{title}</p><p style={{ margin: 0, fontSize: '13px', color: color.inkSoft }}>{text}</p></div>
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
      {/* HERO — portada de la planta */}
      <div style={{ position: 'relative', width: '100%', height: '440px', backgroundColor: color.mist }}>
        {plant.cover_image ? (
          <Image src={plant.cover_image} alt={plant.common_name} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}><Leaf size={90} weight="light" color={color.sage} /></div>
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,30,20,0.18) 0%, transparent 30%, transparent 55%, rgba(15,30,20,0.62) 90%, rgba(15,30,20,0.75) 100%)' }} />
        <div style={{ position: 'absolute', left: '22px', right: '22px', bottom: '46px', maxWidth: '760px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: font.serif, fontSize: '42px', fontWeight: 500, color: '#FBF7F0', margin: '0 0 4px', lineHeight: 0.98, letterSpacing: '-0.6px', textShadow: '0 2px 24px rgba(0,0,0,0.3)' }}>
            {plant.common_name}
          </h1>
          <p style={{ fontSize: '15px', fontStyle: 'italic', color: 'rgba(251,247,240,0.85)', margin: 0 }}>{plant.scientific_name}</p>
        </div>
      </div>

      {/* HOJA DE CONTENIDO superpuesta */}
      <div style={{ position: 'relative', marginTop: '-28px', backgroundColor: color.bg, borderRadius: '30px 30px 0 0', padding: '26px 20px 0' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          {/* Chips */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
            {plant.indoor && <span style={chip}>Interior</span>}
            {plant.outdoor && <span style={chip}>Exterior</span>}
            {plant.pot_suitable && <span style={chip}>Apto maceta</span>}
            {plant.is_native && <span style={{ ...chip, backgroundColor: '#E6F4EA', color: '#2E7D46' }}>Nativa</span>}
            <span style={{ ...chip, backgroundColor: `${CARE_COLORS[plant.care_level]}18`, color: CARE_COLORS[plant.care_level] }}>
              Cuidado {CARE_LABELS[plant.care_level]}
            </span>
          </div>

          {/* Aviso toxicidad */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#FBF2E6', border: '1px solid #F0DFC2', borderRadius: `${radius.md}px`, padding: '13px 15px', marginBottom: '6px' }}>
            <Warning size={20} weight="fill" color="#B57A1E" style={{ flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: '12px', color: '#8A6A1E', lineHeight: 1.5 }}>{care.toxicidad}</p>
          </div>

          {/* DESCRIPCIÓN */}
          {plant.description && (
            <Section title="Descripción">
              <p style={{ fontSize: '15px', color: color.inkSoft, lineHeight: 1.75, margin: 0 }}>{plant.description}</p>
            </Section>
          )}

          {/* CUIDADOS */}
          <Section title="Cuidados">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={careIconBox}><Drop size={24} weight="light" color="#2563EB" /></div>
                <div><p style={careH}>Agua</p><p style={careP}>{care.agua}</p></div>
              </div>
              <div style={{ height: '1px', backgroundColor: color.line }} />
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={careIconBox}><Sun size={24} weight="light" color="#E0912F" /></div>
                <div><p style={careH}>Luz solar</p><p style={careP}>{care.luz}</p></div>
              </div>
            </div>
          </Section>

          {/* REQUISITOS */}
          <Section title="Requisitos de cuidado">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
              <div style={statBox}><Thermometer size={22} weight="light" color="#C0453A" /><p style={statLabel}>Temperatura</p><p style={statVal}>{care.temperatura}</p></div>
              <div style={statBox}><ShieldCheck size={22} weight="light" color={color.green} /><p style={statLabel}>Zona de resistencia</p><p style={statVal}>{care.zona}</p></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <CareRow icon={<Sun size={22} weight="light" color="#E0912F" />} title="Luz solar" text={lightShort(plant.light)} />
              <CareRow icon={<Mountains size={22} weight="light" color="#8A6A3E" />} title="Suelo" text={care.suelo} />
              <CareRow icon={<MapPin size={22} weight="light" color="#2563EB" />} title="Ubicación" text={care.ubicacion} />
              {(plant.height_min_cm || plant.height_max_cm) && (
                <CareRow icon={<Ruler size={22} weight="light" color={color.green} />} title="Altura" text={`${((plant.height_min_cm ?? 0) / 100).toFixed(1)}–${((plant.height_max_cm ?? plant.height_min_cm ?? 0) / 100).toFixed(1)} m`} />
              )}
            </div>
          </Section>

          {/* CLASIFICACIÓN CIENTÍFICA */}
          <Section title="Clasificaciones científicas">
            <div style={{ backgroundColor: color.paper, borderRadius: `${radius.md}px`, padding: '4px 18px', border: `1px solid ${color.line}`, boxShadow: shadow.soft }}>
              {taxRows.filter(([, v]) => v).map(([k, v], i, arr) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: i < arr.length - 1 ? `1px solid ${color.line}` : 'none' }}>
                  <span style={{ fontSize: '14.5px', color: color.inkSoft }}>{k}</span>
                  <span style={{ fontSize: '14.5px', fontWeight: 600, color: color.ink, fontStyle: k === 'Género' ? 'italic' : 'normal' }}>{v}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* COMBINACIONES */}
          {combinations.length > 0 && (
            <Section title="Combina con">
              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '6px' }}>
                {combinations.slice(0, 8).map(c => (
                  <Link key={c.id} href={`/plant/${c.slug}`} style={{ minWidth: '140px', maxWidth: '140px', textDecoration: 'none' }}>
                    <div style={{ height: '150px', borderRadius: `${radius.md}px`, overflow: 'hidden', backgroundColor: color.mist, marginBottom: '9px', position: 'relative', boxShadow: shadow.soft }}>
                      {c.cover_image && <Image src={c.cover_image} alt={c.common_name ?? ''} fill sizes="140px" style={{ objectFit: 'cover' }} />}
                    </div>
                    <p style={{ margin: 0, fontSize: '13.5px', fontWeight: 600, color: color.ink }}>{c.common_name}</p>
                  </Link>
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  )
}

const chip: React.CSSProperties = { fontSize: '11px', padding: '6px 13px', borderRadius: '999px', backgroundColor: color.mist, color: color.ink, fontWeight: 700, letterSpacing: '0.2px' }
const careIconBox: React.CSSProperties = { width: '46px', height: '46px', borderRadius: '14px', backgroundColor: color.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1px solid ${color.line}`, boxShadow: shadow.soft }
const careH: React.CSSProperties = { margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: color.ink }
const careP: React.CSSProperties = { margin: 0, fontSize: '13.5px', color: color.inkSoft, lineHeight: 1.7 }
const statBox: React.CSSProperties = { backgroundColor: color.paper, borderRadius: `${radius.md}px`, padding: '18px 16px', textAlign: 'center', border: `1px solid ${color.line}`, boxShadow: shadow.soft, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }
const statLabel: React.CSSProperties = { margin: '6px 0 0', fontSize: '12.5px', fontWeight: 700, color: color.ink }
const statVal: React.CSSProperties = { margin: 0, fontSize: '14px', color: color.inkSoft }

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: '30px' }}>
      <h2 style={{ fontFamily: font.serif, fontSize: '26px', fontWeight: 500, margin: '0 0 15px', color: color.ink, letterSpacing: '-0.3px' }}>{title}</h2>
      {children}
    </section>
  )
}
