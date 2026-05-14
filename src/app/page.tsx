import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-floria-50">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-floria-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-serif text-xl text-floria-900 font-medium">🌿 Floria</span>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-sm text-floria-700 hover:text-floria-900">Iniciar sesión</Link>
            <Link href="/auth/signup" className="bg-floria-900 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-floria-800">Registrarse</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-40 pb-20 px-6 text-center">
        <p className="text-floria-600 text-sm uppercase tracking-widest mb-4">
          Naturaleza · Diseño · Bienestar
        </p>
        <h1 className="font-serif text-5xl md:text-7xl text-floria-900 leading-tight mb-6">
          Tu espacio,<br />
          <span className="italic text-floria-700">tu naturaleza.</span>
        </h1>
        <p className="text-lg text-floria-600 mb-10 max-w-xl mx-auto">
          Inspiración inteligente para vivir rodeado de verde.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/explore" className="bg-floria-900 text-white px-8 py-3.5 rounded-full hover:bg-floria-800 transition-colors">
            Explorar plantas
          </Link>
          <Link href="/identify" className="border border-floria-900 text-floria-900 px-8 py-3.5 rounded-full hover:bg-floria-100 transition-colors">
            Identificar por foto
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-floria-900 mb-12">
            Todo lo que necesitás para diseñar con plantas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { title: 'Reconocé especies', desc: 'Fotografiá cualquier planta y obtené su identificación al instante.' },
              { title: 'Explorá plantas', desc: 'Filtrá por luz, riego, clima y estilo. El catálogo que siempre quisiste.' },
              { title: 'Diseñá tu jardín', desc: 'Creá jardines, combiná especies y llevá tus proyectos verdes adelante.' },
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-floria-200">
                <h3 className="font-serif text-lg text-floria-900 mb-2">{f.title}</h3>
                <p className="text-sm text-floria-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 px-6 bg-floria-900 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl text-white mb-4">Empezá gratis</h2>
          <p className="text-floria-300 text-lg mb-10">
            Explorá el catálogo sin costo. Activá Pro para IA ilimitada y jardines sin límite.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
            <div className="flex-1 bg-floria-800 rounded-2xl p-6 text-left">
              <p className="text-floria-400 text-sm mb-1">Free</p>
              <p className="font-serif text-3xl text-white mb-4">$0</p>
              <ul className="text-sm text-floria-300 space-y-2 mb-6">
                <li>✓ 10 búsquedas por día</li>
                <li>✓ 3 identificaciones por mes</li>
                <li>✓ 1 jardín guardado</li>
              </ul>
              <Link href="/auth/signup" className="block text-center bg-floria-700 text-white text-sm py-2.5 rounded-full hover:bg-floria-600">
                Registrarse gratis
              </Link>
            </div>
            <div className="flex-1 bg-white rounded-2xl p-6 text-left">
              <p className="text-floria-600 text-sm mb-1">Pro</p>
              <p className="font-serif text-3xl text-floria-900 mb-4">$9.99<span className="text-base text-floria-500">/mes</span></p>
              <ul className="text-sm text-floria-700 space-y-2 mb-6">
                <li>✓ IA ilimitada</li>
                <li>✓ Jardines sin límite</li>
                <li>✓ Exportar PDF / PNG</li>
                <li>✓ Combinaciones automáticas</li>
              </ul>
              <Link href="/pricing" className="block text-center bg-floria-900 text-white text-sm py-2.5 rounded-full hover:bg-floria-800">
                Activar Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 bg-floria-950 text-center">
        <p className="font-serif text-2xl text-floria-200 mb-2">Floria</p>
        <p className="text-sm text-floria-500">Tu espacio, tu naturaleza.</p>
        <p className="text-xs text-floria-600 mt-2">
          © {new Date().getFullYear()} Floria
        </p>
      </footer>
    </main>
  )
}
