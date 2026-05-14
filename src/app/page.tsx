// app/page.tsx
import Link from 'next/link'
import { getFeaturedPlants } from '@/lib/queries/plants'

// Iconos SVG simples inline
const icons = {
  camera: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <circle cx="12" cy="13" r="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  ),
  search: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  garden: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M12 3v1m0 16v1M4.22 4.22l.707.707m12.02 12.02l.707.707M1 12h1m20 0h1M4.22 19.78l.707-.707M18.95 5.05l.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
    </svg>
  ),
  leaf: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M12 3c0 0-7 4-7 10a7 7 0 0014 0c0-6-7-10-7-10z" />
    </svg>
  ),
  heart: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
}

const FEATURES = [
  {
    icon: icons.camera,
    title: 'Reconocé especies',
    desc: 'Fotografiá cualquier planta y obtené su identificación y ficha técnica al instante.',
  },
  {
    icon: icons.search,
    title: 'Explorá plantas',
    desc: 'Filtrá por luz, riego, clima, estilo y más. El catálogo botánico que siempre quisiste.',
  },
  {
    icon: icons.garden,
    title: 'Diseñá tu espacio',
    desc: 'Creá jardines, combiná especies y llevá tus proyectos verdes al siguiente nivel.',
  },
  {
    icon: icons.leaf,
    title: 'Combinaciones IA',
    desc: 'Recibí sugerencias de paletas vegetales pensadas por su estética y compatibilidad.',
  },
  {
    icon: icons.heart,
    title: 'Guardá tus favoritas',
    desc: 'Construí tu colección personal y accedé a ella desde cualquier dispositivo.',
  },
]

export default async function HomePage() {
  const featured = await getFeaturedPlants(6)

  return (
    <main className="min-h-screen">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-floria-50/80 backdrop-blur-md border-b border-floria-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-floria-900 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-floria-100" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
              </svg>
            </div>
            <span className="font-serif text-xl text-floria-900 font-medium">Floria</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-sans text-floria-600">
            <Link href="/explore" className="hover:text-floria-900 transition-colors">Explorar</Link>
            <Link href="/identify" className="hover:text-floria-900 transition-colors">Identificar</Link>
            <Link href="/garden" className="hover:text-floria-900 transition-colors">Mi jardín</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="btn-secondary text-sm">Iniciar sesión</Link>
            <Link href="/auth/signup" className="btn-primary text-sm">Registrarse</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-floria-600 font-sans text-sm uppercase tracking-widest mb-4">
            Naturaleza · Diseño · Bienestar
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-floria-900 leading-tight mb-6">
            Tu espacio,
            <br />
            <span className="italic text-floria-700">tu naturaleza.</span>
          </h1>
          <p className="font-sans text-lg text-floria-600 leading-relaxed mb-10 max-w-xl mx-auto">
            Inspiración inteligente para vivir rodeado de verde. Identificá, explorá y diseñá
            con plantas como paisajista profesional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/explore" className="btn-primary text-base px-8 py-3.5">
              Explorar plantas
            </Link>
            <Link href="/identify" className="btn-secondary text-base px-8 py-3.5">
              Identificar por foto
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-floria-900 text-center mb-12">
            Todo lo que necesitás para diseñar con plantas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 stagger-children">
            {FEATURES.map((f) => (
              <div key={f.title} className="text-center">
                <div className="w-12 h-12 bg-floria-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-floria-700">
                  {f.icon}
                </div>
                <h3 className="font-serif text-lg text-floria-900 mb-2">{f.title}</h3>
                <p className="font-sans text-sm text-floria-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANTAS DESTACADAS */}
      {featured.length > 0 && (
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-serif text-3xl text-floria-900">Plantas destacadas</h2>
            <Link href="/explore" className="font-sans text-sm text-floria-700 hover:text-floria-900 underline underline-offset-4">
              Ver todo
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 stagger-children">
            {featured.map((plant) => (
              <Link key={plant.id} href={`/plant/${plant.slug}`} className="plant-card group">
                <div className="aspect-[4/3] bg-floria-100 overflow-hidden">
                  {plant.cover_image ? (
                    <img
                      src={plant.cover_image}
                      alt={plant.common_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-floria-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3C6.48 3 2 7.48 2 13c0 4.42 3.37 8.07 7.74 8.78C9.89 22.17 10.94 22 12 22s2.11.17 2.26-.22C18.63 21.07 22 17.42 22 13c0-5.52-4.48-10-10-10z"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg text-floria-900 mb-1">{plant.common_name}</h3>
                  <p className="font-sans text-xs text-floria-500 italic mb-3">{plant.scientific_name}</p>
                  <div className="flex gap-2">
                    {plant.indoor && (
                      <span className="text-xs bg-floria-100 text-floria-700 px-2.5 py-1 rounded-full">Interior</span>
                    )}
                    {plant.outdoor && (
                      <span className="text-xs bg-floria-100 text-floria-700 px-2.5 py-1 rounded-full">Exterior</span>
                    )}
                    {plant.care_level && (
                      <span className={`badge-care-${plant.care_level}`}>
                        {{ easy: 'Fácil', moderate: 'Moderado', expert: 'Experto' }[plant.care_level]}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA PRICING */}
      <section className="py-20 px-6 bg-floria-900 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl text-floria-50 mb-4">
            Empezá gratis, crecé sin límites
          </h2>
          <p className="font-sans text-floria-300 text-lg mb-10">
            Acceso gratuito al catálogo y búsqueda básica. Activá Floria Pro para IA ilimitada,
            jardines sin límite y exportaciones profesionales.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch max-w-lg mx-auto">
            <div className="flex-1 bg-floria-800 rounded-2xl p-6 border border-floria-700 text-left">
              <p className="font-sans text-floria-400 text-sm mb-1">Free</p>
              <p className="font-serif text-3xl text-floria-50 mb-4">$0</p>
              <ul className="font-sans text-sm text-floria-300 space-y-2 mb-6">
                <li>✓ 10 búsquedas por día</li>
                <li>✓ 3 identificaciones por mes</li>
                <li>✓ 1 jardín guardado</li>
              </ul>
              <Link href="/auth/signup" className="block text-center bg-floria-700 text-floria-100 text-sm font-medium py-2.5 rounded-full hover:bg-floria-600 transition-colors">
                Registrarse gratis
              </Link>
            </div>
            <div className="flex-1 bg-white rounded-2xl p-6 border-2 border-floria-400 text-left">
              <p className="font-sans text-floria-600 text-sm mb-1">Pro</p>
              <p className="font-serif text-3xl text-floria-900 mb-4">$9.99<span className="text-base font-sans text-floria-500">/mes</span></p>
              <ul className="font-sans text-sm text-floria-700 space-y-2 mb-6">
                <li>✓ IA ilimitada</li>
                <li>✓ Jardines sin límite</li>
                <li>✓ Exportar PDF / PNG</li>
                <li>✓ Combinaciones automáticas</li>
                <li>✓ Asistente botánico</li>
              </ul>
              <Link href="/pricing" className="block text-center bg-floria-900 text-floria-50 text-sm font-medium py-2.5 rounded-full hover:bg-floria-800 transition-colors">
                Activar Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 bg-floria-950 text-center">
        <p className="font-serif text-2xl text-floria-200 mb-2">Floria</p>
        <p className="font-sans text-sm text-floria-500 mb-6">Tu espacio, tu naturaleza.</p>
        <p className="font-sans text-xs text-floria-600">
          © {new Date().getFullYear()} Floria · Todos los derechos reservados
        </p>
      </footer>
    </main>
  )
}
