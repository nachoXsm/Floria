'use client'
import { useState, useCallback, useRef, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import Link from 'next/link'
import Nav from '@/components/Nav'
import BottomNav from '@/components/BottomNav'
import { color, font, shadow, radius } from '@/lib/ui'
import { Camera, ImageSquare, ArrowClockwise, Sparkle, CaretRight, Leaf } from '@phosphor-icons/react'

interface IdentificationResult {
  id: string
  image_url: string
  confidence: number | null
  is_plant: boolean
  matched_plant_id: string | null
  matched_plant_slug: string | null
  suggestions: Array<{
    name: string
    probability: number
    similar_images: Array<{ url_small: string }>
    details?: {
      common_names: string[]
      description?: { value: string }
    }
  }>
}

/**
 * Normaliza cualquier foto a JPEG antes de enviarla a la API.
 * Resuelve el problema de iOS: los iPhone capturan en HEIC/HEIF, que Pl@ntNet no acepta.
 * iOS Safari decodifica HEIC nativamente en <img>/<canvas>, así que la conversión ocurre en el propio teléfono.
 * También corrige la orientación EXIF y reduce el tamaño (fotos de iPhone son de 12MP+).
 */
async function normalizeImage(file: File): Promise<File> {
  try {
    const dataUrl: string = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = () => reject(new Error('read'))
      reader.readAsDataURL(file)
    })

    const img: HTMLImageElement = await new Promise((resolve, reject) => {
      const im = new Image()
      im.onload = () => resolve(im)
      im.onerror = () => reject(new Error('decode'))
      im.src = dataUrl
    })

    const MAX = 1600
    let w = img.naturalWidth || img.width
    let h = img.naturalHeight || img.height
    if (!w || !h) return file
    if (w > MAX || h > MAX) {
      const scale = MAX / Math.max(w, h)
      w = Math.round(w * scale)
      h = Math.round(h * scale)
    }

    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) return file
    ctx.drawImage(img, 0, 0, w, h)

    const blob: Blob | null = await new Promise(res => canvas.toBlob(res, 'image/jpeg', 0.9))
    if (!blob || blob.size === 0) return file

    return new File([blob], 'foto.jpg', { type: 'image/jpeg' })
  } catch {
    // Si algo falla, mandamos el archivo original (mejor que romper el flujo)
    return file
  }
}

