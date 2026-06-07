'use client'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Link from 'next/link'
import Nav from '@/components/Nav'
import BottomNav from '@/components/BottomNav'

interface IdentificationResult {
  id: string
  image_url: string
  confidence: number | null
  is_plant: boolean
  matched_plant_id: string | null
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

export default function IdentifyPage() {
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<IdentificationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const f = acceptedFiles[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setResult(null)
    setError(null)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
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
          setError(`Alcanzaste tu límite de identificaciones gratuitas. Activá Floria Pro para continuar.`)
        } else {
          setError(data.error || 'Error al identificar la planta')
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
    <main className="min-h-screen bg-floria-50 mobile-page-pb" style={{ paddingTop: '88px' }}>
      <Nav />
      <div className="max-w-2xl mx-auto px-4 pb-10">
        <div className="mb-10 text-center">
          <h1 className="font-serif text-4xl text-floria-900 mb-3">Reconocé una planta</h1>
          <p className="font-sans text-floria-600">Subí una foto y la IA identificará la especie al instante</p>
        </div>

        {/* DROPZONE */}
        <div
          {...getRootProps()}
          className={`
            relative border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer
            transition-all duration-200
            ${isDragActive ? 'border-floria-600 bg-floria-100' : 'border-floria-300 bg-white hover:border-floria-500'}
            ${preview ? 'border-floria-500' : ''}
          `}
        >
          <input {...getInputProps()} />
          {preview ? (
            <div className="relative">
              <img src={preview} alt="Preview" className="max-h-80 mx-auto rounded-2xl object-contain" />
              <p className="mt-4 font-sans text-sm text-floria-500">Hacé clic para cambiar la imagen</p>
            </div>
          ) : (
            <div>
              <svg className="w-14 h-14 text-floria-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <circle cx="12" cy="13" r="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
              </svg>
              <p className="font-serif text-lg text-floria-700 mb-2">
                {isDragActive ? 'Soltá la imagen acá' : 'Arrastrá una foto o hacé clic'}
              </p>
              <p className="font-sans text-sm text-floria-400">JPG, PNG o WEBP · máx. 10 MB</p>
            </div>
          )}
        </div>

        {/* BOTÓN */}
        {preview && !result && (
          <button
            onClick={identify}
            disabled={loading}
            className="w-full mt-5 btn-primary py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Identificando...
              </span>
            ) : 'Identificar planta'}
          </button>
        )}

        {/* ERROR */}
        {error && (
          <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-2xl">
            <p className="font-sans text-sm text-red-700">{error}</p>
            {error.includes('límite') && (
              <Link href="/pricing" className="inline-block mt-2 btn-primary text-sm">
                Activar Floria Pro
              </Link>
            )}
          </div>
        )}

        {/* RESULTADOS */}
        {result && (
          <div className="mt-8 space-y-4 animate-fade-up">
            {!result.is_plant ? (
              <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl text-center">
                <p className="font-serif text-lg text-amber-800">No parece ser una planta</p>
                <p className="font-sans text-sm text-amber-600 mt-1">
                  Intentá con una foto más cercana y con buena iluminación
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-serif text-2xl text-floria-900">Resultados</h2>
                {result.suggestions.slice(0, 3).map((s, i) => (
                  <div
                    key={i}
                    className={`plant-card p-5 flex items-start gap-4 ${i === 0 ? 'border-floria-500 border-2' : ''}`}
                  >
                    {s.similar_images?.[0] && (
                      <img
                        src={s.similar_images[0].url_small}
                        alt={s.name}
                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-serif text-lg text-floria-900 italic">{s.name}</p>
                          {s.details?.common_names?.[0] && (
                            <p className="font-sans text-sm text-floria-600">{s.details.common_names[0]}</p>
                          )}
                        </div>
                        <span className={`text-sm font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${
                          s.probability > 0.7 ? 'bg-green-100 text-green-800' :
                          s.probability > 0.4 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-floria-100 text-floria-700'
                        }`}>
                          {Math.round(s.probability * 100)}%
                        </span>
                      </div>
                      {s.details?.description?.value && (
                        <p className="font-sans text-xs text-floria-500 mt-2 line-clamp-2">
                          {s.details.description.value}
                        </p>
                      )}
                      {result.matched_plant_id && i === 0 && (
                        <Link
                          href={`/plant/${result.matched_plant_id}`}
                          className="inline-block mt-2 text-xs font-sans text-floria-700 underline underline-offset-2 hover:text-floria-900"
                        >
                          Ver ficha completa →
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}

            <button
              onClick={() => { setPreview(null); setFile(null); setResult(null) }}
              className="w-full btn-secondary mt-2"
            >
              Identificar otra planta
            </button>
          </div>
        )}
      </div>
      <BottomNav />
    </main>
  )
}
