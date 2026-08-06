'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { type Lang, type TranslationKey, detectLang, setLang, t as translate } from '@/lib/i18n'

type I18nCtx = {
  lang: Lang
  changeLang: (l: Lang) => void
  t: (key: TranslationKey) => string
}

const I18nContext = createContext<I18nCtx>({
  lang: 'es',
  changeLang: () => {},
  t: (key) => key,
})

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es')
  const router = useRouter()

  useEffect(() => {
    setLangState(detectLang())
  }, [])

  function changeLang(l: Lang) {
    setLang(l)
    setLangState(l)
    // Re-renderiza los componentes server-side con el nuevo idioma
    router.refresh()
  }

  return (
    <I18nContext.Provider value={{ lang, changeLang, t: (key) => translate(lang, key) }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