export default function IdentifyPage() {
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [preparing, setPreparing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<IdentificationResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [limitGate, setLimitGate] = useState<{ registered: boolean } | null>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  // Resumen de resultados: normaliza porcentajes y detecta género común
  const summary = useMemo(() => {
    const sugg = result?.suggestions?.slice(0, 3) ?? []
    if (!sugg.length) return null
    const genusOf = (n: string) => n.replace(/^×\s*/, '').split(' ')[0].toLowerCase()
    const total = sugg.reduce((a, s) => a + (s.probability || 0), 0) || 1
    const items = sugg.map(s => ({ ...s, norm: (s.probability || 0) / total }))
    const topGenus = genusOf(sugg[0].name)
    const sameGenus = sugg.filter(s => genusOf(s.name) === topGenus).length >= 2
    const topCommon = sugg[0].details?.common_names?.[0] || ''
    const topProb = sugg[0].probability || 0
    // Nombre del género con mayúscula inicial para el cartel
    const genusLabel = sugg[0].name.replace(/^×\s*/, '').split(' ')[0]
    return { items, sameGenus, genusLabel, topCommon, topProb }
  }, [result])

  const confLabel = (p: number) =>
    p >= 0.5 ? { t: 'Coincidencia alta', bg: '#DCEEDC', tx: '#1E5631' } :
    p >= 0.2 ? { t: 'Coincidencia media', bg: '#FBEFD3', tx: '#8A6A1E' } :
               { t: 'Coincidencia baja', bg: '#E7EFE6', tx: '#4C7F5B' }

  const loadFile = useCallback(async (f: File | null | undefined) => {
    if (!f) return
    setResult(null)
    setError(null)
    setLimitGate(null)
    setPreview(URL.createObjectURL(f))
    setFile(null)
    setPreparing(true)
    const normalized = await normalizeImage(f)
    setFile(normalized)
    setPreparing(false)
  }, [])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    loadFile(acceptedFiles[0])
  }, [loadFile])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // Aceptamos HEIC/HEIF además de los formatos web: los iPhone entregan HEIC y
    // sin esto react-dropzone descartaría la foto en silencio. Se convierte a JPEG en normalizeImage().
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'] },
    maxFiles: 1,
    maxSize: 25 * 1024 * 1024, // 25MB (una foto HEIC de iPhone puede superar 10MB)
  })

  const identify = async () => {
    if (!file) return
    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('image', file)

    try {
      const res = await fetch('/api/identify', { method: 'POST', body: formData })
      const data = await res.json()

      if (!res.ok) {
        if (data.code === 'FREE_LIMIT_REACHED') {
          setLimitGate({ registered: !!data.registered })
        } else {
          const extra = data.detail ? ` [${data.status} · key:${data.has_key} · ${data.detail}]` : ''
          setError((data.error || 'Error al identificar la planta') + extra)
        }
        return
      }

      setResult(data)
    } catch {
      setError('Error de conexión. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: color.bg, color: color.ink, fontFamily: font.sans, paddingBottom: '110px' }}>
      <Nav />

      <style>{`
        @keyframes idUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes idSpin { to { transform: rotate(360deg) } }
        .idUp { animation: idUp 0.7s cubic-bezier(0.2,0.7,0.2,1) both; }
        .idPress { transition: transform 0.18s cubic-bezier(0.2,0.7,0.2,1); }
        .idPress:active { transform: scale(0.97); }
        .idSpin { animation: idSpin 0.9s linear infinite; }
      `}</style>

      {/* input cámara oculto */}
      <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={(e) => loadFile(e.target.files?.[0])} />

      <div style={{ maxWidth: '620px', margin: '0 auto', padding: '104px 22px 40px' }}>

        {!result && (
          <>
            {/* HERO */}
            <div className="idUp" style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div style={{
                width: '128px', height: '128px', borderRadius: '40px', margin: '0 auto 26px',
                background: `linear-gradient(150deg, ${color.mist} 0%, #D3E4CE 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: shadow.card, position: 'relative',
              }}>
                <Camera size={58} weight="light" color={color.ink} />
                <div style={{ position: 'absolute', bottom: '-8px', right: '-6px', width: '44px', height: '44px', borderRadius: '999px', backgroundColor: color.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: shadow.soft }}>
                  <Leaf size={22} weight="fill" color={color.blush} />
                </div>
              </div>
              <h1 style={{ fontFamily: font.serif, fontSize: '40px', fontWeight: 500, color: color.ink, margin: '0 0 10px', lineHeight: 0.98, letterSpacing: '-0.6px' }}>
                Reconocé<br />una planta
              </h1>
              <p style={{ fontSize: '16px', color: color.inkSoft, lineHeight: 1.6, margin: '0 auto', maxWidth: '320px' }}>
                Sacá una foto y la IA identifica la especie al instante — con más de 1000 plantas en nuestra base.
              </p>
            </div>

            {/* BOTÓN PRINCIPAL — cámara */}
            {!preview && (
              <>
                <button onClick={() => cameraInputRef.current?.click()} className="idPress idUp" style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  backgroundColor: color.ink, color: '#F2E9DD', border: 'none', cursor: 'pointer',
                  padding: '18px', borderRadius: `${radius.pill}px`, fontSize: '16px', fontWeight: 700,
                  boxShadow: shadow.card, marginBottom: '14px',
                }}>
                  <Camera size={22} weight="fill" color="#F2E9DD" />
                  Sacar foto con la cámara
                </button>

                {/* Upload secundario */}
                <div {...getRootProps()} className="idPress" style={{
                  cursor: 'pointer', backgroundColor: color.paper, borderRadius: `${radius.lg}px`,
                  border: `1.5px dashed ${isDragActive ? color.green : color.line}`,
                  padding: '20px', display: 'flex', alignItems: 'center', gap: '14px',
                  boxShadow: shadow.soft,
                }}>
                  <input {...getInputProps()} />
                  <div style={{ width: '46px', height: '46px', borderRadius: '14px', backgroundColor: color.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ImageSquare size={24} weight="light" color={color.ink} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: color.ink }}>{isDragActive ? 'Soltá la imagen acá' : 'Subir una imagen'}</p>
                    <p style={{ margin: 0, fontSize: '12.5px', color: color.inkSoft }}>JPG, PNG o WEBP · máx. 10 MB</p>
                  </div>
                  <CaretRight size={18} weight="bold" color={color.inkFaint} />
                </div>
              </>
            )}

            {/* PREVIEW + identificar */}
            {preview && (
              <div className="idUp">
                <div {...getRootProps()} className="idPress" style={{ cursor: 'pointer', borderRadius: `${radius.lg}px`, overflow: 'hidden', position: 'relative', marginBottom: '16px', boxShadow: shadow.card }}>
                  <input {...getInputProps()} />
                  <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px', backgroundColor: 'rgba(30,61,43,0.7)', backdropFilter: 'blur(8px)', color: '#F2E9DD', fontSize: '12px', fontWeight: 600, padding: '7px 14px', borderRadius: '999px' }}>
                    Tocá para cambiar la foto
                  </div>
                </div>
                <button onClick={identify} disabled={loading || preparing || !file} className="idPress" style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  backgroundColor: (loading || preparing) ? color.green : color.ink, color: '#F2E9DD', border: 'none',
                  cursor: (loading || preparing || !file) ? 'default' : 'pointer', padding: '18px', borderRadius: `${radius.pill}px`,
                  fontSize: '16px', fontWeight: 700, boxShadow: shadow.card, opacity: (preparing && !loading) ? 0.85 : 1,
                }}>
                  {loading ? (
                    <><ArrowClockwise size={20} weight="bold" color="#F2E9DD" className="idSpin" /> Identificando…</>
                  ) : preparing ? (
                    <><ArrowClockwise size={20} weight="bold" color="#F2E9DD" className="idSpin" /> Preparando imagen…</>
                  ) : (
                    <><Sparkle size={20} weight="fill" color={color.blush} /> Identificar planta</>
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {/* ERROR */}
        {error && (
          <div className="idUp" style={{ marginTop: '18px', padding: '16px 18px', backgroundColor: '#FCEEEC', border: '1px solid #F3D6D0', borderRadius: `${radius.md}px` }}>
            <p style={{ margin: 0, fontSize: '13.5px', color: '#8B3A2F', lineHeight: 1.5 }}>{error}</p>
            {error.includes('límite') && (
              <Link href="/pricing" style={{ display: 'inline-block', marginTop: '12px', backgroundColor: color.ink, color: '#F2E9DD', padding: '10px 18px', borderRadius: '999px', textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}>
                Activar Floria Pro
              </Link>
            )}
          </div>
        )}

        {/* GATE PREMIUM (límite freemium alcanzado) */}
        {limitGate && (
          <div className="idUp" style={{
            marginTop: '18px', padding: '28px 22px', borderRadius: `${radius.lg}px`,
            background: `linear-gradient(150deg, ${color.ink}, #14301F)`, boxShadow: shadow.card, textAlign: 'center',
          }}>
            <div style={{ width: '58px', height: '58px', borderRadius: '999px', margin: '0 auto 16px', background: 'rgba(242,233,221,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkle size={28} weight="fill" color={color.blush} />
            </div>
            <p style={{ margin: '0 0 8px', fontFamily: font.serif, fontSize: '25px', fontWeight: 500, color: '#F2E9DD', lineHeight: 1.1 }}>
              Llegaste al límite gratuito
            </p>
            <p style={{ margin: '0 auto 20px', maxWidth: '340px', fontSize: '14px', color: 'rgba(242,233,221,0.75)', lineHeight: 1.6 }}>
              {limitGate.registered
                ? 'Usaste tus 3 identificaciones gratis de este mes. Pasá a Floria Pro para identificar plantas sin límites.'
                : 'Probaste Floria con 3 identificaciones gratis. Creá tu cuenta para seguir, o pasá a Pro para identificar sin límites.'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '320px', margin: '0 auto' }}>
              {!limitGate.registered && (
                <Link href="/auth/login?redirect=/identify" style={{
                  display: 'block', padding: '14px', borderRadius: `${radius.pill}px`, backgroundColor: '#F2E9DD',
                  color: color.ink, textDecoration: 'none', fontSize: '15px', fontWeight: 700,
                }}>Crear cuenta gratis</Link>
              )}
              <Link href="/pricing" style={{
                display: 'block', padding: '14px', borderRadius: `${radius.pill}px`,
                backgroundColor: limitGate.registered ? '#F2E9DD' : 'transparent',
                color: limitGate.registered ? color.ink : '#F2E9DD',
                border: limitGate.registered ? 'none' : '1.5px solid rgba(242,233,221,0.4)',
                textDecoration: 'none', fontSize: '15px', fontWeight: 700,
              }}>{limitGate.registered ? 'Pasar a Floria Pro' : 'Ver Floria Pro'}</Link>
            </div>
          </div>
        )}

        {/* RESULTADOS */}
        {result && (
          <div className="idUp" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {preview && (
              <div style={{ borderRadius: `${radius.lg}px`, overflow: 'hidden', boxShadow: shadow.card, marginBottom: '4px' }}>
                <img src={preview} alt="" style={{ width: '100%', maxHeight: '260px', objectFit: 'cover', display: 'block' }} />
              </div>
            )}
            {!result.is_plant ? (
              <div style={{ padding: '24px', backgroundColor: '#FBF4E6', border: '1px solid #F0E2C4', borderRadius: `${radius.md}px`, textAlign: 'center' }}>
                <p style={{ fontFamily: font.serif, fontSize: '20px', color: '#8A6A1E', margin: '0 0 4px', fontWeight: 500 }}>No parece ser una planta</p>
                <p style={{ fontSize: '13.5px', color: '#A6863C', margin: 0 }}>Intentá con una foto más cercana y con buena iluminación.</p>
              </div>
            ) : (
              <>
                {/* Cartel resumen */}
                {summary && (
                  <div style={{ padding: '20px', borderRadius: `${radius.md}px`, background: `linear-gradient(150deg, ${color.ink}, #14301F)`, boxShadow: shadow.card }}>
                    <p style={{ margin: '0 0 6px', fontSize: '10.5px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: color.blush }}>
                      {summary.topProb >= 0.5 ? 'Identificación probable' : 'Mejor coincidencia'}
                    </p>
                    <p style={{ margin: 0, fontFamily: font.serif, fontSize: '26px', fontWeight: 500, color: '#F2E9DD', lineHeight: 1.05, letterSpacing: '-0.3px' }}>
                      {summary.sameGenus ? <>Muy probablemente una <em>{summary.genusLabel}</em></> : (summary.topCommon || summary.items[0].name)}
                    </p>
                    <p style={{ margin: '6px 0 0', fontSize: '13px', color: 'rgba(242,233,221,0.72)', lineHeight: 1.5 }}>
                      {summary.sameGenus ? 'Tu foto coincide con varias especies de este género. Abajo, las más probables.' : summary.items[0].name}
                    </p>
                  </div>
                )}

                {summary?.items.map((s, i) => {
                  const cl = confLabel(s.probability)
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '16px', backgroundColor: color.paper, borderRadius: `${radius.md}px`, border: i === 0 ? `1.5px solid ${color.green}` : `1px solid ${color.line}`, boxShadow: shadow.soft }}>
                      {s.similar_images?.[0] && (
                        <img src={s.similar_images[0].url_small} alt={s.name} style={{ width: '72px', height: '72px', borderRadius: '16px', objectFit: 'cover', flexShrink: 0 }} />
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                          <div style={{ minWidth: 0 }}>
                            <p style={{ margin: 0, fontFamily: font.serif, fontSize: '18px', fontStyle: 'italic', color: color.ink, lineHeight: 1.1 }}>{s.name}</p>
                            {s.details?.common_names?.[0] && (
                              <p style={{ margin: '2px 0 0', fontSize: '13px', color: color.inkSoft }}>{s.details.common_names[0]}</p>
                            )}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
                            <span style={{ fontSize: '17px', fontWeight: 700, color: color.ink }}>{Math.round(s.norm * 100)}%</span>
                            <span style={{ fontSize: '9.5px', fontWeight: 700, padding: '3px 8px', borderRadius: '999px', whiteSpace: 'nowrap', backgroundColor: cl.bg, color: cl.tx }}>{cl.t}</span>
                          </div>
                        </div>
                        {s.details?.description?.value && (
                          <p style={{ margin: '8px 0 0', fontSize: '12px', color: color.inkSoft, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{s.details.description.value}</p>
                        )}
                        {result.matched_plant_slug && i === 0 && (
                          <Link href={`/plant/${result.matched_plant_slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '10px', fontSize: '13px', fontWeight: 700, color: color.green, textDecoration: 'none' }}>
                            Ver ficha completa <CaretRight size={14} weight="bold" color={color.green} />
                          </Link>
                        )}
                      </div>
                    </div>
                  )
                })}

                <p style={{ fontSize: '11.5px', color: color.inkFaint, textAlign: 'center', padding: '4px 16px', lineHeight: 1.5, margin: 0 }}>
                  El porcentaje indica cuánto se parece tu foto a cada especie. Una foto con flor o fruto mejora la precisión.
                </p>
              </>
            )}

            <button onClick={() => { setPreview(null); setFile(null); setResult(null) }} className="idPress" style={{
              width: '100%', marginTop: '6px', padding: '15px', borderRadius: `${radius.pill}px`,
              border: `1.5px solid ${color.line}`, backgroundColor: color.paper, color: color.ink,
              cursor: 'pointer', fontSize: '14px', fontWeight: 700,
            }}>
              Identificar otra planta
            </button>
          </div>
        )}
      </div>
      <BottomNav />
    </main>
  )
}
